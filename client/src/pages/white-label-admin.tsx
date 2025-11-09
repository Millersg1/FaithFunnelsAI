import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useMutation } from "@tanstack/react-query";
import { useTenant } from "@/contexts/TenantContext";
import { queryClient, apiRequest } from "@/lib/queryClient";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";
import { Settings } from "lucide-react";

const settingsSchema = z.object({
  businessName: z.string().min(1, "Business name is required"),
  tagline: z.string().min(1, "Tagline is required"),
  logoUrl: z.string().url("Must be a valid URL").or(z.literal("")),
  supportEmail: z.string().email("Must be a valid email"),
  primaryColor: z.string().regex(/^#[0-9A-F]{6}$/i, "Must be a valid hex color"),
  secondaryColor: z.string().regex(/^#[0-9A-F]{6}$/i, "Must be a valid hex color"),
  accentColor: z.string().regex(/^#[0-9A-F]{6}$/i, "Must be a valid hex color"),
});

type SettingsForm = z.infer<typeof settingsSchema>;

export default function WhiteLabelAdmin() {
  const { slug, settings, isLoading } = useTenant();
  const { toast } = useToast();

  const form = useForm<SettingsForm>({
    resolver: zodResolver(settingsSchema),
    defaultValues: {
      businessName: settings?.businessName || "",
      tagline: settings?.tagline || "",
      logoUrl: settings?.logoUrl || "",
      supportEmail: settings?.supportEmail || "",
      primaryColor: settings?.primaryColor || "#6366f1",
      secondaryColor: settings?.secondaryColor || "#8b5cf6",
      accentColor: settings?.accentColor || "#ec4899",
    },
  });

  useEffect(() => {
    if (settings) {
      form.reset({
        businessName: settings.businessName || "",
        tagline: settings.tagline || "",
        logoUrl: settings.logoUrl || "",
        supportEmail: settings.supportEmail || "",
        primaryColor: settings.primaryColor || "#6366f1",
        secondaryColor: settings.secondaryColor || "#8b5cf6",
        accentColor: settings.accentColor || "#ec4899",
      });
    }
  }, [settings, form]);

  const updateMutation = useMutation({
    mutationFn: async (data: SettingsForm) => {
      return await apiRequest<any>(`/api/tenants/slug/${slug}/settings`, {
        method: "PATCH",
        body: JSON.stringify(data),
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/tenants/slug", slug] });
      toast({
        title: "Settings updated",
        description: "Your white label settings have been saved successfully.",
      });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to update settings. Please try again.",
        variant: "destructive",
      });
    },
  });

  const onSubmit = (data: SettingsForm) => {
    updateMutation.mutate(data);
  };

  if (!slug) {
    return (
      <div className="flex items-center justify-center h-full">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle>No Tenant Found</CardTitle>
            <CardDescription>
              This page is only accessible from a tenant URL (/t/:slug/admin)
            </CardDescription>
          </CardHeader>
        </Card>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-full">
        <p className="text-muted-foreground">Loading settings...</p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl">
      <div className="mb-6">
        <h1 className="text-3xl font-bold mb-2">White Label Settings</h1>
        <p className="text-muted-foreground">
          Customize your Faith Funnels AI branding and settings.
        </p>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Settings className="h-5 w-5" />
                Business Identity
              </CardTitle>
              <CardDescription>
                Configure your business name, tagline, and support contact
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <FormField
                control={form.control}
                name="businessName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Business Name</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="Your Business Name" data-testid="input-business-name" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="tagline"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Tagline</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="Your tagline or slogan" data-testid="input-tagline" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="logoUrl"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Logo URL (optional)</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="https://example.com/logo.png" data-testid="input-logo-url" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="supportEmail"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Support Email</FormLabel>
                    <FormControl>
                      <Input {...field} type="email" placeholder="support@yourdomain.com" data-testid="input-support-email" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Brand Colors</CardTitle>
              <CardDescription>
                Customize your theme colors to match your brand
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-3 gap-4">
                <FormField
                  control={form.control}
                  name="primaryColor"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Primary Color</FormLabel>
                      <FormControl>
                        <div className="flex gap-2">
                          <Input {...field} type="color" className="w-16 h-10 p-1 cursor-pointer" data-testid="input-primary-color" />
                          <Input {...field} placeholder="#6366f1" className="flex-1" />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="secondaryColor"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Secondary Color</FormLabel>
                      <FormControl>
                        <div className="flex gap-2">
                          <Input {...field} type="color" className="w-16 h-10 p-1 cursor-pointer" data-testid="input-secondary-color" />
                          <Input {...field} placeholder="#8b5cf6" className="flex-1" />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="accentColor"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Accent Color</FormLabel>
                      <FormControl>
                        <div className="flex gap-2">
                          <Input {...field} type="color" className="w-16 h-10 p-1 cursor-pointer" data-testid="input-accent-color" />
                          <Input {...field} placeholder="#ec4899" className="flex-1" />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </CardContent>
          </Card>

          <div className="flex justify-end gap-4">
            <Button type="submit" disabled={updateMutation.isPending} data-testid="button-save-settings">
              {updateMutation.isPending ? "Saving..." : "Save Settings"}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
