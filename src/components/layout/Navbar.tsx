
import React from 'react';
import { Bell, Search, Menu, X } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';

interface NavbarProps {
  sidebarCollapsed: boolean;
  setSidebarCollapsed: (collapsed: boolean) => void;
}

const Navbar = ({ sidebarCollapsed, setSidebarCollapsed }: NavbarProps) => {
  return (
    <header className="h-16 border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-30 transition-all duration-200">
      <div className="h-full flex items-center justify-between px-6">
        <div className="flex items-center gap-4">
          <Button 
            variant="ghost" 
            size="icon" 
            className="md:hidden" 
            onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
          >
            {sidebarCollapsed ? <Menu className="h-5 w-5" /> : <X className="h-5 w-5" />}
          </Button>
          
          <div className={cn(
            "relative transition-all duration-300 max-w-md",
            sidebarCollapsed ? "w-72" : "w-64"
          )}>
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input 
              type="search" 
              placeholder="Search..." 
              className="w-full bg-background pl-9 focus-visible:ring-primary/30"
            />
          </div>
        </div>
        
        <div className="flex items-center gap-4">
          <Button 
            variant="ghost" 
            size="icon" 
            className="relative" 
            aria-label="Notifications"
          >
            <Bell className="h-5 w-5" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-destructive rounded-full"></span>
          </Button>
          
          <div className="flex items-center gap-3">
            <Avatar className="h-8 w-8 border border-border">
              <AvatarImage src="https://github.com/shadcn.png" alt="Admin" />
              <AvatarFallback className="bg-primary/10 text-primary">AD</AvatarFallback>
            </Avatar>
            
            <div className="hidden md:block">
              <p className="text-sm font-medium leading-none">Admin User</p>
              <p className="text-xs text-muted-foreground">admin@example.com</p>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
