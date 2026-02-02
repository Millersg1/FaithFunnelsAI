import { useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Loader2, Plus, FlaskConical, Trash2, Play, Pause, Trophy, BarChart3 } from "lucide-react";
import { queryClient, apiRequest } from "@/lib/queryClient";
import type { Funnel, AbTest, AbVariant } from "@shared/schema";

export default function AbTesting() {
  const [selectedFunnelId, setSelectedFunnelId] = useState<string>("");
  const [newTestName, setNewTestName] = useState("");
  const [newTestElement, setNewTestElement] = useState<"headline" | "cta" | "verse">("headline");
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);

  const { data: funnels = [], isLoading: funnelsLoading } = useQuery<Funnel[]>({
    queryKey: ["/api/funnels"],
  });

  const { data: tests = [], isLoading: testsLoading } = useQuery<AbTest[]>({
    queryKey: ["/api/ab-tests", selectedFunnelId],
    enabled: !!selectedFunnelId,
  });

  const createTestMutation = useMutation({
    mutationFn: async (data: { name: string; funnelId: string; elementType: string }) =>
      apiRequest("POST", "/api/ab-tests", data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/ab-tests"] });
      setIsCreateDialogOpen(false);
      setNewTestName("");
    },
  });

  const toggleTestMutation = useMutation({
    mutationFn: async ({ testId, status }: { testId: string; status: string }) =>
      apiRequest("PATCH", `/api/ab-tests/${testId}`, { status }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/ab-tests"] });
    },
  });

  const deleteTestMutation = useMutation({
    mutationFn: async (testId: string) =>
      apiRequest("DELETE", `/api/ab-tests/${testId}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/ab-tests"] });
    },
  });

  const handleCreateTest = () => {
    if (!newTestName.trim() || !selectedFunnelId) return;
    createTestMutation.mutate({
      name: newTestName,
      funnelId: selectedFunnelId,
      elementType: newTestElement,
    });
  };

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
          <FlaskConical className="h-8 w-8 text-primary" />
          <div>
            <h1 className="text-3xl font-bold" data-testid="text-ab-testing-title">A/B Testing</h1>
            <p className="text-muted-foreground">Test headlines, CTAs, and verses to optimize conversions</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Select value={selectedFunnelId} onValueChange={setSelectedFunnelId}>
            <SelectTrigger className="w-full md:w-[250px]" data-testid="select-funnel-ab">
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

          <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
            <DialogTrigger asChild>
              <Button disabled={!selectedFunnelId} data-testid="button-create-ab-test">
                <Plus className="h-4 w-4 mr-2" />
                New Test
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Create A/B Test</DialogTitle>
                <DialogDescription>
                  Set up a new A/B test to optimize your funnel performance.
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="test-name">Test Name</Label>
                  <Input
                    id="test-name"
                    placeholder="e.g., Headline Test - March 2025"
                    value={newTestName}
                    onChange={(e) => setNewTestName(e.target.value)}
                    data-testid="input-test-name"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="element-type">Element to Test</Label>
                  <Select value={newTestElement} onValueChange={(v) => setNewTestElement(v as any)}>
                    <SelectTrigger data-testid="select-element-type">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="headline">Headline</SelectItem>
                      <SelectItem value="cta">Call-to-Action</SelectItem>
                      <SelectItem value="verse">Bible Verse</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsCreateDialogOpen(false)}>
                  Cancel
                </Button>
                <Button
                  onClick={handleCreateTest}
                  disabled={createTestMutation.isPending || !newTestName.trim()}
                  data-testid="button-confirm-create-test"
                >
                  {createTestMutation.isPending && <Loader2 className="h-4 w-4 mr-2 animate-spin" />}
                  Create Test
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {!selectedFunnelId ? (
        <Card className="py-16">
          <CardContent className="text-center">
            <FlaskConical className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
            <h3 className="text-xl font-semibold mb-2">Select a Funnel</h3>
            <p className="text-muted-foreground">
              Choose a funnel from the dropdown to view and manage A/B tests.
            </p>
          </CardContent>
        </Card>
      ) : testsLoading ? (
        <div className="flex items-center justify-center py-16">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      ) : tests.length === 0 ? (
        <Card className="py-16">
          <CardContent className="text-center">
            <FlaskConical className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
            <h3 className="text-xl font-semibold mb-2">No A/B Tests Yet</h3>
            <p className="text-muted-foreground mb-4">
              Create your first A/B test to start optimizing your funnel.
            </p>
            <Button onClick={() => setIsCreateDialogOpen(true)} data-testid="button-first-ab-test">
              <Plus className="h-4 w-4 mr-2" />
              Create Your First Test
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-6">
          {tests.map((test) => (
            <AbTestCard
              key={test.id}
              test={test}
              onToggle={(status) => toggleTestMutation.mutate({ testId: test.id, status })}
              onDelete={() => deleteTestMutation.mutate(test.id)}
              isToggling={toggleTestMutation.isPending}
              isDeleting={deleteTestMutation.isPending}
            />
          ))}
        </div>
      )}

      <Card>
        <CardHeader>
          <CardTitle>How A/B Testing Works</CardTitle>
          <CardDescription>Optimize your funnels with data-driven decisions</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid md:grid-cols-3 gap-4">
            <div className="p-4 border rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold">
                  1
                </div>
                <h4 className="font-medium">Create Variants</h4>
              </div>
              <p className="text-sm text-muted-foreground">
                Add different versions of your headlines, CTAs, or Bible verses to test.
              </p>
            </div>
            <div className="p-4 border rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold">
                  2
                </div>
                <h4 className="font-medium">Run the Test</h4>
              </div>
              <p className="text-sm text-muted-foreground">
                Visitors are randomly shown different variants based on traffic allocation.
              </p>
            </div>
            <div className="p-4 border rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold">
                  3
                </div>
                <h4 className="font-medium">Declare a Winner</h4>
              </div>
              <p className="text-sm text-muted-foreground">
                Analyze results and pick the best-performing variant for your funnel.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

function AbTestCard({
  test,
  onToggle,
  onDelete,
  isToggling,
  isDeleting,
}: {
  test: AbTest;
  onToggle: (status: string) => void;
  onDelete: () => void;
  isToggling: boolean;
  isDeleting: boolean;
}) {
  const isRunning = test.status === "running";
  const isPaused = test.status === "paused";
  const isCompleted = test.status === "completed";

  return (
    <Card data-testid={`ab-test-card-${test.id}`}>
      <CardHeader className="flex flex-row items-start justify-between gap-2 space-y-0">
        <div>
          <div className="flex items-center gap-2 flex-wrap">
            <CardTitle className="text-lg">{test.name}</CardTitle>
            <Badge
              variant={isRunning ? "default" : isPaused ? "secondary" : "outline"}
              className={isRunning ? "bg-green-500" : ""}
            >
              {test.status}
            </Badge>
            <Badge variant="outline" className="capitalize">
              {test.testType}
            </Badge>
          </div>
          <CardDescription className="mt-1">
            Created {new Date(test.createdAt!).toLocaleDateString()}
          </CardDescription>
        </div>
        <div className="flex items-center gap-2">
          {!isCompleted && (
            <Button
              variant="outline"
              size="sm"
              onClick={() => onToggle(isRunning ? "paused" : "running")}
              disabled={isToggling}
              data-testid={`button-toggle-test-${test.id}`}
            >
              {isToggling ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : isRunning ? (
                <>
                  <Pause className="h-4 w-4 mr-1" />
                  Pause
                </>
              ) : (
                <>
                  <Play className="h-4 w-4 mr-1" />
                  Start
                </>
              )}
            </Button>
          )}
          {isRunning && (
            <Button
              variant="outline"
              size="sm"
              onClick={() => onToggle("completed")}
              disabled={isToggling}
              data-testid={`button-complete-test-${test.id}`}
            >
              <Trophy className="h-4 w-4 mr-1" />
              End Test
            </Button>
          )}
          <Button
            variant="ghost"
            size="icon"
            onClick={onDelete}
            disabled={isDeleting}
            data-testid={`button-delete-test-${test.id}`}
          >
            {isDeleting ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <Trash2 className="h-4 w-4 text-destructive" />
            )}
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="p-4 border rounded-lg">
            <div className="flex items-center justify-between mb-2">
              <span className="font-medium">Variant A (Control)</span>
              <Badge variant="outline">50%</Badge>
            </div>
            <p className="text-sm text-muted-foreground mb-2">Original version</p>
            <div className="flex items-center gap-4 text-sm">
              <span>Views: —</span>
              <span>Conversions: —</span>
            </div>
          </div>
          <div className="p-4 border rounded-lg">
            <div className="flex items-center justify-between mb-2">
              <span className="font-medium">Variant B</span>
              <Badge variant="outline">50%</Badge>
            </div>
            <p className="text-sm text-muted-foreground mb-2">Test version</p>
            <div className="flex items-center gap-4 text-sm">
              <span>Views: —</span>
              <span>Conversions: —</span>
            </div>
          </div>
        </div>
        {isCompleted && test.winningVariantId && (
          <div className="mt-4 p-4 bg-green-500/10 border border-green-500/20 rounded-lg">
            <div className="flex items-center gap-2">
              <Trophy className="h-5 w-5 text-green-500" />
              <span className="font-medium text-green-600 dark:text-green-400">
                Winner declared!
              </span>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
