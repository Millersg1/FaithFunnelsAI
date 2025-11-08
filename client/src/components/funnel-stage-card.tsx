import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Edit, Trash2, Eye } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface FunnelStageCardProps {
  id: string;
  title: string;
  type: "main" | "oto" | "ds";
  hasVerse?: boolean;
  primaryColor?: string;
  onEdit?: () => void;
  onDelete?: () => void;
  onPreview?: () => void;
}

export function FunnelStageCard({ 
  id, 
  title, 
  type, 
  hasVerse = false,
  primaryColor = "#6366f1",
  onEdit,
  onDelete,
  onPreview
}: FunnelStageCardProps) {
  const typeLabels = {
    main: "Main Offer",
    oto: "One-Time Offer",
    ds: "Downsell"
  };

  return (
    <Card className="hover-elevate" data-testid={`card-funnel-stage-${id}`}>
      <CardHeader className="flex flex-row items-center justify-between gap-2 space-y-0 pb-2">
        <div className="flex items-center gap-2">
          <div 
            className="h-3 w-3 rounded-full" 
            style={{ backgroundColor: primaryColor }}
          />
          <CardTitle className="text-base" data-testid={`text-stage-title-${id}`}>{title}</CardTitle>
        </div>
        <Badge variant="secondary" data-testid={`badge-stage-type-${id}`}>
          {typeLabels[type]}
        </Badge>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            {hasVerse && (
              <Badge variant="outline" className="text-xs">
                Includes Verse
              </Badge>
            )}
          </div>
          <div className="flex gap-2">
            <Button 
              size="sm" 
              variant="outline" 
              className="flex-1"
              onClick={() => {
                console.log(`Preview stage: ${id}`);
                onPreview?.();
              }}
              data-testid={`button-preview-stage-${id}`}
            >
              <Eye className="mr-2 h-4 w-4" />
              Preview
            </Button>
            <Button 
              size="sm" 
              variant="outline"
              onClick={() => {
                console.log(`Edit stage: ${id}`);
                onEdit?.();
              }}
              data-testid={`button-edit-stage-${id}`}
            >
              <Edit className="h-4 w-4" />
            </Button>
            <Button 
              size="sm" 
              variant="outline"
              onClick={() => {
                console.log(`Delete stage: ${id}`);
                onDelete?.();
              }}
              data-testid={`button-delete-stage-${id}`}
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
