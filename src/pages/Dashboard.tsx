
import React from 'react';
import { BarChart3, DollarSign, ShoppingBag, Users } from 'lucide-react';
import StatCard from '../components/dashboard/StatCard';
import RevenueChart from '../components/dashboard/RevenueChart';
import RecentOrders from '../components/dashboard/RecentOrders';
import CustomerMap from '../components/dashboard/CustomerMap';

const Dashboard = () => {
  return (
    <div className="space-y-6 animate-in">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground">Your e-commerce business at a glance.</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard 
          title="Total Revenue"
          value="$48,294.50"
          icon={DollarSign}
          trend="up"
          trendValue="+12.5% from last month"
          iconColor="bg-blue-500"
          className="animate-in-up [animation-delay:100ms]"
        />
        <StatCard 
          title="Total Sales"
          value="1,254"
          icon={ShoppingBag}
          trend="up"
          trendValue="+8.2% from last month"
          iconColor="bg-green-500"
          className="animate-in-up [animation-delay:200ms]"
        />
        <StatCard 
          title="Active Customers"
          value="3,872"
          icon={Users}
          trend="up"
          trendValue="+5.7% from last month"
          iconColor="bg-purple-500"
          className="animate-in-up [animation-delay:300ms]"
        />
        <StatCard 
          title="Conversion Rate"
          value="5.24%"
          icon={BarChart3}
          trend="down"
          trendValue="-0.5% from last month"
          iconColor="bg-amber-500"
          className="animate-in-up [animation-delay:400ms]"
        />
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <RevenueChart className="lg:col-span-2 animate-in-up [animation-delay:500ms]" />
        <CustomerMap className="animate-in-up [animation-delay:600ms]" />
      </div>
      
      <RecentOrders className="animate-in-up [animation-delay:700ms]" />
    </div>
  );
};

export default Dashboard;
