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
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { MoreVertical } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface Contact {
  id: number;
  name: string;
  title?: string;
  company?: string;
  phone: string;
  phoneType: string;
  email: string;
  emailType: string;
  tags: string[];
}

const contacts: Contact[] = [
  {
    id: 1,
    name: "Kevin Anderson",
    title: "Senior VP",
    company: "Acme Tech",
    phone: "615-555-9876",
    phoneType: "Work",
    email: "kevin@acmeproducts.com",
    emailType: "Work",
    tags: ["Insurance", "Alternatives", "March Review", "Bonds"],
  },
  {
    id: 2,
    name: "William Jones",
    title: "VP",
    company: "Acme Tech",
    phone: "401-555-8535",
    phoneType: "Work",
    email: "wjones@acmetech.com",
    emailType: "Work",
    tags: ["Insurance", "Impact Investing", "Alternatives", "401k", "529 Plan"],
  },
  {
    id: 3,
    name: "Maria Keston",
    phone: "289-555-4251",
    phoneType: "Mobile",
    email: "kevin@acmeproducts.com",
    emailType: "Work",
    tags: ["Alternatives", "Golfer", "ETFs"],
  },
  {
    id: 4,
    name: "Kim Hasana",
    title: "CEO",
    company: "Acme Tech",
    phone: "615-555-8900",
    phoneType: "Work",
    email: "kim@acmetech.com",
    emailType: "Work",
    tags: ["Insurance", "401k", "529 Plan", "Alternatives", "Bonds", "Impact Investing", "Golfer", "March Review"],
  },
  {
    id: 5,
    name: "Steve Burke",
    title: "Senior VP",
    company: "Acme Tech",
    phone: "401-555-5656",
    phoneType: "Work",
    email: "steve@acmeproducts.com",
    emailType: "Work",
    tags: ["Insurance", "Alternatives", "March Review", "Impact Investing", "Bonds"],
  },
  {
    id: 6,
    name: "Beverly Davis",
    phone: "615-555-9678",
    phoneType: "Mobile",
    email: "bdavis@mail.com",
    emailType: "Personal",
    tags: ["401k", "529 Plan"],
  },
  {
    id: 7,
    name: "Steven Gerrard",
    phone: "401-555-6960",
    phoneType: "Work",
    email: "steven@rangerstech.com",
    emailType: "Work",
    tags: ["Insurance", "Impact Investing", "Alternatives"],
  },
];

const Clients = () => {
  const [selectedFilter, setSelectedFilter] = useState("All");
  const [selectedContacts, setSelectedContacts] = useState<number[]>([]);

  const toggleContact = (id: number) => {
    setSelectedContacts((prev) =>
      prev.includes(id) ? prev.filter((contactId) => contactId !== id) : [...prev, id]
    );
  };

  const toggleAll = () => {
    if (selectedContacts.length === contacts.length) {
      setSelectedContacts([]);
    } else {
      setSelectedContacts(contacts.map((c) => c.id));
    }
  };

  return (
    <div className="p-8 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <h1 className="text-3xl font-bold text-navy">Contacts</h1>
          <Select value={selectedFilter} onValueChange={setSelectedFilter}>
            <SelectTrigger className="w-32">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="All">All</SelectItem>
              <SelectItem value="People">People</SelectItem>
              <SelectItem value="Companies">Companies</SelectItem>
              <SelectItem value="Households">Households</SelectItem>
              <SelectItem value="Trusts">Trusts</SelectItem>
            </SelectContent>
          </Select>
          <span className="text-sm text-muted-foreground">({contacts.length})</span>
        </div>

        <div className="flex items-center gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm">
                Options
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>Export</DropdownMenuItem>
              <DropdownMenuItem>Import</DropdownMenuItem>
              <DropdownMenuItem>Settings</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      {/* Table */}
      <Card>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b bg-muted/50">
                <th className="text-left p-4 w-12">
                  <Checkbox
                    checked={selectedContacts.length === contacts.length}
                    onCheckedChange={toggleAll}
                  />
                </th>
                <th className="text-left p-4 font-semibold text-navy">Name</th>
                <th className="text-left p-4 font-semibold text-navy">Phone</th>
                <th className="text-left p-4 font-semibold text-navy">Email</th>
                <th className="text-left p-4 font-semibold text-navy">Tags</th>
                <th className="text-left p-4 w-12"></th>
              </tr>
            </thead>
            <tbody>
              {contacts.map((contact) => (
                <tr key={contact.id} className="border-b hover:bg-muted/30 transition-colors">
                  <td className="p-4">
                    <Checkbox
                      checked={selectedContacts.includes(contact.id)}
                      onCheckedChange={() => toggleContact(contact.id)}
                    />
                  </td>
                  <td className="p-4">
                    <div>
                      <a
                        href="#"
                        className="text-navy font-medium hover:text-gold transition-colors"
                      >
                        {contact.name}
                      </a>
                      {(contact.title || contact.company) && (
                        <p className="text-sm text-muted-foreground">
                          {contact.title && `${contact.title}`}
                          {contact.title && contact.company && " at "}
                          {contact.company}
                        </p>
                      )}
                    </div>
                  </td>
                  <td className="p-4">
                    <div>
                      <span className="text-foreground">{contact.phone}</span>
                      <span className="text-sm text-muted-foreground ml-2">
                        ({contact.phoneType})
                      </span>
                    </div>
                  </td>
                  <td className="p-4">
                    <div>
                      <a
                        href={`mailto:${contact.email}`}
                        className="text-navy hover:text-gold transition-colors"
                      >
                        {contact.email}
                      </a>
                      <span className="text-sm text-muted-foreground ml-2">
                        ({contact.emailType})
                      </span>
                    </div>
                  </td>
                  <td className="p-4">
                    <div className="flex flex-wrap gap-1.5">
                      {contact.tags.map((tag, index) => (
                        <Badge
                          key={index}
                          variant="outline"
                          className="bg-grayNeutral text-textDark border-grayNeutral hover:bg-grayNeutral/80 rounded-md px-2 py-0.5 text-xs font-normal"
                        >
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </td>
                  <td className="p-4">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <MoreVertical className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>View Details</DropdownMenuItem>
                        <DropdownMenuItem>Edit</DropdownMenuItem>
                        <DropdownMenuItem>Delete</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
};

export default Clients;

