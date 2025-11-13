import { useState } from "react";
import { Search, Bell, HelpCircle, MoreVertical } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Logo } from "@/components/Logo";

export const TopBar = () => {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <div className="h-16 border-b border-navy/20 bg-navy flex items-center shadow-sm px-4 relative">
      {/* Left: Sidebar Toggle & Logo */}
      <div className="flex items-center gap-3 flex-shrink-0 z-10">
        <SidebarTrigger className="text-gold hover:text-gold hover:bg-navy/50 h-8 w-8 p-2" />
        <Logo showText={false} />
      </div>

      {/* Center: Search Bar */}
      <div className="absolute left-1/2 transform -translate-x-1/2 w-full max-w-2xl px-4 z-0">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gold/70 z-10" />
          <Input
            placeholder="Search clients, accounts, tools..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 pr-4 h-9 bg-navy/50 border-gold/30 text-gold placeholder:text-gold/50 focus-visible:ring-gold focus-visible:border-gold w-full"
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                // Handle search
                console.log("Searching for:", searchQuery);
              }
            }}
          />
        </div>
      </div>

      {/* Right: Action Icons */}
      <div className="flex items-center gap-2 flex-shrink-0 ml-auto z-10">
        <Button variant="ghost" size="icon" className="relative text-gold hover:text-gold hover:bg-navy/50">
          <Bell className="h-5 w-5" />
          <span className="absolute top-1 right-1 w-2 h-2 bg-danger rounded-full" />
        </Button>
        
        <Button variant="ghost" size="icon" className="text-gold hover:text-gold hover:bg-navy/50">
          <HelpCircle className="h-5 w-5" />
        </Button>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="text-gold hover:text-gold hover:bg-navy/50">
              <MoreVertical className="h-5 w-5" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-48">
            <DropdownMenuItem>Invite Users</DropdownMenuItem>
            <DropdownMenuItem>Settings</DropdownMenuItem>
            <DropdownMenuItem>Applications</DropdownMenuItem>
            <DropdownMenuItem>Help Center</DropdownMenuItem>
            <DropdownMenuItem>Subscribe</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="text-destructive">Logout</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        <Avatar className="h-8 w-8 bg-gold">
          <AvatarFallback className="bg-gold text-navy text-sm font-semibold">JC</AvatarFallback>
        </Avatar>
      </div>
    </div>
  );
};
