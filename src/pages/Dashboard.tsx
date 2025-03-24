
import { useEffect, useState } from "react";
import { CalendarClock, CalendarDays, Search, Users, Bell, ChevronRight, BookOpen } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import DashboardCard from "@/components/DashboardCard";
import AnnouncementCard from "@/components/AnnouncementCard";

const Dashboard = () => {
  const [announcements, setAnnouncements] = useState<any[]>([]);
  
  useEffect(() => {
    // Sample data - would come from API in real application
    setAnnouncements([
      {
        id: "1",
        title: "Final Exam Schedule Released",
        content: "The schedule for the final examinations has been released. Please check your email for more details or visit the academic portal.",
        author: {
          name: "Principal Johnson",
          photo: ""
        },
        date: new Date(2023, 5, 15)
      },
      {
        id: "2",
        title: "Campus Maintenance This Weekend",
        content: "The campus will be undergoing maintenance this weekend. Some facilities may be temporarily unavailable during this time.",
        author: {
          name: "Admin Office",
          photo: ""
        },
        date: new Date(2023, 5, 12)
      },
      {
        id: "3",
        title: "New Library Resources Available",
        content: "We've added new digital resources to our library. Students can now access the expanded collection of e-books and academic journals.",
        author: {
          name: "Library Department",
          photo: ""
        },
        date: new Date(2023, 5, 10)
      }
    ]);
  }, []);
  
  return (
    <div className="page-container">
      <h1 className="text-2xl font-bold mb-6 fade-in">Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
        <DashboardCard 
          title="Today's Attendance" 
          icon={<Users className="h-5 w-5" />}
          value="85%"
          trend="up"
          trendValue="3%"
        />
        <DashboardCard 
          title="Classes Today" 
          icon={<BookOpen className="h-5 w-5" />}
          value="12"
          trend="neutral"
          trendValue="0"
        />
        <DashboardCard 
          title="Upcoming Schedule" 
          icon={<CalendarClock className="h-5 w-5" />}
          value="4"
          trend="down"
          trendValue="2"
        />
        <DashboardCard 
          title="This Month" 
          icon={<CalendarDays className="h-5 w-5" />}
          value="22"
          trend="up"
          trendValue="5"
        />
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-5">
          <div className="flex items-center justify-between mb-2">
            <h2 className="text-lg font-semibold">Quick Search</h2>
          </div>
          
          <div className="glass-card rounded-xl p-5 mb-6 animate-fade-in">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input 
                placeholder="Search students, classes, or schedules..." 
                className="pl-9"
              />
            </div>
            
            <div className="flex flex-wrap gap-2 mt-4">
              {["Students", "Classes", "Schedule", "Attendance", "Reports"].map((tag) => (
                <div 
                  key={tag} 
                  className="bg-accent rounded-full px-3 py-1 text-sm font-medium text-accent-foreground cursor-pointer hover:bg-primary hover:text-primary-foreground transition-colors"
                >
                  {tag}
                </div>
              ))}
            </div>
          </div>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold">Today's Schedule</h2>
              <Button variant="ghost" size="sm" className="text-primary text-sm">
                View All <ChevronRight className="ml-1 h-4 w-4" />
              </Button>
            </div>
            
            <div className="glass-card rounded-xl animate-fade-in">
              <div className="divide-y divide-border/60">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="p-4 flex items-start justify-between hover:bg-accent/20 transition-colors">
                    <div>
                      <div className="font-medium">Mathematics {i}01</div>
                      <div className="text-sm text-muted-foreground mt-1">Room 203 • Prof. Smith</div>
                    </div>
                    <div className="text-sm font-semibold text-primary bg-primary/10 px-3 py-1 rounded-full">
                      {9 + i}:00 AM - {10 + i}:00 AM
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        
        <div className="space-y-5">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold">Recent Announcements</h2>
            <Button variant="ghost" size="sm" className="text-primary text-sm">
              View All <ChevronRight className="ml-1 h-4 w-4" />
            </Button>
          </div>
          
          <div className="space-y-4">
            {announcements.map((announcement, index) => (
              <AnnouncementCard
                key={announcement.id}
                id={announcement.id}
                title={announcement.title}
                content={announcement.content}
                author={announcement.author}
                date={announcement.date}
                isHighlighted={index === 0}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
