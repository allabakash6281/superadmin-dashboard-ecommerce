
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Badge } from '@/components/ui/badge';
import { useRealTimeData } from '@/hooks/useRealTimeData';
import { Loader2 } from 'lucide-react';

// Sales by category data
const initialSalesByCategory = [
  { name: 'Electronics', value: 42 },
  { name: 'Apparel', value: 28 },
  { name: 'Home Goods', value: 15 },
  { name: 'Beauty', value: 8 },
  { name: 'Other', value: 7 },
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#A569BD'];

// Sales over time data
const initialSalesOverTime = [
  { name: 'Jan', sales: 4000 },
  { name: 'Feb', sales: 3000 },
  { name: 'Mar', sales: 5000 },
  { name: 'Apr', sales: 4500 },
  { name: 'May', sales: 6000 },
  { name: 'Jun', sales: 5500 },
  { name: 'Jul', sales: 7000 },
  { name: 'Aug', sales: 8000 },
  { name: 'Sep', sales: 7500 },
  { name: 'Oct', sales: 9000 },
  { name: 'Nov', sales: 10000 },
  { name: 'Dec', sales: 12000 },
];

// Customer acquisition data
const initialCustomerAcquisition = [
  { name: 'Organic Search', new: 400, returning: 240 },
  { name: 'Direct', new: 300, returning: 198 },
  { name: 'Social Media', new: 520, returning: 380 },
  { name: 'Email', new: 220, returning: 400 },
  { name: 'Referral', new: 180, returning: 250 },
];

// Top products data
const initialTopProducts = [
  { name: 'Premium Wireless Headphones', sales: 1245 },
  { name: 'Smartwatch Pro', sales: 1190 },
  { name: 'Bluetooth Speaker', sales: 950 },
  { name: 'Laptop Sleeve', sales: 875 },
  { name: 'Phone Case', sales: 750 },
];

// Random update functions to simulate real-time data
const updateSalesByCategory = (currentData: typeof initialSalesByCategory) => {
  return currentData.map(item => ({
    ...item,
    value: Math.max(1, item.value + Math.floor(Math.random() * 5) - 2)
  }));
};

const updateSalesOverTime = (currentData: typeof initialSalesOverTime) => {
  return currentData.map(item => ({
    ...item,
    sales: Math.max(1000, item.sales + Math.floor(Math.random() * 500) - 250)
  }));
};

const updateCustomerAcquisition = (currentData: typeof initialCustomerAcquisition) => {
  return currentData.map(item => ({
    ...item,
    new: Math.max(100, item.new + Math.floor(Math.random() * 50) - 25),
    returning: Math.max(100, item.returning + Math.floor(Math.random() * 50) - 25)
  }));
};

const updateTopProducts = (currentData: typeof initialTopProducts) => {
  return currentData.map(item => ({
    ...item,
    sales: Math.max(500, item.sales + Math.floor(Math.random() * 50) - 25)
  }));
};

// Custom tooltip components
const CustomPieTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white dark:bg-gray-800 p-3 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg">
        <p className="text-sm font-medium">{payload[0].name}</p>
        <p className="text-xs text-gray-500">{`${payload[0].value}% of total sales`}</p>
      </div>
    );
  }

  return null;
};

const CustomBarTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white dark:bg-gray-800 p-3 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg">
        <p className="text-xs text-gray-500">{label}</p>
        <p className="text-sm font-medium">{payload[0].value.toLocaleString()} units sold</p>
      </div>
    );
  }

  return null;
};

const CustomLineTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white dark:bg-gray-800 p-3 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg">
        <p className="text-xs text-gray-500">{label}</p>
        <p className="text-sm font-medium">${payload[0].value.toLocaleString()} in sales</p>
      </div>
    );
  }

  return null;
};

const CustomStackedBarTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white dark:bg-gray-800 p-3 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg">
        <p className="text-xs text-gray-500">{label}</p>
        {payload.map((entry: any, index: number) => (
          <p key={`tooltip-${index}`} className="text-sm" style={{ color: entry.color }}>
            {`${entry.name}: ${entry.value.toLocaleString()} customers`}
          </p>
        ))}
      </div>
    );
  }

  return null;
};

const Analytics = () => {
  const [realTimeEnabled, setRealTimeEnabled] = useState(true);
  
  // Use the real-time data hook for each dataset
  const { 
    data: salesByCategory, 
    isLoading: salesByCategoryLoading,
    lastUpdated: salesByCategoryUpdated
  } = useRealTimeData(
    initialSalesByCategory,
    realTimeEnabled ? updateSalesByCategory : data => data,
    { interval: 8000, enableToasts: false }
  );
  
  const { 
    data: salesOverTime, 
    isLoading: salesOverTimeLoading,
    lastUpdated: salesOverTimeUpdated
  } = useRealTimeData(
    initialSalesOverTime,
    realTimeEnabled ? updateSalesOverTime : data => data,
    { interval: 10000, enableToasts: false }
  );
  
  const { 
    data: customerAcquisition, 
    isLoading: customerAcquisitionLoading,
    lastUpdated: customerAcquisitionUpdated
  } = useRealTimeData(
    initialCustomerAcquisition,
    realTimeEnabled ? updateCustomerAcquisition : data => data,
    { interval: 12000, enableToasts: false }
  );
  
  const { 
    data: topProducts, 
    isLoading: topProductsLoading,
    lastUpdated: topProductsUpdated
  } = useRealTimeData(
    initialTopProducts,
    realTimeEnabled ? updateTopProducts : data => data,
    { interval: 9000, enableToasts: false }
  );

  return (
    <div className="space-y-6 animate-in">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Analytics</h1>
          <p className="text-muted-foreground">Comprehensive insights for your e-commerce business.</p>
        </div>
        <div className="flex items-center space-x-2">
          <div className="flex items-center">
            <div className="mr-2">
              <span className={`relative flex h-3 w-3 ${realTimeEnabled ? 'opacity-100' : 'opacity-50'}`}>
                <span className={`animate-ping absolute inline-flex h-full w-full rounded-full ${realTimeEnabled ? 'bg-green-400' : 'bg-gray-400'} opacity-75`}></span>
                <span className={`relative inline-flex rounded-full h-3 w-3 ${realTimeEnabled ? 'bg-green-500' : 'bg-gray-500'}`}></span>
              </span>
            </div>
            <Badge 
              variant={realTimeEnabled ? "default" : "outline"} 
              onClick={() => setRealTimeEnabled(!realTimeEnabled)}
              className="cursor-pointer"
            >
              {realTimeEnabled ? "Real-time: On" : "Real-time: Off"}
            </Badge>
          </div>
        </div>
      </div>
      
      <Tabs defaultValue="sales">
        <TabsList className="mb-6">
          <TabsTrigger value="sales">Sales</TabsTrigger>
          <TabsTrigger value="customers">Customers</TabsTrigger>
          <TabsTrigger value="products">Products</TabsTrigger>
        </TabsList>
        
        <TabsContent value="sales" className="space-y-6">
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
        </TabsContent>
        
        <TabsContent value="customers" className="space-y-6">
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
        </TabsContent>
        
        <TabsContent value="products" className="space-y-6">
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
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Analytics;
