import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronLeft, ChevronRight, Plus, Calendar as CalendarIcon } from "lucide-react";
import { format, startOfMonth, endOfMonth, eachDayOfInterval, isSameMonth, isToday, startOfWeek, endOfWeek } from "date-fns";

const Calendar = () => {
  const [currentDate, setCurrentDate] = useState(new Date(2025, 10, 1)); // November 2025
  const [view, setView] = useState<"month" | "week" | "day">("month");
  
  const [selectAllUsers, setSelectAllUsers] = useState(true);
  const [selectAllCategories, setSelectAllCategories] = useState(true);
  const [categories, setCategories] = useState({
    uncategorized: true,
    meeting: true,
    clientReview: true,
    prospectIntroduction: true,
    socialEvent: true,
    conference: true,
  });
  const [otherCalendars, setOtherCalendars] = useState({
    specialDates: false,
    usHolidays: false,
  });

  const monthStart = startOfMonth(currentDate);
  const monthEnd = endOfMonth(currentDate);
  const calendarStart = startOfWeek(monthStart);
  const calendarEnd = endOfWeek(monthEnd);
  const days = eachDayOfInterval({ start: calendarStart, end: calendarEnd });

  const goToPreviousMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
  };

  const goToNextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
  };

  const goToToday = () => {
    setCurrentDate(new Date());
  };

  const weekDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return (
    <div className="p-8 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-navy">Calendar</h1>
        <div className="flex items-center gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline">Options</Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>Settings</DropdownMenuItem>
              <DropdownMenuItem>Export</DropdownMenuItem>
              <DropdownMenuItem>Import</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <Button className="bg-success hover:bg-success/90 text-white">
            <Plus className="h-4 w-4 mr-2" />
            Create Meeting
          </Button>
          <Button className="bg-success hover:bg-success/90 text-white">
            <Plus className="h-4 w-4 mr-2" />
            Add Event
          </Button>
        </div>
      </div>

      <div className="flex gap-6">
        {/* Main Calendar Area */}
        <div className="flex-1 space-y-4">
          {/* Calendar Navigation */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Button variant="outline" size="icon" onClick={goToPreviousMonth}>
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <Button variant="outline" onClick={goToToday}>
                Today
              </Button>
              <Button variant="outline" size="icon" onClick={goToNextMonth}>
                <ChevronRight className="h-4 w-4" />
              </Button>
              <h2 className="text-xl font-semibold text-navy ml-4">
                {format(currentDate, "MMMM yyyy")}
              </h2>
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant={view === "month" ? "default" : "outline"}
                size="sm"
                onClick={() => setView("month")}
              >
                month
              </Button>
              <Button
                variant={view === "week" ? "default" : "outline"}
                size="sm"
                onClick={() => setView("week")}
              >
                week
              </Button>
              <Button
                variant={view === "day" ? "default" : "outline"}
                size="sm"
                onClick={() => setView("day")}
              >
                day
              </Button>
            </div>
          </div>

          {/* Calendar Grid */}
          <Card className="p-6">
            <div className="grid grid-cols-7 gap-1">
              {/* Week Day Headers */}
              {weekDays.map((day) => (
                <div key={day} className="text-center text-sm font-semibold text-navy p-2">
                  {day}
                </div>
              ))}

              {/* Calendar Days */}
              {days.map((day, index) => {
                const isCurrentMonth = isSameMonth(day, currentDate);
                const isTodayDate = isToday(day);
                const isHighlighted = day.getDate() === 12 && day.getMonth() === 10; // November 12

                return (
                  <div
                    key={index}
                    className={`min-h-[80px] p-2 border border-grayNeutral rounded ${
                      !isCurrentMonth ? "bg-muted/30 text-muted-foreground" : "bg-white"
                    } ${isTodayDate ? "bg-accent/50" : ""}`}
                  >
                    <div
                      className={`text-sm font-medium mb-1 ${
                        isHighlighted
                          ? "inline-flex items-center justify-center w-6 h-6 rounded-full bg-danger text-white"
                          : ""
                      }`}
                    >
                      {format(day, "d")}
                    </div>
                    {/* Event slots can be added here */}
                  </div>
                );
              })}
            </div>
          </Card>
        </div>

        {/* Right Sidebar */}
        <div className="w-80 space-y-4">
          <Card className="p-4">
            <Tabs defaultValue="calendars" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="calendars">Calendars</TabsTrigger>
                <TabsTrigger value="tasks">Tasks</TabsTrigger>
              </TabsList>

              <TabsContent value="calendars" className="space-y-6 mt-4">
                {/* USERS Section */}
                <div>
                  <h3 className="text-xs font-semibold text-muted-foreground uppercase mb-3">
                    USERS
                  </h3>
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="select-all-users"
                        checked={selectAllUsers}
                        onCheckedChange={(checked) => setSelectAllUsers(checked as boolean)}
                      />
                      <label
                        htmlFor="select-all-users"
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        Select All
                      </label>
                    </div>
                  </div>
                </div>

                {/* EVENT CATEGORIES Section */}
                <div>
                  <h3 className="text-xs font-semibold text-muted-foreground uppercase mb-3">
                    EVENT CATEGORIES
                  </h3>
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="select-all-categories"
                        checked={selectAllCategories}
                        onCheckedChange={(checked) => {
                          setSelectAllCategories(checked as boolean);
                          setCategories({
                            uncategorized: checked as boolean,
                            meeting: checked as boolean,
                            clientReview: checked as boolean,
                            prospectIntroduction: checked as boolean,
                            socialEvent: checked as boolean,
                            conference: checked as boolean,
                          });
                        }}
                      />
                      <label
                        htmlFor="select-all-categories"
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        Select All
                      </label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="uncategorized"
                        checked={categories.uncategorized}
                        onCheckedChange={(checked) =>
                          setCategories({ ...categories, uncategorized: checked as boolean })
                        }
                      />
                      <label
                        htmlFor="uncategorized"
                        className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        Uncategorized
                      </label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="meeting"
                        checked={categories.meeting}
                        onCheckedChange={(checked) =>
                          setCategories({ ...categories, meeting: checked as boolean })
                        }
                      />
                      <label
                        htmlFor="meeting"
                        className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        Meeting
                      </label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="client-review"
                        checked={categories.clientReview}
                        onCheckedChange={(checked) =>
                          setCategories({ ...categories, clientReview: checked as boolean })
                        }
                      />
                      <label
                        htmlFor="client-review"
                        className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        Client Review
                      </label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="prospect-introduction"
                        checked={categories.prospectIntroduction}
                        onCheckedChange={(checked) =>
                          setCategories({ ...categories, prospectIntroduction: checked as boolean })
                        }
                      />
                      <label
                        htmlFor="prospect-introduction"
                        className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        Prospect Introduction
                      </label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="social-event"
                        checked={categories.socialEvent}
                        onCheckedChange={(checked) =>
                          setCategories({ ...categories, socialEvent: checked as boolean })
                        }
                      />
                      <label
                        htmlFor="social-event"
                        className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        Social Event
                      </label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="conference"
                        checked={categories.conference}
                        onCheckedChange={(checked) =>
                          setCategories({ ...categories, conference: checked as boolean })
                        }
                      />
                      <label
                        htmlFor="conference"
                        className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        Conference
                      </label>
                    </div>
                  </div>
                </div>

                {/* OTHER CALENDARS Section */}
                <div>
                  <h3 className="text-xs font-semibold text-muted-foreground uppercase mb-3">
                    OTHER CALENDARS
                  </h3>
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="special-dates"
                        checked={otherCalendars.specialDates}
                        onCheckedChange={(checked) =>
                          setOtherCalendars({ ...otherCalendars, specialDates: checked as boolean })
                        }
                      />
                      <label
                        htmlFor="special-dates"
                        className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        Special Dates
                      </label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="us-holidays"
                        checked={otherCalendars.usHolidays}
                        onCheckedChange={(checked) =>
                          setOtherCalendars({ ...otherCalendars, usHolidays: checked as boolean })
                        }
                      />
                      <label
                        htmlFor="us-holidays"
                        className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        US Holidays
                      </label>
                    </div>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="tasks" className="mt-4">
                <p className="text-sm text-muted-foreground">Tasks content goes here</p>
              </TabsContent>
            </Tabs>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Calendar;

