
import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { cn } from '@/lib/utils';

interface RevenueChartProps {
  className?: string;
}

const weeklyData = [
  { name: 'Mon', revenue: 4000 },
  { name: 'Tue', revenue: 3000 },
  { name: 'Wed', revenue: 5000 },
  { name: 'Thu', revenue: 2780 },
  { name: 'Fri', revenue: 7890 },
  { name: 'Sat', revenue: 6390 },
  { name: 'Sun', revenue: 8490 },
];

const monthlyData = [
  { name: 'Jan', revenue: 24000 },
  { name: 'Feb', revenue: 22000 },
  { name: 'Mar', revenue: 38000 },
  { name: 'Apr', revenue: 27000 },
  { name: 'May', revenue: 39000 },
  { name: 'Jun', revenue: 35000 },
  { name: 'Jul', revenue: 29000 },
  { name: 'Aug', revenue: 41000 },
  { name: 'Sep', revenue: 48000 },
  { name: 'Oct', revenue: 43000 },
  { name: 'Nov', revenue: 52000 },
  { name: 'Dec', revenue: 64000 },
];

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white dark:bg-gray-800 p-3 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg">
        <p className="text-xs text-gray-500">{label}</p>
        <p className="text-sm font-medium">${payload[0].value.toLocaleString()}</p>
      </div>
    );
  }

  return null;
};

const RevenueChart = ({ className }: RevenueChartProps) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <Card className={cn("overflow-hidden", className)}>
      <CardHeader className="pb-2">
        <CardTitle>Revenue Overview</CardTitle>
        <CardDescription>A visualization of your revenue trends</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="weekly">
          <div className="flex justify-between items-center mb-4">
            <TabsList>
              <TabsTrigger value="weekly">Weekly</TabsTrigger>
              <TabsTrigger value="monthly">Monthly</TabsTrigger>
            </TabsList>
            <div className="flex items-center text-xs text-muted-foreground">
              <span className="w-3 h-3 rounded-full bg-primary/70 mr-1"></span>
              <span>Revenue</span>
            </div>
          </div>
          
          <TabsContent value="weekly" className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart
                data={weeklyData}
                margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
              >
                <defs>
                  <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid vertical={false} strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis 
                  dataKey="name" 
                  axisLine={false}
                  tickLine={false}
                  tickMargin={10}
                  stroke="hsl(var(--muted-foreground))"
                  fontSize={12}
                />
                <YAxis 
                  axisLine={false}
                  tickLine={false}
                  tickMargin={10}
                  stroke="hsl(var(--muted-foreground))"
                  fontSize={12}
                  tickFormatter={(value) => `$${value}`}
                />
                <Tooltip content={<CustomTooltip />} />
                <Area 
                  type="monotone" 
                  dataKey="revenue" 
                  stroke="hsl(var(--primary))" 
                  strokeWidth={2}
                  fillOpacity={1} 
                  fill="url(#colorRevenue)" 
                />
              </AreaChart>
            </ResponsiveContainer>
          </TabsContent>
          
          <TabsContent value="monthly" className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart
                data={monthlyData}
                margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
              >
                <defs>
                  <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid vertical={false} strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis 
                  dataKey="name" 
                  axisLine={false}
                  tickLine={false}
                  tickMargin={10}
                  stroke="hsl(var(--muted-foreground))"
                  fontSize={12}
                />
                <YAxis 
                  axisLine={false}
                  tickLine={false}
                  tickMargin={10}
                  stroke="hsl(var(--muted-foreground))"
                  fontSize={12}
                  tickFormatter={(value) => `$${value/1000}k`}
                />
                <Tooltip content={<CustomTooltip />} />
                <Area 
                  type="monotone" 
                  dataKey="revenue" 
                  stroke="hsl(var(--primary))" 
                  strokeWidth={2}
                  fillOpacity={1} 
                  fill="url(#colorRevenue)" 
                />
              </AreaChart>
            </ResponsiveContainer>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default RevenueChart;
