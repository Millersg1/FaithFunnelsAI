import { Button } from "@/components/ui/button";
import { Check, AlertCircle, X } from "lucide-react";

export default function DS3AgencyLite() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted">
      <div className="max-w-4xl mx-auto px-4 py-12 space-y-8">
        {/* Headline */}
        <div className="text-center space-y-4">
          <div className="inline-flex items-center gap-2 bg-destructive/10 text-destructive px-4 py-2 rounded-full mb-4">
            <AlertCircle className="w-5 h-5" />
            <span className="font-semibold">FINAL OFFER</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold">
            Last Chance: <span className="text-primary">Agency Lite</span> for $67
          </h1>
          <p className="text-xl text-muted-foreground">
            Get most agency features at a special downsell price!
          </p>
        </div>

        {/* Special Offer Box */}
        <div className="bg-gradient-to-r from-amber-600/90 to-primary text-primary-foreground p-6 rounded-lg text-center">
          <p className="text-2xl font-bold mb-2">FINAL DOWNSELL PRICE</p>
          <p className="text-4xl font-bold mb-2">Only $67</p>
          <p className="text-sm opacity-90">(Regular: $97 | You Save: $30)</p>
        </div>

        {/* What's Included */}
        <div className="bg-card border rounded-lg p-8 space-y-6">
          <h2 className="text-2xl font-semibold text-center">Agency Lite Includes:</h2>
          
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <Check className="w-6 h-6 text-primary mt-1 flex-shrink-0" />
              <div>
                <p className="font-semibold">Everything from Premium Unlimited</p>
                <p className="text-sm text-muted-foreground">Unlimited funnels, exports, and client projects</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Check className="w-6 h-6 text-primary mt-1 flex-shrink-0" />
              <div>
                <p className="font-semibold">Priority Feature Access</p>
                <p className="text-sm text-muted-foreground">Early access to new features</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Check className="w-6 h-6 text-primary mt-1 flex-shrink-0" />
              <div>
                <p className="font-semibold">Client Management Tools</p>
                <p className="text-sm text-muted-foreground">Organize unlimited client projects</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Check className="w-6 h-6 text-primary mt-1 flex-shrink-0" />
              <div>
                <p className="font-semibold">Agency Badge</p>
                <p className="text-sm text-muted-foreground">Verified Faith Funnels AI agency partner status</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Check className="w-6 h-6 text-primary mt-1 flex-shrink-0" />
              <div>
                <p className="font-semibold">Premium Templates</p>
                <p className="text-sm text-muted-foreground">All exclusive designs included</p>
              </div>
            </div>
          </div>
        </div>

        {/* What's Missing */}
        <div className="bg-muted border rounded-lg p-6">
          <h3 className="text-lg font-semibold mb-4 text-center">Agency vs Agency Lite</h3>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <p className="font-semibold text-center mb-3">Agency Package ($97)</p>
              <div className="space-y-2 text-sm">
                <div className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                  <p>Advanced Analytics Dashboard</p>
                </div>
                <div className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                  <p>Detailed Performance Reports</p>
                </div>
                <div className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                  <p>All other agency features</p>
                </div>
              </div>
            </div>

            <div>
              <p className="font-semibold text-center mb-3 text-primary">Agency Lite ($67)</p>
              <div className="space-y-2 text-sm">
                <div className="flex items-start gap-2">
                  <X className="w-4 h-4 text-muted-foreground mt-0.5 flex-shrink-0" />
                  <p className="text-muted-foreground">No Advanced Analytics</p>
                </div>
                <div className="flex items-start gap-2">
                  <X className="w-4 h-4 text-muted-foreground mt-0.5 flex-shrink-0" />
                  <p className="text-muted-foreground">No Performance Reports</p>
                </div>
                <div className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                  <p>All other agency features ✅</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Perfect For */}
        <div className="bg-primary/5 border border-primary/20 rounded-lg p-6">
          <h3 className="text-lg font-semibold mb-3 text-center">Perfect If You:</h3>
          <div className="grid md:grid-cols-2 gap-3 text-sm">
            <div className="flex items-start gap-2">
              <Check className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
              <p>Want agency features at lower cost</p>
            </div>
            <div className="flex items-start gap-2">
              <Check className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
              <p>Don't need advanced analytics yet</p>
            </div>
            <div className="flex items-start gap-2">
              <Check className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
              <p>Growing your agency business</p>
            </div>
            <div className="flex items-start gap-2">
              <Check className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
              <p>Want unlimited everything + agency badge</p>
            </div>
          </div>
        </div>

        {/* ROI */}
        <div className="bg-card border rounded-lg p-6">
          <h3 className="text-lg font-semibold mb-3 text-center">This Pays for Itself Immediately</h3>
          <div className="text-center space-y-2">
            <p className="text-sm">Charge $300-$500 per client funnel</p>
            <p className="text-2xl font-bold text-primary">Your investment: $67 (one-time)</p>
            <p className="text-sm text-muted-foreground">Just 1 client project = full ROI + profit forever!</p>
          </div>
        </div>

        {/* Final Urgency */}
        <div className="bg-destructive/10 border border-destructive/20 rounded-lg p-6 text-center">
          <p className="font-semibold text-destructive mb-2">⚠️ This is Your LAST Chance</p>
          <p className="text-sm text-muted-foreground">
            Leave this page and Agency Lite will cost $97. This $67 price expires in 60 seconds!
          </p>
        </div>

        {/* CTA */}
        <div className="text-center space-y-4">
          <Button 
            size="lg" 
            className="w-full max-w-md text-lg h-14 bg-gradient-to-r from-amber-600 to-primary hover:from-amber-700 hover:to-primary/90"
            data-testid="button-downsell-agency-lite"
          >
            YES! Get Agency Lite for $67
          </Button>
          <p className="text-sm text-muted-foreground">
            One-time payment • Instant access • 14-day money-back guarantee
          </p>
          <a href="#" className="text-sm text-muted-foreground hover:underline block">
            No thanks, I'll stick with Premium
          </a>
        </div>
      </div>
    </div>
  );
}
