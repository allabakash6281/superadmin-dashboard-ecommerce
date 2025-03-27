
import React from 'react';
import { NavLink } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { 
  LayoutDashboard, 
  Package, 
  ShoppingCart, 
  Users, 
  BarChart4, 
  Settings,
  ChevronLeft,
  ChevronRight,
  LogOut
} from 'lucide-react';

interface SidebarProps {
  collapsed: boolean;
  setCollapsed: (collapsed: boolean) => void;
}

interface NavItemProps {
  to: string;
  icon: React.ElementType;
  label: string;
  collapsed: boolean;
}

const NavItem = ({ to, icon: Icon, label, collapsed }: NavItemProps) => {
  return (
    <NavLink
      to={to}
      className={({ isActive }) => 
        cn(
          "flex items-center gap-3 px-3 py-2 rounded-md transition-all duration-200 group",
          collapsed ? "justify-center" : "",
          isActive 
            ? "bg-sidebar-accent text-sidebar-accent-foreground font-medium" 
            : "text-sidebar-foreground/80 hover:bg-sidebar-accent/50 hover:text-sidebar-foreground"
        )
      }
    >
      <Icon className="h-5 w-5 shrink-0" />
      {!collapsed && <span className="animate-in-right">{label}</span>}
      {collapsed && (
        <span className="absolute left-full ml-2 p-1 px-2 rounded-md bg-sidebar-background border border-sidebar-border text-sidebar-foreground text-xs whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity shadow-elevation z-50">
          {label}
        </span>
      )}
    </NavLink>
  );
};

const Sidebar = ({ collapsed, setCollapsed }: SidebarProps) => {
  return (
    <aside
      className={cn(
        "bg-sidebar h-screen border-r border-sidebar-border relative transition-all duration-300 flex flex-col",
        collapsed ? "w-[70px]" : "w-[240px]"
      )}
    >
      <div className="flex items-center h-16 px-3 border-b border-sidebar-border">
        {!collapsed ? (
          <h1 className="font-semibold text-lg truncate animate-in-right">E-Commerce Admin</h1>
        ) : (
          <div className="w-full flex justify-center">
            <span className="font-semibold text-lg">E</span>
          </div>
        )}
      </div>

      <div className="absolute -right-3 top-16 bg-background border border-border rounded-full p-1 cursor-pointer shadow-subtle" onClick={() => setCollapsed(!collapsed)}>
        {collapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
      </div>

      <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto scrollbar-hidden">
        <NavItem to="/" icon={LayoutDashboard} label="Dashboard" collapsed={collapsed} />
        <NavItem to="/products" icon={Package} label="Products" collapsed={collapsed} />
        <NavItem to="/orders" icon={ShoppingCart} label="Orders" collapsed={collapsed} />
        <NavItem to="/customers" icon={Users} label="Customers" collapsed={collapsed} />
        <NavItem to="/analytics" icon={BarChart4} label="Analytics" collapsed={collapsed} />
      </nav>

      <div className="px-3 py-4 border-t border-sidebar-border mt-auto">
        <NavItem to="/settings" icon={Settings} label="Settings" collapsed={collapsed} />
        <button className={cn(
          "flex items-center gap-3 px-3 py-2 w-full rounded-md transition-all duration-200 text-sidebar-foreground/80 hover:bg-destructive/10 hover:text-destructive group",
          collapsed ? "justify-center" : ""
        )}>
          <LogOut className="h-5 w-5 shrink-0" />
          {!collapsed && <span className="animate-in-right">Log Out</span>}
          {collapsed && (
            <span className="absolute left-full ml-2 p-1 px-2 rounded-md bg-sidebar-background border border-sidebar-border text-sidebar-foreground text-xs whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity shadow-elevation z-50">
              Log Out
            </span>
          )}
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
