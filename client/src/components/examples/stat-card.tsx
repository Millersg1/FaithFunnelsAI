import { StatCard } from "../stat-card";
import { Filter } from "lucide-react";

export default function StatCardExample() {
  return (
    <StatCard
      title="Total Funnels"
      value={12}
      icon={Filter}
      description="Active funnels"
    />
  );
}
