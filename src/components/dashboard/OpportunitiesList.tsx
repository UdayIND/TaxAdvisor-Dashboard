import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { TrendingUp, Lightbulb, DollarSign } from "lucide-react";

interface Opportunity {
  id: number;
  title: string;
  impact: string;
  confidence: number;
  icon: "trend" | "lightbulb" | "dollar";
}

const opportunities: Opportunity[] = [
  {
    id: 1,
    title: "Relocate $150k of high-yield bonds → IRA",
    impact: "+$2.8k/yr",
    confidence: 95,
    icon: "trend",
  },
  {
    id: 2,
    title: "Convert $25k to Roth (2025) – stay under 24% bracket",
    impact: "+$1.2k saved",
    confidence: 88,
  icon: "lightbulb",
  },
  {
    id: 3,
    title: "Gift appreciated stock to DAF",
    impact: "$6k tax avoided",
    confidence: 92,
    icon: "dollar",
  },
  {
    id: 4,
    title: "Harvest $9k in losses",
    impact: "+$2.2k benefit",
    confidence: 85,
    icon: "trend",
  },
  {
    id: 5,
    title: "Increase 401(k) by $3k → max limit",
    impact: "$720 saved",
    confidence: 90,
    icon: "dollar",
  },
];

const iconMap = {
  trend: TrendingUp,
  lightbulb: Lightbulb,
  dollar: DollarSign,
};

export const OpportunitiesList = () => {
  return (
    <Card className="p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold">Top Tax Opportunities</h3>
        <span className="text-xs text-muted-foreground">Impact × Ease</span>
      </div>
      <div className="space-y-3">
        {opportunities.map((opp) => {
          const Icon = iconMap[opp.icon];
          return (
            <div
              key={opp.id}
              className="flex items-start gap-3 p-3 rounded-lg hover:bg-muted/50 transition-colors"
            >
              <div className="p-2 bg-gold/10 rounded-md">
                <Icon className="h-4 w-4 text-gold" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-foreground mb-1">{opp.title}</p>
                <div className="flex items-center gap-4 text-xs">
                  <span className="text-green-600 font-semibold">{opp.impact}</span>
                  <span className="text-muted-foreground">Confidence: {opp.confidence}%</span>
                </div>
              </div>
              <Button variant="ghost" size="sm" className="text-gold hover:text-gold-dark">
                View
              </Button>
            </div>
          );
        })}
      </div>
    </Card>
  );
};
