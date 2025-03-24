
import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface DashboardCardProps {
  title: string;
  icon: ReactNode;
  value?: string | number;
  trend?: "up" | "down" | "neutral";
  trendValue?: string;
  className?: string;
  children?: ReactNode;
}

const DashboardCard = ({
  title,
  icon,
  value,
  trend,
  trendValue,
  className,
  children,
}: DashboardCardProps) => {
  return (
    <div className={cn(
      "glass-card rounded-xl p-5 hover:shadow-card transition-shadow duration-300",
      "animate-fade-in",
      className
    )}>
      <div className="flex items-start justify-between mb-4">
        <div className="text-muted-foreground font-medium text-sm">{title}</div>
        <div className="bg-accent rounded-md p-1.5 text-primary">{icon}</div>
      </div>
      
      {value && (
        <div className="text-3xl font-semibold tracking-tight mb-2">{value}</div>
      )}
      
      {trend && (
        <div className="flex items-center text-sm">
          <span className={cn(
            "inline-flex mr-1",
            trend === "up" && "text-green-500",
            trend === "down" && "text-red-500",
            trend === "neutral" && "text-muted-foreground"
          )}>
            {trend === "up" && "↑"}
            {trend === "down" && "↓"}
            {trend === "neutral" && "→"}
            {trendValue}
          </span>
          <span className="text-muted-foreground">from last week</span>
        </div>
      )}
      
      {children}
    </div>
  );
};

export default DashboardCard;
