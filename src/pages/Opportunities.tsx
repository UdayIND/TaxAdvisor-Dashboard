import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Plus, MoreVertical, Search } from "lucide-react";
import { format } from "date-fns";

interface Opportunity {
  id: number;
  title: string;
  client: string;
  amount: string;
  amountType: "Fee" | "AUM" | "Other";
  date: Date;
  percentage?: number;
  stage: "evaluation" | "identify" | "qualification" | "needs" | "review";
}

const initialOpportunities: Opportunity[] = [
  {
    id: 1,
    title: "Relocate $150k of high-yield bonds → IRA",
    client: "William Jones",
    amount: "$2,800",
    amountType: "Fee",
    date: new Date(2025, 4, 13),
    percentage: 65,
    stage: "evaluation",
  },
  {
    id: 2,
    title: "Convert $25k to Roth (2025) – stay under 24% bracket",
    client: "Beverly Davis",
    amount: "$1,200",
    amountType: "Fee",
    date: new Date(2025, 11, 3),
    percentage: 80,
    stage: "evaluation",
  },
  {
    id: 3,
    title: "Gift appreciated stock to DAF",
    client: "Kim Hasana",
    amount: "$6,000",
    amountType: "Other",
    date: new Date(2025, 7, 21),
    percentage: 60,
    stage: "evaluation",
  },
  {
    id: 4,
    title: "Harvest $9k in losses",
    client: "Kevin Anderson",
    amount: "$2,200",
    amountType: "Fee",
    date: new Date(2025, 7, 11),
    percentage: 100,
    stage: "evaluation",
  },
  {
    id: 5,
    title: "Increase 401(k) by $3k → max limit",
    client: "Steve Burke",
    amount: "$720",
    amountType: "Fee",
    date: new Date(2025, 4, 13),
    percentage: 30,
    stage: "evaluation",
  },
  {
    id: 6,
    title: "Retirement Planning",
    client: "Kim Hasana",
    amount: "$2,000,000",
    amountType: "AUM",
    date: new Date(2025, 3, 13),
    percentage: 30,
    stage: "identify",
  },
  {
    id: 7,
    title: "529 Plan",
    client: "Kevin Anderson",
    amount: "$400",
    amountType: "Fee",
    date: new Date(2025, 4, 13),
    percentage: 30,
    stage: "identify",
  },
  {
    id: 8,
    title: "Onboarding",
    client: "Steven Gerrard",
    amount: "$495",
    amountType: "Fee",
    date: new Date(2025, 9, 13),
    percentage: 30,
    stage: "identify",
  },
  {
    id: 9,
    title: "New Client",
    client: "Ted Brown",
    amount: "$750,000",
    amountType: "AUM",
    date: new Date(2025, 7, 21),
    percentage: 80,
    stage: "qualification",
  },
  {
    id: 10,
    title: "Annuity",
    client: "Ted Brown",
    amount: "$3,000",
    amountType: "Fee",
    date: new Date(2025, 5, 3),
    percentage: 70,
    stage: "needs",
  },
  {
    id: 11,
    title: "Transfer accounts",
    client: "Julia Perkins",
    amount: "$1,500",
    amountType: "Other",
    date: new Date(2025, 4, 13),
    percentage: 90,
    stage: "needs",
  },
  {
    id: 12,
    title: "Onboarding",
    client: "Steve Burke",
    amount: "$495",
    amountType: "Fee",
    date: new Date(2025, 4, 13),
    stage: "review",
  },
];

const stages = [
  { id: "evaluation", label: "Evaluation" },
  { id: "identify", label: "Identify Decision Makers" },
  { id: "qualification", label: "Qualification" },
  { id: "needs", label: "Needs Analysis" },
  { id: "review", label: "Review" },
];

const Opportunities = () => {
  const [opportunities, setOpportunities] = useState<Opportunity[]>(initialOpportunities);
  const [clientSearch, setClientSearch] = useState("");

  const filteredOpportunities = opportunities.filter((opp) =>
    clientSearch === "" ? true : opp.client.toLowerCase().includes(clientSearch.toLowerCase())
  );

  const getOpportunitiesByStage = (stageId: string) => {
    return filteredOpportunities.filter((opp) => opp.stage === stageId);
  };

  const getPercentageColor = (percentage?: number) => {
    if (!percentage) return "text-muted-foreground";
    if (percentage >= 80) return "text-success";
    if (percentage >= 60) return "text-gold";
    return "text-textLight";
  };

  return (
    <div className="p-8 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <h1 className="text-3xl font-bold text-navy">Opportunities</h1>
          <div className="relative w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search by client..."
              value={clientSearch}
              onChange={(e) => setClientSearch(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>
        <div className="flex items-center gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline">Options</Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>Export</DropdownMenuItem>
              <DropdownMenuItem>Settings</DropdownMenuItem>
              <DropdownMenuItem>Archive</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <Button className="bg-success hover:bg-success/90 text-white">
            <Plus className="h-4 w-4 mr-2" />
            Create Opportunity
          </Button>
        </div>
      </div>

      {/* Kanban Board */}
      <div className="grid grid-cols-5 gap-4">
        {stages.map((stage) => {
          const stageOpportunities = getOpportunitiesByStage(stage.id);
          return (
            <div key={stage.id} className="min-w-0">
              <Card className="bg-grayNeutral/30">
                <div className="p-4 border-b bg-grayNeutral/50">
                  <h3 className="font-semibold text-navy">{stage.label}</h3>
                  <span className="text-xs text-muted-foreground">
                    {stageOpportunities.length} opportunities
                  </span>
                </div>
                <div className="p-3 space-y-3 min-h-[400px]">
                  {stageOpportunities.map((opp) => (
                    <Card
                      key={opp.id}
                      className="p-3 bg-white hover:shadow-md transition-shadow cursor-pointer"
                    >
                      <div className="flex items-start justify-between mb-1.5">
                        <a
                          href="#"
                          className="text-xs text-navy font-semibold hover:text-gold transition-colors flex-1 leading-tight"
                        >
                          {opp.title}
                        </a>
                        {opp.percentage !== undefined && (
                          <span
                            className={`text-xs font-semibold ml-2 ${getPercentageColor(opp.percentage)}`}
                          >
                            {opp.percentage}%
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-muted-foreground mb-1.5">Re: {opp.client}</p>
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-medium text-foreground">
                          {opp.amount} ({opp.amountType})
                        </span>
                        {opp.date && (
                          <span className="text-xs text-muted-foreground">
                            {format(opp.date, "MMM d, yyyy")}
                          </span>
                        )}
                      </div>
                      <div className="mt-3 flex justify-end">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon" className="h-6 w-6">
                              <MoreVertical className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem>View Details</DropdownMenuItem>
                            <DropdownMenuItem>Edit</DropdownMenuItem>
                            <DropdownMenuItem>Move Stage</DropdownMenuItem>
                            <DropdownMenuItem className="text-destructive">Delete</DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </Card>
                  ))}
                </div>
              </Card>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Opportunities;

