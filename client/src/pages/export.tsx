import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Download, FileCode, CheckCircle2 } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useQuery } from "@tanstack/react-query";
import { useToast } from "@/hooks/use-toast";
import { exportFunnelAsZip } from "@/lib/htmlExporter";
import { useTenant } from "@/contexts/TenantContext";
import type { Funnel, Verse, Theme } from "@shared/schema";

export default function Export() {
  const [selectedFunnelId, setSelectedFunnelId] = useState<string>("");
  const [isExporting, setIsExporting] = useState(false);
  const { toast } = useToast();
  const { settings } = useTenant();

  const { data: funnels } = useQuery<Funnel[]>({
    queryKey: ["/api/funnels"],
  });

  const { data: verses } = useQuery<Verse[]>({
    queryKey: ["/api/verses"],
  });

  const { data: themes } = useQuery<Theme[]>({
    queryKey: ["/api/themes"],
  });

  const handleExport = async () => {
    if (!selectedFunnelId) {
      toast({
        title: "No funnel selected",
        description: "Please select a funnel to export",
        variant: "destructive",
      });
      return;
    }

    const funnel = funnels?.find(f => f.id === selectedFunnelId);
    if (!funnel) return;

    try {
      setIsExporting(true);
      const funnelVerses = verses?.filter(v => v.funnelId === selectedFunnelId) || [];
      const funnelThemes = themes?.filter(t => t.funnelId === selectedFunnelId) || [];
      
      await exportFunnelAsZip(funnel, funnelVerses, funnelThemes, settings || undefined);
      
      toast({
        title: "Export successful!",
        description: "Your funnel has been downloaded as a ZIP file.",
      });
    } catch (error) {
      toast({
        title: "Export failed",
        description: "There was an error exporting your funnel. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsExporting(false);
    }
  };

  const selectedFunnel = funnels?.find(f => f.id === selectedFunnelId);

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
                Select a funnel to export
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="funnel-select">Select Funnel</Label>
                <Select value={selectedFunnelId} onValueChange={setSelectedFunnelId}>
                  <SelectTrigger id="funnel-select" data-testid="select-funnel">
                    <SelectValue placeholder="Choose a funnel to export" />
                  </SelectTrigger>
                  <SelectContent>
                    {funnels?.map((funnel) => (
                      <SelectItem key={funnel.id} value={funnel.id}>
                        {funnel.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {selectedFunnel && (
                <div className="rounded-lg border bg-muted/50 p-4 space-y-2">
                  <h4 className="font-medium">Funnel Preview:</h4>
                  <p className="text-sm text-muted-foreground">
                    <strong>{selectedFunnel.name}</strong>
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Stages: {selectedFunnel.stages.length}
                  </p>
                  <ul className="text-sm text-muted-foreground pl-4">
                    {selectedFunnel.stages.map((stage, idx) => (
                      <li key={stage.id}>
                        {idx + 1}. {stage.title} ({stage.type.toUpperCase()})
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              <div className="rounded-lg border bg-muted/50 p-4">
                <h4 className="font-medium mb-2">What's included:</h4>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>✓ All funnel stage pages (HTML)</li>
                  <li>✓ Bible verses with custom styling</li>
                  <li>✓ Custom theme colors applied</li>
                  <li>✓ Legal pages (Terms, Privacy, Refund)</li>
                  <li>✓ Mobile responsive design</li>
                  <li>✓ Standalone files (no external dependencies)</li>
                </ul>
              </div>

              <Button 
                className="w-full" 
                size="lg"
                onClick={handleExport}
                disabled={isExporting || !selectedFunnelId}
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
