import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle2, DollarSign, Users, TrendingUp, Mail, ExternalLink } from "lucide-react";
import { Link } from "wouter";
import logoImage from "@assets/generated_images/faith_funnels_ai_logo.png";
import jvzooLogo from "@assets/jvzoo_logo_3_17_1768161220939.png";
import { JVZooDisclaimer } from "@/components/jvzoo-disclaimer";

export default function JVZooAffiliates() {
  const commissions = [
    { product: "Front End", price: "$17", commission: "50%", earnings: "$8.50" },
    { product: "Order Bump - Bible Verses", price: "$9", commission: "50%", earnings: "$4.50" },
    { product: "OTO1 - White Label", price: "$47", commission: "50%", earnings: "$23.50" },
    { product: "DS1 - White Label Lite", price: "$27", commission: "50%", earnings: "$13.50" },
    { product: "OTO2 - Premium Templates", price: "$67", commission: "50%", earnings: "$33.50" },
    { product: "DS2 - Premium Lite", price: "$37", commission: "50%", earnings: "$18.50" },
    { product: "OTO3 - Agency License", price: "$97", commission: "50%", earnings: "$48.50" },
    { product: "DS3 - Agency Lite", price: "$47", commission: "50%", earnings: "$23.50" },
  ];

  const benefits = [
    "50% commissions on ALL products",
    "Complete funnel with 7 products + order bump",
    "High converting sales pages",
    "Low refund rates (14-day guarantee)",
    "Unique untapped faith-based niche",
    "Professional promotional materials",
    "Real-time JVZoo tracking",
    "Instant commission payments",
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/30">
      <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/jvzoo">
            <div className="flex items-center gap-3 cursor-pointer">
              <img 
                src={logoImage} 
                alt="Faith Funnels AI Logo" 
                className="h-14 w-14 object-contain"
              />
              <span className="font-semibold text-lg">Faith Funnels AI</span>
            </div>
          </Link>
          <div className="flex items-center gap-3">
            <span className="text-sm text-muted-foreground hidden sm:block">Available on</span>
            <img 
              src={jvzooLogo} 
              alt="JVZoo" 
              className="h-8 object-contain"
            />
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto space-y-12">
          <div className="text-center space-y-4">
            <div className="inline-flex items-center gap-2 bg-green-500/10 text-green-600 dark:text-green-400 px-4 py-2 rounded-full">
              <DollarSign className="w-5 h-5" />
              <span className="font-semibold">JVZOO AFFILIATE PROGRAM</span>
            </div>
            <h1 className="text-4xl lg:text-5xl font-bold">
              Earn Up To $131 Per Sale!
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Promote Faith Funnels AI on JVZoo and earn 50% commissions on the entire funnel - including all upsells, downsells, and order bumps.
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
                <h3 className="text-2xl font-bold">8 Products</h3>
                <p className="text-muted-foreground">Complete Funnel</p>
              </CardContent>
            </Card>
            <Card className="text-center">
              <CardContent className="p-6 space-y-2">
                <Users className="h-12 w-12 text-primary mx-auto" />
                <h3 className="text-2xl font-bold">$131</h3>
                <p className="text-muted-foreground">Max Per Customer</p>
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
                      <tr key={idx} className="border-b last:border-b-0">
                        <td className="py-3 px-4 font-medium">{item.product}</td>
                        <td className="py-3 px-4">{item.price}</td>
                        <td className="py-3 px-4 text-green-600 dark:text-green-400 font-semibold">{item.commission}</td>
                        <td className="py-3 px-4 text-primary font-bold">{item.earnings}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="mt-6 p-4 bg-green-500/10 rounded-lg text-center">
                <p className="text-lg font-semibold text-green-600 dark:text-green-400">
                  Maximum earnings per customer: $131.00
                </p>
              </div>
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

          <Card>
            <CardContent className="p-8">
              <h2 className="text-2xl font-bold mb-6 text-center">Funnel Flow</h2>
              <div className="flex flex-wrap items-center justify-center gap-2 text-sm">
                <span className="bg-primary/10 px-3 py-1 rounded">Sales Page</span>
                <span className="text-muted-foreground">&rarr;</span>
                <span className="bg-blue-500/10 text-blue-600 dark:text-blue-400 px-3 py-1 rounded">Order Bump</span>
                <span className="text-muted-foreground">&rarr;</span>
                <span className="bg-green-500/10 text-green-600 dark:text-green-400 px-3 py-1 rounded">OTO1</span>
                <span className="text-muted-foreground">/</span>
                <span className="bg-orange-500/10 text-orange-600 dark:text-orange-400 px-3 py-1 rounded">DS1</span>
                <span className="text-muted-foreground">&rarr;</span>
                <span className="bg-green-500/10 text-green-600 dark:text-green-400 px-3 py-1 rounded">OTO2</span>
                <span className="text-muted-foreground">/</span>
                <span className="bg-orange-500/10 text-orange-600 dark:text-orange-400 px-3 py-1 rounded">DS2</span>
                <span className="text-muted-foreground">&rarr;</span>
                <span className="bg-green-500/10 text-green-600 dark:text-green-400 px-3 py-1 rounded">OTO3</span>
                <span className="text-muted-foreground">/</span>
                <span className="bg-orange-500/10 text-orange-600 dark:text-orange-400 px-3 py-1 rounded">DS3</span>
                <span className="text-muted-foreground">&rarr;</span>
                <span className="bg-primary/10 px-3 py-1 rounded">Download</span>
              </div>
              <p className="text-center text-muted-foreground mt-4 text-sm">
                Customers see downsells (DS) if they decline the corresponding upsell (OTO)
              </p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-orange-500/5 to-primary/5 border-2 border-orange-500/20">
            <CardContent className="p-8 text-center space-y-6">
              <h2 className="text-2xl font-bold">Ready to Start Earning on JVZoo?</h2>
              <p className="text-muted-foreground max-w-xl mx-auto">
                Request affiliate approval on JVZoo to get your unique affiliate link and start promoting Faith Funnels AI today.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a href="https://www.jvzoo.com/affiliates/info/420909" target="_blank" rel="noopener noreferrer">
                  <Button size="lg" className="text-lg px-8 bg-orange-600 hover:bg-orange-700" data-testid="button-join-jvzoo">
                    <ExternalLink className="w-5 h-5 mr-2" />
                    Request JVZoo Approval
                  </Button>
                </a>
              </div>
              <p className="text-sm text-muted-foreground">
                Affiliate approvals are typically processed within 24-48 hours
              </p>
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
        <div className="container mx-auto px-4 space-y-4">
          <JVZooDisclaimer />
          <div className="text-center text-sm text-muted-foreground">
            <p>&copy; {new Date().getFullYear()} Faith Funnels AI. All rights reserved.</p>
            <p className="mt-2">
              <Link href="/jvzoo/refund" className="hover:underline">Refund Policy</Link>
              {" · "}
              <Link href="/jvzoo/disclaimer" className="hover:underline">Disclaimer</Link>
              {" · "}
              <Link href="/jvzoo/earnings-disclaimer" className="hover:underline">Earnings Disclaimer</Link>
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
