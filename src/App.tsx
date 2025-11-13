import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { SidebarProvider } from "@/components/ui/sidebar";
import { TopBar } from "@/components/layout/TopBar";
import { AppSidebar } from "@/components/layout/AppSidebar";
import Dashboard from "./pages/Dashboard";
import TaxDashboard from "./pages/TaxDashboard";
import IPSGenerator from "./pages/IPSGenerator";
import Clients from "./pages/Clients";
import Calendar from "./pages/Calendar";
import Files from "./pages/Files";
import Opportunities from "./pages/Opportunities";
import Tasks from "./pages/Tasks";
import Balances from "./pages/Balances";
import CashPositioning from "./pages/CashPositioning";
import Transactions from "./pages/Transactions";
import Analysis from "./pages/Analysis";
import Insights from "./pages/Insights";
import Reports from "./pages/Reports";
import Reconciliation from "./pages/Reconciliation";
import Forecasts from "./pages/Forecasts";
import Workbooks from "./pages/Workbooks";
import PaymentsWorkflows from "./pages/PaymentsWorkflows";
import PaymentsTemplates from "./pages/PaymentsTemplates";
import PaymentsAccounts from "./pages/PaymentsAccounts";
import Investments from "./pages/Investments";
import Notifications from "./pages/Notifications";
import TreasuryWorkstation from "./pages/TreasuryWorkstation";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <SidebarProvider>
          <div className="min-h-screen flex w-full flex-col">
            <div className="fixed top-0 left-0 right-0 z-50">
              <TopBar />
            </div>
            <div className="flex flex-1 w-full pt-16">
              <AppSidebar />
              <main className="flex-1 overflow-auto">
                <Routes>
                  <Route path="/" element={<Dashboard />} />
                  <Route path="/balances" element={<Balances />} />
                  <Route path="/cash-positioning" element={<CashPositioning />} />
                  <Route path="/transactions" element={<Transactions />} />
                  <Route path="/analysis" element={<Analysis />} />
                  <Route path="/insights" element={<Insights />} />
                  <Route path="/reports" element={<Reports />} />
                  <Route path="/reconciliation" element={<Reconciliation />} />
                  <Route path="/forecasts" element={<Forecasts />} />
                  <Route path="/workbooks" element={<Workbooks />} />
                  <Route path="/payments/workflows" element={<PaymentsWorkflows />} />
                  <Route path="/payments/templates" element={<PaymentsTemplates />} />
                  <Route path="/payments/accounts" element={<PaymentsAccounts />} />
                  <Route path="/tax-dashboard" element={<TaxDashboard />} />
                  <Route path="/ips-generator" element={<IPSGenerator />} />
                  <Route path="/clients" element={<Clients />} />
                  <Route path="/tasks" element={<Tasks />} />
                  <Route path="/calendar" element={<Calendar />} />
                  <Route path="/opportunities" element={<Opportunities />} />
                  <Route path="/projects" element={<Dashboard />} />
                  <Route path="/files" element={<Files />} />
                  <Route path="/investments" element={<Investments />} />
                  <Route path="/notifications" element={<Notifications />} />
                  <Route path="/treasury-workstation" element={<TreasuryWorkstation />} />
                  {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </main>
            </div>
          </div>
        </SidebarProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
