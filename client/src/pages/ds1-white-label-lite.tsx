import { Button } from "@/components/ui/button";
import { Check, AlertCircle } from "lucide-react";

export default function DS1WhiteLabelLite() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted">
      <div className="max-w-4xl mx-auto px-4 py-12 space-y-8">
        {/* Headline */}
        <div className="text-center space-y-4">
          <div className="inline-flex items-center gap-2 bg-destructive/10 text-destructive px-4 py-2 rounded-full mb-4">
            <AlertCircle className="w-5 h-5" />
            <span className="font-semibold">WAIT - SPECIAL OFFER</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold">
            Okay, How About <span className="text-primary">White Label Lite</span>?
          </h1>
          <p className="text-xl text-muted-foreground">
            Get white label rights at a special downsell price - just $27!
          </p>
        </div>

        {/* Special Offer Box */}
        <div className="bg-primary text-primary-foreground p-6 rounded-lg text-center">
          <p className="text-2xl font-bold mb-2">SPECIAL DOWNSELL PRICE</p>
          <p className="text-4xl font-bold mb-2">Only $27</p>
          <p className="text-sm opacity-90">(Regular: $47 | You Save: $20)</p>
        </div>

        {/* What's Included */}
        <div className="bg-card border rounded-lg p-8 space-y-6">
          <h2 className="text-2xl font-semibold text-center">White Label Lite Includes:</h2>
          
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <Check className="w-6 h-6 text-primary mt-1 flex-shrink-0" />
              <div>
                <p className="font-semibold">White Label Branding</p>
                <p className="text-sm text-muted-foreground">Your business name, logo, and colors</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Check className="w-6 h-6 text-primary mt-1 flex-shrink-0" />
              <div>
                <p className="font-semibold">Extended License for Client Services</p>
                <p className="text-sm text-muted-foreground">Create funnels for clients and charge for your services</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Check className="w-6 h-6 text-primary mt-1 flex-shrink-0" />
              <div>
                <p className="font-semibold">5 Funnels</p>
                <p className="text-sm text-muted-foreground">Perfect for freelancers just starting out</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Check className="w-6 h-6 text-primary mt-1 flex-shrink-0" />
              <div>
                <p className="font-semibold">50 Exports</p>
                <p className="text-sm text-muted-foreground">Plenty for your first few clients</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Check className="w-6 h-6 text-primary mt-1 flex-shrink-0" />
              <div>
                <p className="font-semibold">Custom Domain Support</p>
                <p className="text-sm text-muted-foreground">Use your own domain instead of faithfunnelsai.com</p>
              </div>
            </div>
          </div>
        </div>

        {/* Comparison */}
        <div className="bg-muted border rounded-lg p-6">
          <h3 className="text-lg font-semibold mb-4 text-center">White Label vs White Label Lite</h3>
          
          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <p className="font-semibold text-center">White Label ($47)</p>
              <ul className="text-sm space-y-1">
                <li>✅ 10 funnels</li>
                <li>✅ 100 exports</li>
                <li>✅ White label branding</li>
                <li>✅ Client services</li>
              </ul>
            </div>
            <div className="space-y-2">
              <p className="font-semibold text-center text-primary">White Label Lite ($27)</p>
              <ul className="text-sm space-y-1">
                <li>✅ 5 funnels</li>
                <li>✅ 50 exports</li>
                <li>✅ White label branding</li>
                <li>✅ Client services</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Perfect For */}
        <div className="bg-card border rounded-lg p-6">
          <h3 className="text-lg font-semibold mb-3 text-center">Perfect for:</h3>
          <div className="grid md:grid-cols-2 gap-3 text-sm">
            <div className="flex items-start gap-2">
              <Check className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
              <p>Freelancers just starting out</p>
            </div>
            <div className="flex items-start gap-2">
              <Check className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
              <p>Testing client services first</p>
            </div>
            <div className="flex items-start gap-2">
              <Check className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
              <p>Small budget but want branding</p>
            </div>
            <div className="flex items-start gap-2">
              <Check className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
              <p>Serving 2-3 clients initially</p>
            </div>
          </div>
        </div>

        {/* Urgency */}
        <div className="bg-destructive/10 border border-destructive/20 rounded-lg p-6 text-center">
          <p className="font-semibold text-destructive mb-2">⚠️ This $27 Price Disappears in 60 Seconds</p>
          <p className="text-sm text-muted-foreground">
            If you leave this page, White Label Lite will cost $47. Act now to save $20!
          </p>
        </div>

        {/* CTA */}
        <div className="text-center space-y-4">
          <Button 
            size="lg" 
            className="w-full max-w-md text-lg h-14"
            data-testid="button-downsell-white-label-lite"
          >
            YES! Get White Label Lite for $27
          </Button>
          <p className="text-sm text-muted-foreground">
            One-time payment • Instant access • 14-day money-back guarantee
          </p>
          <a href="#" className="text-sm text-muted-foreground hover:underline block">
            No thanks, I'll continue with Basic only
          </a>
        </div>
      </div>
    </div>
  );
}
