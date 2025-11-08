import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { BookOpen, Plus } from "lucide-react";
import { VerseCard } from "@/components/verse-card";
import { useQuery, useMutation } from "@tanstack/react-query";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import type { Verse, Funnel } from "@shared/schema";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function VerseBuilder() {
  const [verse, setVerse] = useState("");
  const [reference, setReference] = useState("");
  const [ctaText, setCtaText] = useState("Learn More");
  const [ctaUrl, setCtaUrl] = useState("");
  const [selectedFunnelId, setSelectedFunnelId] = useState<string | null>(null);
  const { toast } = useToast();

  const { data: verses } = useQuery<Verse[]>({
    queryKey: ["/api/verses"],
  });

  const { data: funnels } = useQuery<Funnel[]>({
    queryKey: ["/api/funnels"],
  });

  const createMutation = useMutation({
    mutationFn: async (verseData: { verseText: string; reference: string; ctaText: string; ctaUrl: string; funnelId: string | null }) => {
      return apiRequest("/api/verses", {
        method: "POST",
        body: JSON.stringify(verseData),
        headers: { "Content-Type": "application/json" },
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/verses"] });
      toast({
        title: "Verse saved",
        description: "Your Bible verse has been saved successfully.",
      });
      setVerse("");
      setReference("");
      setCtaText("Learn More");
      setCtaUrl("");
      setSelectedFunnelId(null);
    },
  });

  const handleSave = () => {
    if (!verse.trim() || !reference.trim()) {
      toast({
        title: "Missing required fields",
        description: "Please enter both verse text and reference.",
        variant: "destructive",
      });
      return;
    }

    createMutation.mutate({
      verseText: verse,
      reference,
      ctaText,
      ctaUrl,
      funnelId: selectedFunnelId,
    });
  };

  const popularVerses = [
    {
      text: "I can do all things through Christ who strengthens me.",
      ref: "Philippians 4:13"
    },
    {
      text: "Trust in the Lord with all your heart and lean not on your own understanding.",
      ref: "Proverbs 3:5"
    },
    {
      text: "For God so loved the world that he gave his one and only Son, that whoever believes in him shall not perish but have eternal life.",
      ref: "John 3:16"
    }
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-semibold">Daily Verse Builder</h1>
        <p className="text-muted-foreground">Add inspirational Bible verses to your funnels</p>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Verse Configuration</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
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

            <div className="space-y-2">
              <Label htmlFor="verse-text">Bible Verse</Label>
              <Textarea
                id="verse-text"
                placeholder="Enter the Bible verse text..."
                value={verse}
                onChange={(e) => setVerse(e.target.value)}
                className="min-h-32"
                data-testid="input-verse-text"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="verse-reference">Reference</Label>
              <Input
                id="verse-reference"
                placeholder="e.g., John 3:16"
                value={reference}
                onChange={(e) => setReference(e.target.value)}
                data-testid="input-verse-reference"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="cta-text">Call-to-Action Button Text</Label>
              <Input
                id="cta-text"
                placeholder="e.g., Start Your Journey"
                value={ctaText}
                onChange={(e) => setCtaText(e.target.value)}
                data-testid="input-cta-text"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="cta-url">CTA Link URL</Label>
              <Input
                id="cta-url"
                type="url"
                placeholder="https://example.com/offer"
                value={ctaUrl}
                onChange={(e) => setCtaUrl(e.target.value)}
                data-testid="input-cta-url"
              />
            </div>

            <Button 
              className="w-full" 
              onClick={handleSave} 
              disabled={createMutation.isPending}
              data-testid="button-save-verse"
            >
              <BookOpen className="mr-2 h-4 w-4" />
              {createMutation.isPending ? "Saving..." : "Save Verse Configuration"}
            </Button>
          </CardContent>
        </Card>

        <div className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Preview</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {verse && reference ? (
                <>
                  <VerseCard verse={verse} reference={reference} />
                  <Button className="w-full" data-testid="button-cta-preview">
                    {ctaText}
                  </Button>
                </>
              ) : (
                <p className="text-sm text-muted-foreground text-center py-8">
                  Enter a verse to see the preview
                </p>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Popular Verses</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              {popularVerses.map((pv, idx) => (
                <Button
                  key={idx}
                  variant="outline"
                  className="w-full justify-start text-left"
                  onClick={() => {
                    setVerse(pv.text);
                    setReference(pv.ref);
                  }}
                  data-testid={`button-popular-verse-${idx + 1}`}
                >
                  {pv.ref}
                </Button>
              ))}
            </CardContent>
          </Card>

          {verses && verses.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle>Saved Verses ({verses.length})</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 max-h-64 overflow-y-auto">
                {verses.map((v) => (
                  <div key={v.id} className="p-3 rounded-lg border bg-muted/50 text-sm">
                    <p className="font-medium">{v.reference}</p>
                    <p className="text-muted-foreground line-clamp-2 text-xs mt-1">{v.verseText}</p>
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
