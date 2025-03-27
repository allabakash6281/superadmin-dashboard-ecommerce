
import React from 'react';
import { Badge } from '@/components/ui/badge';
import DataTable from '@/components/ui/DataTable';
import { Eye } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface Order {
  id: string;
  customer: {
    name: string;
    email: string;
  };
  date: string;
  total: number;
  items: number;
  payment: 'paid' | 'pending' | 'failed';
  fulfillment: 'processing' | 'shipped' | 'delivered' | 'cancelled';
}

const orders: Order[] = [
  {
    id: 'ORD-7412',
    customer: { name: 'Alex Johnson', email: 'alex.j@example.com' },
    date: '2023-06-16',
    total: 120.99,
    items: 3,
    payment: 'paid',
    fulfillment: 'delivered',
  },
  {
    id: 'ORD-7413',
    customer: { name: 'Sarah Parker', email: 'sparker@example.com' },
    date: '2023-06-16',
    total: 84.50,
    items: 2,
    payment: 'paid',
    fulfillment: 'shipped',
  },
  {
    id: 'ORD-7414',
    customer: { name: 'Michael Chen', email: 'mchen@example.com' },
    date: '2023-06-15',
    total: 199.99,
    items: 4,
    payment: 'pending',
    fulfillment: 'processing',
  },
  {
    id: 'ORD-7415',
    customer: { name: 'Emily Nguyen', email: 'emily.n@example.com' },
    date: '2023-06-15',
    total: 45.25,
    items: 1,
    payment: 'paid',
    fulfillment: 'delivered',
  },
  {
    id: 'ORD-7416',
    customer: { name: 'David Wilson', email: 'dwilson@example.com' },
    date: '2023-06-14',
    total: 320.00,
    items: 6,
    payment: 'failed',
    fulfillment: 'cancelled',
  },
  {
    id: 'ORD-7417',
    customer: { name: 'Lisa Rodriguez', email: 'lrodriguez@example.com' },
    date: '2023-06-14',
    total: 59.99,
    items: 1,
    payment: 'paid',
    fulfillment: 'shipped',
  },
  {
    id: 'ORD-7418',
    customer: { name: 'Robert Kim', email: 'rkim@example.com' },
    date: '2023-06-13',
    total: 149.95,
    items: 3,
    payment: 'paid',
    fulfillment: 'processing',
  },
  {
    id: 'ORD-7419',
    customer: { name: 'Jessica Martinez', email: 'jmartinez@example.com' },
    date: '2023-06-13',
    total: 89.99,
    items: 2,
    payment: 'pending',
    fulfillment: 'processing',
  },
  {
    id: 'ORD-7420',
    customer: { name: 'Brian Taylor', email: 'btaylor@example.com' },
    date: '2023-06-12',
    total: 275.50,
    items: 5,
    payment: 'paid',
    fulfillment: 'shipped',
  },
  {
    id: 'ORD-7421',
    customer: { name: 'Olivia Scott', email: 'oscott@example.com' },
    date: '2023-06-12',
    total: 129.99,
    items: 2,
    payment: 'paid',
    fulfillment: 'delivered',
  },
];

const paymentStatusStyles = {
  'paid': "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400",
  'pending': "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-500",
  'failed': "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400",
};

const fulfillmentStatusStyles = {
  'processing': "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400",
  'shipped': "bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400",
  'delivered': "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400",
  'cancelled': "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400",
};

const columns = [
  {
    id: 'id',
    header: 'Order ID',
    cell: (order: Order) => <span className="font-medium">{order.id}</span>,
  },
  {
    id: 'customer',
    header: 'Customer',
    cell: (order: Order) => (
      <div>
        <p className="font-medium">{order.customer.name}</p>
        <p className="text-xs text-muted-foreground">{order.customer.email}</p>
      </div>
    ),
  },
  {
    id: 'date',
    header: 'Date',
    cell: (order: Order) => <span>{order.date}</span>,
  },
  {
    id: 'total',
    header: 'Total',
    cell: (order: Order) => (
      <div>
        <p className="font-medium">${order.total.toFixed(2)}</p>
        <p className="text-xs text-muted-foreground">{order.items} item{order.items !== 1 ? 's' : ''}</p>
      </div>
    ),
  },
  {
    id: 'payment',
    header: 'Payment',
    cell: (order: Order) => (
      <Badge variant="outline" className={paymentStatusStyles[order.payment]}>
        {order.payment.charAt(0).toUpperCase() + order.payment.slice(1)}
      </Badge>
    ),
  },
  {
    id: 'fulfillment',
    header: 'Fulfillment',
    cell: (order: Order) => (
      <Badge variant="outline" className={fulfillmentStatusStyles[order.fulfillment]}>
        {order.fulfillment.charAt(0).toUpperCase() + order.fulfillment.slice(1)}
      </Badge>
    ),
  },
  {
    id: 'actions',
    header: '',
    cell: () => (
      <Button variant="ghost" size="icon" className="h-8 w-8">
        <Eye className="h-4 w-4" />
      </Button>
    ),
    className: 'text-right',
  },
];

const Orders = () => {
  return (
    <div className="space-y-6 animate-in">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Orders</h1>
        <p className="text-muted-foreground">View and manage customer orders.</p>
      </div>
      
      <DataTable data={orders} columns={columns} />
    </div>
  );
};

export default Orders;
