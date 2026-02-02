import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Loader2, TrendingUp, Eye, Target, DollarSign, BarChart3 } from "lucide-react";
import type { Funnel } from "@shared/schema";
import { useState } from "react";

interface FunnelAnalytics {
  views: number;
  conversions: number;
  revenue: number;
  conversionRate: number;
}

export default function Analytics() {
  const [selectedFunnelId, setSelectedFunnelId] = useState<string>("");

  const { data: funnels = [], isLoading: funnelsLoading } = useQuery<Funnel[]>({
    queryKey: ["/api/funnels"],
  });

  const { data: analytics, isLoading: analyticsLoading } = useQuery<FunnelAnalytics>({
    queryKey: ["/api/analytics/funnels", selectedFunnelId],
    enabled: !!selectedFunnelId,
  });

  const selectedFunnel = funnels.find(f => f.id === selectedFunnelId);

  if (funnelsLoading) {
    return (
      <div className="flex items-center justify-center h-full">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 space-y-8">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div className="flex items-center gap-3">
          <BarChart3 className="h-8 w-8 text-primary" />
          <div>
            <h1 className="text-3xl font-bold" data-testid="text-analytics-title">Funnel Analytics</h1>
            <p className="text-muted-foreground">Track your funnel performance and conversions</p>
          </div>
        </div>

        <Select value={selectedFunnelId} onValueChange={setSelectedFunnelId}>
          <SelectTrigger className="w-full md:w-[300px]" data-testid="select-funnel">
            <SelectValue placeholder="Select a funnel" />
          </SelectTrigger>
          <SelectContent>
            {funnels.map((funnel) => (
              <SelectItem key={funnel.id} value={funnel.id}>
                {funnel.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {!selectedFunnelId ? (
        <Card className="py-16">
          <CardContent className="text-center">
            <BarChart3 className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
            <h3 className="text-xl font-semibold mb-2">Select a Funnel</h3>
            <p className="text-muted-foreground">
              Choose a funnel from the dropdown above to view its analytics.
            </p>
          </CardContent>
        </Card>
      ) : analyticsLoading ? (
        <div className="flex items-center justify-center py-16">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      ) : (
        <>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <StatCard
              title="Total Views"
              value={analytics?.views || 0}
              icon={Eye}
              description="Page views across all stages"
              color="text-blue-500"
            />
            <StatCard
              title="Conversions"
              value={analytics?.conversions || 0}
              icon={Target}
              description="Completed actions"
              color="text-green-500"
            />
            <StatCard
              title="Conversion Rate"
              value={`${(analytics?.conversionRate || 0).toFixed(1)}%`}
              icon={TrendingUp}
              description="Views to conversions"
              color="text-purple-500"
            />
            <StatCard
              title="Revenue"
              value={`$${((analytics?.revenue || 0) / 100).toFixed(2)}`}
              icon={DollarSign}
              description="Total revenue generated"
              color="text-amber-500"
            />
          </div>

          {selectedFunnel && (
            <Card>
              <CardHeader>
                <CardTitle>Stage Performance</CardTitle>
                <CardDescription>Breakdown by funnel stage</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {selectedFunnel.stages?.map((stage, index) => (
                    <div
                      key={stage.id}
                      className="flex items-center justify-between p-4 border rounded-lg"
                      data-testid={`stage-analytics-${index}`}
                    >
                      <div className="flex items-center gap-3">
                        <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                          stage.type === 'main' ? 'bg-primary/10 text-primary' :
                          stage.type === 'oto' ? 'bg-amber-500/10 text-amber-500' :
                          'bg-blue-500/10 text-blue-500'
                        }`}>
                          {index + 1}
                        </div>
                        <div>
                          <p className="font-medium">{stage.title}</p>
                          <p className="text-sm text-muted-foreground capitalize">
                            {stage.type === 'main' ? 'Main Offer' : 
                             stage.type === 'oto' ? 'One-Time Offer' : 'Downsell'}
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold">—</p>
                        <p className="text-sm text-muted-foreground">No data yet</p>
                      </div>
                    </div>
                  ))}
                </div>

                {(!selectedFunnel.stages || selectedFunnel.stages.length === 0) && (
                  <div className="text-center py-8 text-muted-foreground">
                    This funnel has no stages configured.
                  </div>
                )}
              </CardContent>
            </Card>
          )}

          <Card>
            <CardHeader>
              <CardTitle>Getting Started with Analytics</CardTitle>
              <CardDescription>How to track your funnel performance</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="p-4 bg-muted/50 rounded-lg">
                <h4 className="font-medium mb-2">Tracking Code</h4>
                <p className="text-sm text-muted-foreground mb-3">
                  When you export your funnel, tracking code is automatically included. The exported HTML will send analytics data back to track views and conversions.
                </p>
                <code className="block p-3 bg-background rounded text-xs overflow-x-auto">
                  {`<!-- Analytics tracking is automatically included in exported funnels -->`}
                </code>
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="p-4 border rounded-lg">
                  <h4 className="font-medium mb-1">Views</h4>
                  <p className="text-sm text-muted-foreground">
                    Automatically tracked when visitors view your funnel pages.
                  </p>
                </div>
                <div className="p-4 border rounded-lg">
                  <h4 className="font-medium mb-1">Conversions</h4>
                  <p className="text-sm text-muted-foreground">
                    Tracked when visitors click your CTA buttons.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </>
      )}
    </div>
  );
}

function StatCard({
  title,
  value,
  icon: Icon,
  description,
  color,
}: {
  title: string;
  value: string | number;
  icon: React.ElementType;
  description: string;
  color: string;
}) {
  return (
    <Card data-testid={`stat-card-${title.toLowerCase().replace(/\s+/g, "-")}`}>
      <CardHeader className="flex flex-row items-center justify-between gap-2 space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        <Icon className={`h-4 w-4 ${color}`} />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        <p className="text-xs text-muted-foreground">{description}</p>
      </CardContent>
    </Card>
  );
}
