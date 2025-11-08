import { useState } from "react";
import { Plus, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { useQuery, useMutation } from "@tanstack/react-query";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import type { Funnel } from "@shared/schema";
import { Link } from "wouter";

export default function Funnels() {
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [funnelName, setFunnelName] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const { toast } = useToast();

  const { data: funnels, isLoading } = useQuery<Funnel[]>({
    queryKey: ["/api/funnels"],
  });

  const createMutation = useMutation({
    mutationFn: async (name: string) => {
      return apiRequest("/api/funnels", {
        method: "POST",
        body: JSON.stringify({ name, stages: [] }),
        headers: { "Content-Type": "application/json" },
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/funnels"] });
      toast({
        title: "Funnel created",
        description: "Your new funnel has been created successfully.",
      });
      setIsCreateOpen(false);
      setFunnelName("");
    },
  });

  const handleCreateFunnel = () => {
    if (!funnelName.trim()) return;
    createMutation.mutate(funnelName);
  };

  const filteredFunnels = funnels?.filter(funnel =>
    funnel.name.toLowerCase().includes(searchQuery.toLowerCase())
  ) || [];

  if (isLoading) {
    return <div className="flex items-center justify-center h-64">Loading...</div>;
  }

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
                disabled={createMutation.isPending || !funnelName.trim()}
                data-testid="button-submit-create-funnel"
              >
                {createMutation.isPending ? "Creating..." : "Create Funnel"}
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

      {filteredFunnels.length > 0 ? (
        <div className="space-y-4">
          <h2 className="text-lg font-semibold">Your Funnels ({filteredFunnels.length})</h2>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {filteredFunnels.map(funnel => (
              <Link key={funnel.id} href={`/funnels/${funnel.id}`}>
                <Card className="hover-elevate active-elevate-2 cursor-pointer transition-all">
                  <CardHeader>
                    <CardTitle className="text-lg">{funnel.name}</CardTitle>
                    <p className="text-sm text-muted-foreground">
                      {funnel.stages.length} stage{funnel.stages.length !== 1 ? 's' : ''}
                    </p>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      {funnel.stages.map((stage, idx) => (
                        <div key={stage.id} className="flex items-center gap-2 text-sm">
                          <span className="text-muted-foreground">{idx + 1}.</span>
                          <span>{stage.title}</span>
                          <span className="ml-auto text-xs bg-muted px-2 py-1 rounded">
                            {stage.type.toUpperCase()}
                          </span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      ) : (
        <div className="rounded-lg border bg-muted/50 p-12 text-center">
          <p className="text-muted-foreground mb-4">
            {searchQuery ? "No funnels match your search" : "No funnels yet. Create your first one to get started!"}
          </p>
        </div>
      )}

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
