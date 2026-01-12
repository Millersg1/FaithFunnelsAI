import { sql } from "drizzle-orm";
import { pgTable, text, varchar, jsonb, boolean, timestamp, index } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// Session storage table for Replit Auth
export const sessions = pgTable(
  "sessions",
  {
    sid: varchar("sid").primaryKey(),
    sess: jsonb("sess").notNull(),
    expire: timestamp("expire").notNull(),
  },
  (table) => [index("IDX_session_expire").on(table.expire)],
);

// User storage table for Replit Auth
export const users = pgTable("users", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  email: varchar("email").unique(),
  firstName: varchar("first_name"),
  lastName: varchar("last_name"),
  profileImageUrl: varchar("profile_image_url"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export type UpsertUser = typeof users.$inferInsert;
export type User = typeof users.$inferSelect;

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

export const purchases = pgTable("purchases", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  transactionId: varchar("transaction_id").notNull().unique(),
  email: text("email").notNull(),
  firstName: text("first_name"),
  lastName: text("last_name"),
  productId: varchar("product_id").notNull(),
  productName: text("product_name").notNull(),
  amount: text("amount").notNull(),
  tier: text("tier").notNull().default("basic"),
  marketplace: text("marketplace").notNull().default("jvzoo"),
  status: text("status").notNull().default("completed"),
  ipnData: jsonb("ipn_data"),
  createdAt: timestamp("created_at").defaultNow(),
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

export const templates = pgTable("templates", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  name: text("name").notNull(),
  description: text("description").notNull(),
  category: text("category").notNull(),
  tier: text("tier").notNull().default("premium"),
  stages: jsonb("stages").notNull().$type<FunnelStage[]>().default([]),
  verse: jsonb("verse").$type<{ text: string; reference: string; ctaText: string }>(),
  theme: jsonb("theme").$type<{ primary: string; secondary: string; accent: string }>(),
  thumbnailUrl: text("thumbnail_url"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const insertTemplateSchema = createInsertSchema(templates).omit({ id: true, createdAt: true });
export type InsertTemplate = z.infer<typeof insertTemplateSchema>;
export type Template = typeof templates.$inferSelect;

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

export const insertPurchaseSchema = createInsertSchema(purchases).omit({ id: true, createdAt: true });

export type InsertFunnel = z.infer<typeof insertFunnelSchema>;
export type InsertVerse = z.infer<typeof insertVerseSchema>;
export type InsertTheme = z.infer<typeof insertThemeSchema>;
export type InsertTenant = z.infer<typeof insertTenantSchema>;
export type InsertTenantSettings = z.infer<typeof insertTenantSettingsSchema>;
export type InsertLead = z.infer<typeof insertLeadSchema>;
export type InsertPurchase = z.infer<typeof insertPurchaseSchema>;

export type Funnel = typeof funnels.$inferSelect;
export type Verse = typeof verses.$inferSelect;
export type Theme = typeof themes.$inferSelect;
export type Tenant = typeof tenants.$inferSelect;
export type TenantSettings = typeof tenantSettings.$inferSelect;
export type Lead = typeof leads.$inferSelect;
export type Purchase = typeof purchases.$inferSelect;

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
