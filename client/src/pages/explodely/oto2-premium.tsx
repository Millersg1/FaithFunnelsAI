import { Button } from "@/components/ui/button";
import { Check, Zap } from "lucide-react";
import { CountdownTimer } from "@/components/countdown-timer";
import { ExitIntentPopup } from "@/components/exit-intent-popup";
import { TrustBadges } from "@/components/trust-badges";
import { FAQSection } from "@/components/faq-section";
import { BonusStack } from "@/components/bonus-stack";

export default function ExplodelyOTO2Premium() {
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
      answer: "No! This is a one-time payment of just $67. You get unlimited funnels and exports forever with no recurring charges."
    }
  ];

  const bonuses = [
    {
      title: "10 Premium Funnel Templates",
      description: "Exclusive high-converting templates for faith-based offers, events, and ministries",
      value: 97
    },
    {
      title: "Unlimited Client Onboarding System",
      description: "Email templates and workflows for onboarding unlimited clients smoothly",
      value: 47
    },
    {
      title: "Advanced Funnel Strategy Guide",
      description: "Learn how to create complex multi-offer funnels that maximize revenue",
      value: 67
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted">
      <div className="max-w-4xl mx-auto px-4 py-12 space-y-8">
        <div className="text-center space-y-4">
          <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full mb-4">
            <Zap className="w-5 h-5" />
            <span className="font-semibold">FINAL UPGRADE</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold">
            Go <span className="text-primary">UNLIMITED</span> with Premium
          </h1>
          <p className="text-xl text-muted-foreground">
            Remove all limits and create funnels for unlimited clients!
          </p>
        </div>

        <div className="flex justify-center">
          <CountdownTimer storageKey="explodely-oto2-timer" durationMinutes={10} />
        </div>

        <div className="bg-primary text-primary-foreground p-6 rounded-lg text-center">
          <p className="text-2xl font-bold mb-2">ONE-TIME UPGRADE OFFER</p>
          <p className="text-4xl font-bold mb-2">Only $67</p>
          <p className="text-sm opacity-90">(Regular price: $147)</p>
        </div>

        <div className="bg-card border rounded-lg overflow-hidden">
          <div className="bg-muted p-4">
            <h2 className="text-xl font-semibold text-center">White Label vs. Premium Unlimited</h2>
          </div>
          
          <div className="divide-y">
            <div className="grid grid-cols-3 gap-4 p-4">
              <div className="text-sm text-muted-foreground">Feature</div>
              <div className="text-sm font-semibold text-center">White Label</div>
              <div className="text-sm font-semibold text-center text-primary">Premium</div>
            </div>

            <div className="grid grid-cols-3 gap-4 p-4 items-center">
              <div className="text-sm">Number of Funnels</div>
              <div className="text-center">10 funnels</div>
              <div className="text-center font-bold text-primary">UNLIMITED</div>
            </div>

            <div className="grid grid-cols-3 gap-4 p-4 items-center">
              <div className="text-sm">Exports per Month</div>
              <div className="text-center">100 exports</div>
              <div className="text-center font-bold text-primary">UNLIMITED</div>
            </div>

            <div className="grid grid-cols-3 gap-4 p-4 items-center">
              <div className="text-sm">Client Projects</div>
              <div className="text-center">Limited</div>
              <div className="text-center font-bold text-primary">UNLIMITED</div>
            </div>

            <div className="grid grid-cols-3 gap-4 p-4 items-center">
              <div className="text-sm">Premium Templates</div>
              <div className="text-center">-</div>
              <div className="text-center font-bold text-primary">Included</div>
            </div>
          </div>
        </div>

        <div className="bg-card border rounded-lg p-8 space-y-4">
          <h3 className="text-xl font-semibold text-center">Perfect for:</h3>
          
          <div className="grid md:grid-cols-2 gap-4">
            <div className="flex items-start gap-3">
              <Check className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
              <p className="text-sm">Agencies serving multiple clients</p>
            </div>
            <div className="flex items-start gap-3">
              <Check className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
              <p className="text-sm">Freelancers with growing client base</p>
            </div>
            <div className="flex items-start gap-3">
              <Check className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
              <p className="text-sm">Church leaders creating many campaigns</p>
            </div>
            <div className="flex items-start gap-3">
              <Check className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
              <p className="text-sm">Anyone who needs unlimited capacity</p>
            </div>
          </div>
        </div>

        <div className="bg-destructive/10 border border-destructive/20 rounded-lg p-6 text-center">
          <p className="font-semibold text-destructive mb-2">This Offer Expires When You Leave This Page</p>
          <p className="text-sm text-muted-foreground">
            If you come back later, Premium Unlimited will cost $147 (not $67)
          </p>
        </div>

        <BonusStack bonuses={bonuses} />
        <TrustBadges />
        <FAQSection faqs={faqs} />

        <div className="text-center space-y-4">
          <div className="flex justify-center">
            <a href="https://explodely.com/checkout/YOUR_OTO2_PRODUCT_ID" data-testid="button-upgrade-premium">
              <Button size="lg" className="text-lg px-10 py-6 bg-primary hover:bg-primary/90">
                YES! Upgrade to Premium for $67
              </Button>
            </a>
          </div>
          <p className="text-sm text-muted-foreground">
            One-time payment • Instant access • 14-day money-back guarantee
          </p>
          <a href="/explodely/ds2" className="text-sm text-muted-foreground hover:underline block">
            No thanks, White Label is enough for me
          </a>
        </div>
      </div>

      <ExitIntentPopup
        offerName="Premium Unlimited"
        originalPrice={147}
        discountedPrice={67}
        onAccept={() => window.location.href = 'https://explodely.com/checkout/YOUR_OTO2_PRODUCT_ID'}
      />
    </div>
  );
}
