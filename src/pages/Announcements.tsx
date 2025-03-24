
import { useState } from "react";
import { Edit, Plus, Search, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import AnnouncementCard from "@/components/AnnouncementCard";

const Announcements = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState<string>("latest");
  
  // Sample data - would come from API in real application
  const announcementsData = [
    {
      id: "1",
      title: "Final Exam Schedule Released",
      content: "The schedule for the final examinations has been released. Please check your email for more details or visit the academic portal to see the complete schedule. All students are required to confirm their exam slots by the end of this week.",
      author: {
        name: "Principal Johnson",
        photo: ""
      },
      date: new Date(2023, 5, 15)
    },
    {
      id: "2",
      title: "Campus Maintenance This Weekend",
      content: "The campus will be undergoing maintenance this weekend. Some facilities may be temporarily unavailable during this time. We apologize for any inconvenience and appreciate your understanding. Please plan accordingly.",
      author: {
        name: "Admin Office",
        photo: ""
      },
      date: new Date(2023, 5, 12)
    },
    {
      id: "3",
      title: "New Library Resources Available",
      content: "We've added new digital resources to our library. Students can now access the expanded collection of e-books and academic journals. Our librarians will be hosting workshops next week to help you navigate these new resources.",
      author: {
        name: "Library Department",
        photo: ""
      },
      date: new Date(2023, 5, 10)
    },
    {
      id: "4",
      title: "Sports Day Postponed",
      content: "Due to the weather forecast, the Sports Day scheduled for this Friday has been postponed to next month. New dates will be announced soon. All team captains should contact their coaches for modified practice schedules.",
      author: {
        name: "Sports Department",
        photo: ""
      },
      date: new Date(2023, 5, 8)
    },
    {
      id: "5",
      title: "Scholarship Applications Open",
      content: "Applications for the annual merit scholarships are now open. Eligible students can apply through the student portal before the end of the month. Information sessions will be held every Wednesday in Room 301.",
      author: {
        name: "Financial Aid Office",
        photo: ""
      },
      date: new Date(2023, 5, 5)
    }
  ];
  
  // Filter announcements based on search query
  const filteredAnnouncements = announcementsData.filter((announcement) =>
    announcement.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    announcement.content.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  // Sort announcements
  const sortedAnnouncements = [...filteredAnnouncements].sort((a, b) => {
    if (sortBy === "latest") {
      return b.date.getTime() - a.date.getTime();
    } else if (sortBy === "oldest") {
      return a.date.getTime() - b.date.getTime();
    } else if (sortBy === "title") {
      return a.title.localeCompare(b.title);
    }
    return 0;
  });
  
  return (
    <div className="page-container">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
        <h1 className="text-2xl font-bold mb-4 md:mb-0 fade-in">Announcements</h1>
        
        <Dialog>
          <DialogTrigger asChild>
            <Button size="sm" className="flex items-center self-start md:self-auto">
              <Plus className="h-4 w-4 mr-2" />
              <span>New Announcement</span>
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>Create Announcement</DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="title">Title</Label>
                <Input id="title" placeholder="Enter announcement title" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="content">Content</Label>
                <Textarea
                  id="content"
                  placeholder="Enter announcement content..."
                  className="min-h-32"
                />
              </div>
              <div className="space-y-2">
                <Label>Visibility</Label>
                <Select defaultValue="all">
                  <SelectTrigger>
                    <SelectValue placeholder="Select visibility" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Users</SelectItem>
                    <SelectItem value="students">Students Only</SelectItem>
                    <SelectItem value="teachers">Teachers Only</SelectItem>
                    <SelectItem value="staff">Staff Only</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex items-center pt-2 justify-end space-x-2">
                <Button variant="outline">Cancel</Button>
                <Button>Publish</Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>
      
      <div className="glass-card rounded-xl p-5 mb-6 animate-fade-in">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search announcements..."
              className="pl-9"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          
          <div className="w-full md:w-40">
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger>
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="latest">Latest</SelectItem>
                <SelectItem value="oldest">Oldest</SelectItem>
                <SelectItem value="title">Title</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        {sortedAnnouncements.map((announcement, index) => (
          <div key={announcement.id} className="relative group">
            <AnnouncementCard
              id={announcement.id}
              title={announcement.title}
              content={announcement.content}
              author={announcement.author}
              date={announcement.date}
              isHighlighted={index === 0}
            />
            
            <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity flex space-x-1">
              <Button variant="ghost" size="icon" className="h-8 w-8 bg-white/80 hover:bg-white">
                <Edit className="h-4 w-4 text-muted-foreground" />
              </Button>
              <Button variant="ghost" size="icon" className="h-8 w-8 bg-white/80 hover:bg-white">
                <Trash2 className="h-4 w-4 text-muted-foreground" />
              </Button>
            </div>
          </div>
        ))}
        
        {sortedAnnouncements.length === 0 && (
          <div className="col-span-full py-10 text-center">
            <p className="text-muted-foreground">No announcements found. Try a different search.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Announcements;
