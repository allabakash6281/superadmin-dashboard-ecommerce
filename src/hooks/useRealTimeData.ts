
import { useState, useEffect } from 'react';
import { toast } from '@/hooks/use-toast';

interface RealTimeOptions {
  interval?: number;
  enableToasts?: boolean;
}

/**
 * A hook that simulates real-time data updates
 * In a real application, this would connect to a WebSocket or Server-Sent Events
 */
export function useRealTimeData<T>(
  initialData: T,
  updateFn: (currentData: T) => T,
  options: RealTimeOptions = {}
): { data: T; isLoading: boolean; lastUpdated: Date | null } {
  const { interval = 5000, enableToasts = false } = options;
  const [data, setData] = useState<T>(initialData);
  const [isLoading, setIsLoading] = useState(false);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);

  useEffect(() => {
    // Initial update
    setData(initialData);
    
    // Set up the interval for simulating real-time updates
    const intervalId = setInterval(() => {
      setIsLoading(true);
      
      // Simulate a slight delay for the update
      setTimeout(() => {
        // Update the data using the provided update function
        setData(prevData => {
          const updatedData = updateFn(prevData);
          
          // Show a toast notification if enabled
          if (enableToasts) {
            toast({
              title: "Data Updated",
              description: `Analytics data refreshed at ${new Date().toLocaleTimeString()}`,
              duration: 3000,
            });
          }
          
          setLastUpdated(new Date());
          setIsLoading(false);
          return updatedData;
        });
      }, 300);
    }, interval);
    
    // Clean up the interval when the component unmounts
    return () => clearInterval(intervalId);
  }, [initialData, updateFn, interval, enableToasts]);
  
  return { data, isLoading, lastUpdated };
}

