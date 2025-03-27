
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Loader2 } from 'lucide-react';
import { CustomBarTooltip } from './ChartTooltips';

interface TopProductsChartProps {
  topProducts: any[];
  topProductsLoading: boolean;
  topProductsUpdated: Date | null;
}

const TopProductsChart = ({
  topProducts,
  topProductsLoading,
  topProductsUpdated
}: TopProductsChartProps) => {
  return (
    <Card className="animate-in-up [animation-delay:100ms] relative">
      {topProductsLoading && (
        <div className="absolute top-3 right-3">
          <Loader2 className="h-4 w-4 animate-spin text-muted-foreground" />
        </div>
      )}
      <CardHeader>
        <CardTitle>Top Selling Products</CardTitle>
        <CardDescription>
          Products with the highest sales volume
          {topProductsUpdated && (
            <span className="text-xs text-muted-foreground ml-1">
              (Updated: {topProductsUpdated.toLocaleTimeString()})
            </span>
          )}
        </CardDescription>
      </CardHeader>
      <CardContent className="h-[400px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={topProducts}
            layout="vertical"
            margin={{ top: 10, right: 10, left: 50, bottom: 0 }}
          >
            <CartesianGrid horizontal={true} vertical={false} stroke="hsl(var(--border))" />
            <XAxis 
              type="number"
              axisLine={false}
              tickLine={false}
              stroke="hsl(var(--muted-foreground))"
            />
            <YAxis 
              type="category"
              dataKey="name"
              axisLine={false}
              tickLine={false}
              width={140}
              stroke="hsl(var(--muted-foreground))"
              fontSize={12}
            />
            <Tooltip content={<CustomBarTooltip />} />
            <Bar 
              dataKey="sales" 
              fill="hsl(var(--primary))" 
              radius={[0, 4, 4, 0]}
              barSize={20}
            />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};

export default TopProductsChart;
