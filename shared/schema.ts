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

export type InsertFunnel = z.infer<typeof insertFunnelSchema>;
export type InsertVerse = z.infer<typeof insertVerseSchema>;
export type InsertTheme = z.infer<typeof insertThemeSchema>;

export type Funnel = typeof funnels.$inferSelect;
export type Verse = typeof verses.$inferSelect;
export type Theme = typeof themes.$inferSelect;
