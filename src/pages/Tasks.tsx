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
import { Plus, CheckCircle2 } from "lucide-react";

const Tasks = () => {
  const [filterBy, setFilterBy] = useState("Upcoming");
  const [taskFilter, setTaskFilter] = useState("Tasks");
  const [assignedTo, setAssignedTo] = useState("Jasmine Christopher");
  const [category, setCategory] = useState("All Categories");

  return (
    <div className="p-8 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-navy">Tasks</h1>
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
            Add Task
          </Button>
        </div>
      </div>

      {/* Filtering Bar */}
      <div className="flex items-center gap-3 flex-wrap">
        <span className="text-sm text-muted-foreground">Filtering by</span>
        <Select value={filterBy} onValueChange={setFilterBy}>
          <SelectTrigger className="w-32">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Upcoming">Upcoming</SelectItem>
            <SelectItem value="Today">Today</SelectItem>
            <SelectItem value="This Week">This Week</SelectItem>
            <SelectItem value="Overdue">Overdue</SelectItem>
            <SelectItem value="All">All</SelectItem>
          </SelectContent>
        </Select>

        <Select value={taskFilter} onValueChange={setTaskFilter}>
          <SelectTrigger className="w-32">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Tasks">Tasks</SelectItem>
            <SelectItem value="Completed">Completed</SelectItem>
            <SelectItem value="Archived">Archived</SelectItem>
          </SelectContent>
        </Select>

        <span className="text-sm text-muted-foreground">assigned to</span>
        <Select value={assignedTo} onValueChange={setAssignedTo}>
          <SelectTrigger className="w-48">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Jasmine Christopher">Jasmine Christopher</SelectItem>
            <SelectItem value="All Users">All Users</SelectItem>
            <SelectItem value="Unassigned">Unassigned</SelectItem>
          </SelectContent>
        </Select>

        <span className="text-sm text-muted-foreground">in category</span>
        <Select value={category} onValueChange={setCategory}>
          <SelectTrigger className="w-40">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="All Categories">All Categories</SelectItem>
            <SelectItem value="Client Review">Client Review</SelectItem>
            <SelectItem value="Compliance">Compliance</SelectItem>
            <SelectItem value="Administrative">Administrative</SelectItem>
            <SelectItem value="Follow-up">Follow-up</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Empty State */}
      <Card className="p-12 min-h-[500px] flex flex-col items-center justify-center">
        <div className="mb-4">
          <CheckCircle2 className="h-16 w-16 text-muted-foreground/30" />
        </div>
        <p className="text-lg text-muted-foreground">
          No tasks match the selected criteria.
        </p>
      </Card>
    </div>
  );
};

export default Tasks;

