import { Button } from "@/components/ui/button";
import { Check, AlertCircle } from "lucide-react";

export default function DS2PremiumLite() {
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

        {/* CTA */}
        <div className="text-center space-y-4">
          <Button 
            size="lg" 
            className="w-full max-w-md text-lg h-14"
            data-testid="button-downsell-premium-lite"
          >
            YES! Get Premium Lite for $47
          </Button>
          <p className="text-sm text-muted-foreground">
            One-time payment • Instant access • 14-day money-back guarantee
          </p>
          <a href="#" className="text-sm text-muted-foreground hover:underline block">
            No thanks, I'll stick with White Label
          </a>
        </div>
      </div>
    </div>
  );
}
