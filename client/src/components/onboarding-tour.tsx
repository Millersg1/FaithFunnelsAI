import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Filter, BookOpen, Palette, Download, LayoutTemplate, Sparkles, Check, ArrowRight, X } from "lucide-react";

interface OnboardingTourProps {
  onComplete: () => void;
}

const tourSteps = [
  {
    id: "welcome",
    icon: Sparkles,
    title: "Welcome to Faith Funnels AI!",
    description: "Let's take a quick tour to help you get started building faith-based sales funnels. This will only take a minute.",
    tip: "You can skip this tour anytime and access help from the dashboard.",
  },
  {
    id: "funnels",
    icon: Filter,
    title: "Create Your Funnels",
    description: "Build multi-stage sales funnels with Main Offers, One-Time Offers (OTOs), and Downsells. Each stage is customizable to match your ministry's message.",
    tip: "Start with a template to save time, or build from scratch for full control.",
  },
  {
    id: "templates",
    icon: LayoutTemplate,
    title: "Template Gallery",
    description: "Choose from 55+ professionally designed templates for various ministries and faith-based businesses. Templates come pre-designed with Bible verses and CTAs.",
    tip: "Templates are organized by category: Church, Ministry, Coaching, and more.",
  },
  {
    id: "verses",
    icon: BookOpen,
    title: "Bible Verse Builder",
    description: "Add inspiring Scripture to your funnels with customizable Call-to-Action buttons. Link verses directly to your funnel stages.",
    tip: "Verses can be displayed as cards, banners, or inline quotes.",
  },
  {
    id: "themes",
    icon: Palette,
    title: "Theme Customization",
    description: "Match your brand colors and style. Choose from preset themes or create your own with primary, secondary, and accent colors.",
    tip: "Your theme applies to all exported funnel pages automatically.",
  },
  {
    id: "export",
    icon: Download,
    title: "Export & Deploy",
    description: "Download your funnels as standalone HTML files or ZIP packages. Includes legal pages (Terms, Privacy, Refund) ready for deployment.",
    tip: "Exported funnels work with WarriorPlus, JVZoo, and other platforms.",
  },
  {
    id: "complete",
    icon: Check,
    title: "You're All Set!",
    description: "You now know the basics of Faith Funnels AI. Start creating your first funnel and bring your ministry to life online.",
    tip: "Need help? Contact support@faithfunnelsai.com anytime.",
  },
];

export function OnboardingTour({ onComplete }: OnboardingTourProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [isOpen, setIsOpen] = useState(true);

  const step = tourSteps[currentStep];
  const progress = ((currentStep + 1) / tourSteps.length) * 100;
  const isLastStep = currentStep === tourSteps.length - 1;
  const Icon = step.icon;

  const handleNext = () => {
    if (isLastStep) {
      handleComplete();
    } else {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleComplete = () => {
    setIsOpen(false);
    localStorage.setItem("ff_onboarding_complete", "true");
    onComplete();
  };

  const handleSkip = () => {
    handleComplete();
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && handleSkip()}>
      <DialogContent className="sm:max-w-lg" data-testid="onboarding-dialog">
        <DialogHeader>
          <div className="flex items-center justify-between mb-4">
            <Progress value={progress} className="flex-1 mr-4" />
            <span className="text-sm text-muted-foreground">
              {currentStep + 1} / {tourSteps.length}
            </span>
          </div>
          <div className="flex justify-center mb-4">
            <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
              <Icon className="h-8 w-8 text-primary" />
            </div>
          </div>
          <DialogTitle className="text-center text-xl">{step.title}</DialogTitle>
          <DialogDescription className="text-center text-base mt-2">
            {step.description}
          </DialogDescription>
        </DialogHeader>

        <div className="py-4">
          <div className="p-4 bg-muted/50 rounded-lg border-l-4 border-primary">
            <p className="text-sm">
              <span className="font-medium">Tip: </span>
              {step.tip}
            </p>
          </div>
        </div>

        <DialogFooter className="flex flex-col sm:flex-row gap-2">
          {currentStep > 0 && (
            <Button variant="outline" onClick={handlePrevious} data-testid="button-tour-previous">
              Back
            </Button>
          )}
          <div className="flex-1" />
          {!isLastStep && (
            <Button variant="ghost" onClick={handleSkip} data-testid="button-tour-skip">
              Skip Tour
            </Button>
          )}
          <Button onClick={handleNext} data-testid="button-tour-next">
            {isLastStep ? (
              <>
                Get Started <Check className="h-4 w-4 ml-2" />
              </>
            ) : (
              <>
                Next <ArrowRight className="h-4 w-4 ml-2" />
              </>
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export function useOnboarding() {
  const [showTour, setShowTour] = useState(false);

  useEffect(() => {
    const hasCompletedOnboarding = localStorage.getItem("ff_onboarding_complete");
    if (!hasCompletedOnboarding) {
      const timer = setTimeout(() => setShowTour(true), 1000);
      return () => clearTimeout(timer);
    }
  }, []);

  const startTour = () => setShowTour(true);
  const completeTour = () => setShowTour(false);
  const resetTour = () => {
    localStorage.removeItem("ff_onboarding_complete");
    setShowTour(true);
  };

  return { showTour, startTour, completeTour, resetTour };
}
