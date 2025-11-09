import { Home, Filter, BookOpen, Palette, Download, Settings, FileText } from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
  SidebarFooter,
} from "@/components/ui/sidebar";
import { Link, useLocation } from "wouter";
import { useTenant } from "@/contexts/TenantContext";

const menuItems = [
  {
    title: "Dashboard",
    url: "/app",
    icon: Home,
  },
  {
    title: "My Funnels",
    url: "/app/funnels",
    icon: Filter,
  },
  {
    title: "Verse Builder",
    url: "/app/verse-builder",
    icon: BookOpen,
  },
  {
    title: "Theme Settings",
    url: "/app/theme-settings",
    icon: Palette,
  },
  {
    title: "Export",
    url: "/app/export",
    icon: Download,
  },
];

const legalItems = [
  {
    title: "Terms of Service",
    url: "/terms",
    icon: FileText,
  },
  {
    title: "Privacy Policy",
    url: "/privacy",
    icon: FileText,
  },
  {
    title: "Refund Policy",
    url: "/refund",
    icon: FileText,
  },
];

export function AppSidebar() {
  const [location] = useLocation();
  const { settings } = useTenant();

  return (
    <Sidebar data-testid="sidebar-main">
      <SidebarHeader className="p-4">
        <div className="flex items-center gap-2">
          {settings?.logoUrl ? (
            <img 
              src={settings.logoUrl} 
              alt={settings.businessName} 
              className="h-8 w-8 object-contain rounded-md"
            />
          ) : (
            <div className="flex h-8 w-8 items-center justify-center rounded-md bg-primary text-primary-foreground">
              <BookOpen className="h-5 w-5" />
            </div>
          )}
          <div className="flex flex-col">
            <span className="text-sm font-semibold">{settings?.businessName || "Faith Funnels AI"}</span>
            <span className="text-xs text-muted-foreground">{settings?.tagline || "Build Your Ministry"}</span>
          </div>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Main Menu</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild isActive={location === item.url} data-testid={`nav-${item.title.toLowerCase().replace(/\s+/g, '-')}`}>
                    <Link href={item.url}>
                      <item.icon className="h-5 w-5" />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        
        <SidebarGroup>
          <SidebarGroupLabel>Legal</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {legalItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild isActive={location === item.url} data-testid={`nav-${item.title.toLowerCase().replace(/\s+/g, '-')}`}>
                    <Link href={item.url}>
                      <item.icon className="h-5 w-5" />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter className="p-4">
        <div className="text-xs text-muted-foreground">
          <p>Support: {settings?.supportEmail || "support@faithfunnelsai.com"}</p>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
