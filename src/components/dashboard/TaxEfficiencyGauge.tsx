import { Card } from "@/components/ui/card";

interface TaxEfficiencyGaugeProps {
  score: number;
  maxScore?: number;
}

export const TaxEfficiencyGauge = ({ score, maxScore = 100 }: TaxEfficiencyGaugeProps) => {
  const percentage = (score / maxScore) * 100;
  const rotation = (percentage / 100) * 180 - 90;

  return (
    <Card className="p-6">
      <h3 className="text-sm font-medium text-muted-foreground mb-6">Tax Efficiency Score</h3>
      <div className="relative w-48 h-24 mx-auto">
        {/* Gauge background */}
        <svg className="w-full h-full" viewBox="0 0 200 100">
          <path
            d="M 20 90 A 80 80 0 0 1 180 90"
            fill="none"
            stroke="hsl(var(--muted))"
            strokeWidth="12"
            strokeLinecap="round"
          />
          <path
            d="M 20 90 A 80 80 0 0 1 180 90"
            fill="none"
            stroke="hsl(var(--gold))"
            strokeWidth="12"
            strokeLinecap="round"
            strokeDasharray={`${percentage * 2.51} 251`}
            className="transition-all duration-1000"
          />
          <circle cx="100" cy="90" r="6" fill="hsl(var(--gold))" />
          <line
            x1="100"
            y1="90"
            x2="100"
            y2="30"
            stroke="hsl(var(--navy))"
            strokeWidth="3"
            strokeLinecap="round"
            transform={`rotate(${rotation} 100 90)`}
            className="transition-transform duration-1000"
          />
        </svg>
      </div>
      <div className="text-center mt-4">
        <div className="text-4xl font-bold text-navy">{score}</div>
        <div className="text-sm text-muted-foreground">out of {maxScore}</div>
      </div>
    </Card>
  );
};
