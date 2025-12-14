import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle2, DollarSign, Users, TrendingUp, Mail } from "lucide-react";
import { Link } from "wouter";
import logoImage from "@assets/generated_images/faith_funnels_ai_logo.png";

export default function Affiliates() {
  const commissions = [
    { product: "Front End", price: "$17", commission: "50%", earnings: "$8.50" },
    { product: "OTO1 - White Label", price: "$47", commission: "50%", earnings: "$23.50" },
    { product: "OTO2 - Premium", price: "$67", commission: "50%", earnings: "$33.50" },
    { product: "OTO3 - Agency", price: "$97", commission: "50%", earnings: "$48.50" },
  ];

  const benefits = [
    "50% commissions on all products",
    "Complete funnel with 3 upsells",
    "High converting sales pages",
    "Low refund rates",
    "Unique untapped niche",
    "Professional promotional materials",
    "Real-time tracking and analytics",
    "Weekly payouts available",
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/30">
      <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/">
            <div className="flex items-center gap-3 cursor-pointer">
              <img 
                src={logoImage} 
                alt="Faith Funnels AI Logo" 
                className="h-14 w-14 object-contain"
              />
              <span className="font-semibold text-lg">Faith Funnels AI</span>
            </div>
          </Link>
          <Link href="/app">
            <Button variant="default" data-testid="button-launch-app">
              Launch App
            </Button>
          </Link>
        </div>
      </header>

      <main className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto space-y-12">
          <div className="text-center space-y-4">
            <div className="inline-flex items-center gap-2 bg-green-500/10 text-green-600 dark:text-green-400 px-4 py-2 rounded-full">
              <DollarSign className="w-5 h-5" />
              <span className="font-semibold">AFFILIATE PROGRAM</span>
            </div>
            <h1 className="text-4xl lg:text-5xl font-bold">
              Earn 50% Commissions Promoting Faith Funnels AI
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Join our affiliate program and earn generous commissions promoting the first faith-based sales funnel builder.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <Card className="text-center">
              <CardContent className="p-6 space-y-2">
                <DollarSign className="h-12 w-12 text-primary mx-auto" />
                <h3 className="text-2xl font-bold">50%</h3>
                <p className="text-muted-foreground">Commission Rate</p>
              </CardContent>
            </Card>
            <Card className="text-center">
              <CardContent className="p-6 space-y-2">
                <TrendingUp className="h-12 w-12 text-primary mx-auto" />
                <h3 className="text-2xl font-bold">4 Products</h3>
                <p className="text-muted-foreground">Complete Funnel</p>
              </CardContent>
            </Card>
            <Card className="text-center">
              <CardContent className="p-6 space-y-2">
                <Users className="h-12 w-12 text-primary mx-auto" />
                <h3 className="text-2xl font-bold">Untapped</h3>
                <p className="text-muted-foreground">Unique Niche</p>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardContent className="p-8">
              <h2 className="text-2xl font-bold mb-6 text-center">Commission Structure</h2>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-3 px-4">Product</th>
                      <th className="text-left py-3 px-4">Price</th>
                      <th className="text-left py-3 px-4">Commission</th>
                      <th className="text-left py-3 px-4">You Earn</th>
                    </tr>
                  </thead>
                  <tbody>
                    {commissions.map((item, idx) => (
                      <tr key={idx} className="border-b">
                        <td className="py-3 px-4 font-medium">{item.product}</td>
                        <td className="py-3 px-4">{item.price}</td>
                        <td className="py-3 px-4 text-green-600 dark:text-green-400 font-semibold">{item.commission}</td>
                        <td className="py-3 px-4 text-primary font-bold">{item.earnings}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <p className="text-center text-muted-foreground mt-4">
                Earn up to $113.50 per customer who buys the complete funnel!
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-8">
              <h2 className="text-2xl font-bold mb-6 text-center">Why Promote Faith Funnels AI?</h2>
              <div className="grid sm:grid-cols-2 gap-4">
                {benefits.map((benefit, idx) => (
                  <div key={idx} className="flex items-center gap-3">
                    <CheckCircle2 className="h-5 w-5 text-green-600 dark:text-green-400 flex-shrink-0" />
                    <span>{benefit}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-primary/5 to-accent/5 border-2 border-primary/20">
            <CardContent className="p-8 text-center space-y-6">
              <h2 className="text-2xl font-bold">Ready to Start Earning?</h2>
              <p className="text-muted-foreground max-w-xl mx-auto">
                Sign up as an affiliate on Explodely to get your unique affiliate link and start promoting Faith Funnels AI today.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a href="https://explodely.com" target="_blank" rel="noopener noreferrer">
                  <Button size="lg" className="text-lg px-8" data-testid="button-join-explodely">
                    Join on Explodely
                  </Button>
                </a>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-8 text-center space-y-4">
              <Mail className="h-12 w-12 text-primary mx-auto" />
              <h2 className="text-2xl font-bold">Need Promotional Materials?</h2>
              <p className="text-muted-foreground">
                Contact us for email swipes, banner ads, and review copies.
              </p>
              <a href="mailto:support@faithfunnelsai.com">
                <Button variant="outline" size="lg" data-testid="button-contact-affiliate">
                  support@faithfunnelsai.com
                </Button>
              </a>
            </CardContent>
          </Card>
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
