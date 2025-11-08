import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Download, FileCode, CheckCircle2 } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

export default function Export() {
  const [includeMainOffer, setIncludeMainOffer] = useState(true);
  const [includeOTO1, setIncludeOTO1] = useState(true);
  const [includeOTO2, setIncludeOTO2] = useState(false);
  const [includeDS, setIncludeDS] = useState(true);
  const [includeLegalPages, setIncludeLegalPages] = useState(true);
  const [isExporting, setIsExporting] = useState(false);

  const handleExport = () => {
    console.log("Exporting funnel with options:", {
      includeMainOffer,
      includeOTO1,
      includeOTO2,
      includeDS,
      includeLegalPages
    });
    setIsExporting(true);
    setTimeout(() => {
      setIsExporting(false);
      console.log("Export complete!");
    }, 2000);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-semibold">Export Funnel</h1>
        <p className="text-muted-foreground">Download your complete funnel as HTML</p>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Export Configuration</CardTitle>
              <CardDescription>
                Select which pages to include in your export
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="main-offer" 
                  checked={includeMainOffer}
                  onCheckedChange={(checked) => setIncludeMainOffer(checked as boolean)}
                  data-testid="checkbox-include-main-offer"
                />
                <Label htmlFor="main-offer" className="flex-1">
                  Main Offer Page
                </Label>
                <span className="text-sm text-muted-foreground">index.html</span>
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="oto1" 
                  checked={includeOTO1}
                  onCheckedChange={(checked) => setIncludeOTO1(checked as boolean)}
                  data-testid="checkbox-include-oto1"
                />
                <Label htmlFor="oto1" className="flex-1">
                  One-Time Offer 1
                </Label>
                <span className="text-sm text-muted-foreground">oto1.html</span>
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="oto2" 
                  checked={includeOTO2}
                  onCheckedChange={(checked) => setIncludeOTO2(checked as boolean)}
                  data-testid="checkbox-include-oto2"
                />
                <Label htmlFor="oto2" className="flex-1">
                  One-Time Offer 2
                </Label>
                <span className="text-sm text-muted-foreground">oto2.html</span>
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="downsell" 
                  checked={includeDS}
                  onCheckedChange={(checked) => setIncludeDS(checked as boolean)}
                  data-testid="checkbox-include-downsell"
                />
                <Label htmlFor="downsell" className="flex-1">
                  Downsell Page
                </Label>
                <span className="text-sm text-muted-foreground">downsell.html</span>
              </div>

              <div className="border-t pt-4">
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="legal" 
                    checked={includeLegalPages}
                    onCheckedChange={(checked) => setIncludeLegalPages(checked as boolean)}
                    data-testid="checkbox-include-legal"
                  />
                  <Label htmlFor="legal" className="flex-1">
                    Legal Pages (Terms, Privacy, Refund Policy)
                  </Label>
                </div>
              </div>

              <Button 
                className="w-full" 
                size="lg"
                onClick={handleExport}
                disabled={isExporting}
                data-testid="button-export-funnel"
              >
                {isExporting ? (
                  <>Generating ZIP...</>
                ) : (
                  <>
                    <Download className="mr-2 h-5 w-5" />
                    Export as ZIP
                  </>
                )}
              </Button>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Export Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-start gap-3">
                <FileCode className="h-5 w-5 text-primary mt-0.5" />
                <div>
                  <p className="font-medium text-sm">Standalone HTML</p>
                  <p className="text-xs text-muted-foreground">
                    All styles and scripts embedded
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle2 className="h-5 w-5 text-primary mt-0.5" />
                <div>
                  <p className="font-medium text-sm">Ready to Upload</p>
                  <p className="text-xs text-muted-foreground">
                    Upload to any web server
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle2 className="h-5 w-5 text-primary mt-0.5" />
                <div>
                  <p className="font-medium text-sm">Mobile Responsive</p>
                  <p className="text-xs text-muted-foreground">
                    Works on all devices
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-primary/5 border-primary/20">
            <CardContent className="p-4">
              <p className="text-sm">
                <strong>Pro Tip:</strong> After downloading, extract the ZIP file and upload all files to your web server. The funnel will be ready to use immediately!
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
