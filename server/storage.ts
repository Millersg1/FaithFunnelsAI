import { 
  type Funnel, 
  type InsertFunnel,
  type Verse,
  type InsertVerse,
  type Theme,
  type InsertTheme,
  type Tenant,
  type InsertTenant,
  type TenantSettings,
  type InsertTenantSettings,
  type FunnelStage,
  funnels,
  verses,
  themes,
  tenants,
  tenantSettings
} from "@shared/schema";
import { randomUUID } from "crypto";
import { db } from "./db";
import { eq } from "drizzle-orm";

export interface IStorage {
  getFunnels(): Promise<Funnel[]>;
  getFunnel(id: string): Promise<Funnel | undefined>;
  createFunnel(funnel: InsertFunnel): Promise<Funnel>;
  updateFunnel(id: string, funnel: Partial<InsertFunnel>): Promise<Funnel | undefined>;
  deleteFunnel(id: string): Promise<boolean>;
  
  getVerses(funnelId?: string): Promise<Verse[]>;
  getVerse(id: string): Promise<Verse | undefined>;
  createVerse(verse: InsertVerse): Promise<Verse>;
  updateVerse(id: string, verse: Partial<InsertVerse>): Promise<Verse | undefined>;
  deleteVerse(id: string): Promise<boolean>;
  
  getThemes(funnelId?: string): Promise<Theme[]>;
  getTheme(id: string): Promise<Theme | undefined>;
  createTheme(theme: InsertTheme): Promise<Theme>;
  updateTheme(id: string, theme: Partial<InsertTheme>): Promise<Theme | undefined>;
  deleteTheme(id: string): Promise<boolean>;
  
  getTenantBySlug(slug: string): Promise<Tenant | undefined>;
  createTenant(tenant: InsertTenant): Promise<Tenant>;
  
  getTenantSettings(tenantId: string): Promise<TenantSettings | undefined>;
  createTenantSettings(settings: InsertTenantSettings): Promise<TenantSettings>;
  updateTenantSettings(tenantId: string, settings: Partial<InsertTenantSettings>): Promise<TenantSettings | undefined>;
}

export class PgStorage implements IStorage {
  async getFunnels(): Promise<Funnel[]> {
    return await db.select().from(funnels);
  }

  async getFunnel(id: string): Promise<Funnel | undefined> {
    const result = await db.select().from(funnels).where(eq(funnels.id, id));
    return result[0];
  }

  async createFunnel(insertFunnel: InsertFunnel): Promise<Funnel> {
    const result = await db.insert(funnels).values({
      ...insertFunnel,
      stages: (insertFunnel.stages as FunnelStage[]) || []
    }).returning();
    return result[0];
  }

  async updateFunnel(id: string, update: Partial<InsertFunnel>): Promise<Funnel | undefined> {
    const updateData: any = { ...update };
    if (update.stages) {
      updateData.stages = update.stages as FunnelStage[];
    }
    const result = await db.update(funnels).set(updateData).where(eq(funnels.id, id)).returning();
    return result[0];
  }

  async deleteFunnel(id: string): Promise<boolean> {
    const result = await db.delete(funnels).where(eq(funnels.id, id));
    return result.rowCount ? result.rowCount > 0 : false;
  }

  async getVerses(funnelId?: string): Promise<Verse[]> {
    if (funnelId) {
      return await db.select().from(verses).where(eq(verses.funnelId, funnelId));
    }
    return await db.select().from(verses);
  }

  async getVerse(id: string): Promise<Verse | undefined> {
    const result = await db.select().from(verses).where(eq(verses.id, id));
    return result[0];
  }

  async createVerse(insertVerse: InsertVerse): Promise<Verse> {
    const result = await db.insert(verses).values(insertVerse).returning();
    return result[0];
  }

  async updateVerse(id: string, update: Partial<InsertVerse>): Promise<Verse | undefined> {
    const result = await db.update(verses).set(update).where(eq(verses.id, id)).returning();
    return result[0];
  }

  async deleteVerse(id: string): Promise<boolean> {
    const result = await db.delete(verses).where(eq(verses.id, id));
    return result.rowCount ? result.rowCount > 0 : false;
  }

  async getThemes(funnelId?: string): Promise<Theme[]> {
    if (funnelId) {
      return await db.select().from(themes).where(eq(themes.funnelId, funnelId));
    }
    return await db.select().from(themes);
  }

  async getTheme(id: string): Promise<Theme | undefined> {
    const result = await db.select().from(themes).where(eq(themes.id, id));
    return result[0];
  }

  async createTheme(insertTheme: InsertTheme): Promise<Theme> {
    const result = await db.insert(themes).values(insertTheme).returning();
    return result[0];
  }

  async updateTheme(id: string, update: Partial<InsertTheme>): Promise<Theme | undefined> {
    const result = await db.update(themes).set(update).where(eq(themes.id, id)).returning();
    return result[0];
  }

  async deleteTheme(id: string): Promise<boolean> {
    const result = await db.delete(themes).where(eq(themes.id, id));
    return result.rowCount ? result.rowCount > 0 : false;
  }

  async getTenantBySlug(slug: string): Promise<Tenant | undefined> {
    const result = await db.select().from(tenants).where(eq(tenants.slug, slug));
    return result[0];
  }

  async createTenant(insertTenant: InsertTenant): Promise<Tenant> {
    const result = await db.insert(tenants).values(insertTenant).returning();
    return result[0];
  }

  async getTenantSettings(tenantId: string): Promise<TenantSettings | undefined> {
    const result = await db.select().from(tenantSettings).where(eq(tenantSettings.tenantId, tenantId));
    return result[0];
  }

  async createTenantSettings(insertSettings: InsertTenantSettings): Promise<TenantSettings> {
    const result = await db.insert(tenantSettings).values(insertSettings).returning();
    return result[0];
  }

  async updateTenantSettings(tenantId: string, update: Partial<InsertTenantSettings>): Promise<TenantSettings | undefined> {
    const result = await db.update(tenantSettings).set(update).where(eq(tenantSettings.tenantId, tenantId)).returning();
    return result[0];
  }
}

export const storage = new PgStorage();

export async function seedDemoData() {
  const existingFunnels = await storage.getFunnels();
  if (existingFunnels.length > 0) {
    return;
  }

  const defaultFunnelId = randomUUID();
  const verse1Id = randomUUID();
  const verse2Id = randomUUID();
  const verse3Id = randomUUID();
  const verse4Id = randomUUID();
  const verse5Id = randomUUID();
  const verse6Id = randomUUID();
  const theme1Id = randomUUID();
  const theme2Id = randomUUID();

    const defaultFunnel: Funnel = {
      id: defaultFunnelId,
      name: "Faith Funnels AI - Warrior Plus Complete Funnel",
      stages: [
        {
          id: "stage-1",
          title: "Faith Funnels AI - Main Offer",
          type: "main" as const,
          hasVerse: true,
          verseId: verse1Id,
          themeId: theme1Id,
          imageUrl: "/assets/stock_images/professional_dashboa_f3c6d1ad.jpg",
        },
        {
          id: "stage-2",
          title: "OTO 1: Premium Templates Pack",
          type: "oto" as const,
          hasVerse: true,
          verseId: verse2Id,
          themeId: theme1Id,
          imageUrl: "/assets/stock_images/premium_templates_de_14a7226f.jpg",
        },
        {
          id: "stage-3",
          title: "OTO 2: Done-For-You Setup Service",
          type: "oto" as const,
          hasVerse: true,
          verseId: verse3Id,
          themeId: theme2Id,
          imageUrl: "/assets/stock_images/professional_service_875692b2.jpg",
        },
        {
          id: "stage-4",
          title: "OTO 3: Advanced Training & Coaching",
          type: "oto" as const,
          hasVerse: true,
          verseId: verse4Id,
          themeId: theme1Id,
          imageUrl: "/assets/stock_images/online_video_trainin_dc44bbe9.jpg",
        },
        {
          id: "stage-5",
          title: "Downsell 1: Starter Templates (Lite)",
          type: "ds" as const,
          hasVerse: true,
          verseId: verse5Id,
          themeId: theme1Id,
          imageUrl: "/assets/stock_images/startup_beginners_gu_49bdb022.jpg",
        },
        {
          id: "stage-6",
          title: "Downsell 2: DIY Setup Guide",
          type: "ds" as const,
          hasVerse: true,
          verseId: verse6Id,
          themeId: theme2Id,
          imageUrl: "/assets/stock_images/diy_guide_manual_ins_8cb09d46.jpg",
        },
      ] as FunnelStage[],
    };

    const verse1: Verse = {
      id: verse1Id,
      funnelId: defaultFunnelId,
      verseText: "For I know the plans I have for you, declares the Lord, plans to prosper you and not to harm you, plans to give you hope and a future.",
      reference: "Jeremiah 29:11",
      ctaText: "Get Faith Funnels AI Now",
      ctaUrl: "https://warriorplus.com/o2/buy/your-product-id",
    };

    const verse2: Verse = {
      id: verse2Id,
      funnelId: defaultFunnelId,
      verseText: "Whatever you do, work at it with all your heart, as working for the Lord, not for human masters.",
      reference: "Colossians 3:23",
      ctaText: "Yes! Add Premium Templates",
      ctaUrl: "https://warriorplus.com/o2/buy/your-oto1-id",
    };

    const verse3: Verse = {
      id: verse3Id,
      funnelId: defaultFunnelId,
      verseText: "Commit to the Lord whatever you do, and he will establish your plans.",
      reference: "Proverbs 16:3",
      ctaText: "Yes! I Want Done-For-You Setup",
      ctaUrl: "https://warriorplus.com/o2/buy/your-oto2-id",
    };

    const verse4: Verse = {
      id: verse4Id,
      funnelId: defaultFunnelId,
      verseText: "Iron sharpens iron, and one man sharpens another.",
      reference: "Proverbs 27:17",
      ctaText: "Add Training & Coaching",
      ctaUrl: "https://warriorplus.com/o2/buy/your-oto3-id",
    };

    const verse5: Verse = {
      id: verse5Id,
      funnelId: defaultFunnelId,
      verseText: "Trust in the Lord with all your heart and lean not on your own understanding.",
      reference: "Proverbs 3:5",
      ctaText: "Get Starter Templates Instead",
      ctaUrl: "https://warriorplus.com/o2/buy/your-ds1-id",
    };

    const verse6: Verse = {
      id: verse6Id,
      funnelId: defaultFunnelId,
      verseText: "I can do all things through Christ who strengthens me.",
      reference: "Philippians 4:13",
      ctaText: "Get DIY Setup Guide",
      ctaUrl: "https://warriorplus.com/o2/buy/your-ds2-id",
    };

    const theme1: Theme = {
      id: theme1Id,
      funnelId: defaultFunnelId,
      name: "Faith Harbor",
      primaryColor: "#6366f1",
      secondaryColor: "#8b5cf6",
      accentColor: "#ec4899",
      isDefault: true,
    };

    const theme2: Theme = {
      id: theme2Id,
      funnelId: defaultFunnelId,
      name: "Holy Spirit",
      primaryColor: "#3b82f6",
      secondaryColor: "#06b6d4",
      accentColor: "#10b981",
      isDefault: false,
    };

  await db.insert(funnels).values(defaultFunnel);
  await db.insert(verses).values([verse1, verse2, verse3, verse4, verse5, verse6]);
  await db.insert(themes).values([theme1, theme2]);
  
  const existingDemoTenant = await storage.getTenantBySlug('demo');
  if (!existingDemoTenant) {
    const demoTenantId = randomUUID();
    const demoTenant = {
      id: demoTenantId,
      slug: 'demo',
      tier: 'WHITE_LABEL' as const,
      isActive: true,
    };
    
    const demoSettings = {
      tenantId: demoTenantId,
      businessName: 'Faith Funnels AI Demo',
      tagline: 'Experience the Power of Faith-Based Marketing',
      supportEmail: 'demo@faithfunnelsai.com',
      primaryColor: '#6366f1',
      secondaryColor: '#8b5cf6',
      accentColor: '#ec4899',
    };
    
    await db.insert(tenants).values(demoTenant);
    await db.insert(tenantSettings).values(demoSettings);
  }
}
