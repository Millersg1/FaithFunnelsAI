import { useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { CreditCard, Loader2, CheckCircle2, AlertCircle, ExternalLink, Lock, Eye, EyeOff } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { queryClient, apiRequest } from "@/lib/queryClient";
import { useTenant } from "@/contexts/TenantContext";

export default function PaymentSettings() {
  const { toast } = useToast();
  const { settings: tenantSettings, slug, isLoading } = useTenant();
  
  const [stripePublishable, setStripePublishable] = useState("");
  const [stripeSecret, setStripeSecret] = useState("");
  const [paypalClientId, setPaypalClientId] = useState("");
  const [showStripeSecret, setShowStripeSecret] = useState(false);
  const [activeTab, setActiveTab] = useState("stripe");

  const { data: tenantData } = useQuery<{ tenant: { id: string } }>({
    queryKey: [`/api/tenants/slug/${slug}`],
    enabled: !!slug,
  });

  const saveSettingsMutation = useMutation({
    mutationFn: async (data: { 
      stripePublishableKey?: string;
      stripeSecretKey?: string;
      paypalClientId?: string;
    }) => {
      if (!tenantData?.tenant?.id) throw new Error("Tenant not found");
      return apiRequest("PATCH", `/api/tenants/${tenantData.tenant.id}/payment-settings`, data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [`/api/tenants/slug/${slug}`] });
      toast({
        title: "Settings saved",
        description: "Your payment settings have been updated.",
      });
      setStripePublishable("");
      setStripeSecret("");
      setPaypalClientId("");
    },
    onError: () => {
      toast({
        title: "Error saving settings",
        description: "There was a problem saving your payment settings.",
        variant: "destructive",
      });
    },
  });

  const handleSaveStripe = () => {
    if (!stripePublishable && !stripeSecret) {
      toast({
        title: "No changes",
        description: "Please enter at least one Stripe key to save.",
        variant: "destructive",
      });
      return;
    }
    saveSettingsMutation.mutate({
      stripePublishableKey: stripePublishable || undefined,
      stripeSecretKey: stripeSecret || undefined,
    });
  };

  const handleSavePaypal = () => {
    if (!paypalClientId) {
      toast({
        title: "No changes",
        description: "Please enter your PayPal Client ID to save.",
        variant: "destructive",
      });
      return;
    }
    saveSettingsMutation.mutate({
      paypalClientId: paypalClientId,
    });
  };

  const hasStripe = tenantSettings?.stripePublishableKey;
  const hasPaypal = tenantSettings?.paypalClientId;

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-full">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 space-y-8">
      <div className="flex items-center gap-3">
        <CreditCard className="h-8 w-8 text-primary" />
        <div>
          <h1 className="text-3xl font-bold" data-testid="text-payment-settings-title">Payment Settings</h1>
          <p className="text-muted-foreground">Configure payment processing for your exported funnels</p>
        </div>
      </div>

      <Alert>
        <Lock className="h-4 w-4" />
        <AlertTitle>Secure Payment Integration</AlertTitle>
        <AlertDescription>
          Your API keys are stored securely and only used when exporting funnels. 
          Keys are never exposed in your exported HTML - only publishable keys are included for client-side processing.
        </AlertDescription>
      </Alert>

      <div className="grid gap-4 md:grid-cols-2 mb-6">
        <Card className={hasStripe ? "border-green-500/50" : ""}>
          <CardHeader className="flex flex-row items-center justify-between gap-2 space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Stripe</CardTitle>
            {hasStripe ? (
              <Badge variant="outline" className="bg-green-500/10 text-green-600 border-green-500/30">
                <CheckCircle2 className="h-3 w-3 mr-1" />
                Connected
              </Badge>
            ) : (
              <Badge variant="outline" className="bg-muted">
                Not configured
              </Badge>
            )}
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              Accept credit card payments with Stripe's secure checkout.
            </p>
          </CardContent>
        </Card>

        <Card className={hasPaypal ? "border-green-500/50" : ""}>
          <CardHeader className="flex flex-row items-center justify-between gap-2 space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">PayPal</CardTitle>
            {hasPaypal ? (
              <Badge variant="outline" className="bg-green-500/10 text-green-600 border-green-500/30">
                <CheckCircle2 className="h-3 w-3 mr-1" />
                Connected
              </Badge>
            ) : (
              <Badge variant="outline" className="bg-muted">
                Not configured
              </Badge>
            )}
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              Accept PayPal payments and buyer-friendly checkout options.
            </p>
          </CardContent>
        </Card>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="stripe" data-testid="tab-stripe">Stripe Setup</TabsTrigger>
          <TabsTrigger value="paypal" data-testid="tab-paypal">PayPal Setup</TabsTrigger>
        </TabsList>

        <TabsContent value="stripe" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Stripe Configuration</CardTitle>
              <CardDescription>
                Enter your Stripe API keys to enable credit card processing in exported funnels.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {tenantSettings?.stripePublishableKey && (
                <Alert className="mb-4">
                  <CheckCircle2 className="h-4 w-4 text-green-600" />
                  <AlertTitle>Current Stripe Keys</AlertTitle>
                  <AlertDescription>
                    <p className="text-sm" data-testid="text-current-stripe-pub">Publishable: ****{tenantSettings.stripePublishableKey.slice(-8)}</p>
                    {tenantSettings.stripeSecretKey && (
                      <p className="text-sm" data-testid="text-current-stripe-secret">Secret: ****{tenantSettings.stripeSecretKey.slice(-4)}</p>
                    )}
                    <p className="text-xs text-muted-foreground mt-2">Leave fields blank below to keep current values. Only enter new keys if updating.</p>
                  </AlertDescription>
                </Alert>
              )}

              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="stripe-publishable">Publishable Key {tenantSettings?.stripePublishableKey ? "(Update)" : ""}</Label>
                  <Input
                    id="stripe-publishable"
                    placeholder="pk_live_..."
                    value={stripePublishable}
                    onChange={(e) => setStripePublishable(e.target.value)}
                    data-testid="input-stripe-publishable"
                  />
                  <p className="text-xs text-muted-foreground">
                    Your publishable key starts with "pk_live_" or "pk_test_"
                  </p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="stripe-secret">Secret Key</Label>
                  <div className="relative">
                    <Input
                      id="stripe-secret"
                      type={showStripeSecret ? "text" : "password"}
                      placeholder="sk_live_..."
                      value={stripeSecret}
                      onChange={(e) => setStripeSecret(e.target.value)}
                      data-testid="input-stripe-secret"
                    />
                    <Button
                      variant="ghost"
                      size="icon"
                      type="button"
                      className="absolute right-0 top-0"
                      onClick={() => setShowStripeSecret(!showStripeSecret)}
                      data-testid="button-toggle-secret-visibility"
                    >
                      {showStripeSecret ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </Button>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Your secret key starts with "sk_live_" or "sk_test_" - keep this secure!
                  </p>
                </div>
              </div>

              <Alert variant="default" className="bg-muted/50">
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>Where to find your keys</AlertTitle>
                <AlertDescription>
                  <ol className="list-decimal list-inside mt-2 space-y-1 text-sm">
                    <li>Log in to your Stripe Dashboard</li>
                    <li>Go to Developers → API keys</li>
                    <li>Copy your Publishable key and Secret key</li>
                    <li>Use test keys (pk_test/sk_test) for development</li>
                  </ol>
                  <a 
                    href="https://dashboard.stripe.com/apikeys" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-flex items-center mt-3 text-primary hover:underline"
                  >
                    Open Stripe Dashboard <ExternalLink className="h-3 w-3 ml-1" />
                  </a>
                </AlertDescription>
              </Alert>

              <Button 
                onClick={handleSaveStripe} 
                disabled={saveSettingsMutation.isPending}
                data-testid="button-save-stripe"
              >
                {saveSettingsMutation.isPending && <Loader2 className="h-4 w-4 mr-2 animate-spin" />}
                Save Stripe Settings
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="paypal" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>PayPal Configuration</CardTitle>
              <CardDescription>
                Enter your PayPal Client ID to enable PayPal checkout in exported funnels.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {tenantSettings?.paypalClientId && (
                <Alert className="mb-4">
                  <CheckCircle2 className="h-4 w-4 text-green-600" />
                  <AlertTitle>Current PayPal Settings</AlertTitle>
                  <AlertDescription>
                    <p className="text-sm" data-testid="text-current-paypal-id">Client ID: ****{tenantSettings.paypalClientId.slice(-8)}</p>
                    <p className="text-xs text-muted-foreground mt-2">Leave field blank to keep current value. Only enter a new ID if updating.</p>
                  </AlertDescription>
                </Alert>
              )}

              <div className="space-y-2">
                <Label htmlFor="paypal-client-id">Client ID {tenantSettings?.paypalClientId ? "(Update)" : ""}</Label>
                <Input
                  id="paypal-client-id"
                  placeholder="Your PayPal Client ID"
                  value={paypalClientId}
                  onChange={(e) => setPaypalClientId(e.target.value)}
                  data-testid="input-paypal-client-id"
                />
                <p className="text-xs text-muted-foreground">
                  Find this in your PayPal Developer Dashboard under App credentials
                </p>
              </div>

              <Alert variant="default" className="bg-muted/50">
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>Where to find your Client ID</AlertTitle>
                <AlertDescription>
                  <ol className="list-decimal list-inside mt-2 space-y-1 text-sm">
                    <li>Log in to PayPal Developer Dashboard</li>
                    <li>Go to Apps & Credentials</li>
                    <li>Create or select your app</li>
                    <li>Copy the Client ID</li>
                  </ol>
                  <a 
                    href="https://developer.paypal.com/dashboard/applications" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-flex items-center mt-3 text-primary hover:underline"
                  >
                    Open PayPal Developer Dashboard <ExternalLink className="h-3 w-3 ml-1" />
                  </a>
                </AlertDescription>
              </Alert>

              <Button 
                onClick={handleSavePaypal} 
                disabled={saveSettingsMutation.isPending}
                data-testid="button-save-paypal"
              >
                {saveSettingsMutation.isPending && <Loader2 className="h-4 w-4 mr-2 animate-spin" />}
                Save PayPal Settings
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <Card>
        <CardHeader>
          <CardTitle>How Payment Integration Works</CardTitle>
          <CardDescription>Understanding how payments work in exported funnels</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid md:grid-cols-3 gap-4">
            <div className="p-4 border rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold">
                  1
                </div>
                <h4 className="font-medium">Configure Keys</h4>
              </div>
              <p className="text-sm text-muted-foreground">
                Add your Stripe or PayPal credentials above. Keys are stored securely.
              </p>
            </div>
            <div className="p-4 border rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold">
                  2
                </div>
                <h4 className="font-medium">Export Funnel</h4>
              </div>
              <p className="text-sm text-muted-foreground">
                Your exported funnels will include payment buttons with your configured provider.
              </p>
            </div>
            <div className="p-4 border rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold">
                  3
                </div>
                <h4 className="font-medium">Collect Payments</h4>
              </div>
              <p className="text-sm text-muted-foreground">
                Visitors can securely pay through Stripe or PayPal on your deployed funnels.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
