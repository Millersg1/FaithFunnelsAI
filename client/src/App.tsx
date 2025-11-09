import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import NotFound from "@/pages/not-found";
import Landing from "@/pages/landing";
import Dashboard from "@/pages/dashboard";
import Funnels from "@/pages/funnels";
import FunnelEditor from "@/pages/funnel-editor";
import VerseBuilder from "@/pages/verse-builder";
import ThemeSettings from "@/pages/theme-settings";
import Export from "@/pages/export";
import Terms from "@/pages/legal/terms";
import Privacy from "@/pages/legal/privacy";
import Refund from "@/pages/legal/refund";

function AppLayout({ children }: { children: React.ReactNode }) {
  const style = {
    "--sidebar-width": "16rem",
    "--sidebar-width-icon": "3rem",
  };

  return (
    <SidebarProvider style={style as React.CSSProperties}>
      <div className="flex h-screen w-full">
        <AppSidebar />
        <div className="flex flex-1 flex-col overflow-hidden">
          <header className="flex h-14 items-center gap-4 border-b bg-background px-6">
            <SidebarTrigger data-testid="button-sidebar-toggle" />
            <div className="flex-1" />
          </header>
          <main className="flex-1 overflow-auto p-6">
            {children}
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Switch>
          <Route path="/" component={Landing} />
          <Route path="/terms">
            {() => (
              <AppLayout>
                <Terms />
              </AppLayout>
            )}
          </Route>
          <Route path="/privacy">
            {() => (
              <AppLayout>
                <Privacy />
              </AppLayout>
            )}
          </Route>
          <Route path="/refund">
            {() => (
              <AppLayout>
                <Refund />
              </AppLayout>
            )}
          </Route>
          <Route path="/app">
            {() => (
              <AppLayout>
                <Dashboard />
              </AppLayout>
            )}
          </Route>
          <Route path="/app/funnels">
            {() => (
              <AppLayout>
                <Funnels />
              </AppLayout>
            )}
          </Route>
          <Route path="/app/funnels/:id">
            {() => (
              <AppLayout>
                <FunnelEditor />
              </AppLayout>
            )}
          </Route>
          <Route path="/app/verse-builder">
            {() => (
              <AppLayout>
                <VerseBuilder />
              </AppLayout>
            )}
          </Route>
          <Route path="/app/theme-settings">
            {() => (
              <AppLayout>
                <ThemeSettings />
              </AppLayout>
            )}
          </Route>
          <Route path="/app/export">
            {() => (
              <AppLayout>
                <Export />
              </AppLayout>
            )}
          </Route>
          <Route component={NotFound} />
        </Switch>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
