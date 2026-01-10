import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Check, AlertCircle } from "lucide-react";
import { CountdownTimer } from "@/components/countdown-timer";
import { ExitIntentPopup } from "@/components/exit-intent-popup";
import { TrustBadges } from "@/components/trust-badges";
import { FAQSection } from "@/components/faq-section";
import { BonusStack } from "@/components/bonus-stack";
import { ExplodelyDisclaimer } from "@/components/explodely-disclaimer";

export default function ExplodelyDS2PremiumLite() {
  const [isProcessing, setIsProcessing] = useState(false);

  const handlePurchaseClick = () => {
    if (isProcessing) return;
    setIsProcessing(true);
    window.location.href = 'https://explodely.com/p/226220626?ocu=yes';
  };
  const faqs = [
    {
      question: "Is 25 funnels enough for my agency?",
      answer: "For most growing agencies with 5-10 clients, yes! Each client typically needs 2-3 funnels, so 25 funnels supports solid growth. You can always upgrade to unlimited later."
    },
    {
      question: "Do I get the same premium templates as full Premium?",
      answer: "Yes! Premium Lite includes all the same exclusive templates as Premium Unlimited. The only difference is the capacity limits (25 funnels vs unlimited)."
    },
    {
      question: "Can I upgrade to Premium Unlimited later?",
      answer: "Yes, but you won't get this $37 price. Premium Unlimited will cost $67 later. Save $30 by grabbing Premium Lite now at this special downsell price."
    },
    {
      question: "What if I outgrow 25 funnels?",
      answer: "You can upgrade to Premium Unlimited anytime for just the price difference. But this downsell offer saves you the most money right now."
    }
  ];

  const bonuses = [
    {
      title: "5 Premium Funnel Templates",
      description: "Exclusive high-converting templates not available in lower tiers",
      value: 67
    },
    {
      title: "Multi-Client Management Guide",
      description: "How to efficiently manage 5-10 clients simultaneously",
      value: 37
    },
    {
      title: "Scaling Your Agency Playbook",
      description: "Step-by-step plan for growing from 5 to 20+ clients",
      value: 47
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted">
      <div className="max-w-4xl mx-auto px-4 py-12 space-y-8">
        <div className="text-center space-y-4">
          <div className="inline-flex items-center gap-2 bg-destructive/10 text-destructive px-4 py-2 rounded-full mb-4">
            <AlertCircle className="w-5 h-5" />
            <span className="font-semibold">LAST CHANCE</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold">
            Wait! Try <span className="text-primary">Premium Lite</span> Instead
          </h1>
          <p className="text-xl text-muted-foreground">
            Get more capacity at a special downsell price - just $37!
          </p>
        </div>

        <div className="flex justify-center">
          <CountdownTimer storageKey="explodely-ds2-timer" durationMinutes={10} />
        </div>

        <div className="bg-primary text-primary-foreground p-6 rounded-lg text-center">
          <p className="text-2xl font-bold mb-2">SPECIAL DOWNSELL PRICE</p>
          <p className="text-4xl font-bold mb-2">Only $37</p>
          <p className="text-sm opacity-90">(Regular: $67 | You Save: $30)</p>
        </div>

        <div className="bg-card border rounded-lg p-8 space-y-6">
          <h2 className="text-2xl font-semibold text-center">Premium Lite Includes:</h2>
          
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <Check className="w-6 h-6 text-primary mt-1 flex-shrink-0" />
              <div>
                <p className="font-semibold">25 Funnels</p>
                <p className="text-sm text-muted-foreground">5x more than White Label Lite (5 funnels)</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Check className="w-6 h-6 text-primary mt-1 flex-shrink-0" />
              <div>
                <p className="font-semibold">250 Exports</p>
                <p className="text-sm text-muted-foreground">5x more than White Label Lite (50 exports)</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Check className="w-6 h-6 text-primary mt-1 flex-shrink-0" />
              <div>
                <p className="font-semibold">Premium Templates</p>
                <p className="text-sm text-muted-foreground">Exclusive designs not available in Lite version</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Check className="w-6 h-6 text-primary mt-1 flex-shrink-0" />
              <div>
                <p className="font-semibold">All White Label Features</p>
                <p className="text-sm text-muted-foreground">Full branding rights + client services</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Check className="w-6 h-6 text-primary mt-1 flex-shrink-0" />
              <div>
                <p className="font-semibold">Handle More Clients</p>
                <p className="text-sm text-muted-foreground">Perfect for growing agencies with 5-10 clients</p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-destructive/10 border border-destructive/20 rounded-lg p-6 text-center">
          <p className="font-semibold text-destructive mb-2">One-Time Offer - Expires in 60 Seconds</p>
          <p className="text-sm text-muted-foreground">
            If you leave, Premium Lite will cost $67. Save $30 by acting now!
          </p>
        </div>

        <BonusStack bonuses={bonuses} />
        <TrustBadges />
        <FAQSection faqs={faqs} />

        <div className="text-center space-y-4">
          <div className="flex flex-col items-center gap-2">
            <Button 
              size="lg" 
              className="text-lg px-10 py-6 bg-primary hover:bg-primary/90"
              onClick={handlePurchaseClick}
              disabled={isProcessing}
              data-testid="button-downsell-premium-lite"
            >
              {isProcessing ? "Processing..." : "YES! Get Premium Lite for $37"}
            </Button>
            <p className="text-xs text-muted-foreground italic">
              1-Click Upsell - Charged directly to your payment method
            </p>
            <p className="text-xs text-muted-foreground">
              Or choose SplitPay at checkout: 2 payments of $18.50
            </p>
          </div>
          <p className="text-sm text-muted-foreground">
            One-time payment • Instant access • 14-day money-back guarantee
          </p>
          <a href="/explodely/oto3" className="text-sm text-muted-foreground hover:underline block">
            No thanks, I'll stick with White Label
          </a>
        </div>
      </div>

      <ExplodelyDisclaimer />
      <ExitIntentPopup
        offerName="Premium Lite"
        originalPrice={67}
        discountedPrice={37}
        onAccept={() => window.location.href = 'https://explodely.com/p/226220626?ocu=yes'}
      />
    </div>
  );
}
