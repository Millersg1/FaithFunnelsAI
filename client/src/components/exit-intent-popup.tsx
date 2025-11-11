import { useEffect, useState } from "react";
import { X, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ExitIntentPopupProps {
  offerName: string;
  originalPrice: number;
  discountedPrice: number;
  onAccept: () => void;
}

export function ExitIntentPopup({ offerName, originalPrice, discountedPrice, onAccept }: ExitIntentPopupProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [hasShown, setHasShown] = useState(false);

  useEffect(() => {
    const handleMouseLeave = (e: MouseEvent) => {
      if (e.clientY <= 0 && !hasShown) {
        setIsVisible(true);
        setHasShown(true);
      }
    };

    document.addEventListener('mouseleave', handleMouseLeave);
    return () => document.removeEventListener('mouseleave', handleMouseLeave);
  }, [hasShown]);

  if (!isVisible) return null;

  const savings = originalPrice - discountedPrice;

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-in fade-in duration-300">
      <div className="bg-background border-4 border-destructive rounded-lg max-w-lg w-full p-8 relative animate-in zoom-in duration-300">
        <button
          onClick={() => setIsVisible(false)}
          className="absolute top-4 right-4 text-muted-foreground hover:text-foreground"
          data-testid="button-close-exit-popup"
        >
          <X className="w-6 h-6" />
        </button>

        <div className="text-center space-y-6">
          <div className="flex justify-center">
            <AlertCircle className="w-16 h-16 text-destructive animate-pulse" />
          </div>

          <div>
            <h2 className="text-3xl font-bold mb-2">WAIT! Before You Go...</h2>
            <p className="text-lg text-muted-foreground">
              Let me sweeten the deal for you!
            </p>
          </div>

          <div className="bg-gradient-to-r from-destructive/10 to-primary/10 border-2 border-destructive/20 rounded-lg p-6">
            <p className="text-sm font-semibold text-destructive mb-2">SPECIAL EXIT DISCOUNT</p>
            <p className="text-4xl font-bold mb-1">Save an Extra ${savings}</p>
            <p className="text-sm text-muted-foreground">on {offerName}</p>
          </div>

          <div className="space-y-3">
            <p className="text-sm text-muted-foreground">
              This is a <span className="font-bold text-foreground">one-time offer</span> that expires in 2 minutes
            </p>
            
            <Button
              size="lg"
              className="w-full text-lg h-14"
              onClick={onAccept}
              data-testid="button-accept-exit-offer"
            >
              YES! Give Me This Deal Now
            </Button>

            <button
              onClick={() => setIsVisible(false)}
              className="text-sm text-muted-foreground hover:underline block w-full"
            >
              No thanks, I'll pass on this discount
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
