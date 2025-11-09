import { sql } from "drizzle-orm";
import { pgTable, text, varchar, jsonb, boolean } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const funnels = pgTable("funnels", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  name: text("name").notNull(),
  stages: jsonb("stages").notNull().$type<FunnelStage[]>().default([]),
});

export const verses = pgTable("verses", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  funnelId: varchar("funnel_id").references(() => funnels.id, { onDelete: "cascade" }),
  verseText: text("verse_text").notNull(),
  reference: text("reference").notNull(),
  ctaText: text("cta_text").notNull().default("Learn More"),
  ctaUrl: text("cta_url").notNull().default(""),
});

export const themes = pgTable("themes", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  funnelId: varchar("funnel_id").references(() => funnels.id, { onDelete: "cascade" }),
  name: text("name").notNull(),
  primaryColor: text("primary_color").notNull().default("#6366f1"),
  secondaryColor: text("secondary_color").notNull().default("#8b5cf6"),
  accentColor: text("accent_color").notNull().default("#ec4899"),
  isDefault: boolean("is_default").notNull().default(false),
});

export const tenants = pgTable("tenants", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  slug: text("slug").notNull().unique(),
  adminPin: text("admin_pin"),
  isPaid: boolean("is_paid").notNull().default(false),
  tier: text("tier").notNull().default("basic"),
  createdAt: text("created_at").notNull().default(sql`CURRENT_TIMESTAMP`),
});

export const tenantSettings = pgTable("tenant_settings", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  tenantId: varchar("tenant_id").notNull().references(() => tenants.id, { onDelete: "cascade" }),
  businessName: text("business_name").notNull().default("Faith Funnels AI"),
  tagline: text("tagline").notNull().default("Build Professional Faith-Based Sales Funnels"),
  logoUrl: text("logo_url").notNull().default(""),
  customDomain: text("custom_domain").notNull().default(""),
  supportEmail: text("support_email").notNull().default("support@faithfunnelsai.com"),
  primaryColor: text("primary_color").notNull().default("#6366f1"),
  secondaryColor: text("secondary_color").notNull().default("#8b5cf6"),
  accentColor: text("accent_color").notNull().default("#ec4899"),
  updatedAt: text("updated_at").notNull().default(sql`CURRENT_TIMESTAMP`),
});

export const leads = pgTable("leads", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  name: text("name").notNull(),
  email: text("email").notNull().unique(),
  source: text("source").notNull().default("landing"),
  createdAt: text("created_at").notNull().default(sql`CURRENT_TIMESTAMP`),
});

export type FunnelStage = {
  id: string;
  title: string;
  type: "main" | "oto" | "ds";
  hasVerse: boolean;
  verseId?: string;
  themeId?: string;
  content?: string;
  imageUrl?: string;
};

export const insertFunnelSchema = createInsertSchema(funnels).omit({ id: true });
export const insertVerseSchema = createInsertSchema(verses).omit({ id: true });
export const insertThemeSchema = createInsertSchema(themes).omit({ id: true });
export const insertTenantSchema = createInsertSchema(tenants).omit({ id: true, createdAt: true });
export const insertTenantSettingsSchema = createInsertSchema(tenantSettings).omit({ id: true, updatedAt: true });
export const insertLeadSchema = createInsertSchema(leads).omit({ id: true, createdAt: true }).extend({
  name: z.string().min(1, "Name is required").max(100, "Name is too long"),
  email: z.string().email("Invalid email address").toLowerCase(),
  source: z.string().min(1, "Source is required"),
});

export type InsertFunnel = z.infer<typeof insertFunnelSchema>;
export type InsertVerse = z.infer<typeof insertVerseSchema>;
export type InsertTheme = z.infer<typeof insertThemeSchema>;
export type InsertTenant = z.infer<typeof insertTenantSchema>;
export type InsertTenantSettings = z.infer<typeof insertTenantSettingsSchema>;
export type InsertLead = z.infer<typeof insertLeadSchema>;

export type Funnel = typeof funnels.$inferSelect;
export type Verse = typeof verses.$inferSelect;
export type Theme = typeof themes.$inferSelect;
export type Tenant = typeof tenants.$inferSelect;
export type TenantSettings = typeof tenantSettings.$inferSelect;
export type Lead = typeof leads.$inferSelect;

export const TIERS = {
  BASIC: "basic",
  WHITE_LABEL: "white_label",
  PREMIUM: "premium",
  RESELLER: "reseller",
} as const;

export type TierType = typeof TIERS[keyof typeof TIERS];

export const TIER_FEATURES = {
  [TIERS.BASIC]: {
    name: "Basic",
    price: "Free",
    whiteLabel: false,
    maxFunnels: 3,
    maxExports: 10,
    premiumTemplates: false,
    resellRights: false,
  },
  [TIERS.WHITE_LABEL]: {
    name: "White Label (OTO1)",
    price: "$47",
    whiteLabel: true,
    maxFunnels: 10,
    maxExports: 100,
    premiumTemplates: false,
    resellRights: false,
  },
  [TIERS.PREMIUM]: {
    name: "Premium Templates (OTO2)",
    price: "$67",
    whiteLabel: true,
    maxFunnels: -1,
    maxExports: -1,
    premiumTemplates: true,
    resellRights: false,
  },
  [TIERS.RESELLER]: {
    name: "Reseller Rights (OTO3)",
    price: "$97",
    whiteLabel: true,
    maxFunnels: -1,
    maxExports: -1,
    premiumTemplates: true,
    resellRights: true,
  },
} as const;
