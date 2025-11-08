import { FunnelStageCard } from "../funnel-stage-card";

export default function FunnelStageCardExample() {
  return (
    <div className="space-y-4">
      <FunnelStageCard
        id="main-1"
        title="Faith Journey Landing Page"
        type="main"
        hasVerse={true}
        primaryColor="#6366f1"
      />
      <FunnelStageCard
        id="oto-1"
        title="Premium Bible Study Course"
        type="oto"
        hasVerse={true}
        primaryColor="#8b5cf6"
      />
    </div>
  );
}
