import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Check, X } from "lucide-react";
import { CountdownTimer } from "@/components/countdown-timer";
import { ExitIntentPopup } from "@/components/exit-intent-popup";
import { TrustBadges } from "@/components/trust-badges";
import { FAQSection } from "@/components/faq-section";
import { BonusStack } from "@/components/bonus-stack";
import { JVZooDisclaimer } from "@/components/jvzoo-disclaimer";

export default function JVZooOTO2Premium() {
  const [isProcessing, setIsProcessing] = useState(false);

  const handlePurchaseClick = () => {
    if (isProcessing) return;
    setIsProcessing(true);
    window.location.href = '/jvzoo/oto3';
  };

  const faqs = [
    {
      question: "Why do I need unlimited funnels?",
      answer: "If you're serving multiple clients or running multiple campaigns, you'll quickly hit the 10-funnel limit. Premium Unlimited lets you create as many funnels as you need without worrying about limits."
    },
    {
      question: "What are Premium Templates?",
      answer: "Exclusive, professionally-designed funnel templates that aren't available in White Label. These are conversion-optimized designs created specifically for faith-based businesses."
    },
    {
      question: "Can I still use my white label branding?",
      answer: "Absolutely! Premium Unlimited includes ALL White Label features plus unlimited capacity and premium templates. You keep all the branding control you had."
    },
    {
      question: "Is there a monthly fee?",
      answer: "No! This is a one-time payment. You get lifetime access to Premium Unlimited features with no recurring charges ever."
    }
  ];

  const bonuses = [
    {
      title: "50 Premium Funnel Templates",
      description: "Done-for-you templates for churches, ministries, coaches, and authors",
      value: 197
    },
    {
      title: "Advanced Conversion Training",
      description: "Learn the psychology behind high-converting faith-based funnels",
      value: 97
    },
    {
      title: "Priority Feature Access",
      description: "Get early access to new features before anyone else",
      value: 47
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted">
      <div className="max-w-4xl mx-auto px-4 py-12 space-y-8">
        <div className="text-center space-y-4">
          <h1 className="text-4xl md:text-5xl font-bold">
            Upgrade to <span className="text-primary">Premium Unlimited</span>
          </h1>
          <p className="text-xl text-muted-foreground">
            Unlimited funnels, premium templates, and priority access!
          </p>
        </div>

        <div className="flex justify-center">
          <CountdownTimer storageKey="jvzoo-oto2-timer" durationMinutes={10} />
        </div>

        <div className="bg-primary text-primary-foreground p-6 rounded-lg text-center">
          <p className="text-2xl font-bold mb-2">ONE-TIME OFFER</p>
          <p className="text-4xl font-bold mb-2">Only $67</p>
          <p className="text-sm opacity-90">(Regular price: $147)</p>
        </div>

        <div className="bg-card border rounded-lg p-8 space-y-6">
          <h2 className="text-2xl font-semibold text-center">Premium Unlimited Includes:</h2>
          
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <Check className="w-6 h-6 text-primary mt-1 flex-shrink-0" />
              <div>
                <p className="font-semibold">Unlimited Funnels</p>
                <p className="text-sm text-muted-foreground">Create as many funnels as you need - no limits ever</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Check className="w-6 h-6 text-primary mt-1 flex-shrink-0" />
              <div>
                <p className="font-semibold">Unlimited Exports</p>
                <p className="text-sm text-muted-foreground">Export as many times as you want with no monthly caps</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Check className="w-6 h-6 text-primary mt-1 flex-shrink-0" />
              <div>
                <p className="font-semibold">50 Premium Templates</p>
                <p className="text-sm text-muted-foreground">Exclusive, conversion-optimized templates not available elsewhere</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Check className="w-6 h-6 text-primary mt-1 flex-shrink-0" />
              <div>
                <p className="font-semibold">Priority Feature Access</p>
                <p className="text-sm text-muted-foreground">Be first to use new features as they're released</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Check className="w-6 h-6 text-primary mt-1 flex-shrink-0" />
              <div>
                <p className="font-semibold">Everything in White Label</p>
                <p className="text-sm text-muted-foreground">Full branding, custom domain, client rights - all included</p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-muted border border-destructive/20 rounded-lg p-8 space-y-4">
          <h3 className="text-xl font-semibold text-center">Without Premium Unlimited:</h3>
          
          <div className="space-y-3">
            <div className="flex items-start gap-3">
              <X className="w-5 h-5 text-destructive mt-1 flex-shrink-0" />
              <p className="text-sm">Limited to 10 funnels and 100 exports per month</p>
            </div>
            <div className="flex items-start gap-3">
              <X className="w-5 h-5 text-destructive mt-1 flex-shrink-0" />
              <p className="text-sm">No access to premium templates</p>
            </div>
            <div className="flex items-start gap-3">
              <X className="w-5 h-5 text-destructive mt-1 flex-shrink-0" />
              <p className="text-sm">Wait longer for new feature access</p>
            </div>
            <div className="flex items-start gap-3">
              <X className="w-5 h-5 text-destructive mt-1 flex-shrink-0" />
              <p className="text-sm">May need to delete funnels to create new ones</p>
            </div>
          </div>
        </div>

        <BonusStack bonuses={bonuses} />
        <TrustBadges />
        <FAQSection faqs={faqs} />

        <div className="text-center space-y-4">
          <div className="flex flex-col items-center gap-2">
            <a href="https://www.jvzoo.com/b/115363/432251/99" data-testid="link-jvzoo-oto2">
              <img src="https://i.jvzoo.com/115363/432251/99" alt="" width="1" height="1" className="absolute" />
              <Button 
                size="lg" 
                className="text-lg px-10 py-6 bg-primary hover:bg-primary/90"
                data-testid="button-upgrade-premium"
              >
                YES! Upgrade to Premium for $67
              </Button>
            </a>
            <p className="text-xs text-muted-foreground italic">
              1-Click Upsell - Charged directly to your payment method
            </p>
          </div>
          <p className="text-sm text-muted-foreground">
            One-time payment - Instant access - 14-day money-back guarantee
          </p>
          <a href="https://www.jvzoo.com/nothanks/432251" className="text-sm text-muted-foreground hover:underline block" data-testid="link-no-thanks-oto2">
            No thanks, I'll keep my current plan
          </a>
        </div>
      </div>

      <JVZooDisclaimer />
      <ExitIntentPopup
        offerName="Premium Unlimited"
        originalPrice={147}
        discountedPrice={67}
        onAccept={() => window.location.href = '/jvzoo/oto3'}
      />
    </div>
  );
}
