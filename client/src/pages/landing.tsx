import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle2, Sparkles, Download, Palette, BookOpen, Zap } from "lucide-react";
import { Link } from "wouter";
import heroImage from "@assets/stock_images/modern_faith-based_b_c2b925cb.jpg";
import dashboardImage from "@assets/stock_images/digital_marketing_da_5b5dfa8d.jpg";
import successImage from "@assets/stock_images/successful_online_bu_c7443eb8.jpg";
import funnelImage from "@assets/stock_images/website_funnel_conve_bf6909f9.jpg";

export default function Landing() {
  const features = [
    {
      icon: Sparkles,
      title: "AI-Powered Funnel Builder",
      description: "Create professional faith-based sales funnels in minutes, not hours."
    },
    {
      icon: BookOpen,
      title: "Bible Verse Integration",
      description: "Add inspirational verses with customizable call-to-action buttons."
    },
    {
      icon: Palette,
      title: "Custom Theme Designer",
      description: "Brand your funnels with beautiful, faith-inspired color themes."
    },
    {
      icon: Download,
      title: "One-Click Export",
      description: "Download complete HTML/ZIP packages ready for Warrior Plus & JVZoo."
    },
    {
      icon: Zap,
      title: "Legal Pages Included",
      description: "Terms, Privacy Policy, and 14-Day Refund Policy automatically generated."
    },
    {
      icon: CheckCircle2,
      title: "PLR Ready",
      description: "Sell as your own Private Label Rights software on any platform."
    }
  ];

  const benefits = [
    "Build unlimited funnels with main offers, OTOs, and downsells",
    "No monthly fees - own it forever",
    "Beginner-friendly dashboard interface",
    "Professional templates included",
    "Export standalone HTML files",
    "Perfect for Warrior Plus & JVZoo launches",
    "Complete legal compliance built-in",
    "Faith-based messaging that converts"
  ];

  return (
    <div className="min-h-screen">
      <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center">
              <BookOpen className="h-5 w-5 text-primary-foreground" />
            </div>
            <span className="font-semibold text-lg">Faith Funnels AI</span>
          </div>
          <Link href="/app">
            <Button variant="default" data-testid="button-launch-app">
              Launch App
            </Button>
          </Link>
        </div>
      </header>

      <section className="relative py-20 lg:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-secondary/5 to-accent/5 -z-10" />
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <div className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium">
                PLR Software for Warrior Plus & JVZoo
              </div>
              <h1 className="text-4xl lg:text-6xl font-bold leading-tight">
                Build Faith-Based Sales Funnels in Minutes
              </h1>
              <p className="text-xl text-muted-foreground">
                The complete SaaS tool for creating professional sales funnels with Bible verses, custom themes, and instant HTML export. Built with faith, designed for profit.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link href="/app">
                  <Button size="lg" className="text-lg px-8" data-testid="button-get-started">
                    Get Started Now
                  </Button>
                </Link>
                <a href="#features">
                  <Button size="lg" variant="outline" className="text-lg px-8" data-testid="button-see-features">
                    See Features
                  </Button>
                </a>
              </div>
              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                <div className="flex items-center gap-1">
                  <CheckCircle2 className="h-4 w-4 text-primary" />
                  <span>No monthly fees</span>
                </div>
                <div className="flex items-center gap-1">
                  <CheckCircle2 className="h-4 w-4 text-primary" />
                  <span>PLR included</span>
                </div>
                <div className="flex items-center gap-1">
                  <CheckCircle2 className="h-4 w-4 text-primary" />
                  <span>Legal pages built-in</span>
                </div>
              </div>
            </div>
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-accent/20 rounded-2xl blur-3xl -z-10" />
              <img 
                src={heroImage} 
                alt="Faith-based entrepreneur building funnels" 
                className="rounded-2xl shadow-2xl w-full"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-muted/50" id="proof">
        <div className="container mx-auto px-4">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-3xl lg:text-5xl font-bold">
              This Sales Page Was Built With Faith Funnels AI
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              That's right! The very funnel you're reading was created using our software. 
              See the power of what you'll be able to create for yourself and your customers.
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            <Card>
              <CardContent className="p-6">
                <img 
                  src={dashboardImage} 
                  alt="Faith Funnels AI Dashboard" 
                  className="rounded-lg mb-4 w-full"
                />
                <h3 className="text-xl font-semibold mb-2">Intuitive Dashboard</h3>
                <p className="text-muted-foreground">
                  Manage all your funnels, verses, and themes from one beautiful interface.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <img 
                  src={funnelImage} 
                  alt="Build Your Funnel" 
                  className="rounded-lg mb-4 w-full"
                />
                <h3 className="text-xl font-semibold mb-2">Visual Funnel Builder</h3>
                <p className="text-muted-foreground">
                  Drag and drop stages, add OTOs and downsells, customize everything.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <section className="py-20" id="features">
        <div className="container mx-auto px-4">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-3xl lg:text-5xl font-bold">
              Everything You Need to Succeed
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Powerful features designed specifically for faith-based marketers and PLR sellers
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, idx) => (
              <Card key={idx} className="hover-elevate">
                <CardContent className="p-6">
                  <feature.icon className="h-12 w-12 text-primary mb-4" />
                  <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-muted/50">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
            <div>
              <img 
                src={successImage} 
                alt="Successful faith-based entrepreneur" 
                className="rounded-2xl shadow-2xl w-full"
              />
            </div>
            <div className="space-y-6">
              <h2 className="text-3xl lg:text-4xl font-bold">
                Perfect for Warrior Plus & JVZoo Sellers
              </h2>
              <p className="text-lg text-muted-foreground">
                Faith Funnels AI generates complete, standalone HTML funnels that you can upload directly to your hosting. 
                No dependencies, no hassle.
              </p>
              <ul className="space-y-3">
                {benefits.map((benefit, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                    <span>{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="container mx-auto px-4">
          <Card className="max-w-4xl mx-auto border-primary/20 bg-gradient-to-br from-primary/5 to-accent/5">
            <CardContent className="p-12 text-center space-y-6">
              <h2 className="text-3xl lg:text-5xl font-bold">
                Ready to Build Your Faith-Based Empire?
              </h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Join successful faith-based marketers who are using Faith Funnels AI to create profitable sales funnels.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/app">
                  <Button size="lg" className="text-lg px-8 w-full sm:w-auto" data-testid="button-start-building">
                    Start Building Now
                  </Button>
                </Link>
              </div>
              <p className="text-sm text-muted-foreground">
                "For I know the plans I have for you," declares the Lord - Jeremiah 29:11
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      <footer className="border-t py-12 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center">
                  <BookOpen className="h-5 w-5 text-primary-foreground" />
                </div>
                <span className="font-semibold">Faith Funnels AI</span>
              </div>
              <p className="text-sm text-muted-foreground">
                Build Your Ministry. Grow Your Business.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Product</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#features" className="hover-elevate" data-testid="link-features">Features</a></li>
                <li><Link href="/app" data-testid="link-dashboard">Dashboard</Link></li>
                <li><a href="#proof" data-testid="link-live-demo">Live Demo</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Legal</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><Link href="/terms" data-testid="link-terms">Terms of Service</Link></li>
                <li><Link href="/privacy" data-testid="link-privacy">Privacy Policy</Link></li>
                <li><Link href="/refund" data-testid="link-refund">Refund Policy</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Support</h4>
              <p className="text-sm text-muted-foreground">
                Email: support@faithfunnelsai.com
              </p>
            </div>
          </div>
          <div className="border-t pt-8 text-center text-sm text-muted-foreground">
            <p>&copy; {new Date().getFullYear()} Faith Funnels AI. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
