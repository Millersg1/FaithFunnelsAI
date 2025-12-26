import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle2, BookOpen, Sparkles, Gift } from "lucide-react";
import logoImage from "@assets/generated_images/faith_funnels_ai_logo.png";
import { ExplodelyDisclaimer } from "@/components/explodely-disclaimer";

export default function OrderBumpVerses() {
  const versePacks = [
    "50 Salvation & Redemption Verses",
    "50 Prosperity & Abundance Verses", 
    "50 Healing & Restoration Verses",
    "50 Faith & Trust Verses",
    "50 Love & Relationships Verses",
    "50 Peace & Comfort Verses",
    "50 Strength & Courage Verses",
    "50 Gratitude & Praise Verses",
    "50 Wisdom & Guidance Verses",
    "50 Protection & Safety Verses",
  ];

  const benefits = [
    "500 total pre-written Bible verses",
    "Organized by category for easy use",
    "Copy and paste into any funnel",
    "Perfect for any faith-based niche",
    "Includes suggested CTAs for each",
    "Instant download access",
  ];

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
        <div className="max-w-3xl mx-auto space-y-8">
          
          <div className="text-center space-y-4">
            <div className="inline-flex items-center gap-2 bg-amber-500/10 text-amber-600 dark:text-amber-400 px-4 py-2 rounded-full">
              <Gift className="w-5 h-5" />
              <span className="font-semibold">ONE TIME OFFER</span>
            </div>
            <h1 className="text-3xl lg:text-4xl font-bold">
              Add 500 Extra Bible Verses To Your Order!
            </h1>
            <p className="text-lg text-muted-foreground">
              Get 10 complete verse packs covering every major faith topic. Never run out of inspiring content for your funnels!
            </p>
          </div>

          <Card className="border-2 border-amber-500/30 bg-gradient-to-br from-amber-500/5 to-background">
            <CardContent className="p-8 space-y-6">
              <div className="flex items-center justify-center gap-4">
                <BookOpen className="h-16 w-16 text-amber-500" />
                <div>
                  <h2 className="text-2xl font-bold">Extra Bible Verse Packs</h2>
                  <p className="text-muted-foreground">500 Verses Across 10 Categories</p>
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-3">
                {versePacks.map((pack, idx) => (
                  <div key={idx} className="flex items-center gap-2 text-sm">
                    <Sparkles className="h-4 w-4 text-amber-500 flex-shrink-0" />
                    <span>{pack}</span>
                  </div>
                ))}
              </div>

              <div className="border-t pt-6">
                <h3 className="font-semibold mb-4 text-center">What You Get:</h3>
                <div className="grid sm:grid-cols-2 gap-3">
                  {benefits.map((benefit, idx) => (
                    <div key={idx} className="flex items-center gap-2">
                      <CheckCircle2 className="h-5 w-5 text-green-500 flex-shrink-0" />
                      <span>{benefit}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="text-center space-y-4 pt-4">
                <div className="space-y-1">
                  <p className="text-muted-foreground line-through">Regular Price: $47</p>
                  <p className="text-4xl font-bold text-amber-600 dark:text-amber-400">
                    Just $9 Today!
                  </p>
                  <p className="text-sm text-muted-foreground">One-time payment. Instant access.</p>
                </div>

                <a 
                  href="#order-bump-buy" 
                  data-testid="button-order-bump-buy"
                >
                  <Button 
                    size="lg" 
                    className="w-full max-w-md text-lg py-6 bg-amber-500 hover:bg-amber-600 text-white"
                  >
                    YES! Add Bible Verse Packs To My Order
                  </Button>
                </a>

                <p className="text-xs text-muted-foreground">
                  This offer is only available right now during checkout
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6 text-center space-y-4">
              <h3 className="font-semibold">Why Add Extra Verses?</h3>
              <p className="text-muted-foreground">
                Faith Funnels AI comes with a starter set of verses, but with these 500 extra verses organized by category, you will have the perfect verse for every type of funnel you create. From healing ministries to prosperity teachings to salvation messages, you will always have the right scripture at your fingertips.
              </p>
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
