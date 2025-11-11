import { Shield, Lock, RefreshCcw, CheckCircle2 } from "lucide-react";

export function TrustBadges() {
  return (
    <div className="bg-card border rounded-lg p-6">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        <div className="flex flex-col items-center text-center gap-2">
          <div className="bg-primary/10 rounded-full p-3">
            <Shield className="w-6 h-6 text-primary" />
          </div>
          <p className="text-xs font-semibold">Secure Checkout</p>
        </div>

        <div className="flex flex-col items-center text-center gap-2">
          <div className="bg-primary/10 rounded-full p-3">
            <RefreshCcw className="w-6 h-6 text-primary" />
          </div>
          <p className="text-xs font-semibold">14-Day Guarantee</p>
        </div>

        <div className="flex flex-col items-center text-center gap-2">
          <div className="bg-primary/10 rounded-full p-3">
            <Lock className="w-6 h-6 text-primary" />
          </div>
          <p className="text-xs font-semibold">SSL Encrypted</p>
        </div>

        <div className="flex flex-col items-center text-center gap-2">
          <div className="bg-primary/10 rounded-full p-3">
            <CheckCircle2 className="w-6 h-6 text-primary" />
          </div>
          <p className="text-xs font-semibold">Instant Access</p>
        </div>
      </div>

      <div className="mt-6 pt-6 border-t text-center">
        <p className="text-sm font-bold text-primary mb-2">100% Money-Back Guarantee</p>
        <p className="text-xs text-muted-foreground">
          Try it risk-free for 14 days. Not satisfied? Get a full refund, no questions asked.
        </p>
      </div>
    </div>
  );
}
