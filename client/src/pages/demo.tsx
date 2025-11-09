import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRight, LayoutDashboard, FileText, Palette, Download, Settings } from "lucide-react";

export default function DemoPage() {
  const demoUrl = "/t/demo";

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/20">
      <div className="container mx-auto px-4 py-16 max-w-5xl">
        <div className="text-center mb-12">
          <div className="inline-block bg-primary/10 border border-primary/30 rounded-full px-6 py-2 mb-6">
            <span className="text-sm font-semibold text-primary">DEMO ACCESS</span>
          </div>
          <h1 className="text-4xl lg:text-5xl font-bold mb-4">
            Faith Funnels AI Demo
          </h1>
          <p className="text-xl text-muted-foreground mb-8">
            Full-featured demo with sample funnels, verses, and themes.
          </p>
          <Link href={demoUrl}>
            <Button size="lg" data-testid="button-access-demo">
              Access Demo Dashboard
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </Link>
        </div>

        <div className="grid md:grid-cols-2 gap-6 mb-12">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <LayoutDashboard className="w-5 h-5 text-primary" />
                Dashboard
              </CardTitle>
              <CardDescription>View statistics and Bible verse inspiration</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">
                See an overview of your funnels, total exports, and get inspired by daily Bible verses.
              </p>
              <Link href={demoUrl}>
                <Button variant="outline" size="sm" className="w-full" data-testid="link-demo-dashboard">
                  View Dashboard
                </Button>
              </Link>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="w-5 h-5 text-primary" />
                Funnel Builder
              </CardTitle>
              <CardDescription>Create multi-stage sales funnels</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">
                Build funnels with main offers, OTOs (one-time offers), and downsells. Pre-loaded with example funnel.
              </p>
              <Link href={`${demoUrl}/funnels`}>
                <Button variant="outline" size="sm" className="w-full" data-testid="link-demo-funnels">
                  View Funnels
                </Button>
              </Link>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="w-5 h-5 text-primary" />
                Verse Builder
              </CardTitle>
              <CardDescription>Add Bible verses with custom CTAs</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">
                Integrate inspiring Bible verses into your funnels with customizable call-to-action buttons.
              </p>
              <Link href={`${demoUrl}/verse-builder`}>
                <Button variant="outline" size="sm" className="w-full" data-testid="link-demo-verses">
                  View Verse Builder
                </Button>
              </Link>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Palette className="w-5 h-5 text-primary" />
                Theme Settings
              </CardTitle>
              <CardDescription>Customize colors and branding</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">
                Choose from preset themes or create custom color palettes for your funnels.
              </p>
              <Link href={`${demoUrl}/theme-settings`}>
                <Button variant="outline" size="sm" className="w-full" data-testid="link-demo-themes">
                  View Theme Settings
                </Button>
              </Link>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Download className="w-5 h-5 text-primary" />
                Export
              </CardTitle>
              <CardDescription>Download standalone HTML/ZIP packages</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">
                Export your funnels as ready-to-deploy HTML files with all assets and legal pages included.
              </p>
              <Link href={`${demoUrl}/export`}>
                <Button variant="outline" size="sm" className="w-full" data-testid="link-demo-export">
                  View Export
                </Button>
              </Link>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Settings className="w-5 h-5 text-primary" />
                White Label Admin
              </CardTitle>
              <CardDescription>Customize branding and domain</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">
                Rebrand with your business name, logo, colors, support email, and custom domain.
              </p>
              <Link href={`${demoUrl}/admin`}>
                <Button variant="outline" size="sm" className="w-full" data-testid="link-demo-admin">
                  View Admin Settings
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>

        <Card className="border-primary/20 bg-primary/5">
          <CardHeader>
            <CardTitle>What's Included in Demo</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-start gap-3">
              <div className="flex-shrink-0 w-6 h-6 bg-primary rounded-full flex items-center justify-center text-white text-xs font-bold">
                ✓
              </div>
              <div>
                <p className="font-medium">Pre-Loaded Sample Funnel</p>
                <p className="text-sm text-muted-foreground">
                  "Warrior Plus Demo Funnel" with Main, OTO, and Downsell stages
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="flex-shrink-0 w-6 h-6 bg-primary rounded-full flex items-center justify-center text-white text-xs font-bold">
                ✓
              </div>
              <div>
                <p className="font-medium">Sample Bible Verses</p>
                <p className="text-sm text-muted-foreground">
                  Pre-configured verses with CTAs ready to use
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="flex-shrink-0 w-6 h-6 bg-primary rounded-full flex items-center justify-center text-white text-xs font-bold">
                ✓
              </div>
              <div>
                <p className="font-medium">Multiple Theme Options</p>
                <p className="text-sm text-muted-foreground">
                  Ocean Blue, Sunset Orange, Forest Green, and Royal Purple presets
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="flex-shrink-0 w-6 h-6 bg-primary rounded-full flex items-center justify-center text-white text-xs font-bold">
                ✓
              </div>
              <div>
                <p className="font-medium">Full White Label Customization</p>
                <p className="text-sm text-muted-foreground">
                  Test business name, logo upload, color branding, and domain settings
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="flex-shrink-0 w-6 h-6 bg-primary rounded-full flex items-center justify-center text-white text-xs font-bold">
                ✓
              </div>
              <div>
                <p className="font-medium">Working Export System</p>
                <p className="text-sm text-muted-foreground">
                  Download complete HTML/ZIP packages with legal pages
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="text-center mt-12">
          <Link href={demoUrl}>
            <Button size="lg" data-testid="button-start-demo">
              Start Exploring Demo
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </Link>
          <p className="text-sm text-muted-foreground mt-4">
            Demo URL: <code className="bg-muted px-2 py-1 rounded">{window.location.origin}{demoUrl}</code>
          </p>
        </div>
      </div>
    </div>
  );
}
