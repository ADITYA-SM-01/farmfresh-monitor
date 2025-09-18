import { useState, useEffect } from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

interface DataPoint {
  time: string;
  value: number;
  timestamp: Date;
}

interface ParameterGraphProps {
  parameterId: string;
  parameterName: string;
  color: string;
}

export const ParameterGraph = ({ parameterId, parameterName, color }: ParameterGraphProps) => {
  const [data, setData] = useState<DataPoint[]>([]);

  // Generate initial data points
  useEffect(() => {
    const generateInitialData = () => {
      const points: DataPoint[] = [];
      const now = new Date();
      
      // Generate data for the last 30 minutes
      for (let i = 30; i >= 0; i--) {
        const timestamp = new Date(now.getTime() - i * 60000); // Every minute
        const baseValue = getBaseValue(parameterId);
        const variation = (Math.random() - 0.5) * getVariationRange(parameterId);
        
        points.push({
          time: timestamp.toLocaleTimeString('en-US', { 
            hour12: false, 
            hour: '2-digit', 
            minute: '2-digit' 
          }),
          value: baseValue + variation,
          timestamp
        });
      }
      
      return points;
    };

    setData(generateInitialData());
  }, [parameterId]);

  // Simulate live data updates
  useEffect(() => {
    const interval = setInterval(() => {
      setData(prevData => {
        const newData = [...prevData];
        const now = new Date();
        const baseValue = getBaseValue(parameterId);
        const variation = (Math.random() - 0.5) * getVariationRange(parameterId);
        
        // Add new data point
        newData.push({
          time: now.toLocaleTimeString('en-US', { 
            hour12: false, 
            hour: '2-digit', 
            minute: '2-digit' 
          }),
          value: baseValue + variation,
          timestamp: now
        });
        
        // Keep only last 30 data points
        return newData.slice(-30);
      });
    }, 2000); // Update every 2 seconds

    return () => clearInterval(interval);
  }, [parameterId]);

  const getBaseValue = (paramId: string): number => {
    const baseValues: Record<string, number> = {
      temperature: 12.5,
      humidity: 65,
      vibration: 0.02,
      light: 150,
      ammonia: 2.1,
      co2: 380
    };
    return baseValues[paramId] || 0;
  };

  const getVariationRange = (paramId: string): number => {
    const ranges: Record<string, number> = {
      temperature: 3,
      humidity: 10,
      vibration: 0.01,
      light: 30,
      ammonia: 0.5,
      co2: 20
    };
    return ranges[paramId] || 1;
  };

  const getUnit = (paramId: string): string => {
    const units: Record<string, string> = {
      temperature: '°C',
      humidity: '%',
      vibration: 'g',
      light: 'lux',
      ammonia: 'ppm',
      co2: 'ppm'
    };
    return units[paramId] || '';
  };

  const getColor = (colorName: string): string => {
    const colors: Record<string, string> = {
      temp: '#ef4444',
      humidity: '#3b82f6',
      vibration: '#8b5cf6',
      light: '#eab308',
      ammonia: '#ec4899',
      co2: '#06b6d4',
      primary: '#4ade80'
    };
    return colors[colorName] || colors.primary;
  };

  const formatTooltipValue = (value: number): string => {
    const unit = getUnit(parameterId);
    if (parameterId === 'temperature' || parameterId === 'vibration') {
      return `${value.toFixed(2)} ${unit}`;
    }
    return `${Math.round(value)} ${unit}`;
  };

  return (
    <div className="w-full h-96 p-4">
      <div className="mb-4">
        <h3 className="text-lg font-semibold text-foreground mb-2">
          {parameterName} - Live Monitoring
        </h3>
        <div className="flex items-center space-x-4 text-sm text-muted-foreground">
          <span>Last 30 minutes</span>
          <div className="flex items-center space-x-1">
            <div 
              className="w-3 h-3 rounded-full animate-pulse" 
              style={{ backgroundColor: getColor(color) }}
            />
            <span>Live Data</span>
          </div>
        </div>
      </div>
      
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
          <XAxis 
            dataKey="time" 
            tick={{ fontSize: 12 }}
            interval="preserveStartEnd"
          />
          <YAxis 
            tick={{ fontSize: 12 }}
            domain={['dataMin - 5', 'dataMax + 5']}
          />
          <Tooltip 
            labelStyle={{ color: '#374151' }}
            contentStyle={{ 
              backgroundColor: 'white', 
              border: '1px solid #e5e7eb',
              borderRadius: '8px',
              boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
            }}
            formatter={(value: number) => [formatTooltipValue(value), parameterName]}
          />
          <Line 
            type="monotone" 
            dataKey="value" 
            stroke={getColor(color)}
            strokeWidth={3}
            dot={false}
            activeDot={{ r: 6, fill: getColor(color) }}
            filter="drop-shadow(0 2px 4px rgba(0,0,0,0.1))"
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};
