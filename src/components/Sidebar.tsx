
import { useState } from "react";
import { NavLink } from "react-router-dom";
import { 
  BarChart3, 
  Calendar, 
  ChevronLeft, 
  ChevronRight, 
  ClipboardCheck, 
  Home, 
  MessageSquare, 
  Settings, 
  Users
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const Sidebar = () => {
  const [collapsed, setCollapsed] = useState(false);

  const NavItem = ({ icon: Icon, to, label }: { icon: any; to: string; label: string }) => (
    <NavLink
      to={to}
      className={({ isActive }) => 
        cn(
          "flex items-center gap-3 px-3 py-2 rounded-lg transition-all duration-200",
          "hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
          collapsed ? "justify-center px-3" : "justify-start",
          isActive 
            ? "bg-sidebar-primary text-sidebar-primary-foreground" 
            : "text-sidebar-foreground"
        )
      }
    >
      <Icon className={cn("h-5 w-5 flex-shrink-0", collapsed && "w-5 h-5")} />
      {!collapsed && <span className="truncate">{label}</span>}
    </NavLink>
  );

  return (
    <div
      className={cn(
        "flex flex-col border-r border-border/40 bg-sidebar transition-all duration-300 ease-in-out h-screen",
        collapsed ? "w-16" : "w-64"
      )}
    >
      <div className="flex items-center justify-between p-4 h-16">
        {!collapsed && (
          <div className="text-lg font-medium text-primary animate-fade-in">
            Campus MS
          </div>
        )}
        <Button
          variant="ghost"
          size="icon"
          className="ml-auto btn-icon text-sidebar-foreground hover:text-sidebar-accent-foreground hover:bg-sidebar-accent/60"
          onClick={() => setCollapsed(!collapsed)}
        >
          {collapsed ? <ChevronRight /> : <ChevronLeft />}
        </Button>
      </div>

      <div className="overflow-y-auto flex-1 px-3 py-4 space-y-2">
        <NavItem icon={Home} to="/" label="Dashboard" />
        <NavItem icon={ClipboardCheck} to="/attendance" label="Attendance" />
        <NavItem icon={Calendar} to="/schedule" label="Schedule" />
        <NavItem icon={Users} to="/students" label="Students" />
        <NavItem icon={MessageSquare} to="/announcements" label="Announcements" />
        <NavItem icon={BarChart3} to="/reports" label="Reports" />
      </div>

      <div className="p-3 mt-auto">
        <NavItem icon={Settings} to="/settings" label="Settings" />
      </div>
    </div>
  );
};

export default Sidebar;
