import { sql } from "drizzle-orm";
import { pgTable, text, varchar, jsonb, boolean, timestamp, index, integer } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// Session storage table
export const sessions = pgTable(
  "sessions",
  {
    sid: varchar("sid").primaryKey(),
    sess: jsonb("sess").notNull(),
    expire: timestamp("expire").notNull(),
  },
  (table) => [index("IDX_session_expire").on(table.expire)],
);

// User storage table
export const users = pgTable("users", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  email: varchar("email").unique(),
  firstName: varchar("first_name"),
  lastName: varchar("last_name"),
  profileImageUrl: varchar("profile_image_url"),
  password: varchar("password"),
  isAdmin: boolean("is_admin").notNull().default(false),
  passwordResetToken: varchar("password_reset_token"),
  passwordResetExpiry: timestamp("password_reset_expiry"),
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
  emailProvider: text("email_provider").default(""),
  emailApiKey: text("email_api_key").default(""),
  emailListId: text("email_list_id").default(""),
  stripePublishableKey: text("stripe_publishable_key").default(""),
  stripeSecretKey: text("stripe_secret_key").default(""),
  paypalClientId: text("paypal_client_id").default(""),
  hasCompletedOnboarding: boolean("has_completed_onboarding").default(false),
  updatedAt: text("updated_at").notNull().default(sql`CURRENT_TIMESTAMP`),
});

// Analytics: Track funnel events (views, conversions, revenue)
export const funnelEvents = pgTable("funnel_events", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  funnelId: varchar("funnel_id").notNull().references(() => funnels.id, { onDelete: "cascade" }),
  stageId: varchar("stage_id"),
  eventType: text("event_type").notNull(), // 'view', 'conversion', 'click', 'purchase'
  variantId: varchar("variant_id"),
  visitorId: varchar("visitor_id"),
  amount: integer("amount").default(0), // For revenue tracking (in cents)
  metadata: jsonb("metadata").$type<Record<string, any>>(),
  createdAt: timestamp("created_at").defaultNow(),
});

// A/B Testing: Test definitions
export const abTests = pgTable("ab_tests", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  funnelId: varchar("funnel_id").notNull().references(() => funnels.id, { onDelete: "cascade" }),
  name: text("name").notNull(),
  status: text("status").notNull().default("draft"), // 'draft', 'active', 'paused', 'completed'
  testType: text("test_type").notNull(), // 'headline', 'cta', 'verse', 'layout'
  stageId: varchar("stage_id"),
  winningVariantId: varchar("winning_variant_id"),
  createdAt: timestamp("created_at").defaultNow(),
  endedAt: timestamp("ended_at"),
});

// A/B Testing: Variants for each test
export const abVariants = pgTable("ab_variants", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  testId: varchar("test_id").notNull().references(() => abTests.id, { onDelete: "cascade" }),
  name: text("name").notNull(),
  content: jsonb("content").notNull().$type<Record<string, any>>(), // Variant-specific content
  weight: integer("weight").notNull().default(50), // Traffic split percentage
  views: integer("views").notNull().default(0),
  conversions: integer("conversions").notNull().default(0),
  revenue: integer("revenue").notNull().default(0),
  createdAt: timestamp("created_at").defaultNow(),
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
export const insertFunnelEventSchema = createInsertSchema(funnelEvents).omit({ id: true, createdAt: true });
export const insertAbTestSchema = createInsertSchema(abTests).omit({ id: true, createdAt: true, endedAt: true });
export const insertAbVariantSchema = createInsertSchema(abVariants).omit({ id: true, createdAt: true });

export type InsertFunnel = z.infer<typeof insertFunnelSchema>;
export type InsertVerse = z.infer<typeof insertVerseSchema>;
export type InsertTheme = z.infer<typeof insertThemeSchema>;
export type InsertTenant = z.infer<typeof insertTenantSchema>;
export type InsertTenantSettings = z.infer<typeof insertTenantSettingsSchema>;
export type InsertLead = z.infer<typeof insertLeadSchema>;
export type InsertPurchase = z.infer<typeof insertPurchaseSchema>;
export type InsertFunnelEvent = z.infer<typeof insertFunnelEventSchema>;
export type InsertAbTest = z.infer<typeof insertAbTestSchema>;
export type InsertAbVariant = z.infer<typeof insertAbVariantSchema>;

export type Funnel = typeof funnels.$inferSelect;
export type Verse = typeof verses.$inferSelect;
export type Theme = typeof themes.$inferSelect;
export type Tenant = typeof tenants.$inferSelect;
export type TenantSettings = typeof tenantSettings.$inferSelect;
export type Lead = typeof leads.$inferSelect;
export type Purchase = typeof purchases.$inferSelect;
export type FunnelEvent = typeof funnelEvents.$inferSelect;
export type AbTest = typeof abTests.$inferSelect;
export type AbVariant = typeof abVariants.$inferSelect;

export const TIERS = {
  BASIC: "basic",
  WHITE_LABEL: "white_label",
  WHITE_LABEL_LITE: "white_label_lite",
  PREMIUM_LITE: "premium_lite",
  PREMIUM: "premium",
  RESELLER: "reseller",
  AGENCY_LITE: "agency_lite",
} as const;

export type TierType = typeof TIERS[keyof typeof TIERS];

export const TIER_FEATURES = {
  [TIERS.BASIC]: {
    name: "Basic",
    price: "Free",
    whiteLabel: false,
    maxFunnels: 3,
    maxExports: 10,
    basicTemplates: true,
    liteTemplates: false,
    premiumTemplates: false,
    resellRights: false,
  },
  [TIERS.WHITE_LABEL_LITE]: {
    name: "White Label Lite (DS1)",
    price: "$27",
    whiteLabel: true,
    maxFunnels: 5,
    maxExports: 50,
    basicTemplates: true,
    liteTemplates: false,
    premiumTemplates: false,
    resellRights: false,
  },
  [TIERS.WHITE_LABEL]: {
    name: "White Label (OTO1)",
    price: "$47",
    whiteLabel: true,
    maxFunnels: 10,
    maxExports: 100,
    basicTemplates: true,
    liteTemplates: false,
    premiumTemplates: false,
    resellRights: false,
  },
  [TIERS.PREMIUM_LITE]: {
    name: "Premium Lite (DS2)",
    price: "$37",
    whiteLabel: true,
    maxFunnels: 20,
    maxExports: 200,
    basicTemplates: true,
    liteTemplates: true,
    premiumTemplates: false,
    resellRights: false,
  },
  [TIERS.PREMIUM]: {
    name: "Premium Templates (OTO2)",
    price: "$67",
    whiteLabel: true,
    maxFunnels: -1,
    maxExports: -1,
    basicTemplates: true,
    liteTemplates: true,
    premiumTemplates: true,
    resellRights: false,
  },
  [TIERS.AGENCY_LITE]: {
    name: "Agency Lite (DS3)",
    price: "$47",
    whiteLabel: true,
    maxFunnels: -1,
    maxExports: -1,
    basicTemplates: true,
    liteTemplates: true,
    premiumTemplates: false,
    resellRights: false,
  },
  [TIERS.RESELLER]: {
    name: "Reseller Rights (OTO3)",
    price: "$97",
    whiteLabel: true,
    maxFunnels: -1,
    maxExports: -1,
    basicTemplates: true,
    liteTemplates: true,
    premiumTemplates: true,
    resellRights: true,
  },
} as const;
