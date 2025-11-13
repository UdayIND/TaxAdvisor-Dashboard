import { useState } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TaxEfficiencyGauge } from "@/components/dashboard/TaxEfficiencyGauge";
import { Card } from "@/components/ui/card";
import { Download, Info, User, ChevronDown, Settings, Monitor, X } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import {
  AreaChart,
  Area,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  Legend,
  Tooltip as RechartsTooltip,
  ReferenceLine,
  ComposedChart,
  BarChart,
  Bar,
} from "recharts";
import { TrendingUp, Lightbulb, DollarSign, Copy, FileText } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Slider } from "@/components/ui/slider";

interface Client {
  id: number;
  name: string;
  company?: string;
}

const clients: Client[] = [
  { id: 1, name: "Kevin Anderson", company: "Acme Tech" },
  { id: 2, name: "William Jones", company: "Acme Tech" },
  { id: 3, name: "Maria Keston" },
  { id: 4, name: "Kim Hasana", company: "Acme Tech" },
  { id: 5, name: "Steve Burke", company: "Acme Tech" },
  { id: 6, name: "Beverly Davis" },
  { id: 7, name: "Steven Gerrard" },
];

const scenarios = ["Base", "Roth Conversion Plan", "Tax-Loss Harvesting 2025"];

const opportunityCategories = ["All", "Roth Conversions", "Asset Location", "Harvesting", "Charitable", "Contributions"];

interface Opportunity {
  id: number;
  title: string;
  rationale: string;
  impact: string;
  confidence: number;
  icon: "trend" | "lightbulb" | "dollar";
  category: string;
}

const opportunities: Opportunity[] = [
  {
    id: 1,
    title: "Relocate $150k of high-yield bonds → IRA",
    rationale: "High-yield bonds generate significant taxable interest that would be better sheltered in tax-deferred accounts.",
    impact: "+$2.8k/yr",
    confidence: 95,
    icon: "trend",
    category: "Asset Location",
  },
  {
    id: 2,
    title: "Convert $25k to Roth (2025) – stay under 24% bracket",
    rationale: "Current marginal rate is favorable for Roth conversion, providing tax-free growth opportunity.",
    impact: "+$1.2k saved",
    confidence: 88,
    icon: "lightbulb",
    category: "Roth Conversions",
  },
  {
    id: 3,
    title: "Gift appreciated stock to DAF",
    rationale: "Avoid capital gains tax while maximizing charitable deduction value.",
    impact: "$6k tax avoided",
    confidence: 92,
    icon: "dollar",
    category: "Charitable",
  },
  {
    id: 4,
    title: "Harvest $9k in losses",
    rationale: "Offset realized gains and reduce current year tax liability.",
    impact: "+$2.2k benefit",
    confidence: 85,
    icon: "trend",
    category: "Harvesting",
  },
  {
    id: 5,
    title: "Increase 401(k) by $3k → max limit",
    rationale: "Maximize tax-deferred contributions to reduce current taxable income.",
    impact: "$720 saved",
    confidence: 90,
    icon: "dollar",
    category: "Contributions",
  },
];

const iconMap = {
  trend: TrendingUp,
  lightbulb: Lightbulb,
  dollar: DollarSign,
};

// Asset Location data
const assetLocationData = [
  { asset: "US Large Cap", taxable: "high", ira: "medium", roth: "low", "401k": "medium", tooltip: "Dividends taxed at qualified rate; moderate tax efficiency" },
  { asset: "Bonds (High Yield)", taxable: "low", ira: "high", roth: "medium", "401k": "high", tooltip: "Interest taxed at ordinary income; prefer IRA/401(k)" },
  { asset: "REITs", taxable: "low", ira: "high", roth: "medium", "401k": "high", tooltip: "Ordinary income distributions; best in tax-deferred accounts" },
  { asset: "Growth Stocks", taxable: "medium", ira: "medium", roth: "high", "401k": "medium", tooltip: "Low dividends, high growth potential; Roth ideal for tax-free growth" },
  { asset: "International", taxable: "medium", ira: "medium", roth: "medium", "401k": "medium", tooltip: "Foreign tax credit available; moderate efficiency across accounts" },
  { asset: "Municipal Bonds", taxable: "high", ira: "low", roth: "low", "401k": "low", tooltip: "Tax-exempt interest; only makes sense in taxable accounts" },
];

const swapSuggestions = [
  {
    id: 1,
    title: "Move REIT fund from Taxable → IRA",
    description: "Avoid ~$2.3k/yr in ordinary income tax. Estimated realization tax to move: $700",
    impact: "High",
    ease: "Medium",
    netBenefit: "+$1.6k/yr",
    benefit: 2300,
    cost: 700,
  },
  {
    id: 2,
    title: "Relocate High-Yield Bonds to 401(k)",
    description: "Save ~$1.8k/yr in interest taxation. Estimated realization tax: $450",
    impact: "High",
    ease: "Medium",
    netBenefit: "+$1.35k/yr",
    benefit: 1800,
    cost: 450,
  },
  {
    id: 3,
    title: "Shift Growth Stocks to Roth IRA",
    description: "Optimize for tax-free growth. Estimated realization tax: $1,200",
    impact: "Medium",
    ease: "Low",
    netBenefit: "+$800/yr",
    benefit: 2000,
    cost: 1200,
  },
];

const holdingsData = [
  { name: "Vanguard REIT Index Fund", shares: 1250, value: 45000, account: "Taxable" },
  { name: "SPDR REIT ETF", shares: 800, value: 32000, account: "Taxable" },
];

// Tax Efficiency metrics
const metrics = {
  score: 78,
  taxDrag: "0.82%",
  realizedGainsYTD: "$24,300",
  taxSavingsPotential: "$124,000",
  taxSavingsPeriod: "20 years",
};

const getEfficiencyLabel = (score: number) => {
  if (score >= 80) return "Highly efficient";
  if (score >= 60) return "Moderately efficient";
  if (score >= 40) return "Needs improvement";
  return "Inefficient";
};

const TaxDashboard = () => {
  const [selectedClientId, setSelectedClientId] = useState<string>("1");
  const [selectedScenario, setSelectedScenario] = useState<string>("Base");
  const [presentationMode, setPresentationMode] = useState(false);
  const [assumptionsOpen, setAssumptionsOpen] = useState(false);
  const [selectedTab, setSelectedTab] = useState("overview");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedOpportunity, setSelectedOpportunity] = useState<Opportunity | null>(null);
  const [opportunityDrawerOpen, setOpportunityDrawerOpen] = useState(false);
  
  // Filter state
  const [taxYear, setTaxYear] = useState("2024");
  const [filingStatus, setFilingStatus] = useState("MFJ");
  const [householdType, setHouseholdType] = useState("Household");
  const [selectedAccounts, setSelectedAccounts] = useState<string[]>(["Taxable", "IRA", "Roth", "401(k)"]);
  
  // Tab 2: Asset Location state
  const [taxDragModalOpen, setTaxDragModalOpen] = useState(false);
  const [swapFilter, setSwapFilter] = useState("All");
  const [advisorNotes, setAdvisorNotes] = useState("");
  const [excludedHoldings, setExcludedHoldings] = useState<string[]>([]);
  const [selectedRow, setSelectedRow] = useState<string | null>(null);
  const [rowDetailOpen, setRowDetailOpen] = useState(false);
  
  // Tab 3: Withdrawal Planner state
  const [age, setAge] = useState(45);
  const [retirementAge, setRetirementAge] = useState(65);
  const [lifeExpectancy, setLifeExpectancy] = useState("IRS");
  const [taxableBalance, setTaxableBalance] = useState(500000);
  const [traditionalIRABalance, setTraditionalIRABalance] = useState(850000);
  const [rothIRABalance, setRothIRABalance] = useState(320000);
  const [balance401k, setBalance401k] = useState(600000);
  const [strategyTemplate, setStrategyTemplate] = useState("minimize-lifetime");
  const [includeSocialSecurity, setIncludeSocialSecurity] = useState(true);
  const [includeRMDRules, setIncludeRMDRules] = useState(true);
  const [showIRMAA, setShowIRMAA] = useState(false);

  const selectedClient = clients.find((c) => c.id.toString() === selectedClientId);

  const filteredOpportunities = selectedCategory === "All" 
    ? opportunities 
    : opportunities.filter(opp => opp.category === selectedCategory);

  const handleOpportunityClick = (opportunity: Opportunity) => {
    setSelectedOpportunity(opportunity);
    setOpportunityDrawerOpen(true);
  };

  const toggleAccount = (account: string) => {
    setSelectedAccounts(prev => 
      prev.includes(account) 
        ? prev.filter(a => a !== account)
        : [...prev, account]
    );
  };

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-6">
      {/* Page Header */}
      <div className="space-y-4">
        <h1 className="text-3xl font-bold text-navy">
            Tax Opportunities Dashboard
          </h1>

        {/* Control Strip */}
        <div className="flex items-center justify-between flex-wrap gap-4">
          {/* Left: Client Selector & Scenario */}
          <div className="flex items-center gap-3 flex-wrap">
            {/* Client Selector Pill */}
            <div className="flex items-center gap-2 bg-white border border-grayNeutral rounded-full px-3 py-1.5 shadow-sm">
              <Avatar className="h-6 w-6">
                <AvatarFallback className="bg-gold text-navy text-xs font-semibold">
                  {selectedClient?.name.split(' ').map(n => n[0]).join('') || 'KA'}
                </AvatarFallback>
              </Avatar>
              <Select value={selectedClientId} onValueChange={setSelectedClientId}>
                <SelectTrigger className="border-0 shadow-none h-auto p-0 w-auto min-w-[180px] focus:ring-0">
                  <SelectValue>
                    {selectedClient?.name}
                    {selectedClient?.company && ` – ${selectedClient.company}`}
                  </SelectValue>
                </SelectTrigger>
                <SelectContent>
                  {clients.map((client) => (
                    <SelectItem key={client.id} value={client.id.toString()}>
                      {client.name}
                      {client.company && ` – ${client.company}`}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Scenario Selector */}
            <div className="flex items-center gap-2">
              {scenarios.map((scenario) => (
                <Button
                  key={scenario}
                  variant={selectedScenario === scenario ? "default" : "outline"}
                  size="sm"
                  className={cn(
                    "rounded-full",
                    selectedScenario === scenario 
                      ? "bg-gold hover:bg-gold-dark text-navy" 
                      : "bg-white"
                  )}
                  onClick={() => setSelectedScenario(scenario)}
                >
                  {scenario}
                </Button>
              ))}
            </div>
          </div>

          {/* Right: Actions */}
          <div className="flex items-center gap-3">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setAssumptionsOpen(true)}
              className="bg-white"
            >
              <Settings className="h-4 w-4 mr-2" />
              Assumptions
            </Button>
            <div className="flex items-center gap-2">
              <Label htmlFor="presentation-mode" className="text-sm text-muted-foreground">
                Presentation Mode
              </Label>
              <Switch
                id="presentation-mode"
                checked={presentationMode}
                onCheckedChange={setPresentationMode}
              />
        </div>
        <Button className="bg-gold hover:bg-gold-dark text-navy">
          <Download className="h-4 w-4 mr-2" />
          Export Report
        </Button>
          </div>
        </div>
      </div>

      {/* Tab Bar - Pill Style */}
      <Tabs value={selectedTab} onValueChange={setSelectedTab} className="space-y-6">
        <TabsList className="bg-muted/50 p-1 rounded-lg inline-flex h-auto">
          <TabsTrigger 
            value="overview" 
            className="rounded-md data-[state=active]:bg-gold data-[state=active]:text-navy data-[state=active]:font-semibold"
          >
            Tax Efficiency Overview
          </TabsTrigger>
          <TabsTrigger 
            value="location"
            className="rounded-md data-[state=active]:bg-gold data-[state=active]:text-navy data-[state=active]:font-semibold"
          >
            Asset Location
          </TabsTrigger>
          <TabsTrigger 
            value="withdrawal"
            className="rounded-md data-[state=active]:bg-gold data-[state=active]:text-navy data-[state=active]:font-semibold"
          >
            Withdrawal Planner
          </TabsTrigger>
          <TabsTrigger 
            value="impact"
            className="rounded-md data-[state=active]:bg-gold data-[state=active]:text-navy data-[state=active]:font-semibold"
          >
            Value Demonstration
          </TabsTrigger>
        </TabsList>

        {/* Filter Bar - Shared across all tabs */}
        {!presentationMode && (
          <div className="flex items-center gap-4 flex-wrap p-4 bg-white rounded-lg border border-grayNeutral shadow-sm">
            <Select value={taxYear} onValueChange={setTaxYear}>
              <SelectTrigger className="w-32 bg-white">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="2024">2024</SelectItem>
                <SelectItem value="2025">2025</SelectItem>
                <SelectItem value="multi-year">Multi-year</SelectItem>
              </SelectContent>
            </Select>

            <Select value={filingStatus} onValueChange={setFilingStatus}>
              <SelectTrigger className="w-40 bg-white">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Single">Single</SelectItem>
                <SelectItem value="MFJ">MFJ</SelectItem>
                <SelectItem value="MFS">MFS</SelectItem>
                <SelectItem value="HOH">HOH</SelectItem>
              </SelectContent>
            </Select>

            <div className="flex items-center gap-2 border-r pr-4">
              <Button
                variant={householdType === "Household" ? "default" : "ghost"}
                size="sm"
                className={householdType === "Household" ? "bg-gold hover:bg-gold-dark text-navy" : ""}
                onClick={() => setHouseholdType("Household")}
              >
                Household
              </Button>
              <Button
                variant={householdType === "Individual" ? "default" : "ghost"}
                size="sm"
                className={householdType === "Individual" ? "bg-gold hover:bg-gold-dark text-navy" : ""}
                onClick={() => setHouseholdType("Individual")}
              >
                Individual
              </Button>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground">Accounts:</span>
              {["Taxable", "IRA", "Roth", "401(k)"].map((account) => (
                <Badge
                  key={account}
                  variant={selectedAccounts.includes(account) ? "default" : "outline"}
                  className={cn(
                    "cursor-pointer",
                    selectedAccounts.includes(account) 
                      ? "bg-gold text-navy hover:bg-gold-dark" 
                      : "bg-white"
                  )}
                  onClick={() => toggleAccount(account)}
                >
                  {account}
                </Badge>
              ))}
            </div>

            <Button
              variant="ghost"
              size="sm"
              className="ml-auto text-muted-foreground"
              onClick={() => {
                setTaxYear("2024");
                setFilingStatus("MFJ");
                setHouseholdType("Household");
                setSelectedAccounts(["Taxable", "IRA", "Roth", "401(k)"]);
              }}
            >
              Reset filters
            </Button>
          </div>
        )}

        {/* Tab 1: Tax Efficiency Overview */}
        <TabsContent value="overview" className="space-y-6">
          {/* Row 1: Two Cards */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Tax Efficiency Score Card (40-45% width) */}
            <div className="lg:col-span-5">
              <Card className="p-6 shadow-sm">
                <div className="text-center mb-4">
                  <h3 className="text-sm font-medium text-muted-foreground mb-2">Tax Efficiency Score</h3>
                  <div className="text-5xl font-bold text-navy mb-1">{metrics.score}</div>
                  <div className="text-sm text-muted-foreground mb-4">out of 100</div>
                  <div className="text-sm font-medium text-navy">{getEfficiencyLabel(metrics.score)}</div>
                </div>
                
                {/* Gauge */}
                <div className="my-6">
                  <TaxEfficiencyGauge score={metrics.score} />
                </div>

                {/* Metric Pills */}
                <div className="space-y-2 mt-6">
                  <div className="flex items-center justify-between p-2 bg-muted/50 rounded-md">
                    <span className="text-xs text-muted-foreground">Tax drag:</span>
                    <span className="text-sm font-semibold text-navy">{metrics.taxDrag} / yr</span>
                  </div>
                  <div className="flex items-center justify-between p-2 bg-muted/50 rounded-md">
                    <span className="text-xs text-muted-foreground">Realized gains YTD:</span>
                    <span className="text-sm font-semibold text-navy">{metrics.realizedGainsYTD}</span>
                  </div>
                  <div className="flex items-center justify-between p-2 bg-muted/50 rounded-md">
                    <span className="text-xs text-muted-foreground">Tax savings potential:</span>
                    <span className="text-sm font-semibold text-gold">{metrics.taxSavingsPotential}</span>
                    <span className="text-xs text-muted-foreground">over {metrics.taxSavingsPeriod}</span>
                  </div>
                </div>
              </Card>
            </div>
            
            {/* Top Tax Opportunities Card (55-60% width) */}
            <div className="lg:col-span-7">
              <Card className="p-6 shadow-sm">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-navy">Top Tax Opportunities</h3>
                </div>

                {/* Filter Chips */}
                <div className="flex items-center gap-2 mb-4 flex-wrap">
                  {opportunityCategories.map((category) => (
                    <Button
                      key={category}
                      variant={selectedCategory === category ? "default" : "ghost"}
                      size="sm"
                      className={cn(
                        "rounded-full text-xs h-7",
                        selectedCategory === category 
                          ? "bg-gold hover:bg-gold-dark text-navy" 
                          : "bg-white hover:bg-muted"
                      )}
                      onClick={() => setSelectedCategory(category)}
                    >
                      {category}
                    </Button>
                  ))}
                </div>

                {/* Opportunities List */}
                <div className="space-y-2">
                  {filteredOpportunities.map((opp) => {
                    const Icon = iconMap[opp.icon];
                    return (
                      <div
                        key={opp.id}
                        className="flex items-start gap-3 p-3 rounded-lg hover:bg-muted/50 transition-colors cursor-pointer group"
                        onClick={() => handleOpportunityClick(opp)}
                      >
                        <div className="p-2 bg-gold/10 rounded-md flex-shrink-0">
                          <Icon className="h-4 w-4 text-gold" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-foreground mb-1">{opp.title}</p>
                          <p className="text-xs text-muted-foreground mb-2">{opp.rationale}</p>
                          <div className="flex items-center gap-4 text-xs">
                            <span className="text-green-600 font-semibold">{opp.impact}</span>
                            <span className="text-muted-foreground">Confidence: {opp.confidence}%</span>
                          </div>
                        </div>
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          className="text-gold hover:text-gold-dark flex-shrink-0"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleOpportunityClick(opp);
                          }}
                        >
                          View
                        </Button>
                      </div>
                    );
                  })}
                </div>
              </Card>
            </div>
          </div>

          {/* Row 2: Key Figures Card (full width) */}
          <Card className="p-6 shadow-sm">
            <h3 className="text-lg font-semibold text-navy mb-4">Key Tax Figures</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              {[
                { label: "Filing Status", value: filingStatus, tooltip: "Current tax filing status" },
                { label: "Marginal Rate", value: "24%", tooltip: "Highest tax bracket applicable" },
                { label: "Effective Rate", value: "18.2%", tooltip: "Average tax rate on total income" },
                { label: "Capital Gains Bracket", value: "15%", tooltip: "Tax rate on long-term capital gains" },
                { label: "NIIT Threshold Room", value: "$37,000", tooltip: "Remaining income before Net Investment Income Tax applies" },
                { label: "QBI eligibility", value: "Partial", tooltip: "Qualified Business Income deduction eligibility" },
              ].map((stat, idx) => (
                <div key={idx} className="space-y-1">
                  <div className="flex items-center gap-1">
                    <span className="text-xs text-muted-foreground">{stat.label}</span>
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Info className="h-3 w-3 text-muted-foreground cursor-help" />
                        </TooltipTrigger>
                        <TooltipContent>
                          <p className="text-xs">{stat.tooltip}</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </div>
                  <div className="text-lg font-bold text-navy">{stat.value}</div>
                </div>
              ))}
            </div>
          </Card>
        </TabsContent>

        {/* Tab 2: Asset Location */}
        <TabsContent value="location" className="space-y-6">
          {/* Row 1: Intro + Metrics */}
          <Card className="p-6 shadow-sm">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Left: Intro */}
              <div>
                <h3 className="text-xl font-semibold text-navy mb-3">Optimize Asset Placement</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Strategic asset location involves placing tax-inefficient assets (like bonds and REITs) in tax-advantaged accounts 
                  (IRA, 401(k), Roth) while keeping tax-efficient assets (like growth stocks and municipal bonds) in taxable accounts. 
                  This reduces annual tax drag and maximizes after-tax returns over time.
                </p>
              </div>
              
              {/* Right: Metrics */}
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 bg-muted/50 rounded-md">
                  <span className="text-sm text-muted-foreground">Current tax drag:</span>
                  <span className="text-lg font-bold text-navy">1.12% / yr</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-green-50 rounded-md border border-green-200">
                  <span className="text-sm text-muted-foreground">Optimized tax drag:</span>
                  <span className="text-lg font-bold text-green-700">0.63% / yr</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-gold/10 rounded-md border border-gold/20">
                  <span className="text-sm text-muted-foreground">Potential improvement:</span>
                  <span className="text-lg font-bold text-gold">$18,700 / yr</span>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setTaxDragModalOpen(true)}
                  className="text-xs text-muted-foreground hover:text-navy"
                >
                  <Info className="h-3 w-3 mr-1" />
                  How riAI calculates tax drag
                    </Button>
              </div>
            </div>
          </Card>
            
          {/* Row 2: Asset Location Heatmap */}
          <Card className="p-6 shadow-sm">
            <h3 className="text-lg font-semibold text-navy mb-4">Asset Location Heatmap</h3>
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
                  {assetLocationData.map((row, i) => (
                    <tr 
                      key={i} 
                      className="border-b hover:bg-muted/30 transition-colors cursor-pointer"
                      onClick={() => {
                        setSelectedRow(row.asset);
                        setRowDetailOpen(true);
                      }}
                    >
                      <td className="p-3 font-medium">{row.asset}</td>
                      {["taxable", "ira", "roth", "401k"].map((account) => {
                        const score = row[account as keyof typeof row] as string;
                        return (
                          <td key={account} className="p-3">
                            <TooltipProvider>
                              <Tooltip>
                                <TooltipTrigger asChild>
                                  <div
                                    className={cn(
                                      "h-10 rounded-full flex items-center justify-center text-xs font-medium cursor-pointer transition-all hover:scale-105",
                              score === "high"
                                        ? "bg-green-100 border-2 border-green-400 text-green-800"
                                : score === "medium"
                                        ? "bg-yellow-100 border-2 border-yellow-400 text-yellow-800"
                                        : "bg-red-100 border-2 border-red-400 text-red-800"
                                    )}
                                  >
                                    {score === "high" ? "Ideal" : score === "medium" ? "Acceptable" : "Sub-optimal"}
                                  </div>
                                </TooltipTrigger>
                                <TooltipContent>
                                  <p className="text-xs max-w-xs">{row.tooltip}</p>
                                </TooltipContent>
                              </Tooltip>
                            </TooltipProvider>
                        </td>
                        );
                      })}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>

          {/* Row 3: Swap Suggestions */}
          <Card className="p-6 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-navy">Swap Suggestions</h3>
              <span className="text-xs text-muted-foreground">Ranked by Impact</span>
            </div>
            
            {/* Filter Chips */}
            <div className="flex items-center gap-2 mb-4 flex-wrap">
              {["All", ">$1k/yr benefit", "Low capital gain cost", "Quick wins"].map((filter) => (
                <Button
                  key={filter}
                  variant={swapFilter === filter ? "default" : "ghost"}
                  size="sm"
                  className={cn(
                    "rounded-full text-xs h-7",
                    swapFilter === filter 
                      ? "bg-gold hover:bg-gold-dark text-navy" 
                      : "bg-white hover:bg-muted"
                  )}
                  onClick={() => setSwapFilter(filter)}
                >
                  {filter}
                </Button>
              ))}
            </div>

            {/* Suggestions List */}
            <div className="space-y-3">
              {swapSuggestions.map((suggestion) => (
                <div
                  key={suggestion.id}
                  className="flex items-start gap-4 p-4 rounded-lg border border-grayNeutral hover:border-gold/30 transition-colors"
                >
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-foreground mb-1">{suggestion.title}</p>
                    <p className="text-xs text-muted-foreground">{suggestion.description}</p>
                  </div>
                  <div className="flex items-center gap-2 flex-shrink-0">
                    <div className="flex flex-col items-end gap-1 text-xs">
                      <Badge variant="outline" className="text-xs">Impact: {suggestion.impact}</Badge>
                      <Badge variant="outline" className="text-xs">Ease: {suggestion.ease}</Badge>
                      <span className="text-green-600 font-semibold">{suggestion.netBenefit}</span>
                    </div>
                    <Button
                      size="sm"
                      className="bg-gold hover:bg-gold-dark text-navy"
                      onClick={() => console.log("Create trade ticket for:", suggestion.id)}
                    >
                      Create Trade Ticket
                    </Button>
                  </div>
                </div>
              ))}
              </div>
            </Card>

          {/* Row 4: Advisor Notes */}
          <Card className="p-6 shadow-sm">
            <h3 className="text-lg font-semibold text-navy mb-4">Advisor Notes & Exceptions</h3>
            <Textarea
              placeholder="Add notes about client preferences, constraints, or exceptions..."
              value={advisorNotes}
              onChange={(e) => setAdvisorNotes(e.target.value)}
              className="min-h-[100px] mb-4"
            />
            <div className="space-y-2">
              <Label className="text-sm font-medium">Exclude from future suggestions:</Label>
              {holdingsData.map((holding) => (
                <div key={holding.name} className="flex items-center gap-2">
                  <Checkbox
                    checked={excludedHoldings.includes(holding.name)}
                    onCheckedChange={(checked) => {
                      if (checked) {
                        setExcludedHoldings([...excludedHoldings, holding.name]);
                      } else {
                        setExcludedHoldings(excludedHoldings.filter(h => h !== holding.name));
                      }
                    }}
                  />
                  <Label className="text-sm font-normal cursor-pointer">
                    {holding.name} ({holding.account})
                  </Label>
                </div>
              ))}
            </div>
          </Card>
        </TabsContent>

        {/* Tab 3: Withdrawal Planner */}
        <TabsContent value="withdrawal" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Left Column: Input Cards (~35-40%) */}
            <div className="lg:col-span-5 space-y-6">
              {/* Client & Assumptions Card */}
              <Card className="p-6 shadow-sm">
                <h3 className="text-lg font-semibold text-navy mb-4">Client & Assumptions</h3>
              <div className="space-y-4">
                <div>
                    <Label className="text-sm font-medium mb-2 block">Age</Label>
                    <div className="space-y-2">
                      <Slider
                        value={[age]}
                        onValueChange={(vals) => setAge(vals[0])}
                        min={40}
                        max={90}
                        step={1}
                        className="w-full"
                      />
                      <Input
                        type="number"
                        value={age}
                        onChange={(e) => setAge(Number(e.target.value))}
                        className="w-full"
                      />
                    </div>
                  </div>
                  <div>
                    <Label className="text-sm font-medium mb-2 block">Retirement Age</Label>
                    <div className="space-y-2">
                      <Slider
                        value={[retirementAge]}
                        onValueChange={(vals) => setRetirementAge(vals[0])}
                        min={55}
                        max={75}
                        step={1}
                        className="w-full"
                      />
                      <Input
                        type="number"
                        value={retirementAge}
                        onChange={(e) => setRetirementAge(Number(e.target.value))}
                        className="w-full"
                      />
                    </div>
                </div>
                <div>
                    <Label className="text-sm font-medium mb-2 block">Life Expectancy</Label>
                    <Select value={lifeExpectancy} onValueChange={setLifeExpectancy}>
                      <SelectTrigger className="w-full bg-white">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="IRS">IRS Table</SelectItem>
                        <SelectItem value="custom">Custom</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </Card>

              {/* Account Balances Card */}
              <Card className="p-6 shadow-sm">
                <h3 className="text-lg font-semibold text-navy mb-4">Account Balances</h3>
              <div className="space-y-4">
                <div>
                    <Label className="text-sm font-medium mb-2 block">Taxable Balance</Label>
                    <Input
                      type="number"
                      value={taxableBalance}
                      onChange={(e) => setTaxableBalance(Number(e.target.value))}
                      className="w-full"
                      placeholder="$0"
                    />
                  </div>
                  <div>
                    <Label className="text-sm font-medium mb-2 block">Traditional IRA Balance</Label>
                    <Input
                      type="number"
                      value={traditionalIRABalance}
                      onChange={(e) => setTraditionalIRABalance(Number(e.target.value))}
                      className="w-full"
                      placeholder="$0"
                    />
                  </div>
                  <div>
                    <Label className="text-sm font-medium mb-2 block">Roth IRA Balance</Label>
                    <Input
                      type="number"
                      value={rothIRABalance}
                      onChange={(e) => setRothIRABalance(Number(e.target.value))}
                      className="w-full"
                      placeholder="$0"
                    />
                  </div>
                  <div>
                    <Label className="text-sm font-medium mb-2 block">401(k) Balance (optional)</Label>
                    <Input
                      type="number"
                      value={balance401k}
                      onChange={(e) => setBalance401k(Number(e.target.value))}
                      className="w-full"
                      placeholder="$0"
                    />
                  </div>
                </div>
              </Card>

              {/* Strategy Controls Card */}
              <Card className="p-6 shadow-sm">
                <h3 className="text-lg font-semibold text-navy mb-4">Strategy Controls</h3>
                <div className="space-y-4">
                <div>
                    <Label className="text-sm font-medium mb-2 block">Strategy Template</Label>
                    <Select value={strategyTemplate} onValueChange={setStrategyTemplate}>
                      <SelectTrigger className="w-full bg-white">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="minimize-lifetime">Minimize lifetime tax</SelectItem>
                        <SelectItem value="bracket-management">Bracket management (fill 24%)</SelectItem>
                        <SelectItem value="maximize-roth">Maximize Roth legacy</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-3">
                    <div className="flex items-center gap-2">
                      <Checkbox
                        checked={includeSocialSecurity}
                        onCheckedChange={setIncludeSocialSecurity}
                      />
                      <Label className="text-sm cursor-pointer">Include Social Security</Label>
                    </div>
                    <div className="flex items-center gap-2">
                      <Checkbox
                        checked={includeRMDRules}
                        onCheckedChange={setIncludeRMDRules}
                      />
                      <Label className="text-sm cursor-pointer">Include RMD rules</Label>
                    </div>
                    <div className="flex items-center gap-2">
                      <Checkbox
                        checked={showIRMAA}
                        onCheckedChange={setShowIRMAA}
                      />
                      <Label className="text-sm cursor-pointer">Show Medicare IRMAA thresholds</Label>
                    </div>
                  </div>
                  <Button className="w-full bg-gold hover:bg-gold-dark text-navy">
                    Run Plan
                  </Button>
                </div>
              </Card>
            </div>

            {/* Right Column: Charts + Summary (~60-65%) */}
            <div className="lg:col-span-7 space-y-6">
              {/* Main Chart */}
              <Card className="p-6 shadow-sm">
                <h3 className="text-lg font-semibold text-navy mb-4">Income & Tax Rate vs Age</h3>
                <div className="h-[500px] w-full mb-4">
              <ResponsiveContainer width="100%" height="100%">
                <ComposedChart
                  data={[
                    { age: 45, income: 120, marginalRate: 22, bracket: "22%" },
                    { age: 50, income: 125, marginalRate: 22, bracket: "22%" },
                    { age: 55, income: 130, marginalRate: 24, bracket: "24%" },
                    { age: 60, income: 135, marginalRate: 24, bracket: "24%" },
                    { age: 65, income: 140, marginalRate: 22, bracket: "22%" },
                    { age: 70, income: 145, marginalRate: 22, bracket: "22%" },
                    { age: 75, income: 150, marginalRate: 24, bracket: "24%" },
                    { age: 80, income: 155, marginalRate: 24, bracket: "24%" },
                    { age: 85, income: 160, marginalRate: 22, bracket: "22%" },
                  ]}
                  margin={{ top: 20, right: 50, left: 60, bottom: 40 }}
                >
                  <defs>
                    <linearGradient id="incomeGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="#3b82f6" stopOpacity={0.05} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" opacity={0.5} />
                  <XAxis 
                    dataKey="age" 
                    stroke="#6b7280"
                    style={{ fontSize: '11px', fontWeight: 500 }}
                    tick={{ fill: '#6b7280' }}
                    label={{ value: 'Age', position: 'insideBottom', offset: -10, style: { textAnchor: 'middle', fill: '#374151', fontSize: '12px', fontWeight: 600 } }}
                  />
                  <YAxis 
                    yAxisId="left"
                    stroke="#3b82f6"
                    style={{ fontSize: '11px', fontWeight: 500 }}
                    tick={{ fill: '#3b82f6' }}
                    width={55}
                    label={{ value: 'Income ($k)', angle: -90, position: 'insideLeft', offset: -10, style: { textAnchor: 'middle', fill: '#3b82f6', fontSize: '12px', fontWeight: 600 } }}
                  />
                  <YAxis 
                    yAxisId="right"
                    orientation="right"
                    stroke="#d4af37"
                    style={{ fontSize: '11px', fontWeight: 500 }}
                    tick={{ fill: '#d4af37' }}
                    domain={[0, 35]}
                    width={50}
                    label={{ value: 'Tax Rate (%)', angle: 90, position: 'insideRight', offset: -5, style: { textAnchor: 'middle', fill: '#d4af37', fontSize: '12px', fontWeight: 600 } }}
                  />
                  <RechartsTooltip
                    formatter={(value: number, name: string) => {
                      if (name === 'income') return [`$${value}k`, 'Annual Income'];
                      if (name === 'marginalRate') return [`${value}%`, 'Effective Marginal Rate'];
                      return [value, name];
                    }}
                    labelFormatter={(label) => `Age ${label}`}
                    contentStyle={{
                      backgroundColor: 'white',
                      border: '1px solid #e5e7eb',
                      borderRadius: '6px',
                      boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
                    }}
                  />
                  <Legend 
                    wrapperStyle={{ paddingTop: '20px', paddingBottom: '10px' }}
                    iconType="line"
                    formatter={(value) => {
                      if (value === 'income') return 'Annual Income';
                      if (value === 'marginalRate') return 'Effective Marginal Rate';
                      return value;
                    }}
                  />
                  <ReferenceLine 
                    yAxisId="right" 
                    y={10} 
                    stroke="#22c55e" 
                    strokeDasharray="3 3" 
                    strokeWidth={1.5}
                    label={{ 
                      value: "10%", 
                      position: "right", 
                      fill: "#22c55e", 
                      fontSize: 9,
                      fontWeight: 600,
                      offset: 5
                    }} 
                  />
                  <ReferenceLine 
                    yAxisId="right" 
                    y={12} 
                    stroke="#84cc16" 
                    strokeDasharray="3 3"
                    strokeWidth={1.5}
                    label={{ 
                      value: "12%", 
                      position: "right", 
                      fill: "#84cc16", 
                      fontSize: 9,
                      fontWeight: 600,
                      offset: 5
                    }} 
                  />
                  <ReferenceLine 
                    yAxisId="right" 
                    y={22} 
                    stroke="#eab308" 
                    strokeDasharray="3 3"
                    strokeWidth={1.5}
                    label={{ 
                      value: "22%", 
                      position: "right", 
                      fill: "#eab308", 
                      fontSize: 9,
                      fontWeight: 600,
                      offset: 5
                    }} 
                  />
                  <ReferenceLine 
                    yAxisId="right" 
                    y={24} 
                    stroke="#f59e0b" 
                    strokeDasharray="3 3"
                    strokeWidth={1.5}
                    label={{ 
                      value: "24%", 
                      position: "right", 
                      fill: "#f59e0b", 
                      fontSize: 9,
                      fontWeight: 600,
                      offset: 5
                    }} 
                  />
                  {/* Vertical markers for key ages */}
                  {includeSocialSecurity && (
                    <ReferenceLine 
                      x={62} 
                      stroke="#3b82f6" 
                      strokeDasharray="2 2"
                      strokeWidth={2}
                      label={{ 
                        value: "SS Start", 
                        position: "top", 
                        fill: "#3b82f6", 
                        fontSize: 9,
                        fontWeight: 600
                      }} 
                    />
                  )}
                  <ReferenceLine 
                    x={retirementAge} 
                    stroke="#d4af37" 
                    strokeDasharray="2 2"
                    strokeWidth={2}
                    label={{ 
                      value: "Retirement", 
                      position: "top", 
                      fill: "#d4af37", 
                      fontSize: 9,
                      fontWeight: 600
                    }} 
                  />
                  {includeRMDRules && (
                    <ReferenceLine 
                      x={73} 
                      stroke="#ef4444" 
                      strokeDasharray="2 2"
                      strokeWidth={2}
                      label={{ 
                        value: "First RMD", 
                        position: "top", 
                        fill: "#ef4444", 
                        fontSize: 9,
                        fontWeight: 600
                      }} 
                    />
                  )}
                  <ReferenceLine 
                    yAxisId="right" 
                    y={32} 
                    stroke="#ef4444" 
                    strokeDasharray="3 3"
                    strokeWidth={1.5}
                    label={{ 
                      value: "32%", 
                      position: "right", 
                      fill: "#ef4444", 
                      fontSize: 9,
                      fontWeight: 600,
                      offset: 5
                    }} 
                  />
                  
                  <Area
                    yAxisId="left"
                    type="monotone"
                    dataKey="income"
                    stroke="#3b82f6"
                    strokeWidth={2.5}
                    fillOpacity={0.6}
                    fill="url(#incomeGradient)"
                    name="income"
                  />
                  
                  <Line
                    yAxisId="right"
                    type="monotone"
                    dataKey="marginalRate"
                    stroke="#d4af37"
                    strokeWidth={3}
                    dot={{ fill: '#d4af37', r: 5, strokeWidth: 2, stroke: '#fff' }}
                    activeDot={{ r: 7, strokeWidth: 2, stroke: '#fff' }}
                    name="marginalRate"
                  />
                </ComposedChart>
              </ResponsiveContainer>
            </div>

                </ResponsiveContainer>
                </div>
              </Card>

              {/* Key Years Table */}
              <Card className="p-6 shadow-sm">
                <h3 className="text-lg font-semibold text-navy mb-4">Key Years</h3>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left p-2 font-medium">Year</th>
                        <th className="text-left p-2 font-medium">Age</th>
                        <th className="text-right p-2 font-medium">Total Income</th>
                        <th className="text-right p-2 font-medium">Tax</th>
                        <th className="text-right p-2 font-medium">Marginal</th>
                        <th className="text-right p-2 font-medium">Roth Conv.</th>
                        <th className="text-right p-2 font-medium">Cap Gains</th>
                        <th className="text-left p-2 font-medium">Notes</th>
                      </tr>
                    </thead>
                    <tbody>
                      {[
                        { year: 2024, age: 45, income: 120000, tax: 18000, marginal: "22%", roth: 0, capGains: 5000, notes: "", highlight: false },
                        { year: 2029, age: 50, income: 125000, tax: 19000, marginal: "22%", roth: 0, capGains: 6000, notes: "", highlight: false },
                        { year: 2034, age: 55, income: 130000, tax: 21000, marginal: "24%", roth: 0, capGains: 7000, notes: "Bracket jump", highlight: true },
                        { year: 2039, age: 60, income: 135000, tax: 22000, marginal: "24%", roth: 0, capGains: 8000, notes: "", highlight: false },
                        { year: 2044, age: 65, income: 140000, tax: 20000, marginal: "22%", roth: 25000, capGains: 9000, notes: "Retirement", highlight: true },
                        { year: 2049, age: 70, income: 145000, tax: 21000, marginal: "22%", roth: 0, capGains: 10000, notes: "", highlight: false },
                        { year: 2054, age: 75, income: 150000, tax: 23000, marginal: "24%", roth: 0, capGains: 11000, notes: "IRMAA triggered", highlight: true },
                      ].map((row, i) => (
                        <tr 
                          key={i} 
                          className={cn(
                            "border-b",
                            row.highlight && "bg-amber-50 font-semibold"
                          )}
                        >
                          <td className="p-2">{row.year}</td>
                          <td className="p-2">{row.age}</td>
                          <td className="p-2 text-right">${(row.income / 1000).toFixed(0)}k</td>
                          <td className="p-2 text-right">${(row.tax / 1000).toFixed(0)}k</td>
                          <td className="p-2 text-right">{row.marginal}</td>
                          <td className="p-2 text-right">{row.roth > 0 ? `$${(row.roth / 1000).toFixed(0)}k` : "-"}</td>
                          <td className="p-2 text-right">${(row.capGains / 1000).toFixed(0)}k</td>
                          <td className="p-2">
                            {row.notes && (
                              <Badge variant="outline" className="text-xs">
                                {row.notes}
                              </Badge>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </Card>

              {/* Strategy Summary */}
              <Card className="p-6 shadow-sm">
                <h3 className="text-lg font-semibold text-navy mb-4">Strategy Summary</h3>
                <div className="space-y-4">
                  <div>
                    <p className="text-sm text-muted-foreground mb-2">Strategy Explanation:</p>
                    <ul className="text-sm space-y-1 list-disc list-inside text-foreground">
                      <li>Convert ~$25k/yr to Roth from ages 63–66 to fill 22% bracket and avoid higher future RMDs</li>
                      <li>Withdraw from Traditional IRA strategically to stay within 22% bracket</li>
                      <li>Delay Social Security until age 70 to maximize benefits</li>
                      <li>Harvest capital gains in low-income years</li>
                    </ul>
                  </div>
                  <div className="grid grid-cols-3 gap-4 pt-4 border-t">
                    <div>
                      <p className="text-xs text-muted-foreground mb-1">Baseline lifetime tax</p>
                      <p className="text-lg font-bold text-navy">$1.32M</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground mb-1">Strategy lifetime tax</p>
                      <p className="text-lg font-bold text-green-700">$1.18M</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground mb-1">Estimated reduction</p>
                      <p className="text-lg font-bold text-gold">$140k</p>
                      <p className="text-xs text-muted-foreground">(present value)</p>
                    </div>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </TabsContent>

        {/* Tab 4: Value Demonstration - Keep existing for now */}
        <TabsContent value="impact" className="space-y-6">
          <Card className="p-6">
            <h3 className="text-xl font-semibold mb-6">Tax Optimization Impact Visualization</h3>
            
            {/* Before vs After Area Chart */}
            <div className="h-96 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart
                  data={[
                    { year: 2024, before: 2.0, after: 2.0 },
                    { year: 2026, before: 2.1, after: 2.15 },
                    { year: 2028, before: 2.2, after: 2.35 },
                    { year: 2030, before: 2.3, after: 2.5 },
                    { year: 2032, before: 2.4, after: 2.65 },
                    { year: 2034, before: 2.5, after: 2.8 },
                    { year: 2036, before: 2.6, after: 2.95 },
                    { year: 2038, before: 2.7, after: 3.1 },
                    { year: 2040, before: 2.75, after: 3.2 },
                    { year: 2042, before: 2.78, after: 3.25 },
                    { year: 2044, before: 2.79, after: 3.27 },
                    { year: 2045, before: 2.8, after: 3.28 },
                  ]}
                  margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                >
                  <defs>
                    <linearGradient id="colorBefore" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#1e3a5f" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="#1e3a5f" stopOpacity={0.05} />
                    </linearGradient>
                    <linearGradient id="colorAfter" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#d4af37" stopOpacity={0.4} />
                      <stop offset="95%" stopColor="#d4af37" stopOpacity={0.1} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                  <XAxis 
                    dataKey="year" 
                    stroke="#6b7280"
                    style={{ fontSize: '12px' }}
                  />
                  <YAxis 
                    stroke="#6b7280"
                    style={{ fontSize: '12px' }}
                    tickFormatter={(value) => `$${value.toFixed(1)}M`}
                  />
                  <RechartsTooltip
                    formatter={(value: number) => [`$${value.toFixed(2)}M`, '']}
                    labelFormatter={(label) => `Year ${label}`}
                    contentStyle={{
                      backgroundColor: 'white',
                      border: '1px solid #e5e7eb',
                      borderRadius: '6px',
                    }}
                  />
                  <Legend 
                    wrapperStyle={{ paddingTop: '20px' }}
                    formatter={(value) => {
                      if (value === 'before') return 'Before Optimization';
                      if (value === 'after') return 'After Optimization';
                      return value;
                    }}
                  />
                  <Area
                    type="monotone"
                    dataKey="before"
                    stroke="#1e3a5f"
                    strokeWidth={2}
                    fillOpacity={1}
                    fill="url(#colorBefore)"
                    name="before"
                  />
                  <Area
                    type="monotone"
                    dataKey="after"
                    stroke="#d4af37"
                    strokeWidth={2}
                    fillOpacity={1}
                    fill="url(#colorAfter)"
                    name="after"
                  />
                </AreaChart>
              </ResponsiveContainer>
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

      {/* Assumptions Dialog */}
      <Dialog open={assumptionsOpen} onOpenChange={setAssumptionsOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Tax Assumptions</DialogTitle>
            <DialogDescription>
              Configure the assumptions used for tax calculations and projections.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <p className="text-sm text-muted-foreground">
              Assumptions configuration will be implemented here. This is a placeholder for the assumptions modal.
            </p>
            {/* TODO: Add assumption inputs */}
          </div>
        </DialogContent>
      </Dialog>

      {/* Opportunity Detail Drawer */}
      <Sheet open={opportunityDrawerOpen} onOpenChange={setOpportunityDrawerOpen}>
        <SheetContent side="right" className="w-full sm:max-w-lg overflow-y-auto">
          {selectedOpportunity && (
            <>
              <SheetHeader>
                <div className="flex items-center gap-2">
                  {(() => {
                    const Icon = iconMap[selectedOpportunity.icon];
                    return (
                      <div className="p-2 bg-gold/10 rounded-md">
                        <Icon className="h-5 w-5 text-gold" />
                      </div>
                    );
                  })()}
                  <SheetTitle>{selectedOpportunity.title}</SheetTitle>
                </div>
                <SheetDescription>
                  <Badge variant="outline" className="mt-2">
                    {selectedOpportunity.category}
                  </Badge>
                </SheetDescription>
              </SheetHeader>

              <div className="space-y-6 mt-6">
                {/* Before vs After Mini Chart */}
                <div>
                  <h4 className="text-sm font-semibold mb-3">Before vs After</h4>
                  <div className="h-48 w-full">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart
                        data={[
                          { name: "Before", value: 2.8 },
                          { name: "After", value: 3.1 },
                        ]}
                        margin={{ top: 10, right: 10, left: 10, bottom: 10 }}
                      >
                        <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                        <XAxis dataKey="name" stroke="#6b7280" style={{ fontSize: '11px' }} />
                        <YAxis 
                          stroke="#6b7280"
                          style={{ fontSize: '11px' }}
                          tickFormatter={(value) => `$${value.toFixed(1)}M`}
                        />
                        <RechartsTooltip
                          formatter={(value: number) => [`$${value.toFixed(2)}M`, '']}
                          contentStyle={{
                            backgroundColor: 'white',
                            border: '1px solid #e5e7eb',
                            borderRadius: '6px',
                          }}
                        />
                        <Bar 
                          dataKey="value" 
                          fill="#1e3a5f"
                          radius={[4, 4, 0, 0]}
                        />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </div>

                {/* Implementation Steps */}
                <div>
                  <h4 className="text-sm font-semibold mb-3">Implementation Steps</h4>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-start gap-2">
                      <span className="text-gold mt-0.5">•</span>
                      <span>Review current asset allocation across account types</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-gold mt-0.5">•</span>
                      <span>Identify high-yield bond positions in taxable accounts</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-gold mt-0.5">•</span>
                      <span>Execute transfer of $150k to IRA account</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-gold mt-0.5">•</span>
                      <span>Monitor tax impact and adjust as needed</span>
                    </li>
                  </ul>
                </div>

                {/* Assumptions */}
                <div>
                  <h4 className="text-sm font-semibold mb-3">Assumptions</h4>
                  <div className="text-sm text-muted-foreground space-y-1">
                    <p>• Assumes current tax brackets remain stable</p>
                    <p>• Based on projected income and filing status</p>
                    <p>• Does not account for future tax law changes</p>
                  </div>
                </div>

                {/* Status */}
                <div>
                  <h4 className="text-sm font-semibold mb-3">Status</h4>
                  <Select defaultValue="planned">
                    <SelectTrigger className="w-full bg-white">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="planned">Planned</SelectItem>
                      <SelectItem value="in-progress">In Progress</SelectItem>
                      <SelectItem value="implemented">Implemented</SelectItem>
                      <SelectItem value="dismissed">Dismissed</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </>
          )}
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default TaxDashboard;
