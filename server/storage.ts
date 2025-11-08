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
    const defaultVerse1Id = randomUUID();
    const defaultVerse2Id = randomUUID();
    const defaultTheme1Id = randomUUID();
    const defaultTheme2Id = randomUUID();

    const defaultFunnel: Funnel = {
      id: defaultFunnelId,
      name: "Faith Journey Landing Page",
      stages: [
        {
          id: "stage-1",
          title: "Faith Journey Landing Page",
          type: "main" as const,
          hasVerse: true,
          verseId: defaultVerse1Id,
          themeId: defaultTheme1Id,
        },
        {
          id: "stage-2",
          title: "Premium Bible Study Course",
          type: "oto" as const,
          hasVerse: true,
          verseId: defaultVerse2Id,
          themeId: defaultTheme2Id,
        },
        {
          id: "stage-3",
          title: "Daily Devotional Downsell",
          type: "ds" as const,
          hasVerse: false,
          themeId: defaultTheme1Id,
        },
      ] as FunnelStage[],
    };

    const defaultVerse1: Verse = {
      id: defaultVerse1Id,
      funnelId: defaultFunnelId,
      verseText: "For I know the plans I have for you, declares the Lord, plans to prosper you and not to harm you, plans to give you hope and a future.",
      reference: "Jeremiah 29:11",
      ctaText: "Start Your Faith Journey",
      ctaUrl: "https://example.com/offer",
    };

    const defaultVerse2: Verse = {
      id: defaultVerse2Id,
      funnelId: defaultFunnelId,
      verseText: "Trust in the Lord with all your heart and lean not on your own understanding.",
      reference: "Proverbs 3:5",
      ctaText: "Enroll Now",
      ctaUrl: "https://example.com/oto1",
    };

    const defaultTheme1: Theme = {
      id: defaultTheme1Id,
      funnelId: defaultFunnelId,
      name: "Faith Harbor",
      primaryColor: "#6366f1",
      secondaryColor: "#8b5cf6",
      accentColor: "#ec4899",
      isDefault: true,
    };

    const defaultTheme2: Theme = {
      id: defaultTheme2Id,
      funnelId: defaultFunnelId,
      name: "Holy Spirit",
      primaryColor: "#3b82f6",
      secondaryColor: "#06b6d4",
      accentColor: "#10b981",
      isDefault: false,
    };

    this.funnels.set(defaultFunnelId, defaultFunnel);
    this.verses.set(defaultVerse1Id, defaultVerse1);
    this.verses.set(defaultVerse2Id, defaultVerse2);
    this.themes.set(defaultTheme1Id, defaultTheme1);
    this.themes.set(defaultTheme2Id, defaultTheme2);
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
    
    const updated = { ...funnel, ...update };
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
