import { Card } from "@/components/ui/card";

const Forecasts = () => {
  return (
    <div className="p-8 space-y-6">
      <h1 className="text-3xl font-bold text-navy">Forecasts</h1>
      <Card className="p-6">
        <p className="text-muted-foreground">Financial forecasting and projections.</p>
      </Card>
    </div>
  );
};

export default Forecasts;

