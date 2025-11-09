import { Button } from "@/components/ui/button";
import { Check, X } from "lucide-react";

export default function OTO1WhiteLabel() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted">
      <div className="max-w-4xl mx-auto px-4 py-12 space-y-8">
        {/* Headline */}
        <div className="text-center space-y-4">
          <h1 className="text-4xl md:text-5xl font-bold">
            Wait! Upgrade to <span className="text-primary">White Label Rights</span>
          </h1>
          <p className="text-xl text-muted-foreground">
            Rebrand Faith Funnels AI as YOUR business and create funnels for clients!
          </p>
        </div>

        {/* Special Offer Box */}
        <div className="bg-primary text-primary-foreground p-6 rounded-lg text-center">
          <p className="text-2xl font-bold mb-2">ONE-TIME OFFER</p>
          <p className="text-4xl font-bold mb-2">Only $47</p>
          <p className="text-sm opacity-90">(Regular price: $97)</p>
        </div>

        {/* What You Get */}
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

        {/* Without White Label */}
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

        {/* CTA */}
        <div className="text-center space-y-4">
          <Button 
            size="lg" 
            className="w-full max-w-md text-lg h-14"
            data-testid="button-upgrade-white-label"
          >
            YES! Upgrade to White Label for $47
          </Button>
          <p className="text-sm text-muted-foreground">
            One-time payment • Instant access • 14-day money-back guarantee
          </p>
          <a href="#" className="text-sm text-muted-foreground hover:underline block">
            No thanks, I'll stick with Basic tier
          </a>
        </div>
      </div>
    </div>
  );
}
