import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertFunnelSchema, insertVerseSchema, insertThemeSchema } from "@shared/schema";

export async function registerRoutes(app: Express): Promise<Server> {
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
  return httpServer;
}
