
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/utils';

interface CustomerMapProps {
  className?: string;
}

// Simplified country data for visualization
const countries = [
  { id: 'us', name: 'United States', value: 42, color: '#0ea5e9' },
  { id: 'ca', name: 'Canada', value: 12, color: '#22c55e' },
  { id: 'gb', name: 'United Kingdom', value: 18, color: '#eab308' },
  { id: 'fr', name: 'France', value: 8, color: '#ec4899' },
  { id: 'de', name: 'Germany', value: 10, color: '#8b5cf6' },
  { id: 'in', name: 'India', value: 6, color: '#f97316' },
  { id: 'au', name: 'Australia', value: 4, color: '#06b6d4' },
];

const CustomerMap = ({ className }: CustomerMapProps) => {
  const totalCustomers = countries.reduce((sum, country) => sum + country.value, 0);
  
  return (
    <Card className={cn("overflow-hidden", className)}>
      <CardHeader className="pb-2">
        <CardTitle>Customer Distribution</CardTitle>
        <CardDescription>Geographic breakdown of your customer base</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {/* We'll display a simple visual representation instead of an actual map */}
          <div className="grid grid-cols-7 gap-1 h-[120px]">
            {countries.map((country) => (
              <div 
                key={country.id}
                className="flex flex-col items-center"
                style={{ height: `${(country.value / totalCustomers) * 100 * 3}%` }}
              >
                <div 
                  className="w-full rounded-t-md mt-auto transition-all duration-300 hover:opacity-90"
                  style={{ backgroundColor: country.color, height: '100%' }}
                >
                </div>
                <div className="text-[10px] text-muted-foreground mt-1 uppercase">{country.id}</div>
              </div>
            ))}
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {countries.map((country) => (
              <div key={country.id} className="flex items-center gap-2">
                <div 
                  className="h-3 w-3 rounded-full"
                  style={{ backgroundColor: country.color }}
                ></div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-medium truncate">{country.name}</p>
                  <p className="text-xs text-muted-foreground">{country.value}%</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default CustomerMap;
