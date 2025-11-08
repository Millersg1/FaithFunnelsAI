import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { BookOpen } from "lucide-react";
import { VerseCard } from "@/components/verse-card";

export default function VerseBuilder() {
  const [verse, setVerse] = useState("For I know the plans I have for you, declares the Lord, plans to prosper you and not to harm you, plans to give you hope and a future.");
  const [reference, setReference] = useState("Jeremiah 29:11");
  const [ctaText, setCtaText] = useState("Start Your Faith Journey");
  const [ctaUrl, setCtaUrl] = useState("https://example.com/offer");

  const handleSave = () => {
    console.log("Saving verse configuration:", { verse, reference, ctaText, ctaUrl });
  };

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

            <Button className="w-full" onClick={handleSave} data-testid="button-save-verse">
              <BookOpen className="mr-2 h-4 w-4" />
              Save Verse Configuration
            </Button>
          </CardContent>
        </Card>

        <div className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Preview</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <VerseCard verse={verse} reference={reference} />
              <Button className="w-full" data-testid="button-cta-preview">
                {ctaText}
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Popular Verses</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button
                variant="outline"
                className="w-full justify-start text-left"
                onClick={() => {
                  setVerse("I can do all things through Christ who strengthens me.");
                  setReference("Philippians 4:13");
                }}
                data-testid="button-popular-verse-1"
              >
                Philippians 4:13
              </Button>
              <Button
                variant="outline"
                className="w-full justify-start text-left"
                onClick={() => {
                  setVerse("Trust in the Lord with all your heart and lean not on your own understanding.");
                  setReference("Proverbs 3:5");
                }}
                data-testid="button-popular-verse-2"
              >
                Proverbs 3:5
              </Button>
              <Button
                variant="outline"
                className="w-full justify-start text-left"
                onClick={() => {
                  setVerse("For God so loved the world that he gave his one and only Son, that whoever believes in him shall not perish but have eternal life.");
                  setReference("John 3:16");
                }}
                data-testid="button-popular-verse-3"
              >
                John 3:16
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
