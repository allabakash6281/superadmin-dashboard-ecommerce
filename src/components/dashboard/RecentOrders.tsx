
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { cn } from '@/lib/utils';

interface RecentOrdersProps {
  className?: string;
}

interface Order {
  id: string;
  customer: {
    name: string;
    avatar?: string;
    initials: string;
  };
  date: string;
  amount: string;
  status: 'pending' | 'processing' | 'completed' | 'failed';
  items: number;
}

const orders: Order[] = [
  {
    id: 'ORD-001',
    customer: {
      name: 'Alex Johnson',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&q=80',
      initials: 'AJ',
    },
    date: '2 min ago',
    amount: '$120.99',
    status: 'completed',
    items: 3,
  },
  {
    id: 'ORD-002',
    customer: {
      name: 'Sarah Parker',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&q=80',
      initials: 'SP',
    },
    date: '28 min ago',
    amount: '$84.50',
    status: 'processing',
    items: 2,
  },
  {
    id: 'ORD-003',
    customer: {
      name: 'Michael Chen',
      initials: 'MC',
    },
    date: '1 hour ago',
    amount: '$199.99',
    status: 'pending',
    items: 4,
  },
  {
    id: 'ORD-004',
    customer: {
      name: 'Emily Nguyen',
      avatar: 'https://images.unsplash.com/photo-1489424731084-a5d8b219a5bb?w=100&q=80',
      initials: 'EN',
    },
    date: '3 hours ago',
    amount: '$45.25',
    status: 'completed',
    items: 1,
  },
  {
    id: 'ORD-005',
    customer: {
      name: 'David Wilson',
      initials: 'DW',
    },
    date: '5 hours ago',
    amount: '$320.00',
    status: 'failed',
    items: 6,
  },
];

const statusStyles = {
  pending: "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-500",
  processing: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400",
  completed: "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400",
  failed: "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400",
};

const RecentOrders = ({ className }: RecentOrdersProps) => {
  return (
    <Card className={cn("overflow-hidden", className)}>
      <CardHeader className="pb-2">
        <CardTitle>Recent Orders</CardTitle>
        <CardDescription>Latest customer purchases</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {orders.map((order) => (
            <div 
              key={order.id}
              className="flex items-center justify-between p-3 rounded-lg transition-colors hover:bg-secondary/50"
            >
              <div className="flex items-center gap-3">
                <Avatar className="h-9 w-9 border border-border">
                  <AvatarImage src={order.customer.avatar} alt={order.customer.name} />
                  <AvatarFallback className="bg-primary/10 text-primary text-xs">
                    {order.customer.initials}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p className="text-sm font-medium">{order.customer.name}</p>
                  <p className="text-xs text-muted-foreground">{order.date}</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="text-right">
                  <p className="text-sm font-medium">{order.amount}</p>
                  <p className="text-xs text-muted-foreground">{order.items} item{order.items !== 1 ? 's' : ''}</p>
                </div>
                <Badge variant="outline" className={cn("text-xs", statusStyles[order.status])}>
                  {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                </Badge>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default RecentOrders;
