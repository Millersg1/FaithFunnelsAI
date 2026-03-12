import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useAuth } from "@/hooks/useAuth";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import {
  Users,
  Building2,
  BarChart3,
  Server,
  Shield,
  ShieldOff,
  Trash2,
  KeyRound,
  RefreshCw,
  Activity,
  UserPlus,
  Filter,
} from "lucide-react";

interface AdminStats {
  totalUsers: number;
  totalTenants: number;
  paidTenants: number;
  totalFunnels: number;
  recentUsers: number;
  tierBreakdown: Record<string, number>;
}

interface AdminUser {
  id: string;
  email: string | null;
  firstName: string | null;
  lastName: string | null;
  isAdmin: boolean;
  createdAt: string | null;
}

interface AdminTenant {
  id: string;
  slug: string;
  isPaid: boolean;
  tier: string;
  adminPin: string | null;
  createdAt: string;
  settings?: {
    businessName: string;
    supportEmail: string;
  } | null;
}

interface HealthInfo {
  status: string;
  uptime: number;
  uptimeFormatted: string;
  memory: { rss: number; heapUsed: number; heapTotal: number };
  nodeVersion: string;
  env: string;
}

export default function AdminPanel() {
  const { user } = useAuth();
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [resetPasswordId, setResetPasswordId] = useState<string | null>(null);
  const [newPassword, setNewPassword] = useState("");
  const [activeTab, setActiveTab] = useState<"overview" | "users" | "tenants">("overview");

  const { data: stats, isLoading: statsLoading } = useQuery<AdminStats>({
    queryKey: ["/api/admin/stats"],
    retry: false,
  });

  const { data: users, isLoading: usersLoading } = useQuery<AdminUser[]>({
    queryKey: ["/api/admin/users"],
    enabled: activeTab === "users" || activeTab === "overview",
    retry: false,
  });

  const { data: tenants, isLoading: tenantsLoading } = useQuery<AdminTenant[]>({
    queryKey: ["/api/admin/tenants"],
    enabled: activeTab === "tenants" || activeTab === "overview",
    retry: false,
  });

  const { data: health } = useQuery<HealthInfo>({
    queryKey: ["/api/admin/health"],
    retry: false,
    refetchInterval: 30000,
  });

  const toggleAdminMutation = useMutation({
    mutationFn: async ({ id, isAdmin }: { id: string; isAdmin: boolean }) => {
      await apiRequest("PATCH", `/api/admin/users/${id}`, { isAdmin });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/admin/users"] });
      toast({ title: "User updated" });
    },
    onError: (err: Error) => {
      toast({ title: "Error", description: err.message, variant: "destructive" });
    },
  });

  const resetPasswordMutation = useMutation({
    mutationFn: async ({ id, password }: { id: string; password: string }) => {
      await apiRequest("PATCH", `/api/admin/users/${id}`, { resetPassword: password });
    },
    onSuccess: () => {
      setResetPasswordId(null);
      setNewPassword("");
      toast({ title: "Password reset successfully" });
    },
    onError: (err: Error) => {
      toast({ title: "Error", description: err.message, variant: "destructive" });
    },
  });

  const deleteUserMutation = useMutation({
    mutationFn: async (id: string) => {
      await apiRequest("DELETE", `/api/admin/users/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/admin/users"] });
      queryClient.invalidateQueries({ queryKey: ["/api/admin/stats"] });
      toast({ title: "User deleted" });
    },
    onError: (err: Error) => {
      toast({ title: "Error", description: err.message, variant: "destructive" });
    },
  });

  const updateTenantMutation = useMutation({
    mutationFn: async ({ id, ...data }: { id: string; isPaid?: boolean; tier?: string }) => {
      await apiRequest("PATCH", `/api/admin/tenants/${id}`, data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/admin/tenants"] });
      queryClient.invalidateQueries({ queryKey: ["/api/admin/stats"] });
      toast({ title: "Tenant updated" });
    },
    onError: (err: Error) => {
      toast({ title: "Error", description: err.message, variant: "destructive" });
    },
  });

  if (!user?.isAdmin) {
    return (
      <div className="flex items-center justify-center h-full">
        <Card className="w-full max-w-md">
          <CardContent className="pt-6 text-center">
            <Shield className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
            <p className="text-lg font-semibold">Admin Access Required</p>
            <p className="text-sm text-muted-foreground mt-2">
              You don't have permission to access this page.
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  const tabs = [
    { id: "overview" as const, label: "Overview", icon: BarChart3 },
    { id: "users" as const, label: "Users", icon: Users },
    { id: "tenants" as const, label: "Tenants", icon: Building2 },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Admin Panel</h1>
        <p className="text-muted-foreground">Manage users, tenants, and monitor system health</p>
      </div>

      {/* Tab Navigation */}
      <div className="flex gap-2 border-b pb-2">
        {tabs.map((tab) => (
          <Button
            key={tab.id}
            variant={activeTab === tab.id ? "default" : "ghost"}
            size="sm"
            onClick={() => setActiveTab(tab.id)}
          >
            <tab.icon className="h-4 w-4 mr-2" />
            {tab.label}
          </Button>
        ))}
      </div>

      {/* Overview Tab */}
      {activeTab === "overview" && (
        <div className="space-y-6">
          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">Total Users</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats?.totalUsers ?? "-"}</div>
                <p className="text-xs text-muted-foreground">
                  +{stats?.recentUsers ?? 0} this week
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">Total Tenants</CardTitle>
                <Building2 className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats?.totalTenants ?? "-"}</div>
                <p className="text-xs text-muted-foreground">
                  {stats?.paidTenants ?? 0} paid
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">Total Funnels</CardTitle>
                <Filter className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats?.totalFunnels ?? "-"}</div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">System Status</CardTitle>
                <Activity className="h-4 w-4 text-green-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-green-600">
                  {health?.status === "running" ? "Healthy" : "Unknown"}
                </div>
                <p className="text-xs text-muted-foreground">
                  Uptime: {health?.uptimeFormatted ?? "-"}
                </p>
              </CardContent>
            </Card>
          </div>

          {/* System Health */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Server className="h-5 w-5" /> System Health
              </CardTitle>
            </CardHeader>
            <CardContent>
              {health ? (
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                  <div>
                    <span className="text-muted-foreground">Memory (RSS)</span>
                    <p className="font-medium">{health.memory.rss} MB</p>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Heap Used</span>
                    <p className="font-medium">{health.memory.heapUsed} / {health.memory.heapTotal} MB</p>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Node.js</span>
                    <p className="font-medium">{health.nodeVersion}</p>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Environment</span>
                    <p className="font-medium">{health.env}</p>
                  </div>
                </div>
              ) : (
                <p className="text-muted-foreground">Loading...</p>
              )}
            </CardContent>
          </Card>

          {/* Tier Breakdown */}
          {stats?.tierBreakdown && Object.keys(stats.tierBreakdown).length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle>Tier Breakdown</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-3">
                  {Object.entries(stats.tierBreakdown).map(([tier, count]) => (
                    <Badge key={tier} variant="secondary" className="text-sm py-1 px-3">
                      {tier}: {count}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Recent Users */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <UserPlus className="h-5 w-5" /> Recent Users
              </CardTitle>
              <CardDescription>Last 5 registered users</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {users?.slice(0, 5).map((u) => (
                  <div key={u.id} className="flex items-center justify-between py-2 border-b last:border-0">
                    <div>
                      <p className="text-sm font-medium">{u.email}</p>
                      <p className="text-xs text-muted-foreground">
                        {u.firstName} {u.lastName} {u.isAdmin && <Badge variant="default" className="ml-1 text-xs">Admin</Badge>}
                      </p>
                    </div>
                    <span className="text-xs text-muted-foreground">
                      {u.createdAt ? new Date(u.createdAt).toLocaleDateString() : "-"}
                    </span>
                  </div>
                ))}
                {(!users || users.length === 0) && (
                  <p className="text-sm text-muted-foreground">No users yet</p>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Users Tab */}
      {activeTab === "users" && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5" /> All Users
            </CardTitle>
            <CardDescription>{users?.length ?? 0} total users</CardDescription>
          </CardHeader>
          <CardContent>
            {usersLoading ? (
              <p>Loading...</p>
            ) : (
              <div className="space-y-3">
                {users?.map((u) => (
                  <div key={u.id} className="flex items-center justify-between py-3 px-4 border rounded-lg">
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <p className="font-medium">{u.email}</p>
                        {u.isAdmin && <Badge>Admin</Badge>}
                      </div>
                      <p className="text-sm text-muted-foreground">
                        {u.firstName || ""} {u.lastName || ""} | ID: {u.id.slice(0, 8)}...
                        | Joined: {u.createdAt ? new Date(u.createdAt).toLocaleDateString() : "-"}
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      {/* Toggle Admin */}
                      <Button
                        variant="ghost"
                        size="sm"
                        title={u.isAdmin ? "Remove admin" : "Make admin"}
                        onClick={() => toggleAdminMutation.mutate({ id: u.id, isAdmin: !u.isAdmin })}
                        disabled={u.id === user?.id}
                      >
                        {u.isAdmin ? <ShieldOff className="h-4 w-4" /> : <Shield className="h-4 w-4" />}
                      </Button>

                      {/* Reset Password */}
                      {resetPasswordId === u.id ? (
                        <div className="flex items-center gap-1">
                          <Input
                            type="text"
                            placeholder="New password"
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                            className="w-36 h-8 text-sm"
                          />
                          <Button
                            size="sm"
                            onClick={() => resetPasswordMutation.mutate({ id: u.id, password: newPassword })}
                            disabled={!newPassword || newPassword.length < 8}
                          >
                            Set
                          </Button>
                          <Button size="sm" variant="ghost" onClick={() => { setResetPasswordId(null); setNewPassword(""); }}>
                            Cancel
                          </Button>
                        </div>
                      ) : (
                        <Button variant="ghost" size="sm" title="Reset password" onClick={() => setResetPasswordId(u.id)}>
                          <KeyRound className="h-4 w-4" />
                        </Button>
                      )}

                      {/* Delete */}
                      <Button
                        variant="ghost"
                        size="sm"
                        title="Delete user"
                        className="text-red-500 hover:text-red-700"
                        onClick={() => {
                          if (confirm(`Delete user ${u.email}? This cannot be undone.`)) {
                            deleteUserMutation.mutate(u.id);
                          }
                        }}
                        disabled={u.id === user?.id}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      )}

      {/* Tenants Tab */}
      {activeTab === "tenants" && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Building2 className="h-5 w-5" /> All Tenants
            </CardTitle>
            <CardDescription>{tenants?.length ?? 0} total tenants</CardDescription>
          </CardHeader>
          <CardContent>
            {tenantsLoading ? (
              <p>Loading...</p>
            ) : (
              <div className="space-y-3">
                {tenants?.map((t) => (
                  <div key={t.id} className="py-3 px-4 border rounded-lg">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="flex items-center gap-2">
                          <p className="font-medium">{t.settings?.businessName || t.slug}</p>
                          <Badge variant={t.isPaid ? "default" : "secondary"}>
                            {t.isPaid ? "Paid" : "Free"}
                          </Badge>
                          <Badge variant="outline">{t.tier}</Badge>
                        </div>
                        <p className="text-sm text-muted-foreground mt-1">
                          Slug: {t.slug} | PIN: {t.adminPin || "N/A"}
                          | Created: {new Date(t.createdAt).toLocaleDateString()}
                        </p>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => updateTenantMutation.mutate({ id: t.id, isPaid: !t.isPaid })}
                        >
                          {t.isPaid ? "Set Free" : "Set Paid"}
                        </Button>
                        <select
                          className="text-sm border rounded px-2 py-1"
                          value={t.tier}
                          onChange={(e) => updateTenantMutation.mutate({ id: t.id, tier: e.target.value })}
                        >
                          <option value="basic">Basic</option>
                          <option value="white_label_lite">White Label Lite</option>
                          <option value="white_label">White Label</option>
                          <option value="premium_lite">Premium Lite</option>
                          <option value="premium">Premium</option>
                          <option value="agency_lite">Agency Lite</option>
                          <option value="reseller">Reseller</option>
                        </select>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  );
}
