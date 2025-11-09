import { 
  type Funnel, 
  type InsertFunnel,
  type Verse,
  type InsertVerse,
  type Theme,
  type InsertTheme,
  type FunnelStage
} from "@shared/schema";
import { randomUUID } from "crypto";

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
}

export class MemStorage implements IStorage {
  private funnels: Map<string, Funnel>;
  private verses: Map<string, Verse>;
  private themes: Map<string, Theme>;

  constructor() {
    this.funnels = new Map();
    this.verses = new Map();
    this.themes = new Map();
    
    this.seedData();
  }

  private seedData() {
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

    this.funnels.set(defaultFunnelId, defaultFunnel);
    this.verses.set(verse1Id, verse1);
    this.verses.set(verse2Id, verse2);
    this.verses.set(verse3Id, verse3);
    this.verses.set(verse4Id, verse4);
    this.verses.set(verse5Id, verse5);
    this.verses.set(verse6Id, verse6);
    this.themes.set(theme1Id, theme1);
    this.themes.set(theme2Id, theme2);
  }

  async getFunnels(): Promise<Funnel[]> {
    return Array.from(this.funnels.values());
  }

  async getFunnel(id: string): Promise<Funnel | undefined> {
    return this.funnels.get(id);
  }

  async createFunnel(insertFunnel: InsertFunnel): Promise<Funnel> {
    const id = randomUUID();
    const funnel: Funnel = { 
      id,
      name: insertFunnel.name,
      stages: (insertFunnel.stages as FunnelStage[]) || [],
    };
    this.funnels.set(id, funnel);
    return funnel;
  }

  async updateFunnel(id: string, update: Partial<InsertFunnel>): Promise<Funnel | undefined> {
    const funnel = this.funnels.get(id);
    if (!funnel) return undefined;
    
    const updated: Funnel = { 
      ...funnel, 
      ...update,
      stages: (update.stages as FunnelStage[]) ?? funnel.stages
    };
    this.funnels.set(id, updated);
    return updated;
  }

  async deleteFunnel(id: string): Promise<boolean> {
    const deleted = this.funnels.delete(id);
    if (deleted) {
      Array.from(this.verses.entries())
        .filter(([, verse]) => verse.funnelId === id)
        .forEach(([verseId]) => this.verses.delete(verseId));
      
      Array.from(this.themes.entries())
        .filter(([, theme]) => theme.funnelId === id)
        .forEach(([themeId]) => this.themes.delete(themeId));
    }
    return deleted;
  }

  async getVerses(funnelId?: string): Promise<Verse[]> {
    const verses = Array.from(this.verses.values());
    if (funnelId) {
      return verses.filter(v => v.funnelId === funnelId);
    }
    return verses;
  }

  async getVerse(id: string): Promise<Verse | undefined> {
    return this.verses.get(id);
  }

  async createVerse(insertVerse: InsertVerse): Promise<Verse> {
    const id = randomUUID();
    const verse: Verse = { 
      id,
      funnelId: insertVerse.funnelId ?? null,
      verseText: insertVerse.verseText,
      reference: insertVerse.reference,
      ctaText: insertVerse.ctaText ?? "Learn More",
      ctaUrl: insertVerse.ctaUrl ?? "",
    };
    this.verses.set(id, verse);
    return verse;
  }

  async updateVerse(id: string, update: Partial<InsertVerse>): Promise<Verse | undefined> {
    const verse = this.verses.get(id);
    if (!verse) return undefined;
    
    const updated = { ...verse, ...update };
    this.verses.set(id, updated);
    return updated;
  }

  async deleteVerse(id: string): Promise<boolean> {
    return this.verses.delete(id);
  }

  async getThemes(funnelId?: string): Promise<Theme[]> {
    const themes = Array.from(this.themes.values());
    if (funnelId) {
      return themes.filter(t => t.funnelId === funnelId);
    }
    return themes;
  }

  async getTheme(id: string): Promise<Theme | undefined> {
    return this.themes.get(id);
  }

  async createTheme(insertTheme: InsertTheme): Promise<Theme> {
    const id = randomUUID();
    const theme: Theme = { 
      id,
      funnelId: insertTheme.funnelId ?? null,
      name: insertTheme.name,
      primaryColor: insertTheme.primaryColor ?? "#6366f1",
      secondaryColor: insertTheme.secondaryColor ?? "#8b5cf6",
      accentColor: insertTheme.accentColor ?? "#ec4899",
      isDefault: insertTheme.isDefault ?? false,
    };
    this.themes.set(id, theme);
    return theme;
  }

  async updateTheme(id: string, update: Partial<InsertTheme>): Promise<Theme | undefined> {
    const theme = this.themes.get(id);
    if (!theme) return undefined;
    
    const updated = { ...theme, ...update };
    this.themes.set(id, updated);
    return updated;
  }

  async deleteTheme(id: string): Promise<boolean> {
    return this.themes.delete(id);
  }
}

export const storage = new MemStorage();
