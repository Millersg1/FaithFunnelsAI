import { LayoutTemplate, Church, Users, BookOpen, GraduationCap, Music, Globe, PenTool, CalendarDays, Heart, School, Sparkles, Star } from "lucide-react";

const STARTER_CATEGORY = { name: "Starter Templates", icon: Star, count: 5, examples: ["Simple Donation Page", "Event Registration", "Newsletter Signup"], tier: "basic" };

const LITE_CATEGORIES = [
  { name: "Church Fundraising", icon: Church, count: 5, examples: ["Building Fund Campaign", "Mission Trip Fundraiser", "Youth Ministry Support"], tier: "lite" },
  { name: "Ministry Outreach", icon: Users, count: 5, examples: ["Community Outreach", "Prison Ministry", "Homeless Services"], tier: "lite" },
  { name: "Faith Coaching", icon: Heart, count: 5, examples: ["Life Coaching Program", "Marriage Counseling", "Spiritual Mentorship"], tier: "lite" },
  { name: "Bible Study", icon: BookOpen, count: 5, examples: ["Small Group Study", "Women's Bible Study", "Men's Devotional"], tier: "lite" },
  { name: "Youth Ministry", icon: GraduationCap, count: 5, examples: ["Youth Camp Registration", "Teen Leadership", "Student Missions"], tier: "lite" },
];

const PREMIUM_CATEGORIES = [
  { name: "Worship Music", icon: Music, count: 5, examples: ["Worship Album Launch", "Concert Events", "Music Ministry"], tier: "premium" },
  { name: "Missions & Evangelism", icon: Globe, count: 5, examples: ["Short-Term Missions", "Evangelism Training", "Global Outreach"], tier: "premium" },
  { name: "Christian Authors", icon: PenTool, count: 5, examples: ["Book Launch Funnel", "Author Platform", "Devotional Series"], tier: "premium" },
  { name: "Retreats & Events", icon: CalendarDays, count: 5, examples: ["Women's Retreat", "Men's Conference", "Marriage Retreat"], tier: "premium" },
  { name: "Pastoral Counseling", icon: Heart, count: 5, examples: ["Counseling Services", "Grief Support", "Addiction Recovery"], tier: "premium" },
  { name: "Christian Education", icon: School, count: 5, examples: ["Online Courses", "Certification Program", "Bible College"], tier: "premium" },
];

interface TemplateShowcaseProps {
  variant?: "full" | "compact";
  isPremium?: boolean;
}

export function TemplateShowcase({ variant = "full", isPremium = true }: TemplateShowcaseProps) {
  // Premium: 5 starter + 25 lite + 30 premium = 60 templates
  // Lite: 5 starter + 25 lite = 30 templates
  const displayCategories = isPremium 
    ? [STARTER_CATEGORY, ...LITE_CATEGORIES, ...PREMIUM_CATEGORIES]
    : [STARTER_CATEGORY, ...LITE_CATEGORIES];
  const totalTemplates = isPremium ? 60 : 30;
  
  if (variant === "compact") {
    return (
      <div className="bg-card border rounded-lg p-6 space-y-4" data-testid="template-showcase-compact">
        <div className="flex items-center justify-center gap-2 mb-4">
          <LayoutTemplate className="h-6 w-6 text-primary" />
          <h3 className="text-xl font-semibold" data-testid="text-template-count">
            {totalTemplates} Professional Templates Included
          </h3>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3" data-testid="template-categories-grid">
          {displayCategories.map((category, index) => (
            <div key={category.name} className="flex items-center gap-2 p-2 bg-muted/50 rounded" data-testid={`category-item-${index}`}>
              <category.icon className="h-4 w-4 text-primary flex-shrink-0" />
              <span className="text-sm truncate">{category.name}</span>
            </div>
          ))}
        </div>
        
        {isPremium && (
          <p className="text-center text-sm text-muted-foreground" data-testid="text-more-categories">
            Plus 6 more categories with high-converting funnel templates!
          </p>
        )}
      </div>
    );
  }

  return (
    <div className="bg-card border rounded-lg overflow-hidden" data-testid="template-showcase-full">
      <div className="bg-gradient-to-r from-primary to-primary/80 p-6 text-primary-foreground">
        <div className="flex items-center justify-center gap-3 mb-2">
          <Sparkles className="h-6 w-6" />
          <h2 className="text-2xl font-bold" data-testid="text-template-header">
            {totalTemplates} Premium Funnel Templates
          </h2>
          <Sparkles className="h-6 w-6" />
        </div>
        <p className="text-center text-primary-foreground/90" data-testid="text-template-subheader">
          Professional, conversion-optimized designs for every faith-based niche
        </p>
      </div>

      <div className="p-6 space-y-6">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4" data-testid="template-categories-grid">
          {displayCategories.map((category, index) => (
            <div key={category.name} className="border rounded-lg p-4 space-y-3 hover-elevate transition-all" data-testid={`template-category-${index}`}>
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                  <category.icon className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h4 className="font-semibold text-sm" data-testid={`text-category-name-${index}`}>{category.name}</h4>
                  <p className="text-xs text-muted-foreground" data-testid={`text-category-count-${index}`}>{category.count} templates</p>
                </div>
              </div>
              <ul className="text-xs text-muted-foreground space-y-1">
                {category.examples.map((example, i) => (
                  <li key={i} className="flex items-center gap-1" data-testid={`text-example-${index}-${i}`}>
                    <span className="w-1 h-1 bg-primary rounded-full" />
                    {example}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="bg-muted/50 rounded-lg p-4 text-center" data-testid="template-features-box">
          <p className="text-sm font-medium mb-1">
            Every template includes:
          </p>
          <p className="text-xs text-muted-foreground">
            Pre-written headlines, Conversion-optimized layouts, Bible verse integrations, Custom color themes, Mobile-responsive design
          </p>
        </div>

        {!isPremium && (
          <div className="bg-amber-500/10 border border-amber-500/20 rounded-lg p-4 text-center" data-testid="upgrade-cta-box">
            <p className="text-sm font-medium text-amber-700 dark:text-amber-400">
              Upgrade to Premium for access to all 60 templates across 12 categories!
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
