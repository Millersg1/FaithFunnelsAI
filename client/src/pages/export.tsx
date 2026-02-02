import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Download, FileCode, CheckCircle2, Eye, Layers, Loader2 } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useQuery } from "@tanstack/react-query";
import { useToast } from "@/hooks/use-toast";
import { exportFunnelAsZip, addFunnelToZip } from "@/lib/htmlExporter";
import { useTenant } from "@/contexts/TenantContext";
import { FunnelPreview } from "@/components/funnel-preview";
import type { Funnel, Verse, Theme } from "@shared/schema";
import JSZip from "jszip";
import { saveAs } from "file-saver";

export default function Export() {
  const [selectedFunnelId, setSelectedFunnelId] = useState<string>("");
  const [selectedFunnelIds, setSelectedFunnelIds] = useState<string[]>([]);
  const [isExporting, setIsExporting] = useState(false);
  const [exportMode, setExportMode] = useState<"single" | "bulk">("single");
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

  const handleSingleExport = async () => {
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

  const handleBulkExport = async () => {
    if (selectedFunnelIds.length === 0) {
      toast({
        title: "No funnels selected",
        description: "Please select at least one funnel to export",
        variant: "destructive",
      });
      return;
    }

    try {
      setIsExporting(true);
      const masterZip = new JSZip();

      for (const funnelId of selectedFunnelIds) {
        const funnel = funnels?.find(f => f.id === funnelId);
        if (!funnel) continue;

        const funnelVerses = verses?.filter(v => v.funnelId === funnelId) || [];
        const funnelThemes = themes?.filter(t => t.funnelId === funnelId) || [];
        
        const folderName = funnel.name.toLowerCase().replace(/[^a-z0-9]/g, '-').replace(/--+/g, '-');
        const folder = masterZip.folder(folderName);
        
        if (folder) {
          await addFunnelToZip(folder, funnel, funnelVerses, funnelThemes, settings || undefined);
        }
      }

      const content = await masterZip.generateAsync({ type: "blob" });
      saveAs(content, `faith-funnels-bulk-export-${Date.now()}.zip`);

      toast({
        title: "Bulk export successful!",
        description: `${selectedFunnelIds.length} funnel(s) have been downloaded.`,
      });
    } catch (error) {
      toast({
        title: "Bulk export failed",
        description: "There was an error exporting your funnels. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsExporting(false);
    }
  };

  const toggleFunnelSelection = (funnelId: string) => {
    setSelectedFunnelIds(prev => 
      prev.includes(funnelId)
        ? prev.filter(id => id !== funnelId)
        : [...prev, funnelId]
    );
  };

  const selectAllFunnels = () => {
    if (funnels) {
      setSelectedFunnelIds(funnels.map(f => f.id));
    }
  };

  const deselectAllFunnels = () => {
    setSelectedFunnelIds([]);
  };

  const selectedFunnel = funnels?.find(f => f.id === selectedFunnelId);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-semibold">Export Funnel</h1>
        <p className="text-muted-foreground">Download your complete funnel as HTML</p>
      </div>

      <Tabs value={exportMode} onValueChange={(v) => setExportMode(v as "single" | "bulk")}>
        <TabsList>
          <TabsTrigger value="single" data-testid="tab-single-export">
            <Download className="h-4 w-4 mr-2" />
            Single Export
          </TabsTrigger>
          <TabsTrigger value="bulk" data-testid="tab-bulk-export">
            <Layers className="h-4 w-4 mr-2" />
            Bulk Export
          </TabsTrigger>
        </TabsList>

        <TabsContent value="single" className="mt-6">
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
                      <div className="flex items-center justify-between">
                        <h4 className="font-medium">Funnel Preview:</h4>
                        <FunnelPreview 
                          funnel={selectedFunnel}
                          trigger={
                            <Button variant="ghost" size="sm" data-testid="button-preview-live">
                              <Eye className="h-4 w-4 mr-2" />
                              Live Preview
                            </Button>
                          }
                        />
                      </div>
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
                    onClick={handleSingleExport}
                    disabled={isExporting || !selectedFunnelId}
                    data-testid="button-export-funnel"
                  >
                    {isExporting ? (
                      <>
                        <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                        Generating ZIP...
                      </>
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
        </TabsContent>

        <TabsContent value="bulk" className="mt-6">
          <div className="grid gap-6 lg:grid-cols-3">
            <div className="lg:col-span-2">
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle>Bulk Export</CardTitle>
                      <CardDescription>
                        Select multiple funnels to export at once
                      </CardDescription>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button variant="outline" size="sm" onClick={selectAllFunnels} data-testid="button-select-all">
                        Select All
                      </Button>
                      <Button variant="outline" size="sm" onClick={deselectAllFunnels} data-testid="button-deselect-all">
                        Deselect All
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="border rounded-lg divide-y">
                    {funnels?.map((funnel) => (
                      <div 
                        key={funnel.id}
                        className="flex items-center gap-4 p-4 hover-elevate"
                        data-testid={`bulk-funnel-${funnel.id}`}
                      >
                        <Checkbox
                          checked={selectedFunnelIds.includes(funnel.id)}
                          onCheckedChange={() => toggleFunnelSelection(funnel.id)}
                          data-testid={`checkbox-funnel-${funnel.id}`}
                        />
                        <div className="flex-1">
                          <p className="font-medium">{funnel.name}</p>
                          <p className="text-sm text-muted-foreground">
                            {funnel.stages.length} stage(s)
                          </p>
                        </div>
                        <FunnelPreview 
                          funnel={funnel}
                          trigger={
                            <Button variant="ghost" size="icon" data-testid={`button-preview-bulk-${funnel.id}`}>
                              <Eye className="h-4 w-4" />
                            </Button>
                          }
                        />
                      </div>
                    ))}
                    {(!funnels || funnels.length === 0) && (
                      <div className="p-8 text-center text-muted-foreground">
                        No funnels available to export
                      </div>
                    )}
                  </div>

                  <div className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
                    <span className="font-medium">
                      {selectedFunnelIds.length} funnel(s) selected
                    </span>
                    <Button 
                      onClick={handleBulkExport}
                      disabled={isExporting || selectedFunnelIds.length === 0}
                      data-testid="button-bulk-export"
                    >
                      {isExporting ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Exporting...
                        </>
                      ) : (
                        <>
                          <Download className="mr-2 h-4 w-4" />
                          Export Selected
                        </>
                      )}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Bulk Export Info</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-start gap-3">
                    <Layers className="h-5 w-5 text-primary mt-0.5" />
                    <div>
                      <p className="font-medium text-sm">Multiple Funnels</p>
                      <p className="text-xs text-muted-foreground">
                        Export all selected funnels in one ZIP
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <FileCode className="h-5 w-5 text-primary mt-0.5" />
                    <div>
                      <p className="font-medium text-sm">Organized Folders</p>
                      <p className="text-xs text-muted-foreground">
                        Each funnel in its own folder
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-primary mt-0.5" />
                    <div>
                      <p className="font-medium text-sm">Time Saver</p>
                      <p className="text-xs text-muted-foreground">
                        Perfect for agency/batch work
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-primary/5 border-primary/20">
                <CardContent className="p-4">
                  <p className="text-sm">
                    <strong>Agency Tip:</strong> Use bulk export when delivering multiple funnels to clients. Each funnel will be in its own folder within the ZIP file.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
