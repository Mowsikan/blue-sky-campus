
import { useState } from "react";
import { Calendar, ChevronLeft, ChevronRight, Edit, Plus, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";

const Schedule = () => {
  const [currentView, setCurrentView] = useState<"week" | "day">("week");
  const [selectedDate, setSelectedDate] = useState(new Date());
  
  // Sample data for weekly schedule
  const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];
  const timeSlots = ["8:00 AM", "9:00 AM", "10:00 AM", "11:00 AM", "12:00 PM", "1:00 PM", "2:00 PM", "3:00 PM", "4:00 PM"];
  
  // Classes with their subject color
  const classes = [
    { id: 1, name: "Mathematics", day: "Monday", start: "9:00 AM", end: "10:30 AM", room: "101", teacher: "Prof. Smith", color: "bg-campus-blue-100 border-campus-blue-500 text-campus-blue-700" },
    { id: 2, name: "Physics", day: "Monday", start: "1:00 PM", end: "2:30 PM", room: "203", teacher: "Prof. Johnson", color: "bg-green-100 border-green-500 text-green-700" },
    { id: 3, name: "Chemistry", day: "Tuesday", start: "11:00 AM", end: "12:30 PM", room: "305", teacher: "Prof. Williams", color: "bg-purple-100 border-purple-500 text-purple-700" },
    { id: 4, name: "English", day: "Wednesday", start: "10:00 AM", end: "11:30 AM", room: "202", teacher: "Prof. Davis", color: "bg-amber-100 border-amber-500 text-amber-700" },
    { id: 5, name: "Computer Science", day: "Thursday", start: "2:00 PM", end: "3:30 PM", room: "405", teacher: "Prof. Brown", color: "bg-rose-100 border-rose-500 text-rose-700" },
    { id: 6, name: "History", day: "Friday", start: "8:00 AM", end: "9:30 AM", room: "102", teacher: "Prof. Miller", color: "bg-teal-100 border-teal-500 text-teal-700" },
  ];
  
  // Helper to get time slot position
  const getTimeSlotIndex = (time: string) => {
    return timeSlots.indexOf(time.split(":")[0] + ":00 " + time.split(" ")[1]);
  };
  
  // Previous and next week navigation
  const navigateWeek = (direction: 'prev' | 'next') => {
    const newDate = new Date(selectedDate);
    newDate.setDate(newDate.getDate() + (direction === 'next' ? 7 : -7));
    setSelectedDate(newDate);
  };
  
  // Format date for display
  const formatDateRange = () => {
    const currentDay = selectedDate.getDay(); // 0 = Sunday, 1 = Monday, etc.
    const mondayOffset = currentDay === 0 ? -6 : 1 - currentDay; // Calculate days until Monday
    
    const monday = new Date(selectedDate);
    monday.setDate(selectedDate.getDate() + mondayOffset);
    
    const friday = new Date(monday);
    friday.setDate(monday.getDate() + 4);
    
    const options: Intl.DateTimeFormatOptions = { month: 'short', day: 'numeric' };
    return `${monday.toLocaleDateString('en-US', options)} - ${friday.toLocaleDateString('en-US', options)}, ${friday.getFullYear()}`;
  };
  
  return (
    <div className="page-container">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
        <h1 className="text-2xl font-bold mb-4 md:mb-0 fade-in">Class Schedule</h1>
        
        <div className="flex items-center space-x-2">
          <Dialog>
            <DialogTrigger asChild>
              <Button size="sm" className="flex items-center">
                <Plus className="h-4 w-4 mr-2" />
                <span>Add Schedule</span>
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Add New Schedule</DialogTitle>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                {/* Form would go here */}
                <p className="text-sm text-muted-foreground">
                  Create a new class schedule by selecting the subject, day, time, and location.
                </p>
              </div>
            </DialogContent>
          </Dialog>
          
          <Select defaultValue="week" onValueChange={(value) => setCurrentView(value as "week" | "day")}>
            <SelectTrigger className="w-[130px]">
              <SelectValue placeholder="Select view" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="week">Week View</SelectItem>
              <SelectItem value="day">Day View</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      
      <div className="glass-card rounded-xl p-5 animate-fade-in overflow-hidden">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-2">
            <Button variant="outline" size="icon" onClick={() => navigateWeek('prev')}>
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <div className="text-lg font-medium">{formatDateRange()}</div>
            <Button variant="outline" size="icon" onClick={() => navigateWeek('next')}>
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
          
          <Button variant="outline" size="sm" className="flex items-center">
            <Calendar className="h-4 w-4 mr-2" />
            <span>Today</span>
          </Button>
        </div>
        
        <div className="overflow-x-auto">
          <div className="min-w-[800px]">
            <div className="grid grid-cols-[100px_repeat(5,1fr)] gap-1 mb-2">
              <div className="text-center text-sm text-muted-foreground py-2"></div>
              {days.map((day) => (
                <div key={day} className="text-center font-medium py-2">
                  {day}
                </div>
              ))}
            </div>
            
            <div className="grid grid-cols-[100px_repeat(5,1fr)] gap-1 relative">
              {/* Time slots */}
              {timeSlots.map((time) => (
                <div key={time} className="text-sm text-muted-foreground text-right pr-4 py-6">
                  {time}
                </div>
              ))}
              
              {/* Day columns */}
              {days.map((day) => (
                Array.from({ length: timeSlots.length }).map((_, index) => (
                  <div 
                    key={`${day}-${index}`} 
                    className="bg-secondary/50 border border-border/40 rounded-md h-14"
                  ></div>
                ))
              ))}
              
              {/* Classes */}
              {classes.map((cls) => {
                const dayIndex = days.indexOf(cls.day) + 1; // +1 for the time column
                const startIndex = getTimeSlotIndex(cls.start);
                const endIndex = getTimeSlotIndex(cls.end);
                const duration = endIndex - startIndex + 1;
                
                if (startIndex >= 0 && dayIndex > 0) {
                  return (
                    <div
                      key={cls.id}
                      className={cn(
                        "absolute rounded-md border-l-2 p-2 transition-all hover:shadow-sm",
                        cls.color
                      )}
                      style={{
                        gridColumn: dayIndex + 1,
                        gridRow: `span ${duration} / span ${duration}`,
                        top: `${startIndex * 3.5 + 0.5}rem`,
                        left: `${(dayIndex * 16.6) + 6.2}%`,
                        width: "calc(16% - 8px)",
                        height: `${duration * 3.5 - 0.5}rem`,
                        zIndex: 10
                      }}
                    >
                      <div className="flex flex-col h-full">
                        <div className="font-medium text-sm mb-1">{cls.name}</div>
                        <div className="text-xs opacity-90">Room {cls.room}</div>
                        <div className="text-xs opacity-90 mt-auto">{cls.start} - {cls.end}</div>
                      </div>
                      
                      <div className="absolute bottom-1 right-1 flex space-x-1">
                        <Button variant="ghost" size="icon" className="h-6 w-6 rounded-full opacity-70 hover:opacity-100 bg-white/30">
                          <Edit className="h-3 w-3" />
                        </Button>
                        <Button variant="ghost" size="icon" className="h-6 w-6 rounded-full opacity-70 hover:opacity-100 bg-white/30">
                          <Trash2 className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                  );
                }
                return null;
              })}
            </div>
          </div>
        </div>
      </div>
      
      <div className="mt-6 glass-card rounded-xl p-5 animate-fade-in">
        <h2 className="text-lg font-medium mb-4">Subject Legend</h2>
        <div className="flex flex-wrap gap-2">
          {Array.from(new Set(classes.map(c => c.name))).map((name, index) => {
            const cls = classes.find(c => c.name === name);
            return (
              <Badge key={index} className={cn("px-3 py-1", cls?.color)}>
                {name}
              </Badge>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Schedule;
