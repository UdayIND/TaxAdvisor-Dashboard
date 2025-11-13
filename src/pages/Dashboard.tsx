import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ExternalLink, Search, Sparkles } from "lucide-react";

const Dashboard = () => {
  const [aiQuery, setAiQuery] = useState("");

  const quickLinks = [
    {
      name: "Wealthbox",
      url: "https://wealthbox.com/login",
      image: "/wealthbox-logo.png",
    },
    {
      name: "Right Capital",
      url: "https://rightcapital.com/login",
      image: "/Rightcapital logo.png",
    },
    {
      name: "Charles Schwab",
      url: "https://client.schwab.com/login",
      image: "/Charles_Schwab_Corporation_logo.png",
    },
    {
      name: "Black Diamond",
      url: "https://blackdiamond.com/login",
      image: "/black-diamond-logo.png",
    },
  ];

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-10">
      {/* AI Assistant Search Bar */}
      <section className="flex flex-col items-center justify-center py-12">
        <div className="w-full max-w-3xl">
          <div className="text-center mb-6">
            <div className="flex items-center justify-center gap-2 mb-2">
              <Sparkles className="h-6 w-6 text-gold" />
              <h1 className="text-3xl font-bold text-navy">riAI Assistant</h1>
            </div>
            <p className="text-muted-foreground text-sm">
              Ask me anything to help you with your tasks
            </p>
          </div>
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gold/70" />
            <Input
              placeholder="Ask riAI Assistant to do things for you..."
              value={aiQuery}
              onChange={(e) => setAiQuery(e.target.value)}
              className="pl-12 pr-24 h-14 text-lg bg-white border-2 border-gold/30 text-navy placeholder:text-muted-foreground focus-visible:ring-2 focus-visible:ring-gold focus-visible:border-gold shadow-lg"
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  // Handle AI query
                  console.log("AI Query:", aiQuery);
                  // TODO: Implement AI assistant functionality
                }
              }}
            />
            <Button
              className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-gold hover:bg-gold-dark text-navy h-10 px-6"
              onClick={() => {
                console.log("AI Query:", aiQuery);
                // TODO: Implement AI assistant functionality
              }}
            >
              Ask
            </Button>
          </div>
        </div>
      </section>

      {/* Quick Links Section */}
      <section>
        <h2 className="text-2xl font-bold text-navy mb-6">Quick Links</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {quickLinks.map((link) => (
            <Card
              key={link.name}
              className="p-4 hover:shadow-soft transition-all duration-fast cursor-pointer group border border-grayNeutral hover:border-gold/30"
              onClick={() => window.open(link.url, "_blank")}
            >
              <div className="flex flex-col items-center text-center space-y-1.5">
                <div className="mb-0.5 transform group-hover:scale-110 transition-transform duration-fast flex items-center justify-center h-12 w-full">
                  <img
                    src={link.image}
                    alt={link.name}
                    className="max-h-12 max-w-full object-contain"
                  />
                </div>
                <div className="flex items-center gap-1.5 text-xs text-textLight group-hover:text-gold transition-colors duration-fast">
                  <span>Login</span>
                  <ExternalLink className="h-3 w-3" />
                </div>
              </div>
            </Card>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Dashboard;
