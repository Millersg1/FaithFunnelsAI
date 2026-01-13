import { ArrowRight, Sparkles, Crown, Rocket } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTenant } from "@/contexts/TenantContext";
import { TIERS } from "@shared/schema";

interface UpgradeInfo {
  title: string;
  description: string;
  buttonText: string;
  link: string;
  icon: typeof Sparkles;
  gradient: string;
}

const UPGRADE_PATHS: Record<string, UpgradeInfo> = {
  [TIERS.BASIC]: {
    title: "Upgrade to White Label",
    description: "Add your own branding & logo",
    buttonText: "Get White Label",
    link: "/oto1",
    icon: Sparkles,
    gradient: "from-blue-500 to-indigo-600",
  },
  [TIERS.WHITE_LABEL_LITE]: {
    title: "Upgrade to White Label",
    description: "Full branding control + more funnels",
    buttonText: "Get Full Access",
    link: "/oto1",
    icon: Sparkles,
    gradient: "from-blue-500 to-indigo-600",
  },
  [TIERS.WHITE_LABEL]: {
    title: "Unlock 60 Templates",
    description: "Premium templates for every niche",
    buttonText: "Get Premium",
    link: "/oto2",
    icon: Crown,
    gradient: "from-amber-500 to-orange-600",
  },
  [TIERS.PREMIUM_LITE]: {
    title: "Upgrade to Full Premium",
    description: "Unlimited funnels + all 60 templates",
    buttonText: "Go Unlimited",
    link: "/oto2",
    icon: Crown,
    gradient: "from-amber-500 to-orange-600",
  },
  [TIERS.PREMIUM]: {
    title: "Get Reseller Rights",
    description: "Sell the software & keep 100%",
    buttonText: "Become Reseller",
    link: "/oto3",
    icon: Rocket,
    gradient: "from-purple-500 to-pink-600",
  },
  [TIERS.AGENCY_LITE]: {
    title: "Get Reseller Rights",
    description: "Sell the software & keep 100%",
    buttonText: "Become Reseller",
    link: "/oto3",
    icon: Rocket,
    gradient: "from-purple-500 to-pink-600",
  },
};

interface UpgradeBannerProps {
  variant?: "sidebar" | "inline" | "compact";
}

export function UpgradeBanner({ variant = "sidebar" }: UpgradeBannerProps) {
  const { tier } = useTenant();

  const upgradeInfo = UPGRADE_PATHS[tier];
  
  if (!upgradeInfo) {
    return null;
  }

  const IconComponent = upgradeInfo.icon;

  if (variant === "compact") {
    return (
      <a 
        href={upgradeInfo.link}
        className="block"
        data-testid="upgrade-banner-compact"
      >
        <div className={`bg-gradient-to-r ${upgradeInfo.gradient} text-white p-3 rounded-lg hover:opacity-90 transition-opacity`}>
          <div className="flex items-center gap-2">
            <IconComponent className="h-4 w-4 flex-shrink-0" />
            <span className="text-sm font-medium">{upgradeInfo.buttonText}</span>
            <ArrowRight className="h-3 w-3 ml-auto" />
          </div>
        </div>
      </a>
    );
  }

  if (variant === "inline") {
    return (
      <div 
        className={`bg-gradient-to-r ${upgradeInfo.gradient} text-white p-4 rounded-lg`}
        data-testid="upgrade-banner-inline"
      >
        <div className="flex items-center justify-between gap-4 flex-wrap">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-white/20 rounded-lg">
              <IconComponent className="h-5 w-5" />
            </div>
            <div>
              <p className="font-semibold">{upgradeInfo.title}</p>
              <p className="text-sm opacity-90">{upgradeInfo.description}</p>
            </div>
          </div>
          <a href={upgradeInfo.link}>
            <Button variant="secondary" size="sm" className="gap-1" data-testid="button-upgrade-inline">
              {upgradeInfo.buttonText}
              <ArrowRight className="h-4 w-4" />
            </Button>
          </a>
        </div>
      </div>
    );
  }

  return (
    <div 
      className={`bg-gradient-to-r ${upgradeInfo.gradient} text-white p-4 rounded-lg space-y-3`}
      data-testid="upgrade-banner-sidebar"
    >
      <div className="flex items-center gap-2">
        <div className="p-1.5 bg-white/20 rounded-md">
          <IconComponent className="h-4 w-4" />
        </div>
        <p className="font-semibold text-sm">{upgradeInfo.title}</p>
      </div>
      <p className="text-xs opacity-90">{upgradeInfo.description}</p>
      <a href={upgradeInfo.link} className="block">
        <Button 
          variant="secondary" 
          size="sm" 
          className="w-full gap-1 text-xs"
          data-testid="button-upgrade-sidebar"
        >
          {upgradeInfo.buttonText}
          <ArrowRight className="h-3 w-3" />
        </Button>
      </a>
    </div>
  );
}
