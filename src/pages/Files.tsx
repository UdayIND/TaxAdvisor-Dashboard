import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Plus, ChevronDown, FileText } from "lucide-react";

const Files = () => {
  const [selectedCategory, setSelectedCategory] = useState("All Categories");

  return (
    <div className="p-8 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-navy">Files</h1>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button className="bg-success hover:bg-success/90 text-white">
              <Plus className="h-4 w-4 mr-2" />
              Attach File
              <ChevronDown className="h-4 w-4 ml-2" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem>Upload File</DropdownMenuItem>
            <DropdownMenuItem>Create Folder</DropdownMenuItem>
            <DropdownMenuItem>Import from Cloud</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* Main Content Area */}
      <Card className="p-8 min-h-[600px]">
        {/* Content Header */}
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-bold text-navy">Files</h2>
          <Select value={selectedCategory} onValueChange={setSelectedCategory}>
            <SelectTrigger className="w-48">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="All Categories">All Categories</SelectItem>
              <SelectItem value="Client">Client</SelectItem>
              <SelectItem value="Compliance">Compliance</SelectItem>
              <SelectItem value="Corporate">Corporate</SelectItem>
              <SelectItem value="Legal">Legal</SelectItem>
              <SelectItem value="Marketing">Marketing</SelectItem>
              <SelectItem value="Operations">Operations</SelectItem>
              <SelectItem value="Prospect">Prospect</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Empty State */}
        <div className="flex flex-col items-center justify-center h-[400px] text-center">
          <div className="mb-6">
            <FileText className="h-24 w-24 text-muted-foreground/30" />
          </div>
          <p className="text-lg text-muted-foreground">
            To get started, attach a file.
          </p>
        </div>
      </Card>
    </div>
  );
};

export default Files;

