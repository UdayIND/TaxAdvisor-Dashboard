import { Card } from "@/components/ui/card";

const Transactions = () => {
  return (
    <div className="p-8 space-y-6">
      <h1 className="text-3xl font-bold text-navy">Transactions</h1>
      <Card className="p-6">
        <p className="text-muted-foreground">Transaction history and details.</p>
      </Card>
    </div>
  );
};

export default Transactions;

