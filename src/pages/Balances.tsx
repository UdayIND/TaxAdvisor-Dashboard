import { Card } from "@/components/ui/card";

const Balances = () => {
  return (
    <div className="p-8 space-y-6">
      <h1 className="text-3xl font-bold text-navy">Balances</h1>
      <Card className="p-6">
        <p className="text-muted-foreground">Account balances and financial overview.</p>
      </Card>
    </div>
  );
};

export default Balances;

