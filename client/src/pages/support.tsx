import { Mail, FileText, MessageCircle, Clock } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";

export default function SupportPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/20">
      <div className="container mx-auto px-4 py-16 max-w-4xl">
        <div className="text-center mb-12">
          <h1 className="text-4xl lg:text-5xl font-bold mb-4">
            Support Center
          </h1>
          <p className="text-xl text-muted-foreground">
            We're here to help you succeed with Faith Funnels AI
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 mb-12">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Mail className="w-5 h-5 text-primary" />
                Email Support
              </CardTitle>
              <CardDescription>Get help from our support team</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-muted-foreground">
                For technical issues, billing questions, or general inquiries, email us at:
              </p>
              <a 
                href="mailto:support@faithfunnelsai.com"
                className="block"
                data-testid="link-support-email"
              >
                <Button className="w-full">
                  <Mail className="w-4 h-4 mr-2" />
                  support@faithfunnelsai.com
                </Button>
              </a>
              <div className="flex items-start gap-2 text-sm text-muted-foreground">
                <Clock className="w-4 h-4 mt-0.5 flex-shrink-0" />
                <p>We typically respond within 24-48 hours</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MessageCircle className="w-5 h-5 text-primary" />
                Common Questions
              </CardTitle>
              <CardDescription>Quick answers to frequent issues</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <div>
                <p className="font-medium text-sm mb-1">How do I customize my white label branding?</p>
                <p className="text-xs text-muted-foreground">
                  Go to Admin Settings to add your business name, logo, colors, and custom domain.
                </p>
              </div>
              <div>
                <p className="font-medium text-sm mb-1">How do I export my funnels?</p>
                <p className="text-xs text-muted-foreground">
                  Navigate to Export page, select your funnel, and click "Export as ZIP" to download.
                </p>
              </div>
              <div>
                <p className="font-medium text-sm mb-1">Can I create unlimited funnels?</p>
                <p className="text-xs text-muted-foreground">
                  Depends on your tier: Basic (3), White Label (10), Premium (unlimited).
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="w-5 h-5 text-primary" />
              Documentation & Policies
            </CardTitle>
            <CardDescription>Important legal information and policies</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid sm:grid-cols-3 gap-4">
              <Link href="/terms">
                <Button variant="outline" className="w-full" data-testid="link-terms">
                  Terms of Service
                </Button>
              </Link>
              <Link href="/privacy">
                <Button variant="outline" className="w-full" data-testid="link-privacy">
                  Privacy Policy
                </Button>
              </Link>
              <Link href="/refund">
                <Button variant="outline" className="w-full" data-testid="link-refund">
                  Refund Policy
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>What to Include in Your Support Request</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-4">
              To help us assist you faster, please include:
            </p>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li className="flex items-start gap-2">
                <span className="text-primary">•</span>
                <span>Your tenant URL (e.g., faithfunnelsai.com/t/your-slug)</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary">•</span>
                <span>A detailed description of the issue</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary">•</span>
                <span>Steps to reproduce the problem (if applicable)</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary">•</span>
                <span>Screenshots or error messages (if any)</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary">•</span>
                <span>Your purchase email or transaction ID</span>
              </li>
            </ul>
          </CardContent>
        </Card>

        <div className="text-center mt-12 text-sm text-muted-foreground">
          <p className="mb-2">
            Thank you for using Faith Funnels AI!
          </p>
          <p>
            <a 
              href="/"
              className="text-primary hover:underline"
              data-testid="link-home"
            >
              Return to Homepage
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
