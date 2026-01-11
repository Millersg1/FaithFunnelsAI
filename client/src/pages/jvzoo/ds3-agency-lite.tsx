import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Check, ArrowRight } from "lucide-react";
import { CountdownTimer } from "@/components/countdown-timer";
import { TrustBadges } from "@/components/trust-badges";
import { FAQSection } from "@/components/faq-section";
import { BonusStack } from "@/components/bonus-stack";
import { JVZooDisclaimer } from "@/components/jvzoo-disclaimer";

export default function JVZooDS3AgencyLite() {
  const [isProcessing, setIsProcessing] = useState(false);

  const handlePurchaseClick = () => {
    if (isProcessing) return;
    setIsProcessing(true);
    window.location.href = '/jvzoo/thankyou';
  };

  const faqs = [
    {
      question: "What's included in Agency Lite?",
      answer: "Agency Lite gives you client management for up to 10 clients, basic analytics, and the agency badge. It's perfect for freelancers and small agencies just starting out."
    },
    {
      question: "Can I upgrade to full Agency later?",
      answer: "Yes! You can upgrade anytime, but this special $47 price is only available right now. The full Agency Package will be $97 or more."
    },
    {
      question: "Do I get the client contracts and materials?",
      answer: "Agency Lite includes simplified versions of the client contracts. The full Agency Package includes our complete contract library and onboarding system."
    },
    {
      question: "Is this really my last chance?",
      answer: "Yes! This downsell offer is only shown once. If you leave this page, you'll need to purchase at full price later."
    }
  ];

  const bonuses = [
    {
      title: "10 Client Capacity",
      description: "Manage up to 10 clients with dedicated project spaces",
      value: 97
    },
    {
      title: "Basic Agency Badge",
      description: "Show clients you're a verified Faith Funnels agency",
      value: 47
    },
    {
      title: "Starter Client Contract",
      description: "Simple contract template for client projects",
      value: 27
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted">
      <div className="max-w-4xl mx-auto px-4 py-12 space-y-8">
        <div className="text-center space-y-4">
          <div className="inline-block bg-orange-500/10 text-orange-600 px-4 py-2 rounded-full text-sm font-semibold">
            FINAL OFFER! DON'T MISS THIS
          </div>
          <h1 className="text-4xl md:text-5xl font-bold">
            Get <span className="text-primary">Agency Lite</span> Instead
          </h1>
          <p className="text-xl text-muted-foreground">
            Start your agency journey at a fraction of the price!
          </p>
        </div>

        <div className="flex justify-center">
          <CountdownTimer storageKey="jvzoo-ds3-timer" durationMinutes={5} />
        </div>

        <div className="bg-orange-500 text-white p-6 rounded-lg text-center">
          <p className="text-2xl font-bold mb-2">FINAL CHANCE OFFER</p>
          <p className="text-4xl font-bold mb-2">Only $47</p>
          <p className="text-sm opacity-90">(Save $50 vs full Agency Package)</p>
        </div>

        <div className="bg-card border rounded-lg p-8 space-y-6">
          <h2 className="text-2xl font-semibold text-center">Agency Lite Includes:</h2>
          
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <Check className="w-6 h-6 text-primary mt-1 flex-shrink-0" />
              <div>
                <p className="font-semibold">10 Client Capacity</p>
                <p className="text-sm text-muted-foreground">Manage up to 10 clients with separate project spaces</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Check className="w-6 h-6 text-primary mt-1 flex-shrink-0" />
              <div>
                <p className="font-semibold">Basic Analytics</p>
                <p className="text-sm text-muted-foreground">Track essential metrics for client funnels</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Check className="w-6 h-6 text-primary mt-1 flex-shrink-0" />
              <div>
                <p className="font-semibold">Agency Badge</p>
                <p className="text-sm text-muted-foreground">Verified agency status to build client trust</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Check className="w-6 h-6 text-primary mt-1 flex-shrink-0" />
              <div>
                <p className="font-semibold">Starter Client Contract</p>
                <p className="text-sm text-muted-foreground">Ready-to-use contract template for projects</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Check className="w-6 h-6 text-primary mt-1 flex-shrink-0" />
              <div>
                <p className="font-semibold">All Previous Features</p>
                <p className="text-sm text-muted-foreground">Everything from your current tier included</p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-muted rounded-lg p-6">
          <h3 className="text-lg font-semibold mb-4 text-center">Compare Your Options:</h3>
          <div className="grid grid-cols-3 gap-4 text-sm">
            <div className="text-center p-4 bg-background rounded-lg border">
              <p className="font-bold text-lg">Premium</p>
              <p className="text-2xl font-bold text-muted-foreground">$67</p>
              <p className="text-muted-foreground">No clients</p>
              <p className="text-muted-foreground">No badge</p>
            </div>
            <div className="text-center p-4 bg-primary/10 rounded-lg border-2 border-primary">
              <p className="font-bold text-lg">Agency Lite</p>
              <p className="text-2xl font-bold text-primary">$47</p>
              <p className="text-muted-foreground">10 clients</p>
              <p className="text-muted-foreground">Agency badge</p>
            </div>
            <div className="text-center p-4 bg-background rounded-lg border">
              <p className="font-bold text-lg">Full Agency</p>
              <p className="text-2xl font-bold text-muted-foreground line-through">$97</p>
              <p className="text-muted-foreground">Unlimited</p>
              <p className="text-muted-foreground">Full analytics</p>
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
              data-testid="button-upgrade-agency-lite"
            >
              {isProcessing ? "Processing..." : "YES! Get Agency Lite for $47"}
            </Button>
            <p className="text-xs text-muted-foreground italic">
              1-Click Upsell - Charged directly to your payment method
            </p>
          </div>
          <p className="text-sm text-muted-foreground">
            One-time payment - Instant access - 14-day money-back guarantee
          </p>
          <a href="/jvzoo/thankyou" className="text-sm text-muted-foreground hover:underline flex items-center justify-center gap-1">
            No thanks, go to my dashboard <ArrowRight className="h-4 w-4" />
          </a>
        </div>
      </div>

      <JVZooDisclaimer />
    </div>
  );
}
