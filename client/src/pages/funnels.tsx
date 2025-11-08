import { useState } from "react";
import { Plus, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { FunnelStageCard } from "@/components/funnel-stage-card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";

export default function Funnels() {
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [funnelName, setFunnelName] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  const mockFunnels = [
    { id: "1", name: "Faith Journey Landing Page", type: "main" as const, hasVerse: true, color: "#6366f1" },
    { id: "2", name: "Premium Bible Study OTO", type: "oto" as const, hasVerse: true, color: "#8b5cf6" },
    { id: "3", name: "Daily Devotional Downsell", type: "ds" as const, hasVerse: false, color: "#ec4899" },
  ];

  const handleCreateFunnel = () => {
    console.log("Creating funnel:", funnelName);
    setIsCreateOpen(false);
    setFunnelName("");
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-semibold">My Funnels</h1>
          <p className="text-muted-foreground">Manage your faith-based sales funnels</p>
        </div>
        <Dialog open={isCreateOpen} onOpenChange={setIsCreateOpen}>
          <DialogTrigger asChild>
            <Button data-testid="button-create-new-funnel">
              <Plus className="mr-2 h-4 w-4" />
              Create Funnel
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Create New Funnel</DialogTitle>
              <DialogDescription>
                Start building your faith-based sales funnel
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="funnel-name">Funnel Name</Label>
                <Input
                  id="funnel-name"
                  placeholder="e.g., Faith Journey Landing Page"
                  value={funnelName}
                  onChange={(e) => setFunnelName(e.target.value)}
                  data-testid="input-funnel-name"
                />
              </div>
              <Button 
                className="w-full" 
                onClick={handleCreateFunnel}
                data-testid="button-submit-create-funnel"
              >
                Create Funnel
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="flex items-center gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search funnels..."
            className="pl-9"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            data-testid="input-search-funnels"
          />
        </div>
      </div>

      <div className="space-y-4">
        <h2 className="text-lg font-semibold">Funnel Stages</h2>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {mockFunnels.map((funnel) => (
            <FunnelStageCard
              key={funnel.id}
              id={funnel.id}
              title={funnel.name}
              type={funnel.type}
              hasVerse={funnel.hasVerse}
              primaryColor={funnel.color}
            />
          ))}
        </div>
      </div>

      <div className="rounded-lg border bg-muted/50 p-8 text-center">
        <p className="text-muted-foreground mb-4">
          Each funnel can include a Main Offer, One-Time Offers (OTOs), and Downsells (DSs)
        </p>
        <Button variant="outline" data-testid="button-learn-more">
          Learn More About Funnel Structure
        </Button>
      </div>
    </div>
  );
}
