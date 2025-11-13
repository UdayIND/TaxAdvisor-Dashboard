import { Card } from "@/components/ui/card";

const Notifications = () => {
  return (
    <div className="p-8 space-y-6">
      <h1 className="text-3xl font-bold text-navy">Notifications</h1>
      <Card className="p-6">
        <p className="text-muted-foreground">System notifications and alerts.</p>
      </Card>
    </div>
  );
};

export default Notifications;

