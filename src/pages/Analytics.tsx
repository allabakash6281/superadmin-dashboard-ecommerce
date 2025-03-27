
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useRealTimeData } from '@/hooks/useRealTimeData';
import { 
  initialSalesByCategory, 
  initialSalesOverTime, 
  initialCustomerAcquisition, 
  initialTopProducts 
} from '@/components/analytics/initialData';
import { 
  updateSalesByCategory, 
  updateSalesOverTime, 
  updateCustomerAcquisition, 
  updateTopProducts 
} from '@/components/analytics/updateFunctions';
import SalesCharts from '@/components/analytics/SalesCharts';
import CustomerAcquisitionChart from '@/components/analytics/CustomerAcquisitionChart';
import TopProductsChart from '@/components/analytics/TopProductsChart';
import RealTimeToggle from '@/components/analytics/RealTimeToggle';

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
        <RealTimeToggle 
          realTimeEnabled={realTimeEnabled} 
          setRealTimeEnabled={setRealTimeEnabled} 
        />
      </div>
      
      <Tabs defaultValue="sales">
        <TabsList className="mb-6">
          <TabsTrigger value="sales">Sales</TabsTrigger>
          <TabsTrigger value="customers">Customers</TabsTrigger>
          <TabsTrigger value="products">Products</TabsTrigger>
        </TabsList>
        
        <TabsContent value="sales" className="space-y-6">
          <SalesCharts 
            salesOverTime={salesOverTime}
            salesOverTimeLoading={salesOverTimeLoading}
            salesOverTimeUpdated={salesOverTimeUpdated}
            salesByCategory={salesByCategory}
            salesByCategoryLoading={salesByCategoryLoading}
            salesByCategoryUpdated={salesByCategoryUpdated}
          />
        </TabsContent>
        
        <TabsContent value="customers" className="space-y-6">
          <CustomerAcquisitionChart 
            customerAcquisition={customerAcquisition}
            customerAcquisitionLoading={customerAcquisitionLoading}
            customerAcquisitionUpdated={customerAcquisitionUpdated}
          />
        </TabsContent>
        
        <TabsContent value="products" className="space-y-6">
          <TopProductsChart 
            topProducts={topProducts}
            topProductsLoading={topProductsLoading}
            topProductsUpdated={topProductsUpdated}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Analytics;
