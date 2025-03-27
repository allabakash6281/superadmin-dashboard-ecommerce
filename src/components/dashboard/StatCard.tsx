
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { LucideIcon } from 'lucide-react';

interface StatCardProps {
  title: string;
  value: string;
  description?: string;
  icon: LucideIcon;
  trend?: 'up' | 'down' | 'neutral';
  trendValue?: string;
  iconColor?: string;
  className?: string;
}

const StatCard = ({
  title,
  value,
  description,
  icon: Icon,
  trend = 'neutral',
  trendValue,
  iconColor = 'text-primary',
  className
}: StatCardProps) => {
  return (
    <Card className={cn("overflow-hidden card-hover", className)}>
      <CardContent className="p-6">
        <div className="flex items-start justify-between">
          <div className="space-y-1">
            <p className="text-sm font-medium text-muted-foreground">{title}</p>
            <h3 className="text-2xl font-bold tracking-tight">{value}</h3>
            {description && <p className="text-xs text-muted-foreground">{description}</p>}
          </div>
          <div className={cn("p-3 rounded-full", iconColor)}>
            <Icon className="h-5 w-5 text-white" />
          </div>
        </div>
        
        {trendValue && (
          <div className="mt-4 flex items-center">
            {trend === 'up' && (
              <span className="text-xs bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400 px-2 py-0.5 rounded-full flex items-center">
                <svg className="h-3 w-3 mr-1" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 4L18 10M18 10H13M18 10V5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M12 20L6 14M6 14H11M6 14V19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                {trendValue}
              </span>
            )}
            {trend === 'down' && (
              <span className="text-xs bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400 px-2 py-0.5 rounded-full flex items-center">
                <svg className="h-3 w-3 mr-1" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 20L18 14M18 14H13M18 14V19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M12 4L6 10M6 10H11M6 10V5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                {trendValue}
              </span>
            )}
            {trend === 'neutral' && (
              <span className="text-xs bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400 px-2 py-0.5 rounded-full flex items-center">
                <svg className="h-3 w-3 mr-1" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M18 12H6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                {trendValue}
              </span>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default StatCard;
