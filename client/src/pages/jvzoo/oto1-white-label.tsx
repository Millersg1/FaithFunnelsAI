import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Check, X } from "lucide-react";
import { CountdownTimer } from "@/components/countdown-timer";
import { ExitIntentPopup } from "@/components/exit-intent-popup";
import { TrustBadges } from "@/components/trust-badges";
import { FAQSection } from "@/components/faq-section";
import { BonusStack } from "@/components/bonus-stack";
import { JVZooDisclaimer } from "@/components/jvzoo-disclaimer";

export default function JVZooOTO1WhiteLabel() {
  const [isProcessing, setIsProcessing] = useState(false);

  const handlePurchaseClick = () => {
    if (isProcessing) return;
    setIsProcessing(true);
    window.location.href = '/jvzoo/oto2';
  };

  const faqs = [
    {
      question: "Can I really rebrand this as my own business?",
      answer: "Absolutely! With White Label Rights, you can replace our branding with yours - business name, logo, colors, and support email. Your clients will only see YOUR brand."
    },
    {
      question: "Am I allowed to charge clients for funnel creation?",
      answer: "Yes! The Extended License allows you to create funnels for clients and charge for your services. This is perfect for agencies and freelancers."
    },
    {
      question: "What's the difference between Basic and White Label?",
      answer: "Basic gives you 3 funnels and 10 exports for personal use only. White Label gives you 10 funnels, 100 exports, full branding control, and the right to serve clients commercially."
    },
    {
      question: "How quickly can I get started?",
      answer: "Instantly! Once you upgrade, you'll have immediate access to all White Label features. Set up your branding in minutes and start creating client funnels right away."
    }
  ];

  const bonuses = [
    {
      title: "Ready-Made Funnel Templates",
      description: "5 proven faith-based funnel templates you can customize and use immediately",
      value: 47
    },
    {
      title: "White Label Setup Training",
      description: "Step-by-step video showing how to set up your white label branding perfectly",
      value: 27
    },
    {
      title: "Client Pricing Guide",
      description: "Know exactly what to charge clients for different funnel packages",
      value: 17
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted">
      <div className="max-w-4xl mx-auto px-4 py-12 space-y-8">
        <div className="text-center space-y-4">
          <h1 className="text-4xl md:text-5xl font-bold">
            Wait! Upgrade to <span className="text-primary">White Label Rights</span>
          </h1>
          <p className="text-xl text-muted-foreground">
            Rebrand Faith Funnels AI as YOUR business and create funnels for clients!
          </p>
        </div>

        <div className="flex justify-center">
          <CountdownTimer storageKey="jvzoo-oto1-timer" durationMinutes={10} />
        </div>

        <div className="bg-primary text-primary-foreground p-6 rounded-lg text-center">
          <p className="text-2xl font-bold mb-2">ONE-TIME OFFER</p>
          <p className="text-4xl font-bold mb-2">Only $47</p>
          <p className="text-sm opacity-90">(Regular price: $97)</p>
        </div>

        <div className="bg-card border rounded-lg p-8 space-y-6">
          <h2 className="text-2xl font-semibold text-center">Upgrade to White Label & Get:</h2>
          
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <Check className="w-6 h-6 text-primary mt-1 flex-shrink-0" />
              <div>
                <p className="font-semibold">Full White Label Branding</p>
                <p className="text-sm text-muted-foreground">Replace "Faith Funnels AI" with YOUR business name, logo, and colors</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Check className="w-6 h-6 text-primary mt-1 flex-shrink-0" />
              <div>
                <p className="font-semibold">Custom Domain Support</p>
                <p className="text-sm text-muted-foreground">Use your own domain instead of faithfunnelsai.com</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Check className="w-6 h-6 text-primary mt-1 flex-shrink-0" />
              <div>
                <p className="font-semibold">Create Funnels for Clients</p>
                <p className="text-sm text-muted-foreground">Extended License to offer funnel creation services and charge clients</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Check className="w-6 h-6 text-primary mt-1 flex-shrink-0" />
              <div>
                <p className="font-semibold">10 Funnels & 100 Exports</p>
                <p className="text-sm text-muted-foreground">5x more capacity than Basic tier</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Check className="w-6 h-6 text-primary mt-1 flex-shrink-0" />
              <div>
                <p className="font-semibold">Your Own Support Email</p>
                <p className="text-sm text-muted-foreground">Clients contact YOU for support, not us</p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-muted border border-destructive/20 rounded-lg p-8 space-y-4">
          <h3 className="text-xl font-semibold text-center">Without White Label Rights:</h3>
          
          <div className="space-y-3">
            <div className="flex items-start gap-3">
              <X className="w-5 h-5 text-destructive mt-1 flex-shrink-0" />
              <p className="text-sm">Limited to 3 funnels and 10 exports (basic tier)</p>
            </div>
            <div className="flex items-start gap-3">
              <X className="w-5 h-5 text-destructive mt-1 flex-shrink-0" />
              <p className="text-sm">Cannot create funnels for clients or charge for services</p>
            </div>
            <div className="flex items-start gap-3">
              <X className="w-5 h-5 text-destructive mt-1 flex-shrink-0" />
              <p className="text-sm">Stuck with "Faith Funnels AI" branding forever</p>
            </div>
            <div className="flex items-start gap-3">
              <X className="w-5 h-5 text-destructive mt-1 flex-shrink-0" />
              <p className="text-sm">No custom domain - always faithfunnelsai.com</p>
            </div>
          </div>
        </div>

        <BonusStack bonuses={bonuses} />
        <TrustBadges />
        <FAQSection faqs={faqs} />

        <div className="text-center space-y-4">
          <div className="flex flex-col items-center gap-2">
            <a href="https://www.jvzoo.com/b/115363/432239/99" data-testid="link-jvzoo-oto1">
              <img src="https://i.jvzoo.com/115363/432239/99" alt="" width="1" height="1" className="absolute" />
              <Button 
                size="lg" 
                className="text-lg px-10 py-6 bg-primary hover:bg-primary/90"
                data-testid="button-upgrade-white-label"
              >
                YES! Upgrade to White Label for $47
              </Button>
            </a>
            <p className="text-xs text-muted-foreground italic">
              1-Click Upsell - Charged directly to your payment method
            </p>
          </div>
          <p className="text-sm text-muted-foreground">
            One-time payment - Instant access - 14-day money-back guarantee
          </p>
          <a href="https://www.jvzoo.com/nothanks/432239" className="text-sm text-muted-foreground hover:underline block" data-testid="link-no-thanks-oto1">
            No thanks, I'll stick with Basic tier
          </a>
        </div>
      </div>

      <JVZooDisclaimer />
      <ExitIntentPopup
        offerName="White Label Rights"
        originalPrice={47}
        discountedPrice={37}
        onAccept={() => window.location.href = '/jvzoo/oto2'}
      />
    </div>
  );
}
