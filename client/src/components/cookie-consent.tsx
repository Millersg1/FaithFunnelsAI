import { useState, useEffect, createContext, useContext } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { X, Cookie, Shield, Settings } from "lucide-react";
import { Link } from "wouter";

type CookieConsentContextType = {
  openBanner: () => void;
};

const CookieConsentContext = createContext<CookieConsentContextType | null>(null);

export function useCookieConsent() {
  const context = useContext(CookieConsentContext);
  return context;
}

export function CookieConsentProvider({ children }: { children: React.ReactNode }) {
  const [showBanner, setShowBanner] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem("cookie-consent");
    if (!consent) {
      const timer = setTimeout(() => setShowBanner(true), 1000);
      return () => clearTimeout(timer);
    }
  }, []);

  const openBanner = () => setShowBanner(true);

  const acceptAll = () => {
    localStorage.setItem("cookie-consent", JSON.stringify({ 
      essential: true, 
      analytics: true, 
      marketing: true,
      timestamp: new Date().toISOString()
    }));
    setShowBanner(false);
  };

  const acceptEssential = () => {
    localStorage.setItem("cookie-consent", JSON.stringify({ 
      essential: true, 
      analytics: false, 
      marketing: false,
      timestamp: new Date().toISOString()
    }));
    setShowBanner(false);
  };

  const declineAll = () => {
    localStorage.setItem("cookie-consent", JSON.stringify({ 
      essential: true, 
      analytics: false, 
      marketing: false,
      timestamp: new Date().toISOString()
    }));
    setShowBanner(false);
  };

  return (
    <CookieConsentContext.Provider value={{ openBanner }}>
      {children}
      {showBanner && (
        <div className="fixed bottom-0 left-0 right-0 z-[100] p-4 bg-background/80 backdrop-blur-sm border-t" data-testid="cookie-consent-banner">
          <div className="container mx-auto max-w-4xl">
            <Card className="shadow-lg">
              <CardContent className="p-4 md:p-6">
                <div className="flex flex-col md:flex-row gap-4 items-start md:items-center">
                  <div className="flex items-start gap-3 flex-1">
                    <Cookie className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
                    <div className="space-y-2">
                      <h3 className="font-semibold text-sm md:text-base">Cookie Preferences</h3>
                      <p className="text-xs md:text-sm text-muted-foreground">
                        We use cookies to enhance your experience, analyze site traffic, and for marketing purposes. 
                        By clicking "Accept All", you consent to our use of cookies. You can manage your preferences 
                        or withdraw consent at any time using the "Manage Cookies" link in our footer.{" "}
                        <Link href="/privacy" className="text-primary hover:underline">
                          Read our Privacy Policy
                        </Link>
                      </p>
                      <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <Shield className="h-3 w-3" />
                        <span>GDPR & CCPA Compliant</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-2 w-full md:w-auto">
                    <Button 
                      variant="outline" 
                      size="sm" 
                      onClick={declineAll}
                      data-testid="button-decline-cookies"
                    >
                      Decline All
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      onClick={acceptEssential}
                      data-testid="button-essential-cookies"
                    >
                      Essential Only
                    </Button>
                    <Button 
                      size="sm" 
                      onClick={acceptAll}
                      data-testid="button-accept-cookies"
                    >
                      Accept All
                    </Button>
                  </div>
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    onClick={acceptEssential}
                    className="absolute top-2 right-2 md:relative md:top-0 md:right-0"
                    data-testid="button-close-cookies"
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      )}
    </CookieConsentContext.Provider>
  );
}

export function ManageCookiesButton() {
  const context = useCookieConsent();
  
  if (!context) return null;

  return (
    <button 
      onClick={context.openBanner}
      className="text-sm text-muted-foreground hover:underline hover:text-foreground inline-flex items-center gap-1"
      data-testid="button-manage-cookies"
    >
      <Settings className="h-3 w-3" />
      Manage Cookies
    </button>
  );
}

export function CookieConsent() {
  return null;
}
