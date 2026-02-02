import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Eye, Monitor, Smartphone, Tablet, X } from "lucide-react";
import type { Funnel } from "@shared/schema";

interface FunnelPreviewProps {
  funnel: Funnel;
  theme?: {
    primaryColor: string;
    secondaryColor: string;
    accentColor: string;
  };
  trigger?: React.ReactNode;
}

export function FunnelPreview({ funnel, theme, trigger }: FunnelPreviewProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [activeStage, setActiveStage] = useState(0);
  const [deviceSize, setDeviceSize] = useState<"desktop" | "tablet" | "mobile">("desktop");

  const stages = funnel.stages || [];
  const currentStage = stages[activeStage];

  const primaryColor = theme?.primaryColor || "#4F46E5";
  const secondaryColor = theme?.secondaryColor || "#10B981";
  const accentColor = theme?.accentColor || "#F59E0B";

  const getDeviceWidth = () => {
    switch (deviceSize) {
      case "mobile":
        return "375px";
      case "tablet":
        return "768px";
      default:
        return "100%";
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        {trigger || (
          <Button variant="outline" size="sm" data-testid="button-preview-funnel">
            <Eye className="h-4 w-4 mr-2" />
            Preview
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="max-w-6xl h-[90vh] flex flex-col p-0">
        <DialogHeader className="p-4 border-b flex flex-row items-center justify-between space-y-0">
          <div className="flex items-center gap-3">
            <DialogTitle>{funnel.name} - Live Preview</DialogTitle>
            <Badge variant="outline">Preview Mode</Badge>
          </div>
          <div className="flex items-center gap-2">
            <Tabs value={deviceSize} onValueChange={(v) => setDeviceSize(v as any)}>
              <TabsList>
                <TabsTrigger value="desktop" data-testid="preview-device-desktop">
                  <Monitor className="h-4 w-4" />
                </TabsTrigger>
                <TabsTrigger value="tablet" data-testid="preview-device-tablet">
                  <Tablet className="h-4 w-4" />
                </TabsTrigger>
                <TabsTrigger value="mobile" data-testid="preview-device-mobile">
                  <Smartphone className="h-4 w-4" />
                </TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
        </DialogHeader>

        <div className="flex-1 flex overflow-hidden">
          <div className="w-48 border-r p-4 space-y-2 overflow-y-auto bg-muted/30">
            <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-3">
              Stages
            </p>
            {stages.map((stage, index) => (
              <button
                key={stage.id}
                onClick={() => setActiveStage(index)}
                className={`w-full text-left p-3 rounded-lg transition-colors ${
                  activeStage === index
                    ? "bg-primary text-primary-foreground"
                    : "hover-elevate"
                }`}
                data-testid={`preview-stage-${index}`}
              >
                <p className="font-medium text-sm truncate">{stage.title}</p>
                <p className="text-xs opacity-70 capitalize">
                  {stage.type === 'main' ? 'Main Offer' : 
                   stage.type === 'oto' ? 'One-Time Offer' : 'Downsell'}
                </p>
              </button>
            ))}
            {stages.length === 0 && (
              <p className="text-sm text-muted-foreground text-center py-4">
                No stages configured
              </p>
            )}
          </div>

          <div className="flex-1 p-6 bg-muted/10 overflow-auto flex justify-center">
            <div
              className="bg-background rounded-lg shadow-lg overflow-hidden transition-all duration-300"
              style={{
                width: getDeviceWidth(),
                maxWidth: "100%",
                minHeight: "600px",
              }}
            >
              {currentStage ? (
                <PreviewContent stage={currentStage} colors={{ primaryColor, secondaryColor, accentColor }} />
              ) : (
                <div className="flex items-center justify-center h-full text-muted-foreground">
                  <div className="text-center">
                    <Eye className="h-12 w-12 mx-auto mb-4 opacity-50" />
                    <p>No stage selected</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

function PreviewContent({
  stage,
  colors,
}: {
  stage: { id: string; type: string; title: string; price?: string; description?: string };
  colors: { primaryColor: string; secondaryColor: string; accentColor: string };
}) {
  const { primaryColor, secondaryColor, accentColor } = colors;

  return (
    <div className="min-h-full">
      <div
        className="py-12 px-6 text-center text-white"
        style={{ background: `linear-gradient(135deg, ${primaryColor}, ${secondaryColor})` }}
      >
        <h1 className="text-3xl md:text-4xl font-bold mb-4">{stage.title}</h1>
        <p className="text-xl opacity-90">
          {stage.type === 'main' ? 'Discover Your Faith-Based Solution' :
           stage.type === 'oto' ? 'Special One-Time Offer' : 'Limited Time Downsell'}
        </p>
      </div>

      <div className="p-8">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-8">
            <div
              className="inline-block px-6 py-3 rounded-full text-3xl font-bold text-white mb-4"
              style={{ backgroundColor: accentColor }}
            >
              {stage.price || '$47'}
            </div>
            <p className="text-muted-foreground">
              {stage.description || 'Transform your ministry with this powerful resource.'}
            </p>
          </div>

          <div className="space-y-4 mb-8">
            <div className="flex items-start gap-3 p-4 border rounded-lg">
              <div
                className="w-6 h-6 rounded-full flex items-center justify-center text-white text-sm"
                style={{ backgroundColor: primaryColor }}
              >
                ✓
              </div>
              <div>
                <p className="font-medium">Instant Digital Access</p>
                <p className="text-sm text-muted-foreground">Get started immediately after purchase</p>
              </div>
            </div>
            <div className="flex items-start gap-3 p-4 border rounded-lg">
              <div
                className="w-6 h-6 rounded-full flex items-center justify-center text-white text-sm"
                style={{ backgroundColor: primaryColor }}
              >
                ✓
              </div>
              <div>
                <p className="font-medium">14-Day Money Back Guarantee</p>
                <p className="text-sm text-muted-foreground">Try it risk-free with our refund policy</p>
              </div>
            </div>
            <div className="flex items-start gap-3 p-4 border rounded-lg">
              <div
                className="w-6 h-6 rounded-full flex items-center justify-center text-white text-sm"
                style={{ backgroundColor: primaryColor }}
              >
                ✓
              </div>
              <div>
                <p className="font-medium">Lifetime Updates</p>
                <p className="text-sm text-muted-foreground">Receive all future improvements at no extra cost</p>
              </div>
            </div>
          </div>

          <div className="text-center">
            <button
              className="w-full md:w-auto px-12 py-4 rounded-lg text-white font-bold text-lg transition-transform hover:scale-105"
              style={{ backgroundColor: primaryColor }}
            >
              {stage.type === 'main' ? 'Get Instant Access Now' :
               stage.type === 'oto' ? 'Yes! Add This To My Order' : 'I Want This Deal'}
            </button>
            {stage.type !== 'main' && (
              <p className="mt-3 text-sm text-muted-foreground cursor-pointer hover:underline">
                No thanks, I'll skip this offer
              </p>
            )}
          </div>
        </div>
      </div>

      <div className="border-t p-6 text-center text-sm text-muted-foreground bg-muted/30">
        <p>Powered by Faith Funnels AI</p>
        <div className="flex justify-center gap-4 mt-2">
          <span className="cursor-pointer hover:underline">Terms</span>
          <span className="cursor-pointer hover:underline">Privacy</span>
          <span className="cursor-pointer hover:underline">Refund Policy</span>
        </div>
      </div>
    </div>
  );
}
