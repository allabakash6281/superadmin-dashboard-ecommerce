
import React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import DataTable from '@/components/ui/DataTable';
import { Button } from '@/components/ui/button';
import { MoreHorizontal, Plus } from 'lucide-react';

interface Customer {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  initials: string;
  spent: number;
  orders: number;
  status: 'active' | 'inactive';
  lastOrder: string;
}

const customers: Customer[] = [
  {
    id: 'CUST-1001',
    name: 'Alex Johnson',
    email: 'alex.j@example.com',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&q=80',
    initials: 'AJ',
    spent: 1249.99,
    orders: 8,
    status: 'active',
    lastOrder: '2 days ago',
  },
  {
    id: 'CUST-1002',
    name: 'Sarah Parker',
    email: 'sparker@example.com',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&q=80',
    initials: 'SP',
    spent: 842.50,
    orders: 5,
    status: 'active',
    lastOrder: '5 days ago',
  },
  {
    id: 'CUST-1003',
    name: 'Michael Chen',
    email: 'mchen@example.com',
    initials: 'MC',
    spent: 1599.99,
    orders: 12,
    status: 'active',
    lastOrder: '1 week ago',
  },
  {
    id: 'CUST-1004',
    name: 'Emily Nguyen',
    email: 'emily.n@example.com',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&q=80',
    initials: 'EN',
    spent: 345.25,
    orders: 3,
    status: 'active',
    lastOrder: '2 weeks ago',
  },
  {
    id: 'CUST-1005',
    name: 'David Wilson',
    email: 'dwilson@example.com',
    initials: 'DW',
    spent: 2120.00,
    orders: 15,
    status: 'inactive',
    lastOrder: '3 months ago',
  },
  {
    id: 'CUST-1006',
    name: 'Lisa Rodriguez',
    email: 'lrodriguez@example.com',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=200&q=80',
    initials: 'LR',
    spent: 459.99,
    orders: 4,
    status: 'active',
    lastOrder: '3 days ago',
  },
  {
    id: 'CUST-1007',
    name: 'Robert Kim',
    email: 'rkim@example.com',
    initials: 'RK',
    spent: 749.95,
    orders: 6,
    status: 'active',
    lastOrder: '1 day ago',
  },
  {
    id: 'CUST-1008',
    name: 'Jessica Martinez',
    email: 'jmartinez@example.com',
    avatar: 'https://images.unsplash.com/photo-1491349174775-aaafddd81942?w=200&q=80',
    initials: 'JM',
    spent: 289.99,
    orders: 2,
    status: 'inactive',
    lastOrder: '5 months ago',
  },
  {
    id: 'CUST-1009',
    name: 'Brian Taylor',
    email: 'btaylor@example.com',
    initials: 'BT',
    spent: 1075.50,
    orders: 7,
    status: 'active',
    lastOrder: '4 days ago',
  },
  {
    id: 'CUST-1010',
    name: 'Olivia Scott',
    email: 'oscott@example.com',
    avatar: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=200&q=80',
    initials: 'OS',
    spent: 929.99,
    orders: 9,
    status: 'active',
    lastOrder: '1 week ago',
  },
];

const statusStyles = {
  'active': "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400",
  'inactive': "bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-400",
};

const columns = [
  {
    id: 'name',
    header: 'Customer',
    cell: (customer: Customer) => (
      <div className="flex items-center gap-3">
        <Avatar className="h-9 w-9 border border-border">
          <AvatarImage src={customer.avatar} alt={customer.name} />
          <AvatarFallback className="bg-primary/10 text-primary text-xs">
            {customer.initials}
          </AvatarFallback>
        </Avatar>
        <div>
          <p className="font-medium">{customer.name}</p>
          <p className="text-xs text-muted-foreground">{customer.email}</p>
        </div>
      </div>
    ),
  },
  {
    id: 'spent',
    header: 'Spent',
    cell: (customer: Customer) => (
      <div>
        <p className="font-medium">${customer.spent.toFixed(2)}</p>
        <p className="text-xs text-muted-foreground">{customer.orders} order{customer.orders !== 1 ? 's' : ''}</p>
      </div>
    ),
  },
  {
    id: 'status',
    header: 'Status',
    cell: (customer: Customer) => (
      <Badge variant="outline" className={statusStyles[customer.status]}>
        {customer.status.charAt(0).toUpperCase() + customer.status.slice(1)}
      </Badge>
    ),
  },
  {
    id: 'lastOrder',
    header: 'Last Order',
    cell: (customer: Customer) => <span>{customer.lastOrder}</span>,
  },
  {
    id: 'actions',
    header: '',
    cell: () => (
      <Button variant="ghost" size="icon" className="h-8 w-8">
        <MoreHorizontal className="h-4 w-4" />
      </Button>
    ),
    className: 'text-right',
  },
];

const Customers = () => {
  return (
    <div className="space-y-6 animate-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Customers</h1>
          <p className="text-muted-foreground">View and manage your customer base.</p>
        </div>
        <Button className="gap-1">
          <Plus className="h-4 w-4" />
          Add Customer
        </Button>
      </div>
      
      <DataTable data={customers} columns={columns} />
    </div>
  );
};

export default Customers;
