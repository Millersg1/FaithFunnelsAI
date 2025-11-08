import { useState, useEffect } from "react";
import { useRoute } from "wouter";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useQuery, useMutation } from "@tanstack/react-query";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import type { Funnel, Verse, Theme, FunnelStage } from "@shared/schema";
import { Plus, Save, Trash2 } from "lucide-react";
import { Switch } from "@/components/ui/switch";

export default function FunnelEditor() {
  const [, params] = useRoute("/funnels/:id");
  const funnelId = params?.id;
  const { toast } = useToast();

  const [funnelName, setFunnelName] = useState("");
  const [stages, setStages] = useState<FunnelStage[]>([]);

  const { data: funnel, isLoading } = useQuery<Funnel>({
    queryKey: ["/api/funnels", funnelId],
    enabled: !!funnelId,
  });

  const { data: verses } = useQuery<Verse[]>({
    queryKey: ["/api/verses"],
  });

  const { data: themes } = useQuery<Theme[]>({
    queryKey: ["/api/themes"],
  });

  useEffect(() => {
    if (funnel) {
      setFunnelName(funnel.name);
      setStages(funnel.stages);
    }
  }, [funnel]);

  const updateMutation = useMutation({
    mutationFn: async (data: { name: string; stages: FunnelStage[] }) => {
      const response = await apiRequest("PATCH", `/api/funnels/${funnelId}`, data);
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/funnels", funnelId] });
      queryClient.invalidateQueries({ queryKey: ["/api/funnels"] });
      toast({
        title: "Funnel saved",
        description: "Your changes have been saved successfully.",
      });
    },
  });

  const handleSave = () => {
    updateMutation.mutate({ name: funnelName, stages });
  };

  const handleAddStage = () => {
    const newStage: FunnelStage = {
      id: `stage-${Date.now()}`,
      title: `New Stage ${stages.length + 1}`,
      type: "oto",
      hasVerse: false,
    };
    setStages([...stages, newStage]);
  };

  const handleUpdateStage = (index: number, updates: Partial<FunnelStage>) => {
    const newStages = [...stages];
    newStages[index] = { ...newStages[index], ...updates };
    setStages(newStages);
  };

  const handleDeleteStage = (index: number) => {
    setStages(stages.filter((_, i) => i !== index));
  };

  if (isLoading) {
    return <div className="flex items-center justify-center h-64">Loading...</div>;
  }

  if (!funnel) {
    return <div className="flex items-center justify-center h-64">Funnel not found</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-semibold">Edit Funnel</h1>
          <p className="text-muted-foreground">Configure your funnel stages and settings</p>
        </div>
        <Button onClick={handleSave} disabled={updateMutation.isPending} data-testid="button-save-funnel">
          <Save className="mr-2 h-4 w-4" />
          {updateMutation.isPending ? "Saving..." : "Save Changes"}
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Funnel Settings</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="funnel-name">Funnel Name</Label>
            <Input
              id="funnel-name"
              value={funnelName}
              onChange={(e) => setFunnelName(e.target.value)}
              data-testid="input-funnel-name"
            />
          </div>
        </CardContent>
      </Card>

      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">Funnel Stages</h2>
        <Button onClick={handleAddStage} variant="outline" data-testid="button-add-stage">
          <Plus className="mr-2 h-4 w-4" />
          Add Stage
        </Button>
      </div>

      <div className="space-y-4">
        {stages.map((stage, index) => (
          <Card key={stage.id}>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg">Stage {index + 1}</CardTitle>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => handleDeleteStage(index)}
                  data-testid={`button-delete-stage-${index}`}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label>Stage Title</Label>
                  <Input
                    value={stage.title}
                    onChange={(e) => handleUpdateStage(index, { title: e.target.value })}
                    data-testid={`input-stage-title-${index}`}
                  />
                </div>

                <div className="space-y-2">
                  <Label>Stage Type</Label>
                  <Select
                    value={stage.type}
                    onValueChange={(value) => handleUpdateStage(index, { type: value as "main" | "oto" | "ds" })}
                  >
                    <SelectTrigger data-testid={`select-stage-type-${index}`}>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="main">Main Offer</SelectItem>
                      <SelectItem value="oto">One-Time Offer (OTO)</SelectItem>
                      <SelectItem value="ds">Downsell (DS)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Bible Verse</Label>
                  <Select
                    value={stage.verseId || "none"}
                    onValueChange={(value) => {
                      handleUpdateStage(index, {
                        verseId: value === "none" ? undefined : value,
                        hasVerse: value !== "none",
                      });
                    }}
                  >
                    <SelectTrigger data-testid={`select-verse-${index}`}>
                      <SelectValue placeholder="Select a verse" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="none">No verse</SelectItem>
                      {verses?.map((verse) => (
                        <SelectItem key={verse.id} value={verse.id}>
                          {verse.reference}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Theme</Label>
                  <Select
                    value={stage.themeId || "none"}
                    onValueChange={(value) => {
                      handleUpdateStage(index, {
                        themeId: value === "none" ? undefined : value,
                      });
                    }}
                  >
                    <SelectTrigger data-testid={`select-theme-${index}`}>
                      <SelectValue placeholder="Select a theme" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="none">Default theme</SelectItem>
                      {themes?.map((theme) => (
                        <SelectItem key={theme.id} value={theme.id}>
                          {theme.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <Switch
                  id={`has-verse-${index}`}
                  checked={stage.hasVerse}
                  onCheckedChange={(checked) => handleUpdateStage(index, { hasVerse: checked })}
                  data-testid={`switch-has-verse-${index}`}
                />
                <Label htmlFor={`has-verse-${index}`}>Include Bible verse on this stage</Label>
              </div>
            </CardContent>
          </Card>
        ))}

        {stages.length === 0 && (
          <Card className="p-12">
            <div className="text-center">
              <p className="text-muted-foreground mb-4">No stages yet. Add your first stage to get started!</p>
              <Button onClick={handleAddStage} data-testid="button-add-first-stage">
                <Plus className="mr-2 h-4 w-4" />
                Add First Stage
              </Button>
            </div>
          </Card>
        )}
      </div>
    </div>
  );
}
