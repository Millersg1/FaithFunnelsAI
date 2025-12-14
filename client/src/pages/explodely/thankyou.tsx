import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle2, Download, BookOpen, Palette, Sparkles } from "lucide-react";
import { Link } from "wouter";
import logoImage from "@assets/generated_images/faith_funnels_ai_logo.png";

export default function ExplodelyThankYou() {
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
        </div>
      </header>

      <main className="container mx-auto px-4 py-16">
        <div className="max-w-3xl mx-auto text-center space-y-8">
          <div className="flex justify-center">
            <div className="bg-green-100 dark:bg-green-900/30 rounded-full p-6">
              <CheckCircle2 className="h-20 w-20 text-green-600 dark:text-green-400" />
            </div>
          </div>

          <div className="space-y-4">
            <h1 className="text-4xl lg:text-5xl font-bold text-primary">
              Thank You For Your Purchase!
            </h1>
            <p className="text-xl text-muted-foreground">
              Your order has been confirmed. You now have full access to Faith Funnels AI!
            </p>
          </div>

          <Card className="border-2 border-primary/20 bg-gradient-to-br from-primary/5 to-accent/5">
            <CardContent className="p-8 space-y-6">
              <h2 className="text-2xl font-bold">Your Access Details</h2>
              
              <div className="bg-background rounded-lg p-6 border space-y-4">
                <p className="text-lg">
                  Click the button below to access your Faith Funnels AI dashboard and start building your first funnel!
                </p>
                
                <Link href="/app">
                  <Button size="lg" className="text-lg px-10 py-6" data-testid="button-access-dashboard">
                    Access Your Dashboard Now
                  </Button>
                </Link>
              </div>

              <div className="text-left space-y-4 pt-4 border-t">
                <h3 className="text-xl font-semibold text-center">What You Can Do Now:</h3>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="flex items-start gap-3 p-4 bg-background rounded-lg border">
                    <Sparkles className="h-6 w-6 text-primary mt-0.5" />
                    <div>
                      <h4 className="font-semibold">Create Funnels</h4>
                      <p className="text-sm text-muted-foreground">Build complete sales funnels with OTOs and downsells</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 p-4 bg-background rounded-lg border">
                    <BookOpen className="h-6 w-6 text-primary mt-0.5" />
                    <div>
                      <h4 className="font-semibold">Add Bible Verses</h4>
                      <p className="text-sm text-muted-foreground">Integrate inspiring verses with custom CTAs</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 p-4 bg-background rounded-lg border">
                    <Palette className="h-6 w-6 text-primary mt-0.5" />
                    <div>
                      <h4 className="font-semibold">Customize Themes</h4>
                      <p className="text-sm text-muted-foreground">Brand your funnels with beautiful colors</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 p-4 bg-background rounded-lg border">
                    <Download className="h-6 w-6 text-primary mt-0.5" />
                    <div>
                      <h4 className="font-semibold">Export HTML/ZIP</h4>
                      <p className="text-sm text-muted-foreground">Download ready-to-upload funnel packages</p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="bg-muted/50 rounded-lg p-6 border space-y-3">
            <h3 className="font-semibold text-lg">Need Help?</h3>
            <p className="text-muted-foreground">
              If you have any questions, contact us at{" "}
              <a href="mailto:support@faithfunnelsai.com" className="text-primary hover:underline">
                support@faithfunnelsai.com
              </a>
            </p>
          </div>

          <div className="pt-8">
            <p className="text-lg italic text-muted-foreground bg-gradient-to-r from-primary/10 to-accent/10 rounded-lg px-6 py-4 inline-block border border-primary/20">
              "For I know the plans I have for you," declares the Lord - Jeremiah 29:11
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
