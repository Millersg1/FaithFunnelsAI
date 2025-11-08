import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import NotFound from "@/pages/not-found";
import Dashboard from "@/pages/dashboard";
import Funnels from "@/pages/funnels";
import VerseBuilder from "@/pages/verse-builder";
import ThemeSettings from "@/pages/theme-settings";
import Export from "@/pages/export";
import Terms from "@/pages/legal/terms";
import Privacy from "@/pages/legal/privacy";
import Refund from "@/pages/legal/refund";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Dashboard} />
      <Route path="/funnels" component={Funnels} />
      <Route path="/verse-builder" component={VerseBuilder} />
      <Route path="/theme-settings" component={ThemeSettings} />
      <Route path="/export" component={Export} />
      <Route path="/legal/terms" component={Terms} />
      <Route path="/legal/privacy" component={Privacy} />
      <Route path="/legal/refund" component={Refund} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  const style = {
    "--sidebar-width": "16rem",
    "--sidebar-width-icon": "3rem",
  };

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <SidebarProvider style={style as React.CSSProperties}>
          <div className="flex h-screen w-full">
            <AppSidebar />
            <div className="flex flex-1 flex-col overflow-hidden">
              <header className="flex h-14 items-center gap-4 border-b bg-background px-6">
                <SidebarTrigger data-testid="button-sidebar-toggle" />
                <div className="flex-1" />
              </header>
              <main className="flex-1 overflow-auto p-6">
                <Router />
              </main>
            </div>
          </div>
        </SidebarProvider>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
