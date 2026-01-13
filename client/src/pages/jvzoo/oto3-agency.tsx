import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Check, X } from "lucide-react";
import { CountdownTimer } from "@/components/countdown-timer";
import { ExitIntentPopup } from "@/components/exit-intent-popup";
import { TrustBadges } from "@/components/trust-badges";
import { FAQSection } from "@/components/faq-section";
import { BonusStack } from "@/components/bonus-stack";
import { JVZooDisclaimer } from "@/components/jvzoo-disclaimer";

export default function JVZooOTO3Agency() {
  const [isProcessing, setIsProcessing] = useState(false);

  const handlePurchaseClick = () => {
    if (isProcessing) return;
    setIsProcessing(true);
    window.location.href = '/jvzoo/thankyou';
  };

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
      question: "Is the agency badge displayed to my clients?",
      answer: "Only if you want it to be! The verified agency badge helps build trust with potential clients, but you control whether it's visible in your white-labeled version."
    }
  ];

  const bonuses = [
    {
      title: "Agency Client Contracts",
      description: "Ready-to-use legal contracts for client funnel projects",
      value: 197
    },
    {
      title: "Client Onboarding System",
      description: "Complete system for onboarding new funnel clients professionally",
      value: 147
    },
    {
      title: "Agency Pricing Calculator",
      description: "Know exactly what to charge for any funnel project",
      value: 47
    },
    {
      title: "VIP Support Access",
      description: "Direct line to our support team for priority assistance",
      value: 97
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted">
      <div className="max-w-4xl mx-auto px-4 py-12 space-y-8">
        <div className="text-center space-y-4">
          <h1 className="text-4xl md:text-5xl font-bold">
            Unlock the <span className="text-primary">Agency Package</span>
          </h1>
          <p className="text-xl text-muted-foreground">
            Everything you need to run a professional funnel agency!
          </p>
        </div>

        <div className="flex justify-center">
          <CountdownTimer storageKey="jvzoo-oto3-timer" durationMinutes={10} />
        </div>

        <div className="bg-primary text-primary-foreground p-6 rounded-lg text-center">
          <p className="text-2xl font-bold mb-2">ONE-TIME OFFER</p>
          <p className="text-4xl font-bold mb-2">Only $97</p>
          <p className="text-sm opacity-90">(Regular price: $297)</p>
        </div>

        <div className="bg-card border rounded-lg p-8 space-y-6">
          <h2 className="text-2xl font-semibold text-center">Agency Package Includes:</h2>
          
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <Check className="w-6 h-6 text-primary mt-1 flex-shrink-0" />
              <div>
                <p className="font-semibold">Everything in Premium Unlimited</p>
                <p className="text-sm text-muted-foreground">Unlimited funnels, exports, templates, and all previous features</p>
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
                <p className="text-sm text-muted-foreground">Organize and manage multiple client projects efficiently</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Check className="w-6 h-6 text-primary mt-1 flex-shrink-0" />
              <div>
                <p className="font-semibold">Verified Agency Badge</p>
                <p className="text-sm text-muted-foreground">Build instant trust with potential clients</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Check className="w-6 h-6 text-primary mt-1 flex-shrink-0" />
              <div>
                <p className="font-semibold">Priority Support</p>
                <p className="text-sm text-muted-foreground">Jump the queue with VIP support access</p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-muted border border-destructive/20 rounded-lg p-8 space-y-4">
          <h3 className="text-xl font-semibold text-center">Without Agency Package:</h3>
          
          <div className="space-y-3">
            <div className="flex items-start gap-3">
              <X className="w-5 h-5 text-destructive mt-1 flex-shrink-0" />
              <p className="text-sm">No advanced analytics to impress clients</p>
            </div>
            <div className="flex items-start gap-3">
              <X className="w-5 h-5 text-destructive mt-1 flex-shrink-0" />
              <p className="text-sm">Manual client management without dedicated tools</p>
            </div>
            <div className="flex items-start gap-3">
              <X className="w-5 h-5 text-destructive mt-1 flex-shrink-0" />
              <p className="text-sm">No verified agency badge for credibility</p>
            </div>
            <div className="flex items-start gap-3">
              <X className="w-5 h-5 text-destructive mt-1 flex-shrink-0" />
              <p className="text-sm">Standard support queue wait times</p>
            </div>
          </div>
        </div>

        <BonusStack bonuses={bonuses} />
        <TrustBadges />
        <FAQSection faqs={faqs} />

        <div className="text-center space-y-4">
          <div className="flex flex-col items-center gap-2">
            <a href="https://www.jvzoo.com/b/115363/432253/99" data-testid="link-jvzoo-oto3">
              <img src="https://i.jvzoo.com/115363/432253/99" alt="" width="1" height="1" className="absolute" />
              <Button 
                size="lg" 
                className="text-lg px-10 py-6 bg-primary hover:bg-primary/90"
                data-testid="button-upgrade-agency"
              >
                YES! Upgrade to Agency for $97
              </Button>
            </a>
            <p className="text-xs text-muted-foreground italic">
              1-Click Upsell - Charged directly to your payment method
            </p>
          </div>
          <p className="text-sm text-muted-foreground">
            One-time payment - Instant access - 14-day money-back guarantee
          </p>
          <a href="https://www.jvzoo.com/nothanks/432253" className="text-sm text-muted-foreground hover:underline block" data-testid="link-no-thanks-oto3">
            No thanks, I'll keep my current plan
          </a>
        </div>
      </div>

      <JVZooDisclaimer />
      <ExitIntentPopup
        offerName="Agency Package"
        originalPrice={97}
        discountedPrice={87}
        onAccept={() => window.location.href = '/jvzoo/thankyou'}
      />
    </div>
  );
}
