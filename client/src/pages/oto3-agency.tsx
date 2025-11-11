import { Button } from "@/components/ui/button";
import { Check, Crown } from "lucide-react";
import { useEffect } from "react";
import { CountdownTimer } from "@/components/countdown-timer";

export default function OTO3Agency() {
  useEffect(() => {
    const script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = 'https://warriorplus.com/o2/disclaimer/bt2gm2';
    script.defer = true;
    document.body.appendChild(script);

    const trackingPixel = document.createElement('img');
    trackingPixel.src = 'https://warriorplus.com/o2/v/bt2gm2/xnv8wv';
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

        {/* Countdown Timer */}
        <div className="flex justify-center">
          <CountdownTimer storageKey="oto3-timer" durationMinutes={10} />
        </div>

        {/* Special Offer Box */}
        <div className="bg-gradient-to-r from-amber-600 to-primary text-primary-foreground p-6 rounded-lg text-center">
          <p className="text-2xl font-bold mb-2">FINAL ONE-TIME OFFER</p>
          <p className="text-4xl font-bold mb-2">Only $97</p>
          <p className="text-sm opacity-90">(Regular price: $247)</p>
        </div>

        {/* What's Included */}
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

        {/* ROI Calculator */}
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
            Charge just <span className="font-bold">$300-$500 per client</span> for funnel creation services → 
            This upgrade pays for itself immediately!
          </p>
        </div>

        {/* Who This Is For */}
        <div className="bg-card border rounded-lg p-8 space-y-4">
          <h3 className="text-xl font-semibold text-center">Who Should Get the Agency Package?</h3>
          
          <div className="space-y-3">
            <div className="flex items-start gap-3">
              <Check className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
              <p className="text-sm">Digital marketing agencies serving multiple clients</p>
            </div>
            <div className="flex items-start gap-3">
              <Check className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
              <p className="text-sm">Freelancers building a funnel creation service business</p>
            </div>
            <div className="flex items-start gap-3">
              <Check className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
              <p className="text-sm">Church consultants helping multiple ministries</p>
            </div>
            <div className="flex items-start gap-3">
              <Check className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
              <p className="text-sm">Anyone serious about building a faith-based marketing business</p>
            </div>
          </div>
        </div>

        {/* Final Urgency */}
        <div className="bg-destructive/10 border border-destructive/20 rounded-lg p-6 text-center">
          <p className="font-semibold text-destructive mb-2">🔥 Last Chance - This Offer Disappears Forever</p>
          <p className="text-sm text-muted-foreground">
            You'll never see this price again. Agency Package will be $247 if you come back later.
          </p>
        </div>

        {/* CTA */}
        <div className="text-center space-y-4">
          <div className="flex justify-center">
            <a href="https://warriorplus.com/o2/buy/bt2gm2/xnv8wv/d7c278" data-testid="button-upgrade-agency">
              <img src="https://warriorplus.com/o2/btn/cn150011001/bt2gm2/xnv8wv/449791" alt="YES! Give Me the Agency Package for $97" />
            </a>
          </div>
          <p className="text-sm text-muted-foreground">
            One-time payment • Instant access • 14-day money-back guarantee
          </p>
          <a href="https://warriorplus.com/o/nothanks/xnv8wv" className="text-sm text-muted-foreground hover:underline block">
            No thanks, I don't need agency features
          </a>
        </div>

        {/* Disclaimer */}
        <div className="py-8">
          <div className="wplus_spdisclaimer max-w-4xl mx-auto"></div>
        </div>
      </div>
    </div>
  );
}
