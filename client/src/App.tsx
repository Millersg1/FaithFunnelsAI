import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import { TenantProvider, useTenant } from "@/contexts/TenantContext";
import NotFound from "@/pages/not-found";
import Landing from "@/pages/landing";
import DownloadPage from "@/pages/download";
import DemoPage from "@/pages/demo";
import SupportPage from "@/pages/support";
import Dashboard from "@/pages/dashboard";
import Funnels from "@/pages/funnels";
import FunnelEditor from "@/pages/funnel-editor";
import VerseBuilder from "@/pages/verse-builder";
import ThemeSettings from "@/pages/theme-settings";
import Export from "@/pages/export";
import WhiteLabelAdmin from "@/pages/white-label-admin";
import Terms from "@/pages/legal/terms";
import Privacy from "@/pages/legal/privacy";
import Refund from "@/pages/legal/refund";

function AppLayout({ children }: { children: React.ReactNode }) {
  const { settings } = useTenant();
  
  const style = {
    "--sidebar-width": "16rem",
    "--sidebar-width-icon": "3rem",
  };

  return (
    <SidebarProvider style={style as React.CSSProperties}>
      <div className="flex h-screen w-full">
        <AppSidebar />
        <div className="flex flex-1 flex-col overflow-hidden">
          <header 
            className="flex h-14 items-center gap-4 border-b px-6"
            style={{
              backgroundColor: settings?.primaryColor ? `${settings.primaryColor}15` : undefined,
              borderBottomColor: settings?.primaryColor || undefined,
            }}
          >
            <SidebarTrigger data-testid="button-sidebar-toggle" />
            <div className="flex-1 flex items-center gap-3">
              {settings?.logoUrl && (
                <img src={settings.logoUrl} alt={settings.businessName} className="h-8 w-auto" data-testid="img-tenant-logo" />
              )}
              <div>
                <div className="font-semibold text-sm" style={{ color: settings?.primaryColor || undefined }} data-testid="text-business-name">
                  {settings?.businessName || "Faith Funnels AI"}
                </div>
                <div className="text-xs text-muted-foreground" data-testid="text-tagline">{settings?.tagline || "Build Professional Faith-Based Sales Funnels"}</div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs text-muted-foreground">Support:</span>
              <a 
                href={`mailto:${settings?.supportEmail || 'support@faithfunnelsai.com'}`} 
                className="text-xs hover:underline"
                style={{ color: settings?.accentColor || undefined }}
                data-testid="link-support-email"
              >
                {settings?.supportEmail || 'support@faithfunnelsai.com'}
              </a>
            </div>
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
        <TenantProvider>
          <Switch>
            <Route path="/" component={Landing} />
            <Route path="/download" component={DownloadPage} />
            <Route path="/demo" component={DemoPage} />
            <Route path="/support" component={SupportPage} />
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

            <Route path="/t/:slug">
              {() => (
                <AppLayout>
                  <Dashboard />
                </AppLayout>
              )}
            </Route>
            <Route path="/t/:slug/funnels">
              {() => (
                <AppLayout>
                  <Funnels />
                </AppLayout>
              )}
            </Route>
            <Route path="/t/:slug/funnels/:id">
              {() => (
                <AppLayout>
                  <FunnelEditor />
                </AppLayout>
              )}
            </Route>
            <Route path="/t/:slug/verse-builder">
              {() => (
                <AppLayout>
                  <VerseBuilder />
                </AppLayout>
              )}
            </Route>
            <Route path="/t/:slug/theme-settings">
              {() => (
                <AppLayout>
                  <ThemeSettings />
                </AppLayout>
              )}
            </Route>
            <Route path="/t/:slug/export">
              {() => (
                <AppLayout>
                  <Export />
                </AppLayout>
              )}
            </Route>
            <Route path="/t/:slug/admin">
              {() => (
                <AppLayout>
                  <WhiteLabelAdmin />
                </AppLayout>
              )}
            </Route>
            
            <Route component={NotFound} />
          </Switch>
        </TenantProvider>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
