
import { useState } from "react";
import { CalendarDays, Clock, Filter, QrCode, UserCheck, Users } from "lucide-react";
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
import { Alert, AlertDescription } from "@/components/ui/alert";
import AttendanceRow from "@/components/AttendanceRow";
import QRScanner from "@/components/QRScanner";
import QRGenerator from "@/components/QRGenerator";
import { useToast } from "@/hooks/use-toast";

const Attendance = () => {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [view, setView] = useState<"list" | "calendar">("list");
  const [classFilter, setClassFilter] = useState<string>("all");
  const [userType, setUserType] = useState<"student" | "staff">("student");
  const [scannerOpen, setScannerOpen] = useState(false);
  const [attendanceMarked, setAttendanceMarked] = useState(false);
  const { toast } = useToast();
  
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
    toast({
      title: "Attendance Updated",
      description: `Marked ${status} for ${classes.find(c => c.id === id)?.name}`,
    });
  };
  
  const handleScanSuccess = () => {
    setAttendanceMarked(true);
    toast({
      title: "QR Code Valid",
      description: "You can now mark your attendance for today's classes.",
    });
  };
  
  return (
    <div className="page-container">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
        <h1 className="text-2xl font-bold mb-4 md:mb-0 fade-in">Attendance Management</h1>
        
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" className="flex items-center">
            <CalendarDays className="h-4 w-4 mr-2" />
            <span>{date ? date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) : 'Select date'}</span>
          </Button>
          
          <Button variant="outline" size="sm" className="flex items-center">
            <Filter className="h-4 w-4 mr-2" />
            <span>Filter</span>
          </Button>
          
          <Select value={userType} onValueChange={(value) => setUserType(value as "student" | "staff")}>
            <SelectTrigger className="w-[130px]">
              <SelectValue placeholder="View as" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="student">Student View</SelectItem>
              <SelectItem value="staff">Staff View</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      
      {userType === "student" ? (
        <div className="animate-fade-in">
          {!attendanceMarked ? (
            <div className="flex flex-col items-center justify-center py-16 glass-card rounded-xl">
              <div className="text-center mb-8">
                <QrCode className="h-24 w-24 mx-auto mb-6 text-primary animate-pulse-subtle" />
                <h2 className="text-2xl font-bold mb-3">QR Attendance System</h2>
                <p className="text-muted-foreground max-w-md mx-auto mb-8">
                  Scan the QR code displayed by your instructor to quickly mark your attendance for today's classes.
                </p>
                <Button size="lg" onClick={() => setScannerOpen(true)} className="animate-scale-in">
                  <QrCode className="h-5 w-5 mr-2" />
                  Scan QR Code to Mark Attendance
                </Button>
              </div>
            </div>
          ) : (
            <div className="space-y-4 animate-fade-in">
              <Alert className="bg-green-50 border-green-200 mb-6">
                <UserCheck className="h-5 w-5 text-green-600" />
                <AlertDescription className="text-green-700">
                  QR code successfully verified! Please mark your attendance for today's classes below.
                </AlertDescription>
              </Alert>
              
              <div className="glass-card rounded-xl mb-6 p-5">
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
              
              <div className="glass-card rounded-xl p-5">
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
          )}
          
          <QRScanner 
            open={scannerOpen} 
            onOpenChange={setScannerOpen} 
            onSuccess={handleScanSuccess} 
          />
        </div>
      ) : (
        // Staff View
        <div className="animate-fade-in">
          <div className="glass-card rounded-xl p-5 mb-6">
            <div className="flex flex-col md:flex-row gap-8">
              <div className="md:flex-1">
                <h2 className="text-xl font-bold mb-4">QR Code Generator</h2>
                <p className="text-muted-foreground mb-6">
                  Display this QR code to your students for them to scan and mark their attendance. The code automatically refreshes every 30 seconds for security.
                </p>
                <div className="flex flex-col sm:flex-row gap-3 mb-4">
                  <Select defaultValue="class1">
                    <SelectTrigger>
                      <SelectValue placeholder="Select class" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="class1">Mathematics 101</SelectItem>
                      <SelectItem value="class2">Physics 102</SelectItem>
                      <SelectItem value="class3">Chemistry 101</SelectItem>
                      <SelectItem value="class4">English Literature</SelectItem>
                      <SelectItem value="class5">Computer Science</SelectItem>
                    </SelectContent>
                  </Select>
                  
                  <Button>
                    <Users className="h-4 w-4 mr-2" />
                    View Attendance Report
                  </Button>
                </div>
              </div>
              
              <div className="md:flex-1 flex justify-center">
                <QRGenerator className="max-w-xs" />
              </div>
            </div>
          </div>
          
          <div className="glass-card rounded-xl p-5">
            <h3 className="text-lg font-medium mb-4">Today's Attendance Summary</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 rounded-lg bg-green-50 border border-green-100">
                <div className="text-2xl font-bold text-green-700">24</div>
                <div className="text-sm text-green-600">Present</div>
              </div>
              <div className="p-4 rounded-lg bg-red-50 border border-red-100">
                <div className="text-2xl font-bold text-red-700">3</div>
                <div className="text-sm text-red-600">Absent</div>
              </div>
              <div className="p-4 rounded-lg bg-amber-50 border border-amber-100">
                <div className="text-2xl font-bold text-amber-700">5</div>
                <div className="text-sm text-amber-600">Pending</div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Attendance;
