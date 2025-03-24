
import { useState } from "react";
import { CalendarDays, Clock, Filter } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import AttendanceRow from "@/components/AttendanceRow";

const Attendance = () => {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [view, setView] = useState<"list" | "calendar">("list");
  const [classFilter, setClassFilter] = useState<string>("all");
  
  // Sample data - would come from API in real application
  const classes = [
    { id: "class1", name: "Mathematics 101", time: "09:00 AM - 10:30 AM", date: "Mon, Jun 12, 2023", status: "present" as const },
    { id: "class2", name: "Physics 102", time: "11:00 AM - 12:30 PM", date: "Mon, Jun 12, 2023", status: "present" as const },
    { id: "class3", name: "Chemistry 101", time: "02:00 PM - 03:30 PM", date: "Mon, Jun 12, 2023", status: "absent" as const },
    { id: "class4", name: "English Literature", time: "09:00 AM - 10:30 AM", date: "Tue, Jun 13, 2023", status: "pending" as const },
    { id: "class5", name: "Computer Science", time: "11:00 AM - 12:30 PM", date: "Tue, Jun 13, 2023", status: "pending" as const },
  ];
  
  const handleStatusChange = (id: string, status: "present" | "absent" | "pending") => {
    console.log(`Changed class ${id} status to ${status}`);
    // Would update API in real application
  };
  
  return (
    <div className="page-container">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
        <h1 className="text-2xl font-bold mb-4 md:mb-0 fade-in">Attendance Management</h1>
        
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="sm" className="flex items-center">
            <CalendarDays className="h-4 w-4 mr-2" />
            <span>{date ? date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) : 'Select date'}</span>
          </Button>
          
          <Button variant="outline" size="sm" className="flex items-center">
            <Filter className="h-4 w-4 mr-2" />
            <span>Filter</span>
          </Button>
        </div>
      </div>
      
      <div className="glass-card rounded-xl mb-6 p-5 animate-fade-in">
        <div className="flex flex-col md:flex-row md:items-center gap-4">
          <div className="flex-1">
            <label className="text-sm font-medium mb-1 block">Class</label>
            <Select value={classFilter} onValueChange={setClassFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Select class" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Classes</SelectItem>
                <SelectItem value="math">Mathematics</SelectItem>
                <SelectItem value="physics">Physics</SelectItem>
                <SelectItem value="chemistry">Chemistry</SelectItem>
                <SelectItem value="english">English</SelectItem>
                <SelectItem value="computer">Computer Science</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="w-full md:w-auto">
            <label className="text-sm font-medium mb-1 block">View</label>
            <Tabs defaultValue="list" className="w-full" value={view} onValueChange={(v) => setView(v as "list" | "calendar")}>
              <TabsList className="w-full">
                <TabsTrigger value="list" className="flex-1">List</TabsTrigger>
                <TabsTrigger value="calendar" className="flex-1">Calendar</TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
        </div>
      </div>
      
      <div className="glass-card rounded-xl p-5 animate-fade-in">
        <Tabs value={view} className="w-full">
          <TabsContent value="list" className="mt-0">
            <div className="space-y-3">
              {classes.map((cls) => (
                <AttendanceRow
                  key={cls.id}
                  id={cls.id}
                  className={cls.name}
                  time={cls.time}
                  date={cls.date}
                  status={cls.status}
                  onStatusChange={handleStatusChange}
                />
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="calendar" className="mt-0">
            <div className="flex flex-col md:flex-row gap-6">
              <div className="flex-shrink-0 w-full md:w-auto">
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={setDate}
                  className="rounded-md border shadow-sm"
                />
              </div>
              
              <div className="flex-1">
                <div className="mb-4 flex items-center justify-between">
                  <h3 className="text-lg font-medium">
                    {date?.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' })}
                  </h3>
                  <div className="text-sm text-muted-foreground flex items-center">
                    <Clock className="h-4 w-4 mr-1" />
                    <span>Attendance History</span>
                  </div>
                </div>
                
                <div className="space-y-3">
                  {classes.slice(0, 3).map((cls) => (
                    <AttendanceRow
                      key={cls.id}
                      id={cls.id}
                      className={cls.name}
                      time={cls.time}
                      date={cls.date}
                      status={cls.status}
                      onStatusChange={handleStatusChange}
                    />
                  ))}
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Attendance;
