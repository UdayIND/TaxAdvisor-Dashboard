import { Card } from "@/components/ui/card";

const PaymentsAccounts = () => {
  return (
    <div className="p-8 space-y-6">
      <h1 className="text-3xl font-bold text-navy">Payments - Accounts</h1>
      <Card className="p-6">
        <p className="text-muted-foreground">Payment account management.</p>
      </Card>
    </div>
  );
};

export default PaymentsAccounts;

