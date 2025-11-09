import { createContext, useContext } from "react";
import { useQuery } from "@tanstack/react-query";
import { useRoute } from "wouter";
import type { Tenant, TenantSettings } from "@shared/schema";
import faithFunnelsLogo from "@assets/FaithFunnelsAI logo 125x125_1762695489231.png";

interface TenantContextValue {
  slug: string | null;
  tenant: Tenant | null;
  settings: TenantSettings | null;
  isLoading: boolean;
  error: Error | null;
}

const DEFAULT_SETTINGS: Partial<TenantSettings> = {
  businessName: "Faith Funnels AI",
  tagline: "Build Professional Faith-Based Sales Funnels",
  logoUrl: faithFunnelsLogo,
  customDomain: "",
  supportEmail: "support@faithfunnelsai.com",
  primaryColor: "#6366f1",
  secondaryColor: "#8b5cf6",
  accentColor: "#ec4899",
};

const TenantContext = createContext<TenantContextValue | undefined>(undefined);

export function useTenant() {
  const context = useContext(TenantContext);
  if (!context) {
    return {
      slug: null,
      tenant: null,
      settings: DEFAULT_SETTINGS as TenantSettings,
      isLoading: false,
      error: null,
    };
  }
  return context;
}

interface TenantProviderProps {
  children: React.ReactNode;
}

export function TenantProvider({ children }: TenantProviderProps) {
  const [match, params] = useRoute("/t/:slug/*?");
  const slug = match ? params?.slug : null;

  const { data, isLoading, error } = useQuery<{ tenant: Tenant; settings: TenantSettings | null }>({
    queryKey: ["/api/tenants/slug", slug],
    queryFn: async () => {
      if (!slug) return null;
      const response = await fetch(`/api/tenants/slug/${slug}`);
      if (!response.ok) throw new Error("Tenant not found");
      return response.json();
    },
    enabled: !!slug,
    staleTime: Infinity,
  });

  const value: TenantContextValue = {
    slug: slug || null,
    tenant: data?.tenant || null,
    settings: data?.settings || (DEFAULT_SETTINGS as TenantSettings),
    isLoading,
    error: error as Error | null,
  };

  return (
    <TenantContext.Provider value={value}>
      {children}
    </TenantContext.Provider>
  );
}
