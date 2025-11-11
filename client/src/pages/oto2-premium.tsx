import { Button } from "@/components/ui/button";
import { Check, Zap } from "lucide-react";
import { useEffect } from "react";

export default function OTO2Premium() {
  useEffect(() => {
    const script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = 'https://warriorplus.com/o2/disclaimer/bt2gm2';
    script.defer = true;
    document.body.appendChild(script);

    const trackingPixel = document.createElement('img');
    trackingPixel.src = 'https://warriorplus.com/o2/v/bt2gm2/pfs25p';
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

        {/* Special Offer Box */}
        <div className="bg-primary text-primary-foreground p-6 rounded-lg text-center">
          <p className="text-2xl font-bold mb-2">ONE-TIME UPGRADE OFFER</p>
          <p className="text-4xl font-bold mb-2">Only $67</p>
          <p className="text-sm opacity-90">(Regular price: $147)</p>
        </div>

        {/* Comparison Table */}
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
              <div className="text-center font-bold text-primary">UNLIMITED ∞</div>
            </div>

            <div className="grid grid-cols-3 gap-4 p-4 items-center">
              <div className="text-sm">Exports per Month</div>
              <div className="text-center">100 exports</div>
              <div className="text-center font-bold text-primary">UNLIMITED ∞</div>
            </div>

            <div className="grid grid-cols-3 gap-4 p-4 items-center">
              <div className="text-sm">Client Projects</div>
              <div className="text-center">Limited</div>
              <div className="text-center font-bold text-primary">UNLIMITED ∞</div>
            </div>

            <div className="grid grid-cols-3 gap-4 p-4 items-center">
              <div className="text-sm">Premium Templates</div>
              <div className="text-center">❌</div>
              <div className="text-center font-bold text-primary">✅</div>
            </div>

            <div className="grid grid-cols-3 gap-4 p-4 items-center">
              <div className="text-sm">White Label Branding</div>
              <div className="text-center">✅</div>
              <div className="text-center font-bold text-primary">✅</div>
            </div>
          </div>
        </div>

        {/* Perfect For */}
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

        {/* Urgency */}
        <div className="bg-destructive/10 border border-destructive/20 rounded-lg p-6 text-center">
          <p className="font-semibold text-destructive mb-2">⚠️ This Offer Expires When You Leave This Page</p>
          <p className="text-sm text-muted-foreground">
            If you come back later, Premium Unlimited will cost $147 (not $67)
          </p>
        </div>

        {/* CTA */}
        <div className="text-center space-y-4">
          <div className="flex justify-center">
            <a href="https://warriorplus.com/o2/buy/bt2gm2/pfs25p/mg3bpk" data-testid="button-upgrade-premium">
              <img src="https://warriorplus.com/o2/btn/cn150011000/bt2gm2/pfs25p/449771" alt="YES! Upgrade to Premium for $67" />
            </a>
          </div>
          <p className="text-sm text-muted-foreground">
            One-time payment • Instant access • 14-day money-back guarantee
          </p>
          <a href="https://warriorplus.com/o/nothanks/pfs25p" className="text-sm text-muted-foreground hover:underline block">
            No thanks, White Label is enough for me
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
