
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

// Sales by category data
const salesByCategory = [
  { name: 'Electronics', value: 42 },
  { name: 'Apparel', value: 28 },
  { name: 'Home Goods', value: 15 },
  { name: 'Beauty', value: 8 },
  { name: 'Other', value: 7 },
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#A569BD'];

// Sales over time data
const salesOverTime = [
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
const customerAcquisition = [
  { name: 'Organic Search', new: 400, returning: 240 },
  { name: 'Direct', new: 300, returning: 198 },
  { name: 'Social Media', new: 520, returning: 380 },
  { name: 'Email', new: 220, returning: 400 },
  { name: 'Referral', new: 180, returning: 250 },
];

// Top products data
const topProducts = [
  { name: 'Premium Wireless Headphones', sales: 1245 },
  { name: 'Smartwatch Pro', sales: 1190 },
  { name: 'Bluetooth Speaker', sales: 950 },
  { name: 'Laptop Sleeve', sales: 875 },
  { name: 'Phone Case', sales: 750 },
];

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
  return (
    <div className="space-y-6 animate-in">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Analytics</h1>
        <p className="text-muted-foreground">Comprehensive insights for your e-commerce business.</p>
      </div>
      
      <Tabs defaultValue="sales">
        <TabsList className="mb-6">
          <TabsTrigger value="sales">Sales</TabsTrigger>
          <TabsTrigger value="customers">Customers</TabsTrigger>
          <TabsTrigger value="products">Products</TabsTrigger>
        </TabsList>
        
        <TabsContent value="sales" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="animate-in-up [animation-delay:100ms]">
              <CardHeader>
                <CardTitle>Sales Over Time</CardTitle>
                <CardDescription>Monthly sales for the past year</CardDescription>
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
            
            <Card className="animate-in-up [animation-delay:200ms]">
              <CardHeader>
                <CardTitle>Sales by Category</CardTitle>
                <CardDescription>Percentage distribution across product categories</CardDescription>
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
          <Card className="animate-in-up [animation-delay:100ms]">
            <CardHeader>
              <CardTitle>Customer Acquisition Channels</CardTitle>
              <CardDescription>New vs. returning customers by channel</CardDescription>
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
          <Card className="animate-in-up [animation-delay:100ms]">
            <CardHeader>
              <CardTitle>Top Selling Products</CardTitle>
              <CardDescription>Products with the highest sales volume</CardDescription>
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
