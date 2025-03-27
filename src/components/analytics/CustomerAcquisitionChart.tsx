
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Loader2 } from 'lucide-react';
import { CustomStackedBarTooltip } from './ChartTooltips';

interface CustomerAcquisitionChartProps {
  customerAcquisition: any[];
  customerAcquisitionLoading: boolean;
  customerAcquisitionUpdated: Date | null;
}

const CustomerAcquisitionChart = ({
  customerAcquisition,
  customerAcquisitionLoading,
  customerAcquisitionUpdated
}: CustomerAcquisitionChartProps) => {
  return (
    <Card className="animate-in-up [animation-delay:100ms] relative">
      {customerAcquisitionLoading && (
        <div className="absolute top-3 right-3">
          <Loader2 className="h-4 w-4 animate-spin text-muted-foreground" />
        </div>
      )}
      <CardHeader>
        <CardTitle>Customer Acquisition Channels</CardTitle>
        <CardDescription>
          New vs. returning customers by channel
          {customerAcquisitionUpdated && (
            <span className="text-xs text-muted-foreground ml-1">
              (Updated: {customerAcquisitionUpdated.toLocaleTimeString()})
            </span>
          )}
        </CardDescription>
      </CardHeader>
      <CardContent className="h-[400px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={customerAcquisition}
            margin={{ top: 20, right: 30, left: 0, bottom: 5 }}
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
            />
            <Tooltip content={<CustomStackedBarTooltip />} />
            <Legend
              verticalAlign="top"
              height={36}
              formatter={(value) => <span className="text-xs">{value === 'new' ? 'New Customers' : 'Returning Customers'}</span>}
            />
            <Bar 
              dataKey="new" 
              stackId="a" 
              fill="#8884d8" 
              radius={[4, 4, 0, 0]}
              name="New Customers"
            />
            <Bar 
              dataKey="returning" 
              stackId="a" 
              fill="#82ca9d"
              radius={[4, 4, 0, 0]}
              name="Returning Customers"
            />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};

export default CustomerAcquisitionChart;
