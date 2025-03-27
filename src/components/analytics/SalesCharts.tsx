
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Loader2 } from 'lucide-react';
import { CustomLineTooltip, CustomPieTooltip } from './ChartTooltips';
import { COLORS } from './initialData';

interface SalesChartsProps {
  salesOverTime: any[];
  salesOverTimeLoading: boolean;
  salesOverTimeUpdated: Date | null;
  salesByCategory: any[];
  salesByCategoryLoading: boolean;
  salesByCategoryUpdated: Date | null;
}

const SalesCharts = ({
  salesOverTime,
  salesOverTimeLoading,
  salesOverTimeUpdated,
  salesByCategory,
  salesByCategoryLoading,
  salesByCategoryUpdated
}: SalesChartsProps) => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <Card className="animate-in-up [animation-delay:100ms] relative">
        {salesOverTimeLoading && (
          <div className="absolute top-3 right-3">
            <Loader2 className="h-4 w-4 animate-spin text-muted-foreground" />
          </div>
        )}
        <CardHeader>
          <CardTitle>Sales Over Time</CardTitle>
          <CardDescription>
            Monthly sales for the past year
            {salesOverTimeUpdated && (
              <span className="text-xs text-muted-foreground ml-1">
                (Updated: {salesOverTimeUpdated.toLocaleTimeString()})
              </span>
            )}
          </CardDescription>
        </CardHeader>
        <CardContent className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={salesOverTime}
              margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
            >
              <CartesianGrid vertical={false} stroke="hsl(var(--border))" />
              <XAxis 
                dataKey="name" 
                axisLine={false}
                tickLine={false}
                stroke="hsl(var(--muted-foreground))"
              />
              <YAxis 
                axisLine={false}
                tickLine={false}
                stroke="hsl(var(--muted-foreground))"
                tickFormatter={(value) => `$${value/1000}k`}
              />
              <Tooltip content={<CustomLineTooltip />} />
              <Line 
                type="monotone" 
                dataKey="sales" 
                stroke="hsl(var(--primary))" 
                activeDot={{ r: 6 }} 
                strokeWidth={2}
              />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
      
      <Card className="animate-in-up [animation-delay:200ms] relative">
        {salesByCategoryLoading && (
          <div className="absolute top-3 right-3">
            <Loader2 className="h-4 w-4 animate-spin text-muted-foreground" />
          </div>
        )}
        <CardHeader>
          <CardTitle>Sales by Category</CardTitle>
          <CardDescription>
            Percentage distribution across product categories
            {salesByCategoryUpdated && (
              <span className="text-xs text-muted-foreground ml-1">
                (Updated: {salesByCategoryUpdated.toLocaleTimeString()})
              </span>
            )}
          </CardDescription>
        </CardHeader>
        <CardContent className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={salesByCategory}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={90}
                paddingAngle={4}
                dataKey="value"
              >
                {salesByCategory.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip content={<CustomPieTooltip />} />
              <Legend 
                verticalAlign="bottom"
                height={36}
                formatter={(value) => <span className="text-xs">{value}</span>}
              />
            </PieChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
};

export default SalesCharts;
