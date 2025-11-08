import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ColorPicker } from "@/components/color-picker";
import { Palette, Save } from "lucide-react";

export default function ThemeSettings() {
  const [primaryColor, setPrimaryColor] = useState("#6366f1");
  const [secondaryColor, setSecondaryColor] = useState("#8b5cf6");
  const [accentColor, setAccentColor] = useState("#ec4899");

  const handleSaveTheme = () => {
    console.log("Saving theme:", { primaryColor, secondaryColor, accentColor });
  };

  const presetThemes = [
    { name: "Faith Harbor", primary: "#6366f1", secondary: "#8b5cf6", accent: "#ec4899" },
    { name: "Holy Spirit", primary: "#3b82f6", secondary: "#06b6d4", accent: "#10b981" },
    { name: "Grace", primary: "#8b5cf6", secondary: "#a855f7", accent: "#d946ef" },
    { name: "Blessed", primary: "#f59e0b", secondary: "#f97316", accent: "#ef4444" },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-semibold">Theme Settings</h1>
        <p className="text-muted-foreground">Customize colors for your faith-based funnels</p>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Custom Colors</CardTitle>
              <CardDescription>
                Choose colors that represent your ministry's brand
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <ColorPicker
                label="Primary Color"
                color={primaryColor}
                onChange={setPrimaryColor}
              />
              <ColorPicker
                label="Secondary Color"
                color={secondaryColor}
                onChange={setSecondaryColor}
              />
              <ColorPicker
                label="Accent Color"
                color={accentColor}
                onChange={setAccentColor}
              />

              <Button className="w-full" onClick={handleSaveTheme} data-testid="button-save-theme">
                <Save className="mr-2 h-4 w-4" />
                Save Theme
              </Button>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Preview</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div 
                className="h-24 rounded-md p-4 text-white"
                style={{ backgroundColor: primaryColor }}
              >
                <p className="font-medium">Primary Color</p>
                <p className="text-sm opacity-90">Headlines & CTAs</p>
              </div>
              <div 
                className="h-24 rounded-md p-4 text-white"
                style={{ backgroundColor: secondaryColor }}
              >
                <p className="font-medium">Secondary Color</p>
                <p className="text-sm opacity-90">Subheadings</p>
              </div>
              <div 
                className="h-24 rounded-md p-4 text-white"
                style={{ backgroundColor: accentColor }}
              >
                <p className="font-medium">Accent Color</p>
                <p className="text-sm opacity-90">Highlights</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Preset Themes</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              {presetThemes.map((theme) => (
                <Button
                  key={theme.name}
                  variant="outline"
                  className="w-full justify-start"
                  onClick={() => {
                    console.log("Loading preset theme:", theme.name);
                    setPrimaryColor(theme.primary);
                    setSecondaryColor(theme.secondary);
                    setAccentColor(theme.accent);
                  }}
                  data-testid={`button-preset-theme-${theme.name.toLowerCase().replace(/\s+/g, '-')}`}
                >
                  <div className="flex items-center gap-2">
                    <div className="flex gap-1">
                      <div className="h-4 w-4 rounded" style={{ backgroundColor: theme.primary }} />
                      <div className="h-4 w-4 rounded" style={{ backgroundColor: theme.secondary }} />
                      <div className="h-4 w-4 rounded" style={{ backgroundColor: theme.accent }} />
                    </div>
                    <span>{theme.name}</span>
                  </div>
                </Button>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
