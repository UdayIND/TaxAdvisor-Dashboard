import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { CheckCircle2, Circle, ChevronRight, ExternalLink } from "lucide-react";
import { format, addDays, isWithinInterval } from "date-fns";

interface Task {
  id: number;
  title: string;
  completed: boolean;
  dueDate: Date;
}

const upcomingTasks: Task[] = [
  {
    id: 1,
    title: "Complete the signup tour",
    completed: true,
    dueDate: addDays(new Date(), 1),
  },
  {
    id: 2,
    title: "Add your profile photo",
    completed: false,
    dueDate: addDays(new Date(), 2),
  },
  {
    id: 3,
    title: "Connect your email",
    completed: false,
    dueDate: addDays(new Date(), 3),
  },
  {
    id: 4,
    title: "Invite team members",
    completed: false,
    dueDate: addDays(new Date(), 1),
  },
  {
    id: 5,
    title: "Import your contacts",
    completed: false,
    dueDate: addDays(new Date(), 2),
  },
];

const Dashboard = () => {
  const today = new Date();
  const threeDaysFromNow = addDays(today, 3);
  
  const tasksWithinThreeDays = upcomingTasks.filter((task) =>
    isWithinInterval(task.dueDate, { start: today, end: threeDaysFromNow })
  );

  const quickLinks = [
    {
      name: "Wealthbox",
      url: "https://wealthbox.com/login",
      icon: "💼",
    },
    {
      name: "Right Capital",
      url: "https://rightcapital.com/login",
      icon: "📊",
    },
    {
      name: "Charles Schwab",
      url: "https://client.schwab.com/login",
      icon: "🏦",
    },
    {
      name: "Black Diamond",
      url: "https://blackdiamond.com/login",
      icon: "💎",
    },
  ];

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-10">
      {/* Quick Links Section */}
      <section>
        <h2 className="text-2xl font-bold text-navy mb-6">Quick Links</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {quickLinks.map((link) => (
            <Card
              key={link.name}
              className="p-6 hover:shadow-soft transition-all duration-fast cursor-pointer group border border-grayNeutral hover:border-gold/30"
              onClick={() => window.open(link.url, "_blank")}
            >
              <div className="flex flex-col items-center text-center space-y-3">
                <div className="text-5xl mb-1 transform group-hover:scale-110 transition-transform duration-fast">
                  {link.icon}
                </div>
                <h3 className="font-semibold text-navy group-hover:text-gold transition-colors duration-fast text-base">
                  {link.name}
                </h3>
                <div className="flex items-center gap-1.5 text-xs text-textLight group-hover:text-gold transition-colors duration-fast">
                  <span>Login</span>
                  <ExternalLink className="h-3 w-3" />
                </div>
              </div>
            </Card>
          ))}
        </div>
      </section>

      {/* Tasks Section */}
      <section>
        <h2 className="text-2xl font-bold text-navy mb-6">Upcoming Tasks</h2>
        <Card className="p-6 border border-grayNeutral">
          {tasksWithinThreeDays.length > 0 ? (
            <div className="space-y-2">
              {tasksWithinThreeDays.map((task) => (
                <div
                  key={task.id}
                  className="flex items-center gap-3 p-3 rounded-lg hover:bg-grayNeutral/50 transition-colors duration-fast cursor-pointer group"
                >
                  <div className="flex-shrink-0">
                    {task.completed ? (
                      <CheckCircle2 className="h-5 w-5 text-success" />
                    ) : (
                      <Circle className="h-5 w-5 text-textLight group-hover:text-gold transition-colors duration-fast" />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p
                      className={`text-sm ${
                        task.completed
                          ? "text-textLight line-through"
                          : "text-textDark font-medium"
                      }`}
                    >
                      {task.title}
                    </p>
                    {!task.completed && (
                      <p className="text-xs text-textLight mt-0.5">
                        Due: {format(task.dueDate, "MMM d, yyyy")}
                      </p>
                    )}
                  </div>
                  <ChevronRight className="h-4 w-4 text-textLight group-hover:text-gold transition-colors duration-fast flex-shrink-0 opacity-0 group-hover:opacity-100" />
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <CheckCircle2 className="h-16 w-16 text-grayNeutral mx-auto mb-4" />
              <p className="text-textLight">No tasks due in the next 3 days</p>
            </div>
          )}
        </Card>
      </section>
    </div>
  );
};

export default Dashboard;
