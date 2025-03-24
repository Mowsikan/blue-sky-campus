
import { useState } from "react";
import { CheckCircle2, Clock, XCircle } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { cn } from "@/lib/utils";

interface AttendanceRowProps {
  id: string;
  className: string;
  time: string;
  date: string;
  status?: "present" | "absent" | "pending";
  onStatusChange?: (id: string, status: "present" | "absent" | "pending") => void;
}

const AttendanceRow = ({
  id,
  className: classStr,
  time,
  date,
  status = "pending",
  onStatusChange,
}: AttendanceRowProps) => {
  const [currentStatus, setCurrentStatus] = useState(status);
  
  const handleToggle = (checked: boolean) => {
    const newStatus = checked ? "present" : "absent";
    setCurrentStatus(newStatus);
    onStatusChange?.(id, newStatus);
  };

  return (
    <div className="glass-card rounded-lg p-4 mb-3 transition-all duration-200 hover:shadow-card animate-fade-in">
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <h3 className="font-medium">{classStr}</h3>
          <div className="flex items-center mt-1 text-sm text-muted-foreground">
            <Clock className="h-3.5 w-3.5 mr-1" />
            <span>{time}</span>
            <span className="mx-2">•</span>
            <span>{date}</span>
          </div>
        </div>
        
        <div className="flex items-center space-x-3">
          <div className={cn(
            "flex items-center px-2.5 py-1 rounded-full text-sm",
            currentStatus === "present" && "bg-green-50 text-green-600",
            currentStatus === "absent" && "bg-red-50 text-red-600",
            currentStatus === "pending" && "bg-amber-50 text-amber-600"
          )}>
            {currentStatus === "present" && <CheckCircle2 className="h-3.5 w-3.5 mr-1.5" />}
            {currentStatus === "absent" && <XCircle className="h-3.5 w-3.5 mr-1.5" />}
            {currentStatus === "pending" && <Clock className="h-3.5 w-3.5 mr-1.5" />}
            <span className="font-medium capitalize">{currentStatus}</span>
          </div>
          
          <Switch 
            checked={currentStatus === "present"} 
            onCheckedChange={handleToggle} 
          />
        </div>
      </div>
    </div>
  );
};

export default AttendanceRow;
