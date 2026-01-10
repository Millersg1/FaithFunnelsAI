import { useState } from "react";
import { Plus, Search, BookOpen, ArrowDown, Gift, Sparkles } from "lucide-react";
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
  const [isLearnMoreOpen, setIsLearnMoreOpen] = useState(false);
  const [funnelName, setFunnelName] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const { toast } = useToast();

  const { data: funnels, isLoading } = useQuery<Funnel[]>({
    queryKey: ["/api/funnels"],
  });

  const createMutation = useMutation({
    mutationFn: async (name: string) => {
      const response = await apiRequest("POST", "/api/funnels", { name, stages: [] });
      return response.json();
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
              <Link key={funnel.id} href={`/app/funnels/${funnel.id}`}>
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
        <Dialog open={isLearnMoreOpen} onOpenChange={setIsLearnMoreOpen}>
          <DialogTrigger asChild>
            <Button variant="outline" data-testid="button-learn-more">
              <BookOpen className="mr-2 h-4 w-4" />
              Learn More About Funnel Structure
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[85vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="text-2xl flex items-center gap-2">
                <Sparkles className="h-6 w-6 text-primary" />
                What is a Sales Funnel?
              </DialogTitle>
              <DialogDescription>
                A simple guide to understanding how funnels work
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-6 py-4">
              <div className="bg-primary/10 rounded-lg p-4 border border-primary/20">
                <p className="text-lg font-medium text-center">
                  Think of a funnel like a path that guides people from "Hello!" to "Yes, I want this!"
                </p>
              </div>

              <div className="space-y-4">
                <h3 className="font-semibold text-lg flex items-center gap-2">
                  <Gift className="h-5 w-5 text-green-600" />
                  The Main Offer (Your First Hello)
                </h3>
                <div className="pl-7 space-y-2">
                  <p className="text-muted-foreground">
                    This is like opening a lemonade stand. It's your main product - the first thing people see!
                  </p>
                  <p className="text-muted-foreground">
                    Example: "Get Faith Funnels AI for just $17!"
                  </p>
                  <div className="bg-green-50 dark:bg-green-950/30 rounded p-3 text-sm">
                    The Main Offer is your welcome mat. Make it friendly and valuable!
                  </div>
                </div>
              </div>

              <div className="flex justify-center">
                <ArrowDown className="h-6 w-6 text-muted-foreground" />
              </div>

              <div className="space-y-4">
                <h3 className="font-semibold text-lg flex items-center gap-2">
                  <Sparkles className="h-5 w-5 text-blue-600" />
                  OTO = One-Time Offer (A Special Bonus)
                </h3>
                <div className="pl-7 space-y-2">
                  <p className="text-muted-foreground">
                    After someone buys your lemonade, you can say: "Want some cookies too? Only available right now!"
                  </p>
                  <p className="text-muted-foreground">
                    OTOs are special deals you show ONLY after someone says yes to your main offer. They get it just once!
                  </p>
                  <div className="bg-blue-50 dark:bg-blue-950/30 rounded p-3 text-sm">
                    OTOs work great because the person already trusts you. They're ready to buy more!
                  </div>
                </div>
              </div>

              <div className="flex justify-center">
                <ArrowDown className="h-6 w-6 text-muted-foreground" />
              </div>

              <div className="space-y-4">
                <h3 className="font-semibold text-lg flex items-center gap-2">
                  <Gift className="h-5 w-5 text-orange-600" />
                  DS = Downsell (A Smaller Option)
                </h3>
                <div className="pl-7 space-y-2">
                  <p className="text-muted-foreground">
                    If someone says "No thanks" to your cookies, you can offer: "How about just one cookie for less money?"
                  </p>
                  <p className="text-muted-foreground">
                    A Downsell is a smaller, cheaper version of what they said no to. It gives them another chance!
                  </p>
                  <div className="bg-orange-50 dark:bg-orange-950/30 rounded p-3 text-sm">
                    Downsells help you help more people by offering something they CAN afford.
                  </div>
                </div>
              </div>

              <div className="border-t pt-4 mt-4">
                <h3 className="font-semibold text-lg mb-3">Putting It All Together</h3>
                <div className="bg-muted rounded-lg p-4 space-y-2">
                  <div className="flex items-center gap-2">
                    <span className="bg-green-600 text-white text-xs px-2 py-1 rounded">MAIN</span>
                    <span>Your main product (the lemonade)</span>
                  </div>
                  <div className="flex items-center gap-2 pl-4">
                    <ArrowDown className="h-4 w-4 text-muted-foreground" />
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="bg-blue-600 text-white text-xs px-2 py-1 rounded">OTO1</span>
                    <span>First bonus offer (the cookies)</span>
                  </div>
                  <div className="flex items-center gap-2 pl-4">
                    <ArrowDown className="h-4 w-4 text-muted-foreground" />
                    <span className="text-xs text-muted-foreground">If they say no...</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="bg-orange-600 text-white text-xs px-2 py-1 rounded">DS1</span>
                    <span>Smaller option (just one cookie)</span>
                  </div>
                </div>
              </div>

              <div className="bg-primary/5 rounded-lg p-4 border text-center space-y-3">
                <p className="font-medium">Ready to build your first funnel?</p>
                <p className="text-sm text-muted-foreground">
                  Click "Create Funnel" above and start adding your Main Offer, OTOs, and Downsells!
                </p>
                <Button 
                  onClick={() => setIsLearnMoreOpen(false)} 
                  className="w-full"
                  data-testid="button-got-it"
                >
                  Got It, Let's Build!
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}
