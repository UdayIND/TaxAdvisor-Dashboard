import { useState } from "react";
import { Search, Bell, HelpCircle, MoreVertical, ChevronDown } from "lucide-react";
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
import {
  Dialog,
  DialogContent,
} from "@/components/ui/dialog";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Logo } from "@/components/Logo";

export const TopBar = () => {
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <div className="h-16 border-b border-navy/20 bg-navy flex items-center gap-6 shadow-sm pr-4">
      {/* Sidebar Toggle & Logo */}
      <div className="flex items-center gap-3 pl-2">
        <SidebarTrigger className="text-gold hover:text-gold hover:bg-navy/50 h-8 w-8 p-2" />
        <Logo showText={false} />
      </div>

      {/* Right Actions */}
      <div className="flex items-center gap-2 ml-auto mr-2">
        {/* Search Icon Button */}
        <Button
          variant="ghost"
          size="icon"
          className="text-gold hover:text-gold hover:bg-navy/50"
          onClick={() => setSearchOpen(true)}
        >
          <Search className="h-5 w-5" />
        </Button>

        {/* Search Dialog */}
        <Dialog open={searchOpen} onOpenChange={setSearchOpen}>
          <DialogContent className="sm:max-w-4xl p-0 gap-0 top-16 left-1/2 -translate-x-1/2 translate-y-0 [&>button]:hidden rounded-none border-t-0">
            <div className="flex items-center w-full px-6 py-6 bg-white">
              <Search className="h-6 w-6 text-muted-foreground mr-4 flex-shrink-0" />
              <Input
                placeholder="Search clients, accounts, tools..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="flex-1 border-0 focus-visible:ring-0 text-lg h-12 px-0"
                autoFocus
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    // Handle search
                    setSearchOpen(false);
                  }
                }}
              />
              <Button
                className="bg-gold hover:bg-gold-dark text-navy ml-4 px-6 h-12 flex-shrink-0"
                onClick={() => {
                  // Handle search
                  setSearchOpen(false);
                }}
              >
                SEARCH
              </Button>
            </div>
          </DialogContent>
        </Dialog>
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

        <Avatar className="h-8 w-8 bg-gold ml-2">
          <AvatarFallback className="bg-gold text-navy text-sm font-semibold">JC</AvatarFallback>
        </Avatar>
      </div>
    </div>
  );
};
