import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TaxEfficiencyGauge } from "@/components/dashboard/TaxEfficiencyGauge";
import { OpportunitiesList } from "@/components/dashboard/OpportunitiesList";
import { MetricCard } from "@/components/dashboard/MetricCard";
import { Card } from "@/components/ui/card";
import { Download, Info } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const TaxDashboard = () => {
  return (
    <div className="p-8 max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-navy mb-2">
            Tax Opportunities Dashboard
          </h1>
        </div>
        <Button className="bg-gold hover:bg-gold-dark text-navy">
          <Download className="h-4 w-4 mr-2" />
          Export Report
        </Button>
      </div>

      {/* Tabs */}
      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList className="bg-muted">
          <TabsTrigger value="overview">Tax Efficiency Overview</TabsTrigger>
          <TabsTrigger value="location">Asset Location</TabsTrigger>
          <TabsTrigger value="withdrawal">Withdrawal Planner</TabsTrigger>
          <TabsTrigger value="impact">Value Demonstration</TabsTrigger>
        </TabsList>

        {/* Tab 1: Overview */}
        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-1">
              <TaxEfficiencyGauge score={78} />
              <Card className="p-4 mt-4">
                <div className="flex items-start gap-2">
                  <Info className="h-4 w-4 text-gold mt-0.5" />
                  <div className="text-xs text-muted-foreground">
                    <p className="font-medium mb-1">Projected Tax Savings</p>
                    <p className="text-xl font-bold text-foreground">$124,000</p>
                    <p className="mt-1">Over 20 years</p>
                  </div>
                </div>
              </Card>
            </div>
            
            <div className="lg:col-span-2">
              <OpportunitiesList />
            </div>
          </div>
        </TabsContent>

        {/* Tab 2: Asset Location */}
        <TabsContent value="location" className="space-y-6">
          <Card className="p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-semibold">Optimize Asset Placement</h3>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant="ghost" size="sm">
                      <Info className="h-4 w-4 mr-2" />
                      How riAI calculates Tax Drag
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent className="max-w-xs">
                    <p>riAI analyzes tax efficiency by comparing asset placement across account types, calculating the tax drag of each position.</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
            
            {/* Heat Map Table */}
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b">
                    <th className="text-left p-3 font-medium">Asset Type</th>
                    <th className="text-center p-3 font-medium">Taxable</th>
                    <th className="text-center p-3 font-medium">IRA</th>
                    <th className="text-center p-3 font-medium">Roth IRA</th>
                    <th className="text-center p-3 font-medium">401(k)</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    { asset: "Stocks (US Large Cap)", scores: ["high", "medium", "low", "medium"] },
                    { asset: "Bonds (High Yield)", scores: ["low", "high", "medium", "high"] },
                    { asset: "REITs", scores: ["low", "high", "medium", "high"] },
                    { asset: "Growth Stocks", scores: ["medium", "medium", "high", "medium"] },
                    { asset: "Municipal Bonds", scores: ["high", "low", "low", "low"] },
                  ].map((row, i) => (
                    <tr key={i} className="border-b">
                      <td className="p-3 font-medium">{row.asset}</td>
                      {row.scores.map((score, j) => (
                        <td key={j} className="p-3">
                          <div
                            className={`h-8 rounded-md ${
                              score === "high"
                                ? "bg-green-100 border border-green-300"
                                : score === "medium"
                                ? "bg-yellow-100 border border-yellow-300"
                                : "bg-red-100 border border-red-300"
                            }`}
                          />
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Swap Suggestions */}
            <Card className="mt-6 p-4 bg-gold/5 border-gold/20">
              <h4 className="font-semibold mb-3 flex items-center gap-2">
                <span className="text-gold">💡</span> Swap Suggestions
              </h4>
              <div className="space-y-2 text-sm">
                <p>• Move REIT fund to IRA → Avoid <span className="font-bold text-green-600">$2.3k</span> in annual tax</p>
                <p>• Relocate High-Yield Bonds to 401(k) → Save <span className="font-bold text-green-600">$1.8k/yr</span></p>
              </div>
            </Card>
          </Card>
        </TabsContent>

        {/* Tab 3: Withdrawal Planner */}
        <TabsContent value="withdrawal" className="space-y-6">
          <Card className="p-6">
            <h3 className="text-xl font-semibold mb-6">Tax Bracket & Withdrawal Planner</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium mb-2 block">Age</label>
                  <input type="number" className="w-full p-2 border rounded-md" defaultValue={45} />
                </div>
                <div>
                  <label className="text-sm font-medium mb-2 block">Annual Income</label>
                  <input type="text" className="w-full p-2 border rounded-md" defaultValue="$120,000" />
                </div>
              </div>
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium mb-2 block">Roth IRA Balance</label>
                  <input type="text" className="w-full p-2 border rounded-md" defaultValue="$85,000" />
                </div>
                <div>
                  <label className="text-sm font-medium mb-2 block">Traditional IRA Balance</label>
                  <input type="text" className="w-full p-2 border rounded-md" defaultValue="$320,000" />
                </div>
              </div>
            </div>

            {/* Tax Map Chart Placeholder */}
            <div className="h-64 bg-gradient-to-br from-muted to-muted/50 rounded-lg flex items-center justify-center">
              <div className="text-center">
                <p className="text-muted-foreground mb-2">Tax Bracket Visualization</p>
                <p className="text-sm text-muted-foreground">Effective Marginal Rate vs. Income Over Time</p>
              </div>
            </div>

            {/* AI Summary */}
            <Card className="mt-6 p-4 bg-navy text-white">
              <p className="text-sm font-medium mb-2">💡 AI Strategic Recommendation</p>
              <p className="text-sm opacity-90">
                Withdraw $42,000 annually from Traditional IRA to fill the 22% bracket, then convert the remaining balance to Roth. This strategy optimizes your long-term tax efficiency and minimizes your lifetime tax burden.
              </p>
            </Card>
          </Card>
        </TabsContent>

        {/* Tab 4: Value Demonstration */}
        <TabsContent value="impact" className="space-y-6">
          <Card className="p-6">
            <h3 className="text-xl font-semibold mb-6">Tax Optimization Impact Visualization</h3>
            
            {/* Before vs After Chart */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h4 className="text-sm font-medium text-muted-foreground mb-4">Before Optimization</h4>
                <div className="h-64 bg-gradient-to-t from-muted to-background rounded-lg flex items-end p-4">
                  <div className="w-full">
                    <div className="h-40 bg-navy/20 rounded-t-lg relative">
                      <div className="absolute top-2 left-2 text-xs font-semibold">$2.8M</div>
                    </div>
                  </div>
                </div>
              </div>
              <div>
                <h4 className="text-sm font-medium text-muted-foreground mb-4">After Optimization</h4>
                <div className="h-64 bg-gradient-to-t from-gold/10 to-background rounded-lg flex items-end p-4">
                  <div className="w-full">
                    <div className="h-52 bg-gold/30 rounded-t-lg relative">
                      <div className="absolute top-2 left-2 text-xs font-semibold">$3.28M</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Delta */}
            <div className="mt-8 text-center p-6 bg-gradient-to-r from-gold/10 to-gold/5 rounded-lg">
              <p className="text-sm text-muted-foreground mb-2">Total Tax Savings by 2045</p>
              <p className="text-4xl font-bold text-gold">+$480,000</p>
              <p className="text-sm text-muted-foreground mt-2">
                riAI Tax Alpha: <span className="font-semibold">+0.9% annually</span>
              </p>
            </div>

            <div className="mt-6 text-center">
              <Button className="bg-gold hover:bg-gold-dark text-navy">
                <Download className="h-4 w-4 mr-2" />
                Export Branded Report (PDF)
              </Button>
            </div>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default TaxDashboard;
