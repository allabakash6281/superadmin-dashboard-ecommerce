
import React from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ChevronLeft, ChevronRight, Search } from 'lucide-react';
import { cn } from '@/lib/utils';

interface DataTableProps<T> {
  data: T[];
  columns: {
    id: string;
    header: string;
    cell: (item: T) => React.ReactNode;
    className?: string;
  }[];
  searchable?: boolean;
  pagination?: boolean;
  className?: string;
}

const DataTable = <T extends {}>({
  data,
  columns,
  searchable = true,
  pagination = true,
  className
}: DataTableProps<T>) => {
  return (
    <div className={cn("space-y-4", className)}>
      {searchable && (
        <div className="flex items-center justify-between">
          <div className="relative max-w-sm">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input 
              type="search" 
              placeholder="Search..." 
              className="w-full pl-9 focus-visible:ring-primary/30"
            />
          </div>
          <div className="flex items-center gap-2">
            <Select defaultValue="10">
              <SelectTrigger className="w-[80px]">
                <SelectValue placeholder="10" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="10">10</SelectItem>
                <SelectItem value="20">20</SelectItem>
                <SelectItem value="50">50</SelectItem>
                <SelectItem value="100">100</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline" size="sm">
              Export
            </Button>
          </div>
        </div>
      )}
      
      <div className="rounded-md border overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              {columns.map((column) => (
                <TableHead key={column.id} className={column.className}>
                  {column.header}
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.length > 0 ? (
              data.map((item, idx) => (
                <TableRow key={idx}>
                  {columns.map((column) => (
                    <TableCell key={column.id} className={column.className}>
                      {column.cell(item)}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-24 text-center">
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      
      {pagination && (
        <div className="flex items-center justify-between">
          <p className="text-sm text-muted-foreground">
            Showing <span className="font-medium">1</span> to <span className="font-medium">{data.length}</span> of <span className="font-medium">{data.length}</span> results
          </p>
          <div className="flex items-center gap-1">
            <Button variant="outline" size="icon" disabled>
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="sm" className="font-medium">
              1
            </Button>
            <Button variant="outline" size="icon" disabled>
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default DataTable;
