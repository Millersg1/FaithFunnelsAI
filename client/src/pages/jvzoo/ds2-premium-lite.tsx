import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Check, ArrowRight } from "lucide-react";
import { CountdownTimer } from "@/components/countdown-timer";
import { TrustBadges } from "@/components/trust-badges";
import { FAQSection } from "@/components/faq-section";
import { BonusStack } from "@/components/bonus-stack";
import { JVZooDisclaimer } from "@/components/jvzoo-disclaimer";
import { TemplateShowcase } from "@/components/template-showcase";

export default function JVZooDS2PremiumLite() {
  const [isProcessing, setIsProcessing] = useState(false);

  const handlePurchaseClick = () => {
    if (isProcessing) return;
    setIsProcessing(true);
    window.location.href = '/jvzoo/oto3';
  };

  const faqs = [
    {
      question: "How many templates are included?",
      answer: "Premium Lite includes 25 done-for-you templates - enough to cover most faith-based niches including churches, ministries, Christian coaches, and authors."
    },
    {
      question: "What's the difference between this and full Premium?",
      answer: "Full Premium has 55 templates and unlimited funnels. Premium Lite has 25 templates and 25 funnels - still plenty for most users at a lower price point."
    },
    {
      question: "Do I keep all my previous features?",
      answer: "Yes! Premium Lite is an addition to what you already have. You keep all your White Label features plus get the templates and extra capacity."
    },
    {
      question: "Can I upgrade to full Premium later?",
      answer: "Yes, you can always upgrade later, but you won't get today's special pricing. This downsell offer is only available right now."
    }
  ];

  const bonuses = [
    {
      title: "25 Premium Templates",
      description: "Professionally designed templates for churches, ministries, and coaches",
      value: 97
    },
    {
      title: "Template Customization Guide",
      description: "Learn how to customize templates for maximum conversions",
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
            Get <span className="text-primary">Premium Lite</span> Instead
          </h1>
          <p className="text-xl text-muted-foreground">
            25 templates + 25 funnels at a reduced price!
          </p>
        </div>

        <div className="flex justify-center">
          <CountdownTimer storageKey="jvzoo-ds2-timer" durationMinutes={5} />
        </div>

        <div className="bg-orange-500 text-white p-6 rounded-lg text-center">
          <p className="text-2xl font-bold mb-2">LAST CHANCE OFFER</p>
          <p className="text-4xl font-bold mb-2">Only $37</p>
          <p className="text-sm opacity-90">(Save $30 vs full Premium)</p>
        </div>

        <div className="bg-card border rounded-lg p-8 space-y-6">
          <h2 className="text-2xl font-semibold text-center">Premium Lite Includes:</h2>
          
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <Check className="w-6 h-6 text-primary mt-1 flex-shrink-0" />
              <div>
                <p className="font-semibold">25 Premium Templates</p>
                <p className="text-sm text-muted-foreground">Done-for-you designs for churches, ministries, and coaches</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Check className="w-6 h-6 text-primary mt-1 flex-shrink-0" />
              <div>
                <p className="font-semibold">25 Funnels Capacity</p>
                <p className="text-sm text-muted-foreground">More room to grow than White Label alone</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Check className="w-6 h-6 text-primary mt-1 flex-shrink-0" />
              <div>
                <p className="font-semibold">200 Exports Per Month</p>
                <p className="text-sm text-muted-foreground">Plenty of capacity for active users</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Check className="w-6 h-6 text-primary mt-1 flex-shrink-0" />
              <div>
                <p className="font-semibold">All Previous Features</p>
                <p className="text-sm text-muted-foreground">White label branding, commercial rights, everything included</p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-muted rounded-lg p-6">
          <h3 className="text-lg font-semibold mb-4 text-center">Compare Your Options:</h3>
          <div className="grid grid-cols-3 gap-4 text-sm">
            <div className="text-center p-4 bg-background rounded-lg border">
              <p className="font-bold text-lg">White Label</p>
              <p className="text-2xl font-bold text-muted-foreground">$47</p>
              <p className="text-muted-foreground">10 funnels</p>
              <p className="text-muted-foreground">No templates</p>
            </div>
            <div className="text-center p-4 bg-primary/10 rounded-lg border-2 border-primary">
              <p className="font-bold text-lg">Premium Lite</p>
              <p className="text-2xl font-bold text-primary">$37</p>
              <p className="text-muted-foreground">25 funnels</p>
              <p className="text-muted-foreground">25 templates</p>
            </div>
            <div className="text-center p-4 bg-background rounded-lg border">
              <p className="font-bold text-lg">Full Premium</p>
              <p className="text-2xl font-bold text-muted-foreground line-through">$67</p>
              <p className="text-muted-foreground">Unlimited</p>
              <p className="text-muted-foreground">55 templates</p>
            </div>
          </div>
        </div>

        <TemplateShowcase variant="full" isPremium={false} />

        <BonusStack bonuses={bonuses} />
        <TrustBadges />
        <FAQSection faqs={faqs} />

        <div className="text-center space-y-4">
          <div className="flex flex-col items-center gap-2">
            <a href="https://www.jvzoo.com/b/115363/432249/99" data-testid="link-jvzoo-ds2">
              <img src="https://i.jvzoo.com/115363/432249/99" alt="" width="1" height="1" className="absolute" />
              <Button 
                size="lg" 
                className="text-lg px-10 py-6 bg-orange-500 hover:bg-orange-600"
                data-testid="button-upgrade-premium-lite"
              >
                YES! Get Premium Lite for $37
              </Button>
            </a>
            <p className="text-xs text-muted-foreground italic">
              1-Click Upsell - Charged directly to your payment method
            </p>
          </div>
          <p className="text-sm text-muted-foreground">
            One-time payment - Instant access - 14-day money-back guarantee
          </p>
          <a href="https://www.jvzoo.com/nothanks/432249" className="text-sm text-muted-foreground hover:underline flex items-center justify-center gap-1" data-testid="link-no-thanks-ds2">
            No thanks, continue to next offer <ArrowRight className="h-4 w-4" />
          </a>
        </div>
      </div>

      <JVZooDisclaimer />
    </div>
  );
}
