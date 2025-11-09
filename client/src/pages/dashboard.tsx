import { Filter, Download, Palette, BookOpen, Crown } from "lucide-react";
import { StatCard } from "@/components/stat-card";
import { VerseCard } from "@/components/verse-card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Link } from "wouter";
import { useQuery } from "@tanstack/react-query";
import type { Funnel as FunnelType, Verse, Theme } from "@shared/schema";
import { useTenant } from "@/contexts/TenantContext";

export default function Dashboard() {
  const { features, tier, slug } = useTenant();
  
  const { data: funnels } = useQuery<FunnelType[]>({
    queryKey: ["/api/funnels"],
  });

  const { data: verses } = useQuery<Verse[]>({
    queryKey: ["/api/verses"],
  });

  const { data: themes } = useQuery<Theme[]>({
    queryKey: ["/api/themes"],
  });

  const totalStages = funnels?.reduce((sum, funnel) => sum + funnel.stages.length, 0) || 0;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <div className="flex items-center gap-3">
            <h1 className="text-3xl font-semibold">Dashboard</h1>
            <Badge variant="secondary" className="gap-1" data-testid="badge-tier">
              <Crown className="h-3 w-3" />
              {features.name}
            </Badge>
          </div>
          <p className="text-muted-foreground">Welcome to Faith Funnels AI</p>
        </div>
        <Link href={slug ? `/t/${slug}/funnels` : "/app/funnels"}>
          <Button data-testid="button-create-funnel">
            <Filter className="mr-2 h-4 w-4" />
            Create New Funnel
          </Button>
        </Link>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Total Funnels"
          value={funnels?.length || 0}
          icon={Filter}
          description="Active funnels"
        />
        <StatCard
          title="Funnel Stages"
          value={totalStages}
          icon={Download}
          description="Total stages"
        />
        <StatCard
          title="Verses Used"
          value={verses?.length || 0}
          icon={BookOpen}
          description="Unique verses"
        />
        <StatCard
          title="Custom Themes"
          value={themes?.length || 0}
          icon={Palette}
          description="Saved themes"
        />
      </div>

      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Today's Inspiration</h2>
        {verses && verses.length > 0 ? (
          <VerseCard
            verse={verses[0].verseText}
            reference={verses[0].reference}
          />
        ) : (
          <VerseCard
            verse="Trust in the Lord with all your heart and lean not on your own understanding; in all your ways submit to him, and he will make your paths straight."
            reference="Proverbs 3:5-6"
          />
        )}
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <div className="rounded-lg border bg-card p-6">
          <h3 className="text-lg font-semibold mb-2">Quick Start Guide</h3>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li>1. Create your first funnel with a faith-based message</li>
            <li>2. Add Bible verses to inspire your visitors</li>
            <li>3. Customize colors to match your ministry brand</li>
            <li>4. Export as HTML and upload to your server</li>
          </ul>
        </div>
        <div className="rounded-lg border bg-card p-6">
          <h3 className="text-lg font-semibold mb-2">Recent Activity</h3>
          <ul className="space-y-2 text-sm text-muted-foreground">
            {funnels && funnels.length > 0 ? (
              funnels.slice(0, 3).map((funnel) => (
                <li key={funnel.id}>• Created "{funnel.name}" funnel</li>
              ))
            ) : (
              <li>• No activity yet. Start by creating your first funnel!</li>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
}
