import { Button } from "@/components/ui/button";
import { Check, AlertCircle } from "lucide-react";
import { useEffect } from "react";
import { CountdownTimer } from "@/components/countdown-timer";
import { ExitIntentPopup } from "@/components/exit-intent-popup";
import { TrustBadges } from "@/components/trust-badges";
import { FAQSection } from "@/components/faq-section";
import { BonusStack } from "@/components/bonus-stack";
import { TemplateShowcase } from "@/components/template-showcase";

export default function DS2PremiumLite() {
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
      answer: "Yes, but you won't get this $47 price. Premium Unlimited will cost $67 later. Save $20 by grabbing Premium Lite now at this special downsell price."
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

  useEffect(() => {
    const script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = 'https://warriorplus.com/o2/disclaimer/bt2gm2';
    script.defer = true;
    document.body.appendChild(script);

    const trackingPixel = document.createElement('img');
    trackingPixel.src = 'https://warriorplus.com/o2/v/bt2gm2/jvdrq0';
    trackingPixel.width = 1;
    trackingPixel.height = 1;
    trackingPixel.style.position = 'absolute';
    trackingPixel.style.visibility = 'hidden';
    document.body.appendChild(trackingPixel);

    return () => {
      document.body.removeChild(script);
      document.body.removeChild(trackingPixel);
    };
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted">
      <div className="max-w-4xl mx-auto px-4 py-12 space-y-8">
        {/* Headline */}
        <div className="text-center space-y-4">
          <div className="inline-flex items-center gap-2 bg-destructive/10 text-destructive px-4 py-2 rounded-full mb-4">
            <AlertCircle className="w-5 h-5" />
            <span className="font-semibold">LAST CHANCE</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold">
            Wait! Try <span className="text-primary">Premium Lite</span> Instead
          </h1>
          <p className="text-xl text-muted-foreground">
            Get more capacity at a special downsell price - just $47!
          </p>
        </div>

        {/* Countdown Timer */}
        <div className="flex justify-center">
          <CountdownTimer storageKey="ds2-timer" durationMinutes={10} />
        </div>

        {/* Special Offer Box */}
        <div className="bg-primary text-primary-foreground p-6 rounded-lg text-center">
          <p className="text-2xl font-bold mb-2">SPECIAL DOWNSELL PRICE</p>
          <p className="text-4xl font-bold mb-2">Only $47</p>
          <p className="text-sm opacity-90">(Regular: $67 | You Save: $20)</p>
        </div>

        {/* What's Included */}
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

        {/* Comparison Table */}
        <div className="bg-card border rounded-lg overflow-hidden">
          <div className="bg-muted p-4">
            <h3 className="text-lg font-semibold text-center">Premium vs Premium Lite</h3>
          </div>
          
          <div className="divide-y">
            <div className="grid grid-cols-3 gap-4 p-4">
              <div className="text-sm text-muted-foreground">Feature</div>
              <div className="text-sm font-semibold text-center">Premium ($67)</div>
              <div className="text-sm font-semibold text-center text-primary">Premium Lite ($47)</div>
            </div>

            <div className="grid grid-cols-3 gap-4 p-4 items-center">
              <div className="text-sm">Funnels</div>
              <div className="text-center">UNLIMITED ∞</div>
              <div className="text-center font-bold text-primary">25 funnels</div>
            </div>

            <div className="grid grid-cols-3 gap-4 p-4 items-center">
              <div className="text-sm">Exports</div>
              <div className="text-center">UNLIMITED ∞</div>
              <div className="text-center font-bold text-primary">250 exports</div>
            </div>

            <div className="grid grid-cols-3 gap-4 p-4 items-center">
              <div className="text-sm">Client Projects</div>
              <div className="text-center">UNLIMITED ∞</div>
              <div className="text-center font-bold text-primary">Up to 10 clients</div>
            </div>

            <div className="grid grid-cols-3 gap-4 p-4 items-center">
              <div className="text-sm">Premium Templates</div>
              <div className="text-center">✅</div>
              <div className="text-center font-bold text-primary">✅</div>
            </div>
          </div>
        </div>

        {/* Why Premium Lite */}
        <div className="bg-primary/5 border border-primary/20 rounded-lg p-6">
          <h3 className="text-lg font-semibold mb-3 text-center">Why Choose Premium Lite?</h3>
          <div className="grid md:grid-cols-2 gap-3 text-sm">
            <div className="flex items-start gap-2">
              <Check className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
              <p>Growing agencies with 5-10 clients</p>
            </div>
            <div className="flex items-start gap-2">
              <Check className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
              <p>Need premium templates</p>
            </div>
            <div className="flex items-start gap-2">
              <Check className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
              <p>Want more than 5 funnels</p>
            </div>
            <div className="flex items-start gap-2">
              <Check className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
              <p>But don't need unlimited yet</p>
            </div>
          </div>
        </div>

        {/* Urgency */}
        <div className="bg-destructive/10 border border-destructive/20 rounded-lg p-6 text-center">
          <p className="font-semibold text-destructive mb-2">🔥 One-Time Offer - Expires in 60 Seconds</p>
          <p className="text-sm text-muted-foreground">
            If you leave, Premium Lite will cost $67. Save $20 by acting now!
          </p>
        </div>

        {/* Template Showcase - 25 Lite Templates */}
        <TemplateShowcase variant="full" isPremium={false} />

        {/* Bonus Stack */}
        <BonusStack bonuses={bonuses} />

        {/* Trust Badges */}
        <TrustBadges />

        {/* FAQ */}
        <FAQSection faqs={faqs} />

        {/* CTA */}
        <div className="text-center space-y-4">
          <div className="flex justify-center">
            <a href="https://warriorplus.com/o2/buy/bt2gm2/jvdrq0/wr6bns" data-testid="button-downsell-premium-lite">
              <img src="https://warriorplus.com/o2/btn/cn150011000/bt2gm2/jvdrq0/449821" alt="YES! Get Premium Lite for $47" />
            </a>
          </div>
          <p className="text-sm text-muted-foreground">
            One-time payment • Instant access • 14-day money-back guarantee
          </p>
          <a href="https://warriorplus.com/o/nothanks/jvdrq0" className="text-sm text-muted-foreground hover:underline block">
            No thanks, I'll stick with White Label
          </a>
        </div>

        {/* Disclaimer */}
        <div className="py-8">
          <div className="wplus_spdisclaimer max-w-4xl mx-auto"></div>
        </div>
      </div>

      {/* Exit Intent Popup */}
      <ExitIntentPopup
        offerName="Premium Lite"
        originalPrice={67}
        discountedPrice={47}
        onAccept={() => window.location.href = 'https://warriorplus.com/o2/buy/bt2gm2/jvdrq0/wr6bns'}
      />
    </div>
  );
}
