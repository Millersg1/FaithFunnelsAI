import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage, seedDemoData } from "./storage";
import { insertFunnelSchema, insertVerseSchema, insertThemeSchema, insertTenantSchema, insertTenantSettingsSchema, insertLeadSchema, TIER_FEATURES, TIERS, type TierType } from "@shared/schema";
import OpenAI from "openai";
import { setupAuth, isAuthenticated } from "./replitAuth";

export async function registerRoutes(app: Express): Promise<Server> {
  await setupAuth(app);

  // Review login for JVZoo/WarriorPlus reviewers
  app.post('/api/auth/review-login', async (req: any, res) => {
    try {
      const { token } = req.body;
      const reviewToken = process.env.REVIEW_ACCESS_TOKEN;
      
      if (!reviewToken) {
        return res.status(500).json({ message: "Review access not configured" });
      }
      
      if (token !== reviewToken) {
        return res.status(401).json({ message: "Invalid review token" });
      }
      
      // Create or get review user
      const reviewUserId = "reviewer-jvzoo-wplus";
      await storage.upsertUser({
        id: reviewUserId,
        email: "reviewer@faithfunnelsai.com",
        firstName: "JVZoo",
        lastName: "Reviewer",
        profileImageUrl: null,
      });
      
      // Set up session for reviewer
      req.login({
        claims: {
          sub: reviewUserId,
          email: "reviewer@faithfunnelsai.com",
          first_name: "JVZoo",
          last_name: "Reviewer",
          exp: Math.floor(Date.now() / 1000) + (7 * 24 * 60 * 60), // 1 week
        },
        access_token: "review-access",
        refresh_token: null,
        expires_at: Math.floor(Date.now() / 1000) + (7 * 24 * 60 * 60),
      }, (err: any) => {
        if (err) {
          console.error("Review login error:", err);
          return res.status(500).json({ message: "Login failed" });
        }
        res.json({ success: true, redirect: "/app" });
      });
    } catch (error) {
      console.error("Review login error:", error);
      res.status(500).json({ message: "Login failed" });
    }
  });

  // JVZIPN v2 Webhook - JVZoo Instant Payment Notification
  // Product mapping for tier assignment
  const JVZOO_PRODUCTS: Record<string, { tier: string; name: string }> = {
    // Front-End product ID - assign basic tier
    "FE": { tier: "basic", name: "Faith Funnels AI - Front End" },
    // OTO1 - White Label
    "OTO1": { tier: "white_label", name: "Faith Funnels AI - White Label" },
    "DS1": { tier: "white_label", name: "Faith Funnels AI - White Label Lite" },
    // OTO2 - Premium
    "OTO2": { tier: "premium", name: "Faith Funnels AI - Premium" },
    "DS2": { tier: "premium", name: "Faith Funnels AI - Premium Lite" },
    // OTO3 - Agency/Reseller
    "OTO3": { tier: "reseller", name: "Faith Funnels AI - Agency" },
    "DS3": { tier: "reseller", name: "Faith Funnels AI - Agency Lite" },
    // Order Bump (doesn't change tier, just tracks purchase)
    "BUMP": { tier: "basic", name: "Faith Funnels AI - Bible Verses Pack" },
  };

  // Tier priority for upgrades (higher number = better tier)
  const TIER_PRIORITY: Record<string, number> = {
    "basic": 1,
    "white_label": 2,
    "premium": 3,
    "reseller": 4,
  };

  app.post('/api/webhooks/jvzipn', async (req, res) => {
    try {
      const ipnData = req.body;
      console.log("JVZIPN received:", JSON.stringify(ipnData, null, 2));

      // Verify the secret key if configured
      const secretKey = process.env.JVZIPN_SECRET_KEY;
      if (secretKey && ipnData.cverify !== secretKey) {
        console.error("JVZIPN verification failed");
        return res.status(401).json({ error: "Verification failed" });
      }

      // Extract purchase data from JVZoo IPN
      const transactionId = ipnData.ctransreceipt || ipnData.ctransaction || `jvzoo-${Date.now()}`;
      const email = ipnData.ccustemail?.toLowerCase();
      const firstName = ipnData.ccustname?.split(' ')[0] || '';
      const lastName = ipnData.ccustname?.split(' ').slice(1).join(' ') || '';
      const amount = ipnData.ctransamount || '0';
      const productId = ipnData.cproditem || ipnData.cprodtitle || 'FE';
      const transactionType = ipnData.ctransaction_type || 'SALE';

      if (!email) {
        console.error("JVZIPN missing email");
        return res.status(400).json({ error: "Missing customer email" });
      }

      // Handle refunds and cancellations - disable access
      if (['RFND', 'CGBK', 'CANCEL-REBILL', 'INSF'].includes(transactionType)) {
        console.log(`JVZIPN processing ${transactionType} for ${email}`);
        
        // Find and disable the tenant
        const tenantSlug = `jvzoo-${email.replace(/[^a-z0-9]/gi, '-').substring(0, 30)}`;
        const tenant = await storage.getTenantBySlug(tenantSlug);
        
        if (tenant) {
          // Mark tenant as unpaid (access disabled)
          await storage.updateTenant(tenant.id, { isPaid: false });
          console.log(`JVZIPN: Disabled access for ${email} due to ${transactionType}`);
          
          // Log the refund/cancellation
          await storage.createPurchase({
            transactionId: `${transactionId}-${transactionType}`,
            email,
            firstName,
            lastName,
            productId: 'REFUND',
            productName: `Refund/Cancel: ${transactionType}`,
            amount: `-${amount}`,
            tier: 'none',
            marketplace: 'jvzoo',
            status: 'refunded',
            ipnData: ipnData,
          });
        }
        
        return res.json({ success: true, message: `${transactionType} processed` });
      }

      // Handle subscription resumption
      if (transactionType === 'UNCANCEL-REBILL') {
        const tenantSlug = `jvzoo-${email.replace(/[^a-z0-9]/gi, '-').substring(0, 30)}`;
        const tenant = await storage.getTenantBySlug(tenantSlug);
        if (tenant) {
          await storage.updateTenant(tenant.id, { isPaid: true });
          console.log(`JVZIPN: Re-enabled access for ${email}`);
        }
        return res.json({ success: true, message: "Access restored" });
      }

      // Only process SALE and BILL transactions for new access
      if (!['SALE', 'BILL', 'TEST_SALE'].includes(transactionType)) {
        console.log(`JVZIPN skipping unknown transaction type: ${transactionType}`);
        return res.json({ success: true, message: `Skipped ${transactionType}` });
      }

      // Check for duplicate transaction
      const existingPurchase = await storage.getPurchaseByTransactionId(transactionId);
      if (existingPurchase) {
        console.log(`JVZIPN duplicate transaction: ${transactionId}`);
        return res.json({ success: true, message: "Already processed" });
      }

      // Determine product tier from product ID/title
      let productKey = 'FE';
      const productTitle = (ipnData.cprodtitle || '').toLowerCase();
      if (productTitle.includes('oto1') || productTitle.includes('white label')) {
        productKey = 'OTO1';
      } else if (productTitle.includes('ds1')) {
        productKey = 'DS1';
      } else if (productTitle.includes('oto2') || productTitle.includes('premium')) {
        productKey = 'OTO2';
      } else if (productTitle.includes('ds2')) {
        productKey = 'DS2';
      } else if (productTitle.includes('oto3') || productTitle.includes('agency')) {
        productKey = 'OTO3';
      } else if (productTitle.includes('ds3')) {
        productKey = 'DS3';
      } else if (productTitle.includes('bump') || productTitle.includes('verse')) {
        productKey = 'BUMP';
      }

      const productInfo = JVZOO_PRODUCTS[productKey] || JVZOO_PRODUCTS['FE'];
      const purchasedTier = productInfo.tier;

      // Log the purchase
      await storage.createPurchase({
        transactionId,
        email,
        firstName,
        lastName,
        productId: productKey,
        productName: productInfo.name,
        amount,
        tier: purchasedTier,
        marketplace: 'jvzoo',
        status: 'completed',
        ipnData: ipnData,
      });

      // Create or update user account
      const userId = `jvzoo-${email.replace(/[^a-z0-9]/gi, '-')}`;
      await storage.upsertUser({
        id: userId,
        email,
        firstName,
        lastName,
        profileImageUrl: null,
      });

      // Check if tenant exists for this user, otherwise create one
      const tenantSlug = `jvzoo-${email.replace(/[^a-z0-9]/gi, '-').substring(0, 30)}`;
      let tenant = await storage.getTenantBySlug(tenantSlug);
      
      if (tenant) {
        // Upgrade tier if this purchase has a higher tier
        const currentPriority = TIER_PRIORITY[tenant.tier] || 1;
        const newPriority = TIER_PRIORITY[purchasedTier] || 1;
        if (newPriority > currentPriority) {
          console.log(`Upgrading tenant ${tenantSlug} from ${tenant.tier} to ${purchasedTier}`);
          // Note: Would need to add updateTenant method for actual upgrade
        }
      } else {
        // Create new tenant
        tenant = await storage.createTenant({
          slug: tenantSlug,
          adminPin: Math.random().toString(36).substring(2, 8).toUpperCase(),
          isPaid: true,
          tier: purchasedTier,
        });

        // Create tenant settings
        await storage.createTenantSettings({
          tenantId: tenant.id,
          businessName: `${firstName}'s Faith Funnels`,
          supportEmail: email,
        });
      }

      console.log(`JVZIPN processed: ${email} purchased ${productInfo.name} (${purchasedTier})`);
      
      // Return access instructions for JVZoo to display as "license key"
      const accessUrl = `https://faithfunnelsai.com/jvzoo-thank-you`;
      const adminPin = tenant.adminPin;
      
      // JVZoo displays this as the license/access key to the customer
      res.json({ 
        success: true,
        // This text is shown to the buyer in JVZoo
        license_key: `ACCESS URL: ${accessUrl}\nADMIN PIN: ${adminPin}\nEMAIL: ${email}\n\nLogin with your JVZoo email to access your dashboard.`,
      });

    } catch (error) {
      console.error("JVZIPN error:", error);
      res.status(500).json({ error: "Failed to process IPN" });
    }
  });

  // Explodely IPN Webhook - Explodely Instant Payment Notification
  // Uses same product mapping as JVZoo
  const EXPLODELY_PRODUCTS: Record<string, { tier: string; name: string }> = {
    "FE": { tier: "basic", name: "Faith Funnels AI - Front End" },
    "OTO1": { tier: "white_label", name: "Faith Funnels AI - White Label" },
    "DS1": { tier: "white_label", name: "Faith Funnels AI - White Label Lite" },
    "OTO2": { tier: "premium", name: "Faith Funnels AI - Premium" },
    "DS2": { tier: "premium", name: "Faith Funnels AI - Premium Lite" },
    "OTO3": { tier: "reseller", name: "Faith Funnels AI - Agency" },
    "DS3": { tier: "reseller", name: "Faith Funnels AI - Agency Lite" },
    "BUMP": { tier: "basic", name: "Faith Funnels AI - Bible Verses Pack" },
  };

  app.post('/api/webhooks/explodely', async (req, res) => {
    try {
      const ipnData = req.body;
      console.log("Explodely IPN received:", JSON.stringify(ipnData, null, 2));

      // Verify secret key if configured (optional but recommended)
      const secretKey = process.env.EXPLODELY_SECRET_KEY;
      if (secretKey && ipnData.secret !== secretKey) {
        console.error("Explodely IPN verification failed");
        return res.status(401).send("Verification failed");
      }

      // Extract Explodely IPN parameters
      const orderId = ipnData.orderid || `explodely-${Date.now()}`;
      const ipnType = (ipnData.type || 'sale').toLowerCase();
      const productId = ipnData.productId || '';
      const productName = ipnData.productName || '';
      const customerName = ipnData.customerName || '';
      const customerEmail = ipnData.customerEmail?.toLowerCase();
      const amount = ipnData.amount || '0';
      const affiliate = ipnData.affiliate || '';

      if (!customerEmail) {
        console.error("Explodely IPN missing customerEmail");
        return res.status(400).send("Missing customerEmail");
      }

      // Parse customer name
      const nameParts = customerName.split(' ');
      const firstName = nameParts[0] || '';
      const lastName = nameParts.slice(1).join(' ') || '';

      // Handle refunds
      if (ipnType === 'refund') {
        console.log(`Explodely processing refund for ${customerEmail}`);
        
        const tenantSlug = `explodely-${customerEmail.replace(/[^a-z0-9]/gi, '-').substring(0, 30)}`;
        const tenant = await storage.getTenantBySlug(tenantSlug);
        
        if (tenant) {
          await storage.updateTenant(tenant.id, { isPaid: false });
          console.log(`Explodely: Disabled access for ${customerEmail} due to refund`);
          
          await storage.createPurchase({
            transactionId: `${orderId}-refund`,
            email: customerEmail,
            firstName,
            lastName,
            productId: 'REFUND',
            productName: `Refund: ${productName}`,
            amount: `-${amount}`,
            tier: 'none',
            marketplace: 'explodely',
            status: 'refunded',
            ipnData: ipnData,
          });
        }
        
        return res.send("OK");
      }

      // Handle rebill cancellations
      if (ipnType === 'rebill_cancel' || ipnType === 'cancel') {
        const tenantSlug = `explodely-${customerEmail.replace(/[^a-z0-9]/gi, '-').substring(0, 30)}`;
        const tenant = await storage.getTenantBySlug(tenantSlug);
        if (tenant) {
          await storage.updateTenant(tenant.id, { isPaid: false });
          console.log(`Explodely: Disabled access for ${customerEmail} due to cancellation`);
        }
        return res.send("OK");
      }

      // Only process sale transactions
      if (ipnType !== 'sale' && ipnType !== 'rebill' && ipnType !== 'partial') {
        console.log(`Explodely skipping IPN type: ${ipnType}`);
        return res.send("OK");
      }

      // Check for duplicate transaction
      const existingPurchase = await storage.getPurchaseByTransactionId(orderId);
      if (existingPurchase) {
        console.log(`Explodely duplicate transaction: ${orderId}`);
        return res.send("OK");
      }

      // Determine product tier from product name
      let productKey = 'FE';
      const productNameLower = productName.toLowerCase();
      if (productNameLower.includes('oto1') || productNameLower.includes('white label')) {
        productKey = 'OTO1';
      } else if (productNameLower.includes('ds1')) {
        productKey = 'DS1';
      } else if (productNameLower.includes('oto2') || productNameLower.includes('premium')) {
        productKey = 'OTO2';
      } else if (productNameLower.includes('ds2')) {
        productKey = 'DS2';
      } else if (productNameLower.includes('oto3') || productNameLower.includes('agency')) {
        productKey = 'OTO3';
      } else if (productNameLower.includes('ds3')) {
        productKey = 'DS3';
      } else if (productNameLower.includes('bump') || productNameLower.includes('verse')) {
        productKey = 'BUMP';
      }

      const productInfo = EXPLODELY_PRODUCTS[productKey] || EXPLODELY_PRODUCTS['FE'];
      const purchasedTier = productInfo.tier;

      // Log the purchase
      await storage.createPurchase({
        transactionId: orderId,
        email: customerEmail,
        firstName,
        lastName,
        productId: productKey,
        productName: productInfo.name,
        amount,
        tier: purchasedTier,
        marketplace: 'explodely',
        status: 'completed',
        ipnData: ipnData,
      });

      // Create or update user account
      const userId = `explodely-${customerEmail.replace(/[^a-z0-9]/gi, '-')}`;
      await storage.upsertUser({
        id: userId,
        email: customerEmail,
        firstName,
        lastName,
        profileImageUrl: null,
      });

      // Check if tenant exists for this user, otherwise create one
      const tenantSlug = `explodely-${customerEmail.replace(/[^a-z0-9]/gi, '-').substring(0, 30)}`;
      let tenant = await storage.getTenantBySlug(tenantSlug);
      
      if (tenant) {
        // Upgrade tier if this purchase has a higher tier
        const currentPriority = TIER_PRIORITY[tenant.tier] || 1;
        const newPriority = TIER_PRIORITY[purchasedTier] || 1;
        if (newPriority > currentPriority) {
          console.log(`Upgrading Explodely tenant ${tenantSlug} from ${tenant.tier} to ${purchasedTier}`);
          await storage.updateTenant(tenant.id, { tier: purchasedTier as any });
        }
      } else {
        // Create new tenant
        tenant = await storage.createTenant({
          slug: tenantSlug,
          adminPin: Math.random().toString(36).substring(2, 8).toUpperCase(),
          isPaid: true,
          tier: purchasedTier,
        });

        // Create tenant settings
        await storage.createTenantSettings({
          tenantId: tenant.id,
          businessName: `${firstName}'s Faith Funnels`,
          supportEmail: customerEmail,
        });
      }

      console.log(`Explodely IPN processed: ${customerEmail} purchased ${productInfo.name} (${purchasedTier})`);
      
      // Explodely expects a simple "OK" response
      res.send("OK");

    } catch (error) {
      console.error("Explodely IPN error:", error);
      res.status(500).send("Error processing IPN");
    }
  });

  // Get purchases for admin view
  app.get('/api/purchases', isAuthenticated, async (req, res) => {
    try {
      const purchases = await storage.getPurchases();
      res.json(purchases);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch purchases" });
    }
  });

  app.get('/api/auth/user', isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user?.claims?.sub;
      if (!userId) {
        return res.status(401).json({ message: "User not authenticated" });
      }
      const user = await storage.getUser(userId);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      res.json(user);
    } catch (error) {
      console.error("Error fetching user:", error);
      res.status(500).json({ message: "Failed to fetch user" });
    }
  });
  app.get("/api/funnels", async (req, res) => {
    try {
      const funnels = await storage.getFunnels();
      res.json(funnels);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch funnels" });
    }
  });

  app.get("/api/funnels/:id", async (req, res) => {
    try {
      const funnel = await storage.getFunnel(req.params.id);
      if (!funnel) {
        return res.status(404).json({ error: "Funnel not found" });
      }
      res.json(funnel);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch funnel" });
    }
  });

  app.post("/api/funnels", async (req, res) => {
    try {
      const data = insertFunnelSchema.parse(req.body);
      const funnel = await storage.createFunnel(data);
      res.status(201).json(funnel);
    } catch (error) {
      res.status(400).json({ error: "Invalid funnel data" });
    }
  });

  app.patch("/api/funnels/:id", async (req, res) => {
    try {
      const funnel = await storage.updateFunnel(req.params.id, req.body);
      if (!funnel) {
        return res.status(404).json({ error: "Funnel not found" });
      }
      res.json(funnel);
    } catch (error) {
      res.status(500).json({ error: "Failed to update funnel" });
    }
  });

  app.delete("/api/funnels/:id", async (req, res) => {
    try {
      const deleted = await storage.deleteFunnel(req.params.id);
      if (!deleted) {
        return res.status(404).json({ error: "Funnel not found" });
      }
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ error: "Failed to delete funnel" });
    }
  });

  app.get("/api/verses", async (req, res) => {
    try {
      const funnelId = req.query.funnelId as string | undefined;
      const verses = await storage.getVerses(funnelId);
      res.json(verses);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch verses" });
    }
  });

  app.get("/api/verses/:id", async (req, res) => {
    try {
      const verse = await storage.getVerse(req.params.id);
      if (!verse) {
        return res.status(404).json({ error: "Verse not found" });
      }
      res.json(verse);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch verse" });
    }
  });

  app.post("/api/verses", async (req, res) => {
    try {
      const data = insertVerseSchema.parse(req.body);
      const verse = await storage.createVerse(data);
      res.status(201).json(verse);
    } catch (error) {
      res.status(400).json({ error: "Invalid verse data" });
    }
  });

  app.patch("/api/verses/:id", async (req, res) => {
    try {
      const verse = await storage.updateVerse(req.params.id, req.body);
      if (!verse) {
        return res.status(404).json({ error: "Verse not found" });
      }
      res.json(verse);
    } catch (error) {
      res.status(500).json({ error: "Failed to update verse" });
    }
  });

  app.delete("/api/verses/:id", async (req, res) => {
    try {
      const deleted = await storage.deleteVerse(req.params.id);
      if (!deleted) {
        return res.status(404).json({ error: "Verse not found" });
      }
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ error: "Failed to delete verse" });
    }
  });

  app.get("/api/themes", async (req, res) => {
    try {
      const funnelId = req.query.funnelId as string | undefined;
      const themes = await storage.getThemes(funnelId);
      res.json(themes);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch themes" });
    }
  });

  app.get("/api/themes/:id", async (req, res) => {
    try {
      const theme = await storage.getTheme(req.params.id);
      if (!theme) {
        return res.status(404).json({ error: "Theme not found" });
      }
      res.json(theme);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch theme" });
    }
  });

  app.post("/api/themes", async (req, res) => {
    try {
      const data = insertThemeSchema.parse(req.body);
      const theme = await storage.createTheme(data);
      res.status(201).json(theme);
    } catch (error) {
      res.status(400).json({ error: "Invalid theme data" });
    }
  });

  app.patch("/api/themes/:id", async (req, res) => {
    try {
      const theme = await storage.updateTheme(req.params.id, req.body);
      if (!theme) {
        return res.status(404).json({ error: "Theme not found" });
      }
      res.json(theme);
    } catch (error) {
      res.status(500).json({ error: "Failed to update theme" });
    }
  });

  app.delete("/api/themes/:id", async (req, res) => {
    try {
      const deleted = await storage.deleteTheme(req.params.id);
      if (!deleted) {
        return res.status(404).json({ error: "Theme not found" });
      }
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ error: "Failed to delete theme" });
    }
  });

  app.get("/api/tenants/slug/:slug", async (req, res) => {
    try {
      const tenant = await storage.getTenantBySlug(req.params.slug);
      if (!tenant) {
        return res.status(404).json({ error: "Tenant not found" });
      }
      const settings = await storage.getTenantSettings(tenant.id);
      res.json({ tenant, settings });
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch tenant" });
    }
  });

  app.post("/api/tenants", async (req, res) => {
    try {
      const tenantData = insertTenantSchema.parse(req.body);
      const tenant = await storage.createTenant(tenantData);
      
      const settingsData = req.body.settings || {};
      const settings = await storage.createTenantSettings({
        tenantId: tenant.id,
        ...settingsData
      });
      
      res.status(201).json({ tenant, settings });
    } catch (error) {
      res.status(400).json({ error: "Invalid tenant data" });
    }
  });

  app.patch("/api/tenants/slug/:slug/settings", async (req, res) => {
    try {
      const tenant = await storage.getTenantBySlug(req.params.slug);
      if (!tenant) {
        return res.status(404).json({ error: "Tenant not found" });
      }
      
      const tier = (tenant.tier || TIERS.BASIC) as TierType;
      const tierFeatures = TIER_FEATURES[tier];
      
      if (!tierFeatures.whiteLabel) {
        return res.status(403).json({ 
          error: "White Label features are not available on your current plan. Please upgrade to access this feature." 
        });
      }
      
      const settings = await storage.updateTenantSettings(tenant.id, req.body);
      res.json(settings);
    } catch (error) {
      res.status(500).json({ error: "Failed to update tenant settings" });
    }
  });

  app.post("/api/leads", async (req, res) => {
    try {
      const data = insertLeadSchema.parse(req.body);
      
      const existingLead = await storage.getLeadByEmail(data.email);
      if (existingLead) {
        return res.json(existingLead);
      }
      
      const lead = await storage.createLead(data);
      res.status(201).json(lead);
    } catch (error) {
      res.status(400).json({ error: "Invalid lead data" });
    }
  });

  app.post("/api/chat", async (req, res) => {
    try {
      const { email, message } = req.body;
      
      if (!email || !message) {
        return res.status(400).json({ error: "Email and message are required" });
      }
      
      const lead = await storage.getLeadByEmail(email);
      if (!lead) {
        return res.status(403).json({ error: "Please provide your email first to access the chatbot" });
      }
      
      const openai = new OpenAI({
        baseURL: process.env.AI_INTEGRATIONS_OPENAI_BASE_URL,
        apiKey: process.env.AI_INTEGRATIONS_OPENAI_API_KEY,
      });
      
      const systemPrompt = `You are a helpful AI assistant for Faith Funnels AI, a White Label SaaS platform for creating faith-based sales funnels.

LICENSING: Extended License for Agency/Service Provider Use
- Buyers CAN create funnels for clients as an agency or service provider
- Buyers CAN use this as part of client projects and charge for funnel creation services
- Buyers get white label rights to rebrand completely
- Buyers CANNOT resell the software dashboard access itself

Key Features:
- Build multi-stage funnels with Main Offers, OTOs (One-Time Offers), and Downsells
- Integrate Bible verses with customizable CTAs
- Apply custom theme colors and branding
- Export standalone HTML/ZIP packages ready for deployment
- White label customization (business name, logo, colors, custom domain)
- Perfect for agencies offering funnel creation services to clients

Pricing Tiers:
1. Basic ($17): 3 funnels, 10 exports, basic features, personal use only
2. White Label ($47 - OTO1): 10 funnels, 100 exports, white label branding, create funnels for clients
3. Premium Unlimited ($67 - OTO2): Unlimited funnels/exports, premium templates, unlimited client projects
4. Agency Package ($97 - OTO3): All features, unlimited clients, full white label rights for agencies

IMPORTANT CLARIFICATION:
- You create funnels FOR clients (as a service)
- You do NOT give clients access to the dashboard
- You do NOT resell the software itself
- You charge for your funnel creation services, not software licenses

Common Questions:
- Platform is sold on Warrior Plus and JVZoo
- Each buyer gets unique URL: faithfunnelsai.com/t/[unique-id]
- Exports include legal pages (Terms, Privacy, Refund Policy)
- Custom domain support available for white label users
- Perfect for agencies, freelancers, and service providers
- Support: support@faithfunnelsai.com

Be helpful, concise, and enthusiastic about Faith Funnels AI. Answer questions about features, pricing, agency use rights, and client services.`;

      const completion = await openai.chat.completions.create({
        model: "gpt-4o-mini",
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: message }
        ],
        temperature: 0.7,
        max_tokens: 500,
      });
      
      const reply = completion.choices[0].message.content;
      res.json({ reply });
    } catch (error) {
      console.error("Chat error:", error);
      res.status(500).json({ error: "Failed to process chat message" });
    }
  });

  app.post("/api/init/seed", async (req, res) => {
    try {
      await seedDemoData();
      res.json({ message: "Demo data seeded successfully" });
    } catch (error) {
      res.status(500).json({ error: "Failed to seed demo data" });
    }
  });

  app.post("/api/export/html", async (req, res) => {
    try {
      const { funnelId } = req.body;
      const funnel = await storage.getFunnel(funnelId);
      
      if (!funnel) {
        return res.status(404).json({ error: "Funnel not found" });
      }

      const verses = await storage.getVerses(funnelId);
      const themes = await storage.getThemes(funnelId);

      res.json({
        funnel,
        verses,
        themes,
      });
    } catch (error) {
      res.status(500).json({ error: "Failed to prepare export data" });
    }
  });

  const httpServer = createServer(app);
  
  seedDemoData().catch(console.error);
  
  return httpServer;
}
