import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle2, Sparkles, Download, Palette, BookOpen, Zap } from "lucide-react";
import { Link } from "wouter";
import { useEffect } from "react";
import { ChatbotWidget } from "@/components/chatbot-widget";
import { ManageCookiesButton } from "@/components/cookie-consent";
import { TrustBadges } from "@/components/trust-badges";
import { FAQSection } from "@/components/faq-section";
import heroImage from "@assets/stock_images/modern_faith-based_b_c2b925cb.jpg";
import dashboardImage from "@assets/stock_images/digital_marketing_da_5b5dfa8d.jpg";
import successImage from "@assets/stock_images/successful_online_bu_c7443eb8.jpg";
import funnelImage from "@assets/stock_images/sales_funnel_convers_ac3aa24c.jpg";
import logoImage from "@assets/generated_images/faith_funnels_ai_logo.png";

export default function ExplodelyLanding() {
  const faqs = [
    {
      question: "Do I need technical skills to use Faith Funnels AI?",
      answer: "Not at all! Faith Funnels AI is designed for complete beginners. Our intuitive dashboard makes it easy to build professional funnels in minutes, even if you've never created a sales page before."
    },
    {
      question: "Can I really use this for affiliate marketing?",
      answer: "Absolutely! Faith Funnels AI exports standalone HTML files that you can upload directly to any hosting provider. They're perfect for Explodely, affiliate marketing, or any other platform."
    },
    {
      question: "What's included for $17?",
      answer: "The Basic tier includes everything you need to get started: 3 funnels, 10 exports per month, Bible verse integration, custom theme designer, and all legal pages (Terms, Privacy, Refund). Perfect for personal use and testing."
    },
    {
      question: "Is there a monthly fee?",
      answer: "No! This is a one-time payment of just $17. You own it forever with no recurring charges. You can upgrade to higher tiers later if you need more capacity or white label rights."
    },
    {
      question: "What if I'm not satisfied?",
      answer: "We offer a 14-day money-back guarantee. If Faith Funnels AI doesn't work for you, just email support@faithfunnelsai.com and we'll refund you immediately - no questions asked."
    },
    {
      question: "Can I upgrade later?",
      answer: "Yes! You can upgrade to White Label ($47), Premium ($67), or Agency Package ($97) at any time to unlock more funnels, commercial rights, and advanced features."
    }
  ];

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
      description: "Download complete HTML/ZIP packages ready for Warrior Plus, JVZoo & Explodely."
    },
    {
      icon: Zap,
      title: "Legal Pages Included",
      description: "Terms, Privacy Policy, and 14-Day Refund Policy automatically generated."
    },
    {
      icon: CheckCircle2,
      title: "White Label Ready",
      description: "Rebrand with your own business name, logo, and custom domain."
    }
  ];

  const benefits = [
    "Build unlimited funnels with main offers, OTOs, and downsells",
    "No monthly fees - own it forever",
    "Beginner-friendly dashboard interface",
    "Professional templates included",
    "Export standalone HTML files",
    "Perfect for Warrior Plus, JVZoo & Explodely launches",
    "Complete legal compliance built-in",
    "Faith-based messaging that converts"
  ];

  return (
    <div className="min-h-screen select-none">
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
          <Link href="/app">
            <Button variant="default" data-testid="button-launch-app">
              Launch App
            </Button>
          </Link>
        </div>
      </header>

      <section className="relative py-20 lg:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-secondary/10 to-accent/10 -z-10" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(120,119,198,0.1),transparent_50%)] -z-10" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(255,184,77,0.1),transparent_50%)] -z-10" />
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="inline-block">
                <div className="bg-primary/10 border border-primary/30 rounded-full px-6 py-2">
                  <span className="text-sm font-semibold text-primary">
                    ✨ The #1 Faith-Based Funnel Builder
                  </span>
                </div>
              </div>
              <h1 className="text-5xl lg:text-7xl font-bold leading-tight">
                Build Faith-Based Sales Funnels in Minutes
              </h1>
              <p className="text-xl lg:text-2xl text-muted-foreground leading-relaxed">
                The complete SaaS tool for creating professional sales funnels with Bible verses, custom themes, and instant HTML export. Built with faith, designed for profit.
              </p>
              <div className="flex flex-wrap gap-4">
                <a href="https://explodely.com/checkout/YOUR_PRODUCT_ID" data-testid="button-get-started">
                  <Button size="lg" className="text-lg px-10 py-6 bg-primary hover:bg-primary/90">
                    Get Started Now - Only $17
                  </Button>
                </a>
                <a href="#features">
                  <Button size="lg" variant="outline" className="text-lg px-10 py-6 border-2" data-testid="button-see-features">
                    See Features
                  </Button>
                </a>
              </div>
              <div className="flex flex-wrap items-center gap-6 text-sm">
                <div className="flex items-center gap-2 bg-card/50 rounded-lg px-4 py-2 border">
                  <CheckCircle2 className="h-5 w-5 text-primary" />
                  <span className="font-medium">No monthly fees</span>
                </div>
                <div className="flex items-center gap-2 bg-card/50 rounded-lg px-4 py-2 border">
                  <CheckCircle2 className="h-5 w-5 text-primary" />
                  <span className="font-medium">White label ready</span>
                </div>
                <div className="flex items-center gap-2 bg-card/50 rounded-lg px-4 py-2 border">
                  <CheckCircle2 className="h-5 w-5 text-primary" />
                  <span className="font-medium">Legal pages built-in</span>
                </div>
              </div>
            </div>
            <div className="relative lg:ml-8">
              <div className="absolute -inset-4 bg-gradient-to-br from-primary/30 via-secondary/30 to-accent/30 rounded-3xl blur-3xl" />
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-accent/10 rounded-2xl" />
                <img 
                  src={heroImage} 
                  alt="Faith-based entrepreneur building funnels" 
                  className="rounded-2xl shadow-2xl w-full relative border-4 border-white/20"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 bg-gradient-to-b from-muted/50 to-background" id="proof">
        <div className="container mx-auto px-4">
          <div className="text-center space-y-6 mb-16">
            <div className="inline-block">
              <div className="bg-primary/10 border border-primary/20 rounded-full px-6 py-2 mb-4">
                <span className="text-sm font-semibold text-primary">PROOF IT WORKS</span>
              </div>
            </div>
            <h2 className="text-4xl lg:text-6xl font-bold text-primary">
              This Sales Page Was Built With Faith Funnels AI
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              That's right! The very funnel you're reading was created using our software. 
              See the power of what you'll be able to create for yourself and your customers.
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            <Card className="border-2 hover:border-primary/50 transition-all duration-300 hover-elevate overflow-hidden">
              <div className="h-2 bg-gradient-to-r from-primary to-secondary" />
              <CardContent className="p-6">
                <img 
                  src={dashboardImage} 
                  alt="Faith Funnels AI Dashboard" 
                  className="rounded-lg mb-4 w-full shadow-md"
                />
                <h3 className="text-2xl font-bold mb-2 text-primary">Intuitive Dashboard</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Manage all your funnels, verses, and themes from one beautiful interface.
                </p>
              </CardContent>
            </Card>
            <Card className="border-2 hover:border-accent/50 transition-all duration-300 hover-elevate overflow-hidden">
              <div className="h-2 bg-gradient-to-r from-secondary to-accent" />
              <CardContent className="p-6">
                <img 
                  src={funnelImage} 
                  alt="Build Your Funnel" 
                  className="rounded-lg mb-4 w-full shadow-md"
                />
                <h3 className="text-2xl font-bold mb-2 text-primary">Visual Funnel Builder</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Drag and drop stages, add OTOs and downsells, customize everything.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <section className="py-24 relative" id="features">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(120,119,198,0.05),transparent_70%)]" />
        <div className="container mx-auto px-4 relative">
          <div className="text-center space-y-6 mb-20">
            <h2 className="text-4xl lg:text-6xl font-bold">
              Everything You Need to Succeed
            </h2>
            <p className="text-xl lg:text-2xl text-muted-foreground max-w-3xl mx-auto">
              Powerful features designed specifically for faith-based marketers and agencies
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, idx) => (
              <Card key={idx} className="hover-elevate border-2 hover:border-primary/30 transition-all duration-300 group">
                <CardContent className="p-8">
                  <div className="bg-gradient-to-br from-primary/10 to-accent/10 rounded-2xl w-20 h-20 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                    <feature.icon className="h-10 w-10 text-primary" />
                  </div>
                  <h3 className="text-2xl font-bold mb-3">{feature.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 bg-gradient-to-br from-primary/5 via-secondary/5 to-accent/5 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(255,184,77,0.15),transparent_50%)]" />
        <div className="container mx-auto px-4 relative">
          <div className="grid lg:grid-cols-2 gap-16 items-center max-w-6xl mx-auto">
            <div className="relative">
              <div className="absolute -inset-4 bg-gradient-to-br from-accent/30 to-primary/30 rounded-3xl blur-2xl" />
              <div className="relative">
                <img 
                  src={successImage} 
                  alt="Successful faith-based entrepreneur" 
                  className="rounded-2xl shadow-2xl w-full border-4 border-white/20"
                />
              </div>
            </div>
            <div className="space-y-8">
              <div className="inline-block bg-primary/10 border border-primary/30 rounded-full px-6 py-2">
                <span className="text-sm font-semibold text-primary">MARKETPLACE READY</span>
              </div>
              <h2 className="text-4xl lg:text-5xl font-bold leading-tight">
                Perfect for Affiliate Marketers
              </h2>
              <p className="text-xl text-muted-foreground leading-relaxed">
                Faith Funnels AI generates complete, standalone HTML funnels that you can upload directly to your hosting. 
                No dependencies, no hassle.
              </p>
              <div className="space-y-4 bg-card/50 backdrop-blur-sm rounded-2xl p-6 border-2">
                {benefits.map((benefit, idx) => (
                  <div key={idx} className="flex items-start gap-4 group">
                    <div className="bg-primary/10 rounded-full p-1 group-hover:bg-primary/20 transition-colors">
                      <CheckCircle2 className="h-5 w-5 text-primary" />
                    </div>
                    <span className="text-lg">{benefit}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <TrustBadges />
          </div>
        </div>
      </section>

      <section className="py-24 bg-gradient-to-b from-background to-muted/50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto space-y-8">
            <div className="text-center space-y-4">
              <h2 className="text-4xl lg:text-5xl font-bold">
                Frequently Asked Questions
              </h2>
              <p className="text-xl text-muted-foreground">
                Everything you need to know about Faith Funnels AI
              </p>
            </div>
            <FAQSection faqs={faqs} />
          </div>
        </div>
      </section>

      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-secondary/10 to-accent/10" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(120,119,198,0.1),transparent_70%)]" />
        <div className="container mx-auto px-4 relative">
          <Card className="max-w-5xl mx-auto border-4 border-primary/20 bg-gradient-to-br from-background via-background to-primary/5 shadow-2xl overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5" />
            <CardContent className="p-12 lg:p-16 text-center space-y-8 relative">
              <div className="inline-block bg-primary/10 border-2 border-primary/30 rounded-full px-8 py-3">
                <span className="text-sm font-bold text-primary">
                  🙏 START YOUR JOURNEY TODAY
                </span>
              </div>
              <h2 className="text-4xl lg:text-6xl font-bold leading-tight">
                Ready to Build Your Faith-Based Empire?
              </h2>
              <p className="text-xl lg:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
                Join successful faith-based marketers who are using Faith Funnels AI to create profitable sales funnels that honor God and grow their business.
              </p>
              <div className="flex flex-col sm:flex-row gap-6 justify-center pt-4">
                <a href="https://explodely.com/checkout/YOUR_PRODUCT_ID" data-testid="button-start-building">
                  <Button size="lg" className="text-lg px-10 py-6 bg-primary hover:bg-primary/90">
                    Start Building Now - Only $17
                  </Button>
                </a>
              </div>
              <div className="pt-6 border-t border-primary/10">
                <p className="text-lg italic text-muted-foreground bg-gradient-to-r from-primary/10 to-accent/10 rounded-lg px-6 py-4 inline-block border border-primary/20">
                  "For I know the plans I have for you," declares the Lord - Jeremiah 29:11
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      <section className="py-8 bg-muted/50 border-t">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center space-y-4">
            <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">Earnings Disclaimer</h3>
            <p className="text-xs text-muted-foreground leading-relaxed">
              <strong>INCOME DISCLAIMER:</strong> The results mentioned on this page are not typical. Your results will vary and depend on many factors including but not limited to your background, experience, and work ethic. All business involves risk and requires consistent effort and action. Faith Funnels AI is a tool to help you build sales funnels - we make no guarantees of income or success. The testimonials and examples used are exceptional results that do not apply to the average purchaser and are not intended to represent or guarantee that anyone will achieve the same or similar results.
            </p>
            <p className="text-xs text-muted-foreground leading-relaxed">
              <strong>FTC COMPLIANCE:</strong> In accordance with the FTC guidelines, we are required to inform you that some of the links on this page may be affiliate links. This means that if you click on the link and purchase the item, we may receive an affiliate commission. We only recommend products or services that we believe will add value to our customers.
            </p>
            <p className="text-xs text-muted-foreground leading-relaxed">
              <strong>AI DISCLOSURE:</strong> This product uses artificial intelligence technology powered by OpenAI for the customer support chatbot feature. AI-generated responses are provided for informational purposes. By using the chatbot, you consent to having your conversations processed by AI systems.
            </p>
          </div>
        </div>
      </section>

      <footer className="border-t py-12 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <img 
                  src={logoImage} 
                  alt="Faith Funnels AI Logo" 
                  className="h-24 w-24 object-contain"
                />
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
                <li><ManageCookiesButton /></li>
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
      <ChatbotWidget />
    </div>
  );
}
