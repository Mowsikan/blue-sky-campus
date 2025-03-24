
import { useState } from "react";
import { Filter, Search, UserPlus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import StudentCard from "@/components/StudentCard";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const Students = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [classFilter, setClassFilter] = useState<string>("all");
  const [selectedStudent, setSelectedStudent] = useState<any | null>(null);
  const [showStudentDetails, setShowStudentDetails] = useState(false);
  
  // Sample data - would come from API in real application
  const studentData = [
    { id: "std1", name: "Alex Johnson", photo: "", rollNumber: "STU-001", className: "Class A", attendancePercentage: 95 },
    { id: "std2", name: "Maria Garcia", photo: "", rollNumber: "STU-002", className: "Class A", attendancePercentage: 88 },
    { id: "std3", name: "David Smith", photo: "", rollNumber: "STU-003", className: "Class B", attendancePercentage: 72 },
    { id: "std4", name: "Sarah Williams", photo: "", rollNumber: "STU-004", className: "Class B", attendancePercentage: 91 },
    { id: "std5", name: "John Miller", photo: "", rollNumber: "STU-005", className: "Class C", attendancePercentage: 65 },
    { id: "std6", name: "Emily Davis", photo: "", rollNumber: "STU-006", className: "Class C", attendancePercentage: 98 },
    { id: "std7", name: "Michael Brown", photo: "", rollNumber: "STU-007", className: "Class A", attendancePercentage: 85 },
    { id: "std8", name: "Lisa Wilson", photo: "", rollNumber: "STU-008", className: "Class B", attendancePercentage: 79 },
  ];
  
  // Filter students based on search query and class filter
  const filteredStudents = studentData.filter((student) => {
    const matchesQuery = student.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          student.rollNumber.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesClass = classFilter === "all" || student.className === classFilter;
    return matchesQuery && matchesClass;
  });
  
  const handleStudentClick = (student: any) => {
    setSelectedStudent(student);
    setShowStudentDetails(true);
  };
  
  return (
    <div className="page-container">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
        <h1 className="text-2xl font-bold mb-4 md:mb-0 fade-in">Student Records</h1>
        
        <Button size="sm" className="flex items-center self-start md:self-auto">
          <UserPlus className="h-4 w-4 mr-2" />
          <span>Add Student</span>
        </Button>
      </div>
      
      <div className="glass-card rounded-xl p-5 mb-6 animate-fade-in">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search by name or roll number..."
              className="pl-9"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          
          <div className="flex items-center gap-2">
            <Select value={classFilter} onValueChange={setClassFilter}>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Filter by class" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Classes</SelectItem>
                <SelectItem value="Class A">Class A</SelectItem>
                <SelectItem value="Class B">Class B</SelectItem>
                <SelectItem value="Class C">Class C</SelectItem>
              </SelectContent>
            </Select>
            
            <Button variant="outline" size="icon">
              <Filter className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredStudents.map((student) => (
          <StudentCard
            key={student.id}
            id={student.id}
            name={student.name}
            photo={student.photo}
            rollNumber={student.rollNumber}
            className={student.className}
            attendancePercentage={student.attendancePercentage}
            onClick={() => handleStudentClick(student)}
          />
        ))}
        
        {filteredStudents.length === 0 && (
          <div className="col-span-full py-10 text-center">
            <p className="text-muted-foreground">No students found. Try a different search or filter.</p>
          </div>
        )}
      </div>
      
      <Dialog open={showStudentDetails} onOpenChange={setShowStudentDetails}>
        <DialogContent className="sm:max-w-[600px] p-0 overflow-hidden">
          <DialogHeader className="px-6 pt-6 pb-3">
            <DialogTitle>Student Profile</DialogTitle>
          </DialogHeader>
          
          {selectedStudent && (
            <div className="px-6 pb-6 pt-2">
              <div className="flex flex-col md:flex-row gap-6">
                <div className="flex-shrink-0 bg-accent rounded-xl p-4 text-center">
                  <div className="w-24 h-24 rounded-full mx-auto bg-primary/10 flex items-center justify-center mb-3">
                    <span className="text-2xl font-medium text-primary">
                      {selectedStudent.name.split(' ').map((n: string) => n[0]).join('').toUpperCase()}
                    </span>
                  </div>
                  <div className="font-medium">{selectedStudent.name}</div>
                  <div className="text-sm text-muted-foreground">{selectedStudent.rollNumber}</div>
                  <div className="mt-3 text-sm font-medium bg-primary/10 text-primary rounded-full py-1 px-3 inline-block">
                    {selectedStudent.className}
                  </div>
                </div>
                
                <div className="flex-1">
                  <Tabs defaultValue="overview">
                    <TabsList className="mb-4 w-full">
                      <TabsTrigger value="overview" className="flex-1">Overview</TabsTrigger>
                      <TabsTrigger value="attendance" className="flex-1">Attendance</TabsTrigger>
                      <TabsTrigger value="records" className="flex-1">Records</TabsTrigger>
                    </TabsList>
                    
                    <TabsContent value="overview" className="mt-0">
                      <div className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                          <div className="border rounded-lg p-3">
                            <div className="text-sm text-muted-foreground">Attendance</div>
                            <div className="text-2xl font-semibold mt-1">{selectedStudent.attendancePercentage}%</div>
                          </div>
                          <div className="border rounded-lg p-3">
                            <div className="text-sm text-muted-foreground">Average Grade</div>
                            <div className="text-2xl font-semibold mt-1">B+</div>
                          </div>
                        </div>
                        
                        <div className="border rounded-lg p-4">
                          <h3 className="font-medium mb-2">Personal Information</h3>
                          <div className="grid grid-cols-2 gap-2 text-sm">
                            <div>
                              <span className="text-muted-foreground">Email:</span>
                              <span className="ml-2">{selectedStudent.name.toLowerCase().replace(' ', '.')}@example.com</span>
                            </div>
                            <div>
                              <span className="text-muted-foreground">Phone:</span>
                              <span className="ml-2">(555) 123-4567</span>
                            </div>
                            <div>
                              <span className="text-muted-foreground">Date of Birth:</span>
                              <span className="ml-2">Jan 15, 2005</span>
                            </div>
                            <div>
                              <span className="text-muted-foreground">Address:</span>
                              <span className="ml-2">123 Campus Street</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </TabsContent>
                    
                    <TabsContent value="attendance" className="mt-0">
                      <div className="text-sm text-muted-foreground">
                        Attendance records would be displayed here.
                      </div>
                    </TabsContent>
                    
                    <TabsContent value="records" className="mt-0">
                      <div className="text-sm text-muted-foreground">
                        Academic records would be displayed here.
                      </div>
                    </TabsContent>
                  </Tabs>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Students;
