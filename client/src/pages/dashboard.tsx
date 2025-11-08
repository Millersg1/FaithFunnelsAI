import { Filter, Download, Palette, BookOpen } from "lucide-react";
import { StatCard } from "@/components/stat-card";
import { VerseCard } from "@/components/verse-card";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";

export default function Dashboard() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-semibold">Dashboard</h1>
          <p className="text-muted-foreground">Welcome to Faith Funnels AI</p>
        </div>
        <Link href="/funnels">
          <Button data-testid="button-create-funnel">
            <Filter className="mr-2 h-4 w-4" />
            Create New Filter
          </Button>
        </Link>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Total Funnels"
          value={12}
          icon={Filter}
          description="Active funnels"
        />
        <StatCard
          title="Exports"
          value={34}
          icon={Download}
          description="This month"
        />
        <StatCard
          title="Verses Used"
          value={28}
          icon={BookOpen}
          description="Unique verses"
        />
        <StatCard
          title="Custom Themes"
          value={5}
          icon={Palette}
          description="Saved themes"
        />
      </div>

      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Today's Inspiration</h2>
        <VerseCard
          verse="Trust in the Lord with all your heart and lean not on your own understanding; in all your ways submit to him, and he will make your paths straight."
          reference="Proverbs 3:5-6"
        />
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
            <li>• Created "Faith Journey" funnel - 2 hours ago</li>
            <li>• Exported "Blessed Life" funnel - Yesterday</li>
            <li>• Updated theme colors - 3 days ago</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
