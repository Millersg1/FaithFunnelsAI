import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle2, Download, ArrowRight, Mail, Book, Palette, FileText } from "lucide-react";

export default function DownloadPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/20">
      <div className="container mx-auto px-4 py-16 max-w-4xl">
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-primary/10 rounded-full mb-6">
            <CheckCircle2 className="w-10 h-10 text-primary" />
          </div>
          <h1 className="text-4xl lg:text-5xl font-bold mb-4">
            Welcome to Faith Funnels AI!
          </h1>
          <p className="text-xl text-muted-foreground">
            Your purchase is complete. Get started building faith-based sales funnels in minutes.
          </p>
        </div>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Download className="w-5 h-5" />
              Access Your Dashboard
            </CardTitle>
            <CardDescription>
              Faith Funnels AI is a web-based application - no download required!
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-muted-foreground">
              Simply click the button below to access your dashboard and start creating funnels:
            </p>
            <Link href="/app">
              <Button size="lg" className="w-full" data-testid="button-access-dashboard">
                Access Dashboard Now
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          </CardContent>
        </Card>

        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <Book className="w-5 h-5 text-primary" />
                Quick Start Guide
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-start gap-3">
                <div className="flex-shrink-0 w-6 h-6 bg-primary/10 rounded-full flex items-center justify-center text-sm font-semibold text-primary">
                  1
                </div>
                <p className="text-sm text-muted-foreground">
                  Create your first funnel with main offer, OTOs, and downsells
                </p>
              </div>
              <div className="flex items-start gap-3">
                <div className="flex-shrink-0 w-6 h-6 bg-primary/10 rounded-full flex items-center justify-center text-sm font-semibold text-primary">
                  2
                </div>
                <p className="text-sm text-muted-foreground">
                  Add inspiring Bible verses with custom CTAs
                </p>
              </div>
              <div className="flex items-start gap-3">
                <div className="flex-shrink-0 w-6 h-6 bg-primary/10 rounded-full flex items-center justify-center text-sm font-semibold text-primary">
                  3
                </div>
                <p className="text-sm text-muted-foreground">
                  Customize your theme colors and branding
                </p>
              </div>
              <div className="flex items-start gap-3">
                <div className="flex-shrink-0 w-6 h-6 bg-primary/10 rounded-full flex items-center justify-center text-sm font-semibold text-primary">
                  4
                </div>
                <p className="text-sm text-muted-foreground">
                  Export as standalone HTML/ZIP package
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <Palette className="w-5 h-5 text-primary" />
                White Label Features
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-start gap-2">
                <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                <p className="text-sm text-muted-foreground">
                  Customize with your business name and logo
                </p>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                <p className="text-sm text-muted-foreground">
                  Apply your brand colors throughout
                </p>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                <p className="text-sm text-muted-foreground">
                  Set your custom domain and support email
                </p>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                <p className="text-sm text-muted-foreground">
                  Export with your complete branding
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Mail className="w-5 h-5" />
              Need Help?
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-muted-foreground">
              Our support team is here to help you succeed:
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <a 
                href="mailto:support@faithfunnelsai.com" 
                className="flex-1"
                data-testid="link-support-email"
              >
                <Button variant="outline" className="w-full">
                  Email Support
                </Button>
              </a>
              <Link href="/terms" className="flex-1">
                <Button variant="outline" className="w-full" data-testid="link-terms">
                  <FileText className="w-4 h-4 mr-2" />
                  View Terms
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>

        <div className="text-center mt-12 text-sm text-muted-foreground">
          <p>
            Thank you for your purchase! We're excited to see the faith-based funnels you'll create.
          </p>
          <p className="mt-2">
            Questions? Contact us at{" "}
            <a 
              href="mailto:support@faithfunnelsai.com" 
              className="text-primary hover:underline"
              data-testid="link-footer-support"
            >
              support@faithfunnelsai.com
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
