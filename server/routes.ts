import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage, seedDemoData } from "./storage";
import { insertFunnelSchema, insertVerseSchema, insertThemeSchema, insertTenantSchema, insertTenantSettingsSchema, insertLeadSchema, TIER_FEATURES, TIERS, type TierType } from "@shared/schema";
import OpenAI from "openai";
import { setupAuth, isAuthenticated } from "./replitAuth";

export async function registerRoutes(app: Express): Promise<Server> {
  await setupAuth(app);

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
