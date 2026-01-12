import { useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { useLocation } from "wouter";
import { queryClient, apiRequest } from "@/lib/queryClient";
import { Loader2, Search, Lock, Sparkles, BookOpen, LayoutTemplate } from "lucide-react";
import type { Template } from "@shared/schema";

const CATEGORIES = [
  "All Categories",
  "Church Fundraising",
  "Ministry Outreach",
  "Faith Coaching",
  "Bible Study",
  "Youth Ministry",
  "Worship Music",
  "Missions & Evangelism",
  "Christian Authors",
  "Retreat & Events",
  "Pastoral Counseling",
  "Christian Education",
];

export default function Templates() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All Categories");
  const [, setLocation] = useLocation();
  const { toast } = useToast();

  const userTier: string = "premium";

  const { data: templates = [], isLoading } = useQuery<Template[]>({
    queryKey: ["/api/templates", { tier: userTier }],
    queryFn: () => fetch(`/api/templates?tier=${userTier}`).then(res => res.json()),
  });

  const useTemplateMutation = useMutation({
    mutationFn: async (templateId: string) => {
      const response = await apiRequest("POST", `/api/templates/${templateId}/use`);
      return response.json();
    },
    onSuccess: (funnel) => {
      queryClient.invalidateQueries({ queryKey: ["/api/funnels"] });
      toast({
        title: "Funnel Created",
        description: "Your funnel has been created from the template.",
      });
      setLocation(`/app/funnels/${funnel.id}`);
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: "Failed to create funnel from template.",
        variant: "destructive",
      });
    },
  });

  const filteredTemplates = templates.filter((template) => {
    const matchesSearch = template.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      template.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === "All Categories" || template.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const premiumLiteTemplates = filteredTemplates.filter(t => t.tier === "premium_lite");
  const premiumOnlyTemplates = filteredTemplates.filter(t => t.tier === "premium");

  const canAccessPremium = userTier === "premium" || userTier === "reseller";
  const canAccessPremiumLite = userTier === "premium_lite" || canAccessPremium;

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-full">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 space-y-8">
      <div className="flex flex-col gap-4">
        <div className="flex items-center gap-3">
          <LayoutTemplate className="h-8 w-8 text-primary" />
          <div>
            <h1 className="text-3xl font-bold" data-testid="text-templates-title">Template Gallery</h1>
            <p className="text-muted-foreground">
              Choose from {templates.length} professionally designed funnel templates
            </p>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search templates..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
              data-testid="input-search-templates"
            />
          </div>
          <Select value={selectedCategory} onValueChange={setSelectedCategory}>
            <SelectTrigger className="w-full sm:w-[200px]" data-testid="select-category">
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
              {CATEGORIES.map((category) => (
                <SelectItem key={category} value={category}>
                  {category}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {premiumLiteTemplates.length > 0 && (
        <section>
          <div className="flex items-center gap-2 mb-4">
            <BookOpen className="h-5 w-5 text-primary" />
            <h2 className="text-xl font-semibold">Starter Templates</h2>
            <Badge variant="secondary">{premiumLiteTemplates.length} templates</Badge>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {premiumLiteTemplates.map((template) => (
              <TemplateCard
                key={template.id}
                template={template}
                onUse={() => useTemplateMutation.mutate(template.id)}
                isLoading={useTemplateMutation.isPending}
                hasAccess={canAccessPremiumLite}
              />
            ))}
          </div>
        </section>
      )}

      {premiumOnlyTemplates.length > 0 && (
        <section>
          <div className="flex items-center gap-2 mb-4">
            <Sparkles className="h-5 w-5 text-amber-500" />
            <h2 className="text-xl font-semibold">Premium Templates</h2>
            <Badge className="bg-amber-500 hover:bg-amber-600">{premiumOnlyTemplates.length} templates</Badge>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {premiumOnlyTemplates.map((template) => (
              <TemplateCard
                key={template.id}
                template={template}
                onUse={() => useTemplateMutation.mutate(template.id)}
                isLoading={useTemplateMutation.isPending}
                hasAccess={canAccessPremium}
                isPremium
              />
            ))}
          </div>
        </section>
      )}

      {filteredTemplates.length === 0 && (
        <div className="text-center py-12">
          <LayoutTemplate className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
          <h3 className="text-lg font-semibold mb-2">No templates found</h3>
          <p className="text-muted-foreground">
            Try adjusting your search or category filter.
          </p>
        </div>
      )}
    </div>
  );
}

function TemplateCard({
  template,
  onUse,
  isLoading,
  hasAccess,
  isPremium = false,
}: {
  template: Template;
  onUse: () => void;
  isLoading: boolean;
  hasAccess: boolean;
  isPremium?: boolean;
}) {
  return (
    <Card className={`relative overflow-hidden ${isPremium ? "border-amber-500/30" : ""}`} data-testid={`card-template-${template.id}`}>
      {isPremium && (
        <div className="absolute top-2 right-2">
          <Badge className="bg-amber-500 hover:bg-amber-600">
            <Sparkles className="h-3 w-3 mr-1" />
            Premium
          </Badge>
        </div>
      )}
      <CardHeader className="pb-3">
        <div className="flex items-start gap-3">
          <div
            className="w-12 h-12 rounded-lg flex items-center justify-center"
            style={{ backgroundColor: template.theme?.primary || "#6366f1" }}
          >
            <LayoutTemplate className="h-6 w-6 text-white" />
          </div>
          <div className="flex-1 min-w-0">
            <CardTitle className="text-lg truncate">{template.name}</CardTitle>
            <CardDescription className="text-xs">{template.category}</CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className="pb-3">
        <p className="text-sm text-muted-foreground line-clamp-2">{template.description}</p>
        {template.verse && (
          <div className="mt-3 p-2 bg-muted/50 rounded text-xs italic">
            "{template.verse.text.substring(0, 60)}..."
            <span className="block text-muted-foreground mt-1">— {template.verse.reference}</span>
          </div>
        )}
      </CardContent>
      <CardFooter className="pt-0">
        {hasAccess ? (
          <Button
            className="w-full"
            onClick={onUse}
            disabled={isLoading}
            data-testid={`button-use-template-${template.id}`}
          >
            {isLoading ? (
              <>
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                Creating...
              </>
            ) : (
              "Use This Template"
            )}
          </Button>
        ) : (
          <Button className="w-full" variant="outline" disabled data-testid={`button-locked-template-${template.id}`}>
            <Lock className="h-4 w-4 mr-2" />
            Upgrade to Access
          </Button>
        )}
      </CardFooter>
    </Card>
  );
}
