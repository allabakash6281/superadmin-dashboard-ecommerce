
import React from 'react';
import { Badge } from '@/components/ui/badge';

interface RealTimeToggleProps {
  realTimeEnabled: boolean;
  setRealTimeEnabled: (enabled: boolean) => void;
}

const RealTimeToggle = ({ realTimeEnabled, setRealTimeEnabled }: RealTimeToggleProps) => {
  return (
    <div className="flex items-center space-x-2">
      <div className="flex items-center">
        <div className="mr-2">
          <span className={`relative flex h-3 w-3 ${realTimeEnabled ? 'opacity-100' : 'opacity-50'}`}>
            <span className={`animate-ping absolute inline-flex h-full w-full rounded-full ${realTimeEnabled ? 'bg-green-400' : 'bg-gray-400'} opacity-75`}></span>
            <span className={`relative inline-flex rounded-full h-3 w-3 ${realTimeEnabled ? 'bg-green-500' : 'bg-gray-500'}`}></span>
          </span>
        </div>
        <Badge 
          variant={realTimeEnabled ? "default" : "outline"} 
          onClick={() => setRealTimeEnabled(!realTimeEnabled)}
          className="cursor-pointer"
        >
          {realTimeEnabled ? "Real-time: On" : "Real-time: Off"}
        </Badge>
      </div>
    </div>
  );
};

export default RealTimeToggle;
