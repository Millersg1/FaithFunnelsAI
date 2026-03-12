import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import { TenantProvider, useTenant } from "@/contexts/TenantContext";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { LogOut, User } from "lucide-react";
import NotFound from "@/pages/not-found";
import Login from "@/pages/login";
import ResetPassword from "@/pages/reset-password";
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
import FTCCompliance from "@/pages/legal/ftc-compliance";
import Disclaimer from "@/pages/legal/disclaimer";
import EarningsDisclaimer from "@/pages/legal/earnings-disclaimer";
import OTO1WhiteLabel from "@/pages/oto1-white-label";
import OTO2Premium from "@/pages/oto2-premium";
import OTO3Agency from "@/pages/oto3-agency";
import DS1WhiteLabelLite from "@/pages/ds1-white-label-lite";
import DS2PremiumLite from "@/pages/ds2-premium-lite";
import DS3AgencyLite from "@/pages/ds3-agency-lite";
import ExplodelyLanding from "@/pages/explodely/landing";
import ExplodelyOTO1 from "@/pages/explodely/oto1-white-label";
import ExplodelyOTO2 from "@/pages/explodely/oto2-premium";
import ExplodelyOTO3 from "@/pages/explodely/oto3-agency";
import ExplodelyDS1 from "@/pages/explodely/ds1-white-label-lite";
import ExplodelyDS2 from "@/pages/explodely/ds2-premium-lite";
import ExplodelyThankYou from "@/pages/explodely/thankyou";
import ExplodelyOrderBumpVerses from "@/pages/explodely/order-bump-verses";
import ExplodelyOrderBumpThankYou from "@/pages/explodely/orderbump-thankyou";
import JVZooLanding from "@/pages/jvzoo/landing";
import JVZooOTO1 from "@/pages/jvzoo/oto1-white-label";
import JVZooOTO2 from "@/pages/jvzoo/oto2-premium";
import JVZooOTO3 from "@/pages/jvzoo/oto3-agency";
import JVZooDS1 from "@/pages/jvzoo/ds1-white-label-lite";
import JVZooDS2 from "@/pages/jvzoo/ds2-premium-lite";
import JVZooDS3 from "@/pages/jvzoo/ds3-agency-lite";
import JVZooThankYou from "@/pages/jvzoo/thankyou";
import JVZooOrderBumpVerses from "@/pages/jvzoo/order-bump-verses";
import JVZooReview from "@/pages/jvzoo-review";
import JVZooAffiliates from "@/pages/jvzoo/affiliates";
import WPlusOrderBumpVerses from "@/pages/order-bump-verses";
import WPlusAffiliates from "@/pages/wplus/affiliates";
import ExplodelyRefund from "@/pages/explodely/legal/refund";
import ExplodelyDisclaimer from "@/pages/explodely/legal/disclaimer";
import ExplodelyEarningsDisclaimer from "@/pages/explodely/legal/earnings-disclaimer";
import JVZooRefund from "@/pages/jvzoo/legal/refund";
import JVZooLegalDisclaimer from "@/pages/jvzoo/legal/disclaimer";
import JVZooEarningsDisclaimer from "@/pages/jvzoo/legal/earnings-disclaimer";
import Affiliates from "@/pages/affiliates";
import DemoAccess from "@/pages/demo-access";
import Templates from "@/pages/templates";
import Analytics from "@/pages/analytics";
import AbTesting from "@/pages/ab-testing";
import PaymentSettings from "@/pages/payment-settings";
import { CookieConsentProvider, ManageCookiesButton } from "@/components/cookie-consent";

function AppLayout({ children }: { children: React.ReactNode }) {
  const { settings } = useTenant();
  const { user } = useAuth();
  
  const style = {
    "--sidebar-width": "16rem",
    "--sidebar-width-icon": "3rem",
  };

  const getInitials = (firstName?: string | null, lastName?: string | null, email?: string | null) => {
    if (firstName && lastName) {
      return `${firstName[0]}${lastName[0]}`.toUpperCase();
    }
    if (firstName) {
      return firstName[0].toUpperCase();
    }
    if (email) {
      return email[0].toUpperCase();
    }
    return "U";
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
            <div className="flex items-center gap-4">
              <div className="hidden md:flex items-center gap-2">
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
              {user && (
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-2">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={user.profileImageUrl || undefined} alt={user.firstName || "User"} className="object-cover" />
                      <AvatarFallback>
                        {getInitials(user.firstName, user.lastName, user.email)}
                      </AvatarFallback>
                    </Avatar>
                    <span className="hidden lg:block text-sm font-medium" data-testid="text-user-name">
                      {user.firstName || user.email?.split('@')[0] || 'User'}
                    </span>
                  </div>
                  <Button 
                    variant="ghost" 
                    size="icon"
                    onClick={() => window.location.href = '/api/logout'}
                    data-testid="button-logout"
                  >
                    <LogOut className="h-4 w-4" />
                  </Button>
                </div>
              )}
            </div>
          </header>
          <main className="flex-1 overflow-auto p-6">
            {children}
          </main>
          <footer className="border-t px-6 py-2 flex items-center justify-between text-xs text-muted-foreground">
            <div className="flex items-center gap-4 flex-wrap">
              <a href="/terms" className="hover:underline">Terms</a>
              <a href="/privacy" className="hover:underline">Privacy</a>
              <a href="/refund" className="hover:underline">Refund</a>
              <a href="/ftc-compliance" className="hover:underline">FTC Compliance</a>
              <ManageCookiesButton />
            </div>
            <span>&copy; {new Date().getFullYear()} {settings?.businessName || 'Faith Funnels AI'}</span>
          </footer>
        </div>
      </div>
    </SidebarProvider>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <CookieConsentProvider>
        <TenantProvider>
          <Switch>
            <Route path="/" component={Landing} />
            <Route path="/login" component={Login} />
            <Route path="/reset-password" component={ResetPassword} />
            <Route path="/download" component={DownloadPage} />
            <Route path="/demo" component={DemoPage} />
            <Route path="/support" component={SupportPage} />
            <Route path="/affiliates" component={Affiliates} />
            <Route path="/wplus-review" component={DemoAccess} />
            <Route path="/oto1" component={OTO1WhiteLabel} />
            <Route path="/oto2" component={OTO2Premium} />
            <Route path="/oto3" component={OTO3Agency} />
            <Route path="/ds1" component={DS1WhiteLabelLite} />
            <Route path="/ds2" component={DS2PremiumLite} />
            <Route path="/ds3" component={DS3AgencyLite} />
            <Route path="/orderbump" component={WPlusOrderBumpVerses} />
            <Route path="/explodely" component={ExplodelyLanding} />
            <Route path="/explodely/oto1" component={ExplodelyOTO1} />
            <Route path="/explodely/oto2" component={ExplodelyOTO2} />
            <Route path="/explodely/oto3" component={ExplodelyOTO3} />
            <Route path="/explodely/ds1" component={ExplodelyDS1} />
            <Route path="/explodely/ds2" component={ExplodelyDS2} />
            <Route path="/explodely/thankyou" component={ExplodelyThankYou} />
            <Route path="/explodely/orderbump" component={ExplodelyOrderBumpVerses} />
            <Route path="/explodely/orderbump/thankyou" component={ExplodelyOrderBumpThankYou} />
            <Route path="/explodely/refund" component={ExplodelyRefund} />
            <Route path="/explodely/disclaimer" component={ExplodelyDisclaimer} />
            <Route path="/explodely/earnings-disclaimer" component={ExplodelyEarningsDisclaimer} />
            <Route path="/jvzoo" component={JVZooLanding} />
            <Route path="/jvzoo/oto1" component={JVZooOTO1} />
            <Route path="/jvzoo/oto2" component={JVZooOTO2} />
            <Route path="/jvzoo/oto3" component={JVZooOTO3} />
            <Route path="/jvzoo/ds1" component={JVZooDS1} />
            <Route path="/jvzoo/ds2" component={JVZooDS2} />
            <Route path="/jvzoo/ds3" component={JVZooDS3} />
            <Route path="/jvzoo/thankyou" component={JVZooThankYou} />
            <Route path="/jvzoo/orderbump" component={JVZooOrderBumpVerses} />
            <Route path="/jvzoo/refund" component={JVZooRefund} />
            <Route path="/jvzoo/disclaimer" component={JVZooLegalDisclaimer} />
            <Route path="/jvzoo/earnings-disclaimer" component={JVZooEarningsDisclaimer} />
            <Route path="/jvzoo/affiliates" component={JVZooAffiliates} />
            <Route path="/jvzoo-review" component={JVZooReview} />
            <Route path="/wplus/affiliates" component={WPlusAffiliates} />
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
            <Route path="/ftc-compliance">
              {() => (
                <AppLayout>
                  <FTCCompliance />
                </AppLayout>
              )}
            </Route>
            <Route path="/disclaimer">
              {() => (
                <AppLayout>
                  <Disclaimer />
                </AppLayout>
              )}
            </Route>
            <Route path="/earnings-disclaimer">
              {() => (
                <AppLayout>
                  <EarningsDisclaimer />
                </AppLayout>
              )}
            </Route>
            
            <Route path="/app">
              {() => (
                <ProtectedRoute>
                  <AppLayout>
                    <Dashboard />
                  </AppLayout>
                </ProtectedRoute>
              )}
            </Route>
            <Route path="/app/funnels">
              {() => (
                <ProtectedRoute>
                  <AppLayout>
                    <Funnels />
                  </AppLayout>
                </ProtectedRoute>
              )}
            </Route>
            <Route path="/app/funnels/:id">
              {() => (
                <ProtectedRoute>
                  <AppLayout>
                    <FunnelEditor />
                  </AppLayout>
                </ProtectedRoute>
              )}
            </Route>
            <Route path="/app/verse-builder">
              {() => (
                <ProtectedRoute>
                  <AppLayout>
                    <VerseBuilder />
                  </AppLayout>
                </ProtectedRoute>
              )}
            </Route>
            <Route path="/app/theme-settings">
              {() => (
                <ProtectedRoute>
                  <AppLayout>
                    <ThemeSettings />
                  </AppLayout>
                </ProtectedRoute>
              )}
            </Route>
            <Route path="/app/export">
              {() => (
                <ProtectedRoute>
                  <AppLayout>
                    <Export />
                  </AppLayout>
                </ProtectedRoute>
              )}
            </Route>
            <Route path="/app/templates">
              {() => (
                <ProtectedRoute>
                  <AppLayout>
                    <Templates />
                  </AppLayout>
                </ProtectedRoute>
              )}
            </Route>
            <Route path="/app/analytics">
              {() => (
                <ProtectedRoute>
                  <AppLayout>
                    <Analytics />
                  </AppLayout>
                </ProtectedRoute>
              )}
            </Route>
            <Route path="/app/ab-testing">
              {() => (
                <ProtectedRoute>
                  <AppLayout>
                    <AbTesting />
                  </AppLayout>
                </ProtectedRoute>
              )}
            </Route>
            <Route path="/app/payment-settings">
              {() => (
                <ProtectedRoute>
                  <AppLayout>
                    <PaymentSettings />
                  </AppLayout>
                </ProtectedRoute>
              )}
            </Route>

            <Route path="/t/:slug">
              {() => (
                <ProtectedRoute>
                  <AppLayout>
                    <Dashboard />
                  </AppLayout>
                </ProtectedRoute>
              )}
            </Route>
            <Route path="/t/:slug/funnels">
              {() => (
                <ProtectedRoute>
                  <AppLayout>
                    <Funnels />
                  </AppLayout>
                </ProtectedRoute>
              )}
            </Route>
            <Route path="/t/:slug/funnels/:id">
              {() => (
                <ProtectedRoute>
                  <AppLayout>
                    <FunnelEditor />
                  </AppLayout>
                </ProtectedRoute>
              )}
            </Route>
            <Route path="/t/:slug/verse-builder">
              {() => (
                <ProtectedRoute>
                  <AppLayout>
                    <VerseBuilder />
                  </AppLayout>
                </ProtectedRoute>
              )}
            </Route>
            <Route path="/t/:slug/theme-settings">
              {() => (
                <ProtectedRoute>
                  <AppLayout>
                    <ThemeSettings />
                  </AppLayout>
                </ProtectedRoute>
              )}
            </Route>
            <Route path="/t/:slug/export">
              {() => (
                <ProtectedRoute>
                  <AppLayout>
                    <Export />
                  </AppLayout>
                </ProtectedRoute>
              )}
            </Route>
            <Route path="/t/:slug/admin">
              {() => (
                <ProtectedRoute>
                  <AppLayout>
                    <WhiteLabelAdmin />
                  </AppLayout>
                </ProtectedRoute>
              )}
            </Route>
            
            <Route component={NotFound} />
          </Switch>
        </TenantProvider>
        </CookieConsentProvider>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
