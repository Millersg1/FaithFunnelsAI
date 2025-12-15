import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { 
  LayoutDashboard, 
  FileText, 
  BookOpen, 
  Palette, 
  Download, 
  Settings,
  Plus,
  Eye,
  Edit,
  Trash2,
  CheckCircle2
} from "lucide-react";
import logoImage from "@assets/generated_images/faith_funnels_ai_logo.png";

const demoFunnels = [
  { id: "1", name: "Easter Revival Campaign", stages: 3, status: "Active" },
  { id: "2", name: "Christmas Giving Funnel", stages: 4, status: "Draft" },
  { id: "3", name: "Faith Journey Series", stages: 2, status: "Active" },
];

const demoVerses = [
  { id: "1", reference: "John 3:16", text: "For God so loved the world...", funnel: "Easter Revival" },
  { id: "2", reference: "Jeremiah 29:11", text: "For I know the plans I have for you...", funnel: "Faith Journey" },
  { id: "3", reference: "Psalm 23:1", text: "The Lord is my shepherd...", funnel: "Christmas Giving" },
];

export default function DemoAccess() {
  const [activeTab, setActiveTab] = useState("dashboard");

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b bg-background/95 backdrop-blur sticky top-0 z-50">
        <div className="container mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img src={logoImage} alt="Faith Funnels AI" className="h-10 w-10 object-contain" />
            <div>
              <span className="font-semibold">Faith Funnels AI</span>
              <Badge variant="secondary" className="ml-2">Demo Preview</Badge>
            </div>
          </div>
          <Badge variant="outline" className="text-orange-600 border-orange-600">
            WarriorPlus Review Access
          </Badge>
        </div>
      </header>

      <div className="flex">
        <aside className="w-64 border-r min-h-[calc(100vh-57px)] p-4 bg-muted/30">
          <nav className="space-y-2">
            <Button 
              variant={activeTab === "dashboard" ? "secondary" : "ghost"} 
              className="w-full justify-start gap-2"
              onClick={() => setActiveTab("dashboard")}
            >
              <LayoutDashboard className="h-4 w-4" /> Dashboard
            </Button>
            <Button 
              variant={activeTab === "funnels" ? "secondary" : "ghost"} 
              className="w-full justify-start gap-2"
              onClick={() => setActiveTab("funnels")}
            >
              <FileText className="h-4 w-4" /> Funnels
            </Button>
            <Button 
              variant={activeTab === "verses" ? "secondary" : "ghost"} 
              className="w-full justify-start gap-2"
              onClick={() => setActiveTab("verses")}
            >
              <BookOpen className="h-4 w-4" /> Verse Builder
            </Button>
            <Button 
              variant={activeTab === "themes" ? "secondary" : "ghost"} 
              className="w-full justify-start gap-2"
              onClick={() => setActiveTab("themes")}
            >
              <Palette className="h-4 w-4" /> Themes
            </Button>
            <Button 
              variant={activeTab === "export" ? "secondary" : "ghost"} 
              className="w-full justify-start gap-2"
              onClick={() => setActiveTab("export")}
            >
              <Download className="h-4 w-4" /> Export
            </Button>
            <Button 
              variant={activeTab === "whitelabel" ? "secondary" : "ghost"} 
              className="w-full justify-start gap-2"
              onClick={() => setActiveTab("whitelabel")}
            >
              <Settings className="h-4 w-4" /> White Label
            </Button>
          </nav>
        </aside>

        <main className="flex-1 p-6">
          {activeTab === "dashboard" && (
            <div className="space-y-6">
              <div>
                <h1 className="text-2xl font-bold">Dashboard</h1>
                <p className="text-muted-foreground">Welcome to Faith Funnels AI</p>
              </div>
              
              <div className="grid gap-4 md:grid-cols-4">
                <Card>
                  <CardHeader className="pb-2">
                    <CardDescription>Total Funnels</CardDescription>
                    <CardTitle className="text-3xl">3</CardTitle>
                  </CardHeader>
                </Card>
                <Card>
                  <CardHeader className="pb-2">
                    <CardDescription>Bible Verses</CardDescription>
                    <CardTitle className="text-3xl">12</CardTitle>
                  </CardHeader>
                </Card>
                <Card>
                  <CardHeader className="pb-2">
                    <CardDescription>Custom Themes</CardDescription>
                    <CardTitle className="text-3xl">5</CardTitle>
                  </CardHeader>
                </Card>
                <Card>
                  <CardHeader className="pb-2">
                    <CardDescription>Exports</CardDescription>
                    <CardTitle className="text-3xl">8</CardTitle>
                  </CardHeader>
                </Card>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle>Daily Inspiration</CardTitle>
                </CardHeader>
                <CardContent>
                  <blockquote className="border-l-4 border-primary pl-4 italic">
                    "For I know the plans I have for you," declares the Lord, "plans to prosper you and not to harm you, plans to give you hope and a future."
                  </blockquote>
                  <p className="text-sm text-muted-foreground mt-2">— Jeremiah 29:11</p>
                </CardContent>
              </Card>
            </div>
          )}

          {activeTab === "funnels" && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-2xl font-bold">Funnels</h1>
                  <p className="text-muted-foreground">Manage your sales funnels</p>
                </div>
                <Button className="gap-2">
                  <Plus className="h-4 w-4" /> Create Funnel
                </Button>
              </div>

              <div className="grid gap-4">
                {demoFunnels.map((funnel) => (
                  <Card key={funnel.id}>
                    <CardContent className="flex items-center justify-between p-4">
                      <div>
                        <h3 className="font-semibold">{funnel.name}</h3>
                        <p className="text-sm text-muted-foreground">{funnel.stages} stages</p>
                      </div>
                      <div className="flex items-center gap-4">
                        <Badge variant={funnel.status === "Active" ? "default" : "secondary"}>
                          {funnel.status}
                        </Badge>
                        <div className="flex gap-2">
                          <Button size="icon" variant="ghost"><Eye className="h-4 w-4" /></Button>
                          <Button size="icon" variant="ghost"><Edit className="h-4 w-4" /></Button>
                          <Button size="icon" variant="ghost"><Trash2 className="h-4 w-4" /></Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {activeTab === "verses" && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-2xl font-bold">Verse Builder</h1>
                  <p className="text-muted-foreground">Add Bible verses to your funnels</p>
                </div>
                <Button className="gap-2">
                  <Plus className="h-4 w-4" /> Add Verse
                </Button>
              </div>

              <div className="grid gap-4">
                {demoVerses.map((verse) => (
                  <Card key={verse.id}>
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between">
                        <div>
                          <h3 className="font-semibold">{verse.reference}</h3>
                          <p className="text-muted-foreground mt-1">{verse.text}</p>
                          <Badge variant="outline" className="mt-2">{verse.funnel}</Badge>
                        </div>
                        <div className="flex gap-2">
                          <Button size="icon" variant="ghost"><Edit className="h-4 w-4" /></Button>
                          <Button size="icon" variant="ghost"><Trash2 className="h-4 w-4" /></Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {activeTab === "themes" && (
            <div className="space-y-6">
              <div>
                <h1 className="text-2xl font-bold">Theme Settings</h1>
                <p className="text-muted-foreground">Customize your funnel colors</p>
              </div>

              <div className="grid gap-4 md:grid-cols-3">
                <Card className="border-2 border-primary">
                  <CardHeader>
                    <CardTitle className="text-lg">Royal Purple</CardTitle>
                    <Badge>Active</Badge>
                  </CardHeader>
                  <CardContent>
                    <div className="flex gap-2">
                      <div className="w-8 h-8 rounded bg-purple-600"></div>
                      <div className="w-8 h-8 rounded bg-purple-400"></div>
                      <div className="w-8 h-8 rounded bg-gold-500" style={{backgroundColor: '#D4AF37'}}></div>
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Ocean Blue</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex gap-2">
                      <div className="w-8 h-8 rounded bg-blue-600"></div>
                      <div className="w-8 h-8 rounded bg-blue-400"></div>
                      <div className="w-8 h-8 rounded bg-cyan-400"></div>
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Forest Green</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex gap-2">
                      <div className="w-8 h-8 rounded bg-green-600"></div>
                      <div className="w-8 h-8 rounded bg-green-400"></div>
                      <div className="w-8 h-8 rounded bg-emerald-400"></div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          )}

          {activeTab === "export" && (
            <div className="space-y-6">
              <div>
                <h1 className="text-2xl font-bold">Export</h1>
                <p className="text-muted-foreground">Download your funnels as HTML/ZIP</p>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle>Export Funnel</CardTitle>
                  <CardDescription>Select a funnel to export as standalone HTML files</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    {demoFunnels.map((funnel) => (
                      <div key={funnel.id} className="flex items-center justify-between p-3 border rounded-lg">
                        <span>{funnel.name}</span>
                        <Button size="sm" className="gap-2">
                          <Download className="h-4 w-4" /> Export ZIP
                        </Button>
                      </div>
                    ))}
                  </div>
                  <div className="pt-4 border-t">
                    <h4 className="font-medium mb-2">Export Includes:</h4>
                    <ul className="space-y-1 text-sm text-muted-foreground">
                      <li className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-green-500" /> All funnel stages (Main, OTOs, Downsells)</li>
                      <li className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-green-500" /> Embedded CSS styling</li>
                      <li className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-green-500" /> Legal pages (Terms, Privacy, Refund)</li>
                      <li className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-green-500" /> README with setup instructions</li>
                    </ul>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {activeTab === "whitelabel" && (
            <div className="space-y-6">
              <div>
                <h1 className="text-2xl font-bold">White Label Settings</h1>
                <p className="text-muted-foreground">Customize your branding</p>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle>Branding</CardTitle>
                  <CardDescription>Your custom branding appears in exported funnels</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid gap-4 md:grid-cols-2">
                    <div>
                      <label className="text-sm font-medium">Business Name</label>
                      <div className="mt-1 p-2 border rounded bg-muted/50">Your Business Name</div>
                    </div>
                    <div>
                      <label className="text-sm font-medium">Support Email</label>
                      <div className="mt-1 p-2 border rounded bg-muted/50">support@yourbusiness.com</div>
                    </div>
                    <div>
                      <label className="text-sm font-medium">Custom Domain</label>
                      <div className="mt-1 p-2 border rounded bg-muted/50">yourbusiness.com</div>
                    </div>
                    <div>
                      <label className="text-sm font-medium">Primary Color</label>
                      <div className="mt-1 flex items-center gap-2">
                        <div className="w-8 h-8 rounded bg-purple-600 border"></div>
                        <span className="text-sm text-muted-foreground">#7C3AED</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
