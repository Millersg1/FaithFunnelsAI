import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CheckCircle2, ExternalLink, Shield, Star, Lock, Loader2 } from "lucide-react";
import { Link, useLocation } from "wouter";
import logoImage from "@assets/generated_images/faith_funnels_ai_logo.png";
import { useToast } from "@/hooks/use-toast";

export default function JVZooReview() {
  const [token, setToken] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [, setLocation] = useLocation();
  const { toast } = useToast();

  const handleReviewLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!token.trim()) {
      toast({
        title: "Token Required",
        description: "Please enter the review access token.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    try {
      const response = await fetch("/api/auth/review-login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token: token.trim() }),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        toast({
          title: "Access Granted",
          description: "Redirecting to dashboard...",
        });
        setLocation("/app");
      } else {
        toast({
          title: "Access Denied",
          description: data.message || "Invalid review token.",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to authenticate. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/30">
      <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img 
              src={logoImage} 
              alt="Faith Funnels AI Logo" 
              className="h-14 w-14 object-contain"
            />
            <span className="font-semibold text-lg">Faith Funnels AI</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Shield className="h-4 w-4" />
            <span>JVZoo Reviewer Access</span>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-16">
        <div className="max-w-3xl mx-auto text-center space-y-8">
          <div className="flex justify-center">
            <div className="bg-primary/10 rounded-full p-6">
              <Star className="h-20 w-20 text-primary" />
            </div>
          </div>

          <div className="space-y-4">
            <div className="inline-block bg-primary/10 border border-primary/30 rounded-full px-6 py-2">
              <span className="text-sm font-semibold text-primary">
                JVZOO REVIEWER DEMO ACCESS
              </span>
            </div>
            <h1 className="text-4xl lg:text-5xl font-bold">
              Welcome, JVZoo Reviewer!
            </h1>
            <p className="text-xl text-muted-foreground">
              Thank you for taking the time to review Faith Funnels AI. 
              Enter your review access token below to get full access.
            </p>
          </div>

          <Card className="border-2 border-primary/20 bg-gradient-to-br from-primary/5 to-accent/5 max-w-md mx-auto">
            <CardContent className="p-8 space-y-6">
              <div className="flex items-center justify-center gap-2">
                <Lock className="h-5 w-5 text-primary" />
                <h2 className="text-xl font-bold">Review Access Login</h2>
              </div>
              
              <form onSubmit={handleReviewLogin} className="space-y-4">
                <div className="space-y-2 text-left">
                  <Label htmlFor="token">Access Token</Label>
                  <Input
                    id="token"
                    type="password"
                    placeholder="Enter your review token"
                    value={token}
                    onChange={(e) => setToken(e.target.value)}
                    data-testid="input-review-token"
                  />
                </div>
                <Button 
                  type="submit" 
                  className="w-full" 
                  size="lg"
                  disabled={isLoading}
                  data-testid="button-review-login"
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Authenticating...
                    </>
                  ) : (
                    "Access Dashboard"
                  )}
                </Button>
              </form>
              
              <p className="text-xs text-muted-foreground">
                The access token was provided in your JVZoo review instructions.
              </p>
            </CardContent>
          </Card>

          <Card className="border-2 border-primary/20 bg-gradient-to-br from-primary/5 to-accent/5">
            <CardContent className="p-8 space-y-6">
              <h2 className="text-2xl font-bold">Sales Pages to Review</h2>
              <p className="text-muted-foreground">These pages are publicly accessible - no login required:</p>
              
              <div className="space-y-4">
                <div className="bg-background rounded-lg p-4 border flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <CheckCircle2 className="h-5 w-5 text-primary" />
                    <div className="text-left">
                      <p className="font-semibold">JVZoo Sales Page</p>
                      <p className="text-sm text-muted-foreground">View the main sales page for JVZoo</p>
                    </div>
                  </div>
                  <Link href="/jvzoo">
                    <Button variant="outline" data-testid="button-sales-page">
                      View Sales Page <ExternalLink className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                </div>

                <div className="bg-background rounded-lg p-4 border flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <CheckCircle2 className="h-5 w-5 text-primary" />
                    <div className="text-left">
                      <p className="font-semibold">OTO1 - White Label ($47)</p>
                      <p className="text-sm text-muted-foreground">Rebrand as your own business</p>
                    </div>
                  </div>
                  <Link href="/jvzoo/oto1">
                    <Button variant="outline" size="sm" data-testid="button-oto1">
                      View OTO1
                    </Button>
                  </Link>
                </div>

                <div className="bg-background rounded-lg p-4 border flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <CheckCircle2 className="h-5 w-5 text-primary" />
                    <div className="text-left">
                      <p className="font-semibold">OTO2 - Premium ($67)</p>
                      <p className="text-sm text-muted-foreground">Unlimited funnels + premium templates</p>
                    </div>
                  </div>
                  <Link href="/jvzoo/oto2">
                    <Button variant="outline" size="sm" data-testid="button-oto2">
                      View OTO2
                    </Button>
                  </Link>
                </div>

                <div className="bg-background rounded-lg p-4 border flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <CheckCircle2 className="h-5 w-5 text-primary" />
                    <div className="text-left">
                      <p className="font-semibold">OTO3 - Agency ($97)</p>
                      <p className="text-sm text-muted-foreground">Full agency package with analytics</p>
                    </div>
                  </div>
                  <Link href="/jvzoo/oto3">
                    <Button variant="outline" size="sm" data-testid="button-oto3">
                      View OTO3
                    </Button>
                  </Link>
                </div>

                <div className="bg-background rounded-lg p-4 border flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <CheckCircle2 className="h-5 w-5 text-primary" />
                    <div className="text-left">
                      <p className="font-semibold">Order Bump - Bible Verses ($9)</p>
                      <p className="text-sm text-muted-foreground">500 extra Bible verses</p>
                    </div>
                  </div>
                  <Link href="/jvzoo/orderbump">
                    <Button variant="outline" size="sm" data-testid="button-orderbump">
                      View Order Bump
                    </Button>
                  </Link>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border bg-muted/50">
            <CardContent className="p-6 space-y-4">
              <h3 className="text-xl font-bold">Product Overview</h3>
              <div className="text-left space-y-3 text-muted-foreground">
                <p>
                  <strong className="text-foreground">Faith Funnels AI</strong> is a complete SaaS dashboard for creating 
                  faith-based sales funnels with Bible verse integration, custom themes, and HTML/ZIP export.
                </p>
                <p>
                  <strong className="text-foreground">Front-End Price:</strong> $17 (Regular $47)
                </p>
                <p>
                  <strong className="text-foreground">Funnel Flow:</strong> FE → Order Bump → OTO1 → DS1 (if declined) → OTO2 → DS2 (if declined) → OTO3 → DS3 (if declined) → Thank You
                </p>
                <p>
                  <strong className="text-foreground">License:</strong> Extended License with White Label Rights. 
                  Buyers can rebrand and use for client projects. NO PLR (cannot resell the software itself).
                </p>
                <p>
                  <strong className="text-foreground">Refund Policy:</strong> 14-Day Money Back Guarantee
                </p>
              </div>
            </CardContent>
          </Card>

          <Card className="border bg-primary/5">
            <CardContent className="p-6 space-y-4">
              <h3 className="text-xl font-bold">Key Features to Test</h3>
              <div className="grid sm:grid-cols-2 gap-4 text-left">
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="h-5 w-5 text-primary mt-0.5" />
                  <span>Create and edit funnels with multiple stages</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="h-5 w-5 text-primary mt-0.5" />
                  <span>Add Bible verses with custom CTAs</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="h-5 w-5 text-primary mt-0.5" />
                  <span>Customize themes and colors</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="h-5 w-5 text-primary mt-0.5" />
                  <span>Export as HTML/ZIP package</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="h-5 w-5 text-primary mt-0.5" />
                  <span>AI chatbot for support</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="h-5 w-5 text-primary mt-0.5" />
                  <span>White label admin settings</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="bg-muted/50 rounded-lg p-6 border space-y-3">
            <h3 className="font-semibold text-lg">Questions or Support?</h3>
            <p className="text-muted-foreground">
              Contact us at{" "}
              <a href="mailto:support@faithfunnelsai.com" className="text-primary hover:underline">
                support@faithfunnelsai.com
              </a>
            </p>
          </div>
        </div>
      </main>

      <footer className="border-t py-8 bg-muted/30 mt-16">
        <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} Faith Funnels AI. All rights reserved.</p>
          <p className="mt-2">
            <Link href="/terms" className="hover:underline">Terms</Link>
            {" · "}
            <Link href="/privacy" className="hover:underline">Privacy</Link>
            {" · "}
            <Link href="/refund" className="hover:underline">Refund Policy</Link>
          </p>
        </div>
      </footer>
    </div>
  );
}
