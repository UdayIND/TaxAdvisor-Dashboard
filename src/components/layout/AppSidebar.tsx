import {
  Users,
  CheckSquare,
  Calendar,
  TrendingUp,
  FileText,
  LayoutDashboard,
  ChevronDown,
  Scale,
  DollarSign,
  Receipt,
  BarChart3,
  Eye,
  FileText as FileTextIcon,
  RefreshCw,
  TrendingUp as TrendingUpIcon,
  Grid3x3,
  Wallet,
  Sprout,
  Bell,
  CircleUser,
} from "lucide-react";
import { NavLink } from "@/components/NavLink";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubItem,
  SidebarMenuSubButton,
  useSidebar,
} from "@/components/ui/sidebar";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";

const mainItems = [
  { title: "Dashboard", url: "/", icon: LayoutDashboard },
  { title: "Balances", url: "/balances", icon: Scale },
  { title: "Cash Positioning", url: "/cash-positioning", icon: DollarSign },
  { title: "Transactions", url: "/transactions", icon: Receipt },
  { title: "Analysis", url: "/analysis", icon: BarChart3 },
  { title: "Insights", url: "/insights", icon: Eye },
  { title: "Reports", url: "/reports", icon: FileTextIcon },
  { title: "Reconciliation", url: "/reconciliation", icon: RefreshCw },
  { title: "Forecasts", url: "/forecasts", icon: TrendingUpIcon },
  { title: "Workbooks", url: "/workbooks", icon: Grid3x3 },
];

const paymentsSubItems = [
  { title: "Workflows", url: "/payments/workflows" },
  { title: "Templates", url: "/payments/templates" },
  { title: "Accounts", url: "/payments/accounts" },
];

const aiFeaturesItems = [
  { title: "IPS Generator", url: "/ips-generator" },
  { title: "Tax Opportunities", url: "/tax-dashboard" },
];

const additionalItems = [
  { title: "Clients / Contacts", url: "/clients", icon: Users },
  { title: "Tasks & Workflows", url: "/tasks", icon: CheckSquare },
  { title: "Meetings & Calendar", url: "/calendar", icon: Calendar },
  { title: "Opportunities", url: "/opportunities", icon: TrendingUp },
  { title: "Files", url: "/files", icon: FileText },
  { title: "Investments", url: "/investments", icon: Sprout },
  { title: "Notifications", url: "/notifications", icon: Bell },
  { title: "Treasury Workstation", url: "/treasury-workstation", icon: CircleUser },
];

export const AppSidebar = () => {
  const { open: sidebarOpen } = useSidebar();

  return (
    <Sidebar collapsible="icon">
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {mainItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink to={item.url} end>
                      <item.icon className="h-4 w-4" />
                      <span>{item.title}</span>
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
              
              {/* Payments with sub-items */}
              <Collapsible className="group/collapsible">
                <SidebarMenuItem>
                  <CollapsibleTrigger asChild>
                    <SidebarMenuButton>
                      <Wallet className="h-4 w-4" />
                      <span>Payments</span>
                      <ChevronDown className="ml-auto h-4 w-4 transition-transform group-data-[state=open]/collapsible:rotate-180" />
                    </SidebarMenuButton>
                  </CollapsibleTrigger>
                  <CollapsibleContent>
                    <SidebarMenuSub>
                      {paymentsSubItems.map((item) => (
                        <SidebarMenuSubItem key={item.title}>
                          <SidebarMenuSubButton asChild>
                            <NavLink to={item.url}>
                              <span>{item.title}</span>
                            </NavLink>
                          </SidebarMenuSubButton>
                        </SidebarMenuSubItem>
                      ))}
                    </SidebarMenuSub>
                  </CollapsibleContent>
                </SidebarMenuItem>
              </Collapsible>

              {/* AI Features */}
              <Collapsible defaultOpen className="group/collapsible">
                <SidebarMenuItem>
                  <CollapsibleTrigger asChild>
                    <SidebarMenuButton>
                      <LayoutDashboard className="h-4 w-4" />
                      <span>AI Features</span>
                      <ChevronDown className="ml-auto h-4 w-4 transition-transform group-data-[state=open]/collapsible:rotate-180" />
                    </SidebarMenuButton>
                  </CollapsibleTrigger>
                  <CollapsibleContent>
                    <SidebarMenuSub>
                      {aiFeaturesItems.map((item) => (
                        <SidebarMenuSubItem key={item.title}>
                          <SidebarMenuSubButton asChild>
                            <NavLink to={item.url}>
                              <span>{item.title}</span>
                            </NavLink>
                          </SidebarMenuSubButton>
                        </SidebarMenuSubItem>
                      ))}
                    </SidebarMenuSub>
                  </CollapsibleContent>
                </SidebarMenuItem>
              </Collapsible>

              {additionalItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink to={item.url} end>
                      <item.icon className="h-4 w-4" />
                      <span>{item.title}</span>
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
};
