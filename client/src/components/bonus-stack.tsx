import { Gift, Check } from "lucide-react";

interface Bonus {
  title: string;
  description: string;
  value: number;
}

interface BonusStackProps {
  bonuses: Bonus[];
}

export function BonusStack({ bonuses }: BonusStackProps) {
  const totalValue = bonuses.reduce((sum, bonus) => sum + bonus.value, 0);

  return (
    <div className="bg-gradient-to-br from-primary/5 via-secondary/5 to-accent/5 border-2 border-primary/20 rounded-lg p-8">
      <div className="text-center mb-6">
        <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-6 py-3 rounded-full mb-4">
          <Gift className="w-6 h-6" />
          <span className="font-bold text-lg">EXCLUSIVE BONUSES INCLUDED</span>
        </div>
        <p className="text-muted-foreground">Get these valuable bonuses absolutely FREE when you upgrade today!</p>
      </div>

      <div className="space-y-4 mb-6">
        {bonuses.map((bonus, index) => (
          <div key={index} className="bg-card border rounded-lg p-4 flex items-start gap-4">
            <div className="bg-primary/10 rounded-full p-2 flex-shrink-0">
              <Check className="w-5 h-5 text-primary" />
            </div>
            <div className="flex-1">
              <div className="flex items-start justify-between gap-4 mb-1">
                <h4 className="font-semibold">{bonus.title}</h4>
                <span className="text-sm font-bold text-primary whitespace-nowrap">${bonus.value} Value</span>
              </div>
              <p className="text-sm text-muted-foreground">{bonus.description}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-primary text-primary-foreground rounded-lg p-4 text-center">
        <p className="text-sm font-semibold mb-1">Total Bonus Value</p>
        <p className="text-3xl font-bold">${totalValue}</p>
        <p className="text-sm opacity-90 mt-1">Yours FREE Today!</p>
      </div>
    </div>
  );
}
