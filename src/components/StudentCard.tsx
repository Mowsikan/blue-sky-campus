
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Eye } from "lucide-react";

interface StudentCardProps {
  id: string;
  name: string;
  photo?: string;
  rollNumber: string;
  className: string;
  attendancePercentage: number;
  onClick?: () => void;
}

const StudentCard = ({
  id,
  name,
  photo,
  rollNumber,
  className: classStr,
  attendancePercentage,
  onClick,
}: StudentCardProps) => {
  // Get initials for avatar fallback
  const initials = name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .substring(0, 2);

  // Determine attendance status color
  const getStatusColor = (percentage: number) => {
    if (percentage >= 90) return "text-green-500 bg-green-50";
    if (percentage >= 75) return "text-amber-500 bg-amber-50";
    return "text-red-500 bg-red-50";
  };

  return (
    <div className="glass-card rounded-xl overflow-hidden transition-all duration-300 hover:shadow-card animate-fade-in">
      <div className="p-5">
        <div className="flex items-center space-x-4">
          <Avatar className="h-12 w-12 border border-border">
            <AvatarImage src={photo} alt={name} />
            <AvatarFallback className="bg-primary/10 text-primary font-medium">
              {initials}
            </AvatarFallback>
          </Avatar>
          
          <div className="flex-1 space-y-1">
            <h3 className="font-medium text-base">{name}</h3>
            <div className="flex items-center text-sm text-muted-foreground space-x-2">
              <span>{rollNumber}</span>
              <span className="text-xs">•</span>
              <span>{classStr}</span>
            </div>
          </div>
          
          <div className="flex flex-col items-end">
            <div className={cn(
              "text-sm font-medium rounded-full px-2 py-0.5",
              getStatusColor(attendancePercentage)
            )}>
              {attendancePercentage}%
            </div>
            <span className="text-xs text-muted-foreground mt-1">Attendance</span>
          </div>
        </div>
      </div>
      
      <div className="border-t border-border bg-card p-3 flex justify-end">
        <Button 
          variant="ghost" 
          size="sm" 
          className="text-sm font-medium text-primary hover:text-primary-foreground hover:bg-primary"
          onClick={onClick}
        >
          <Eye className="h-4 w-4 mr-1" />
          View Profile
        </Button>
      </div>
    </div>
  );
};

export default StudentCard;
