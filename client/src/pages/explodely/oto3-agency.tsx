import { Button } from "@/components/ui/button";
import { Check, Crown } from "lucide-react";
import { CountdownTimer } from "@/components/countdown-timer";
import { ExitIntentPopup } from "@/components/exit-intent-popup";
import { TrustBadges } from "@/components/trust-badges";
import { FAQSection } from "@/components/faq-section";
import { BonusStack } from "@/components/bonus-stack";
import { ExplodelyDisclaimer } from "@/components/explodely-disclaimer";

export default function ExplodelyOTO3Agency() {
  const faqs = [
    {
      question: "What makes the Agency Package different from Premium?",
      answer: "Agency Package includes everything from Premium PLUS advanced analytics, client management tools, priority feature access, and a verified agency badge. It's designed specifically for professional service providers."
    },
    {
      question: "Can I really charge clients $300-$500 per funnel?",
      answer: "Absolutely! Many agencies charge between $300-$500 for faith-based funnel creation. With our white label system and professional tools, you can confidently deliver premium services to your clients."
    },
    {
      question: "What are the advanced analytics?",
      answer: "Track performance metrics across all client funnels in one dashboard - conversion rates, clicks, engagement, and more. Perfect for showing clients the value you're delivering."
    },
    {
      question: "Is this price really disappearing forever?",
      answer: "Yes! This is a one-time upgrade offer. If you leave this page, the Agency Package will cost $247. This $97 price is only available right now during your purchase flow."
    }
  ];

  const bonuses = [
    {
      title: "Agency Business Training",
      description: "Complete course on building a profitable faith-based funnel agency from scratch",
      value: 197
    },
    {
      title: "Client Proposal Templates",
      description: "Professional proposals and contracts to close more agency deals faster",
      value: 97
    },
    {
      title: "Premium Support Priority",
      description: "Jump to the front of the support queue with dedicated agency support",
      value: 147
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted">
      <div className="max-w-4xl mx-auto px-4 py-12 space-y-8">
        <div className="text-center space-y-4">
          <div className="inline-flex items-center gap-2 bg-amber-500/10 text-amber-600 dark:text-amber-400 px-4 py-2 rounded-full mb-4">
            <Crown className="w-5 h-5" />
            <span className="font-semibold">ULTIMATE PACKAGE</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold">
            The Complete <span className="text-primary">Agency Package</span>
          </h1>
          <p className="text-xl text-muted-foreground">
            Get EVERYTHING + exclusive agency features for professional service providers
          </p>
        </div>

        <div className="flex justify-center">
          <CountdownTimer storageKey="explodely-oto3-timer" durationMinutes={10} />
        </div>

        <div className="bg-gradient-to-r from-amber-600 to-primary text-primary-foreground p-6 rounded-lg text-center">
          <p className="text-2xl font-bold mb-2">FINAL ONE-TIME OFFER</p>
          <p className="text-4xl font-bold mb-2">Only $97</p>
          <p className="text-sm opacity-90">(Regular price: $247)</p>
        </div>

        <div className="bg-card border rounded-lg p-8 space-y-6">
          <h2 className="text-2xl font-semibold text-center">Agency Package Includes:</h2>
          
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <Check className="w-6 h-6 text-primary mt-1 flex-shrink-0" />
              <div>
                <p className="font-semibold">Everything from Premium Unlimited</p>
                <p className="text-sm text-muted-foreground">Unlimited funnels, unlimited exports, premium templates</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Check className="w-6 h-6 text-primary mt-1 flex-shrink-0" />
              <div>
                <p className="font-semibold">Priority Feature Access</p>
                <p className="text-sm text-muted-foreground">Get early access to new features before anyone else</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Check className="w-6 h-6 text-primary mt-1 flex-shrink-0" />
              <div>
                <p className="font-semibold">Advanced Analytics Dashboard</p>
                <p className="text-sm text-muted-foreground">Track performance across all client funnels in one place</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Check className="w-6 h-6 text-primary mt-1 flex-shrink-0" />
              <div>
                <p className="font-semibold">Client Management Tools</p>
                <p className="text-sm text-muted-foreground">Organize and manage unlimited client projects efficiently</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Check className="w-6 h-6 text-primary mt-1 flex-shrink-0" />
              <div>
                <p className="font-semibold">Commercial Use License</p>
                <p className="text-sm text-muted-foreground">Create funnels for unlimited clients with zero restrictions</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Check className="w-6 h-6 text-primary mt-1 flex-shrink-0" />
              <div>
                <p className="font-semibold">Agency Badge & Branding</p>
                <p className="text-sm text-muted-foreground">Stand out as a verified Faith Funnels AI agency partner</p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-primary/5 border border-primary/20 rounded-lg p-8 space-y-4">
          <h3 className="text-xl font-semibold text-center">This Pays for Itself with 1-2 Clients</h3>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div className="text-center">
              <p className="text-3xl font-bold text-primary">$300-$500</p>
              <p className="text-sm text-muted-foreground">Average client project fee</p>
            </div>
            <div className="text-center">
              <p className="text-3xl font-bold text-primary">$97</p>
              <p className="text-sm text-muted-foreground">Your one-time investment</p>
            </div>
          </div>

          <p className="text-center text-sm">
            Charge just <span className="font-bold">$300-$500 per client</span> for funnel creation services - 
            This upgrade pays for itself immediately!
          </p>
        </div>

        <div className="bg-destructive/10 border border-destructive/20 rounded-lg p-6 text-center">
          <p className="font-semibold text-destructive mb-2">Last Chance - This Offer Disappears Forever</p>
          <p className="text-sm text-muted-foreground">
            You'll never see this price again. Agency Package will be $247 if you come back later.
          </p>
        </div>

        <BonusStack bonuses={bonuses} />
        <TrustBadges />
        <FAQSection faqs={faqs} />

        <div className="text-center space-y-4">
          <div className="flex flex-col items-center gap-2">
            <a href="https://explodely.com/checkout/YOUR_OTO3_PRODUCT_ID?ocu=yes" data-testid="button-upgrade-agency">
              <Button size="lg" className="text-lg px-10 py-6 bg-gradient-to-r from-amber-600 to-primary hover:from-amber-700 hover:to-primary/90">
                YES! Give Me the Agency Package for $97
              </Button>
            </a>
            <p className="text-xs text-muted-foreground italic">
              This is a 1 Click Upsell and will be charged directly
            </p>
            <p className="text-xs text-muted-foreground">
              SplitPay available - pay in 2 easy installments
            </p>
          </div>
          <p className="text-sm text-muted-foreground">
            One-time payment • Instant access • 14-day money-back guarantee
          </p>
          <a href="/explodely/ds3" className="text-sm text-muted-foreground hover:underline block">
            No thanks, I don't need agency features
          </a>
        </div>
      </div>

      <ExplodelyDisclaimer />
      <ExitIntentPopup
        offerName="Agency Package"
        originalPrice={247}
        discountedPrice={97}
        onAccept={() => window.location.href = 'https://explodely.com/checkout/YOUR_OTO3_PRODUCT_ID'}
      />
    </div>
  );
}
