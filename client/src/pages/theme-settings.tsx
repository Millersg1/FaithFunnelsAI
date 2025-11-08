import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ColorPicker } from "@/components/color-picker";
import { Save } from "lucide-react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import type { Theme, Funnel } from "@shared/schema";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

export default function ThemeSettings() {
  const [themeName, setThemeName] = useState("");
  const [primaryColor, setPrimaryColor] = useState("#6366f1");
  const [secondaryColor, setSecondaryColor] = useState("#8b5cf6");
  const [accentColor, setAccentColor] = useState("#ec4899");
  const [selectedFunnelId, setSelectedFunnelId] = useState<string | null>(null);
  const { toast } = useToast();

  const { data: themes } = useQuery<Theme[]>({
    queryKey: ["/api/themes"],
  });

  const { data: funnels } = useQuery<Funnel[]>({
    queryKey: ["/api/funnels"],
  });

  const createMutation = useMutation({
    mutationFn: async (themeData: { name: string; primaryColor: string; secondaryColor: string; accentColor: string; funnelId: string | null; isDefault: boolean }) => {
      const response = await apiRequest("POST", "/api/themes", themeData);
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/themes"] });
      toast({
        title: "Theme saved",
        description: "Your theme has been saved successfully.",
      });
      setThemeName("");
      setPrimaryColor("#6366f1");
      setSecondaryColor("#8b5cf6");
      setAccentColor("#ec4899");
      setSelectedFunnelId(null);
    },
  });

  const handleSaveTheme = () => {
    if (!themeName.trim()) {
      toast({
        title: "Theme name required",
        description: "Please enter a name for your theme.",
        variant: "destructive",
      });
      return;
    }

    createMutation.mutate({
      name: themeName,
      primaryColor,
      secondaryColor,
      accentColor,
      funnelId: selectedFunnelId,
      isDefault: false,
    });
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
              <CardTitle>Custom Theme</CardTitle>
              <CardDescription>
                Create a new theme for your ministry's brand
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="theme-name">Theme Name</Label>
                <Input
                  id="theme-name"
                  placeholder="e.g., My Church Theme"
                  value={themeName}
                  onChange={(e) => setThemeName(e.target.value)}
                  data-testid="input-theme-name"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="funnel-select">Assign to Funnel (Optional)</Label>
                <Select value={selectedFunnelId || "none"} onValueChange={(value) => setSelectedFunnelId(value === "none" ? null : value)}>
                  <SelectTrigger id="funnel-select" data-testid="select-funnel">
                    <SelectValue placeholder="Choose a funnel" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="none">No funnel (Global)</SelectItem>
                    {funnels?.map((funnel) => (
                      <SelectItem key={funnel.id} value={funnel.id}>
                        {funnel.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

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

              <Button 
                className="w-full" 
                onClick={handleSaveTheme} 
                disabled={createMutation.isPending}
                data-testid="button-save-theme"
              >
                <Save className="mr-2 h-4 w-4" />
                {createMutation.isPending ? "Saving..." : "Save Theme"}
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
                    setPrimaryColor(theme.primary);
                    setSecondaryColor(theme.secondary);
                    setAccentColor(theme.accent);
                    setThemeName(theme.name);
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

          {themes && themes.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle>Saved Themes ({themes.length})</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 max-h-64 overflow-y-auto">
                {themes.map((theme) => (
                  <div key={theme.id} className="p-3 rounded-lg border bg-muted/50">
                    <p className="font-medium text-sm">{theme.name}</p>
                    <div className="flex gap-1 mt-2">
                      <div className="h-6 w-6 rounded" style={{ backgroundColor: theme.primaryColor }} />
                      <div className="h-6 w-6 rounded" style={{ backgroundColor: theme.secondaryColor }} />
                      <div className="h-6 w-6 rounded" style={{ backgroundColor: theme.accentColor }} />
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
