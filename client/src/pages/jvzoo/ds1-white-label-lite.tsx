import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Check, ArrowRight } from "lucide-react";
import { CountdownTimer } from "@/components/countdown-timer";
import { TrustBadges } from "@/components/trust-badges";
import { FAQSection } from "@/components/faq-section";
import { BonusStack } from "@/components/bonus-stack";
import { JVZooDisclaimer } from "@/components/jvzoo-disclaimer";

export default function JVZooDS1WhiteLabelLite() {
  const [isProcessing, setIsProcessing] = useState(false);

  const handlePurchaseClick = () => {
    if (isProcessing) return;
    setIsProcessing(true);
    window.location.href = '/jvzoo/oto2';
  };

  const faqs = [
    {
      question: "Is 5 funnels really enough?",
      answer: "For freelancers just starting out, absolutely! You can serve 2-3 clients with 5 funnels. Once you outgrow it, you can always upgrade to more capacity."
    },
    {
      question: "Can I still charge clients for funnel creation?",
      answer: "Yes! White Label Lite includes the Extended License, so you can legally create funnels for clients and charge for your services - just like the full White Label version."
    },
    {
      question: "What's the difference between this and Basic?",
      answer: "Basic ($17) is personal use only with 3 funnels. White Label Lite ($27) gives you commercial rights, your own branding, 5 funnels, and 50 exports - perfect for getting started with clients."
    },
    {
      question: "Will this price really disappear?",
      answer: "Yes! This is a one-time downsell offer only available right now. If you leave this page, this special price is gone forever."
    }
  ];

  const bonuses = [
    {
      title: "Quick Start Branding Guide",
      description: "Set up your white label branding in under 10 minutes",
      value: 17
    },
    {
      title: "3 Starter Templates",
      description: "Ready-to-use funnel templates to get you started fast",
      value: 27
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted">
      <div className="max-w-4xl mx-auto px-4 py-12 space-y-8">
        <div className="text-center space-y-4">
          <div className="inline-block bg-orange-500/10 text-orange-600 px-4 py-2 rounded-full text-sm font-semibold">
            WAIT! SPECIAL DOWNSELL OFFER
          </div>
          <h1 className="text-4xl md:text-5xl font-bold">
            Get <span className="text-primary">White Label Lite</span> Instead
          </h1>
          <p className="text-xl text-muted-foreground">
            A smaller version at a fraction of the price - still includes commercial rights!
          </p>
        </div>

        <div className="flex justify-center">
          <CountdownTimer storageKey="jvzoo-ds1-timer" durationMinutes={5} />
        </div>

        <div className="bg-orange-500 text-white p-6 rounded-lg text-center">
          <p className="text-2xl font-bold mb-2">LAST CHANCE OFFER</p>
          <p className="text-4xl font-bold mb-2">Only $27</p>
          <p className="text-sm opacity-90">(Save $20 vs full White Label)</p>
        </div>

        <div className="bg-card border rounded-lg p-8 space-y-6">
          <h2 className="text-2xl font-semibold text-center">White Label Lite Includes:</h2>
          
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <Check className="w-6 h-6 text-primary mt-1 flex-shrink-0" />
              <div>
                <p className="font-semibold">White Label Branding</p>
                <p className="text-sm text-muted-foreground">Your business name, logo, and colors</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Check className="w-6 h-6 text-primary mt-1 flex-shrink-0" />
              <div>
                <p className="font-semibold">Extended License</p>
                <p className="text-sm text-muted-foreground">Create funnels for clients and charge for services</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Check className="w-6 h-6 text-primary mt-1 flex-shrink-0" />
              <div>
                <p className="font-semibold">5 Funnels & 50 Exports</p>
                <p className="text-sm text-muted-foreground">Perfect for getting started with client work</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Check className="w-6 h-6 text-primary mt-1 flex-shrink-0" />
              <div>
                <p className="font-semibold">All Core Features</p>
                <p className="text-sm text-muted-foreground">Bible verses, themes, exports, legal pages</p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-muted rounded-lg p-6">
          <h3 className="text-lg font-semibold mb-4 text-center">Compare Your Options:</h3>
          <div className="grid grid-cols-3 gap-4 text-sm">
            <div className="text-center p-4 bg-background rounded-lg border">
              <p className="font-bold text-lg">Basic</p>
              <p className="text-2xl font-bold text-primary">$17</p>
              <p className="text-muted-foreground">3 funnels</p>
              <p className="text-muted-foreground">Personal use only</p>
            </div>
            <div className="text-center p-4 bg-primary/10 rounded-lg border-2 border-primary">
              <p className="font-bold text-lg">White Label Lite</p>
              <p className="text-2xl font-bold text-primary">$27</p>
              <p className="text-muted-foreground">5 funnels</p>
              <p className="text-muted-foreground">Commercial rights</p>
            </div>
            <div className="text-center p-4 bg-background rounded-lg border">
              <p className="font-bold text-lg">Full White Label</p>
              <p className="text-2xl font-bold text-muted-foreground line-through">$47</p>
              <p className="text-muted-foreground">10 funnels</p>
              <p className="text-muted-foreground">Commercial rights</p>
            </div>
          </div>
        </div>

        <BonusStack bonuses={bonuses} />
        <TrustBadges />
        <FAQSection faqs={faqs} />

        <div className="text-center space-y-4">
          <div className="flex flex-col items-center gap-2">
            <Button 
              size="lg" 
              className="text-lg px-10 py-6 bg-orange-500 hover:bg-orange-600"
              onClick={handlePurchaseClick}
              disabled={isProcessing}
              data-testid="button-upgrade-lite"
            >
              {isProcessing ? "Processing..." : "YES! Get White Label Lite for $27"}
            </Button>
            <p className="text-xs text-muted-foreground italic">
              1-Click Upsell - Charged directly to your payment method
            </p>
          </div>
          <p className="text-sm text-muted-foreground">
            One-time payment - Instant access - 14-day money-back guarantee
          </p>
          <a href="/jvzoo/oto2" className="text-sm text-muted-foreground hover:underline flex items-center justify-center gap-1">
            No thanks, continue to next offer <ArrowRight className="h-4 w-4" />
          </a>
        </div>
      </div>

      <JVZooDisclaimer />
    </div>
  );
}
