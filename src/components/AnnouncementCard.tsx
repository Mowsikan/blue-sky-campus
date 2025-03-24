
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";

interface AnnouncementCardProps {
  id: string;
  title: string;
  content: string;
  author: {
    name: string;
    photo?: string;
  };
  date: Date;
  isHighlighted?: boolean;
}

const AnnouncementCard = ({
  id,
  title,
  content,
  author,
  date,
  isHighlighted = false,
}: AnnouncementCardProps) => {
  // Get author initials for avatar fallback
  const initials = author.name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .substring(0, 2);

  return (
    <div 
      className={`glass-card rounded-xl p-5 mb-4 transition-all duration-300 hover:shadow-card animate-fade-in ${
        isHighlighted ? "border-l-4 border-l-campus-blue-500" : ""
      }`}
    >
      <h3 className="text-lg font-medium mb-2">{title}</h3>
      <p className="text-muted-foreground mb-4 text-sm line-clamp-3">{content}</p>
      
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Avatar className="h-8 w-8">
            <AvatarImage src={author.photo} alt={author.name} />
            <AvatarFallback className="bg-primary/10 text-primary text-xs font-medium">
              {initials}
            </AvatarFallback>
          </Avatar>
          <span className="text-sm font-medium">{author.name}</span>
        </div>
        
        <div className="flex items-center text-xs text-muted-foreground">
          <CalendarIcon className="h-3.5 w-3.5 mr-1" />
          <span>{format(date, "MMM d, yyyy")}</span>
        </div>
      </div>
    </div>
  );
};

export default AnnouncementCard;
