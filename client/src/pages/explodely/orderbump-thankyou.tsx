import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle2, Download, BookOpen } from "lucide-react";
import logoImage from "@assets/generated_images/faith_funnels_ai_logo.png";
import { ExplodelyDisclaimer } from "@/components/explodely-disclaimer";

export default function OrderBumpThankYou() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/30">
      <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-4 py-4 flex items-center justify-center">
          <div className="flex items-center gap-3">
            <img 
              src={logoImage} 
              alt="Faith Funnels AI Logo" 
              className="h-12 w-12 object-contain"
            />
            <span className="font-semibold text-lg">Faith Funnels AI</span>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-12">
        <div className="max-w-2xl mx-auto space-y-8">
          
          <div className="text-center space-y-4">
            <CheckCircle2 className="h-16 w-16 text-green-500 mx-auto" />
            <h1 className="text-3xl lg:text-4xl font-bold">
              Your Extra Bible Verse Packs Are Ready!
            </h1>
            <p className="text-lg text-muted-foreground">
              Thank you for your purchase. Download your 500 verses below.
            </p>
          </div>

          <Card className="border-2 border-green-500/30">
            <CardContent className="p-8 space-y-6">
              <div className="flex items-center gap-4">
                <BookOpen className="h-12 w-12 text-amber-500" />
                <div>
                  <h2 className="text-xl font-bold">Extra Bible Verse Packs</h2>
                  <p className="text-muted-foreground">500 Verses Across 10 Categories</p>
                </div>
              </div>

              <div className="space-y-3 text-sm">
                <p className="font-semibold">Your download includes:</p>
                <ul className="space-y-2">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-green-500" />
                    50 Salvation and Redemption Verses
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-green-500" />
                    50 Prosperity and Abundance Verses
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-green-500" />
                    50 Healing and Restoration Verses
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-green-500" />
                    50 Faith and Trust Verses
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-green-500" />
                    50 Love and Relationships Verses
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-green-500" />
                    50 Peace and Comfort Verses
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-green-500" />
                    50 Strength and Courage Verses
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-green-500" />
                    50 Gratitude and Praise Verses
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-green-500" />
                    50 Wisdom and Guidance Verses
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-green-500" />
                    50 Protection and Safety Verses
                  </li>
                </ul>
              </div>

              <a 
                href="/assets/products/extra-bible-verse-packs.txt" 
                download="Extra-Bible-Verse-Packs.txt"
                data-testid="button-download-verses"
              >
                <Button size="lg" className="w-full text-lg py-6">
                  <Download className="mr-2 h-5 w-5" />
                  Download Your Verse Packs
                </Button>
              </a>

              <p className="text-xs text-center text-muted-foreground">
                Save this page to your bookmarks for easy access
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6 text-center space-y-4">
              <h3 className="font-semibold">Need Help?</h3>
              <p className="text-muted-foreground text-sm">
                If you have any questions about using your verse packs, contact us at:
              </p>
              <a href="mailto:support@faithfunnelsai.com" className="text-primary hover:underline">
                support@faithfunnelsai.com
              </a>
            </CardContent>
          </Card>

        </div>
      </main>

      <footer className="border-t py-6 bg-muted/30 mt-12">
        <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} Faith Funnels AI. All rights reserved.</p>
        </div>
      </footer>
      <ExplodelyDisclaimer />
    </div>
  );
}
