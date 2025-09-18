import { useState, useEffect } from "react";
import { 
  Thermometer, 
  Droplets, 
  Activity, 
  Sun, 
  Wind, 
  Gauge,
  TrendingUp,
  Bell,
  Settings,
  Info,
  Gift,
  CloudSun,
  Clock,
  Calendar,
  CircleDot,
  Zap,
  Battery,
  BatteryCharging,
  Plug,
  Power,
  Cpu
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { ParameterGraph } from "./ParameterGraph";
import { Navigation } from "./Navigation";

interface Parameter {
  id: string;
  name: string;
  icon: React.ReactNode;
  value: number;
  unit: string;
  status: 'good' | 'warning' | 'critical';
  trend: 'up' | 'down' | 'stable';
  color: string;
  type: 'system' | 'container';
  description?: string;
}

interface DashboardProps {
  userInfo: {
    email: string;
    username: string;
    productId: string;
  };
  onNavigate: (page: string) => void;
  onLogout: () => void;
}

export const Dashboard = ({ userInfo, onNavigate, onLogout }: DashboardProps) => {
  const [selectedParameter, setSelectedParameter] = useState<string | null>(null);
  const [storageStartDate] = useState<Date>(new Date('2025-09-01')); // Example start date
  const [onionCondition, setOnionCondition] = useState<'Excellent' | 'Good' | 'Fair' | 'Poor'>('Excellent');
  const [activeView, setActiveView] = useState<'system' | 'container'>('system');
  const [parameters, setParameters] = useState<Parameter[]>([
    // System Parameters
    {
      id: 'voltage',
      name: 'System Voltage',
      icon: <Zap className="w-8 h-8" />,
      value: 12.2,
      unit: 'V',
      status: 'good',
      trend: 'stable',
      color: 'yellow',
      type: 'system',
      description: 'Main power supply voltage'
    },
    {
      id: 'current',
      name: 'Current Draw',
      icon: <Plug className="w-8 h-8" />,
      value: 1.8,
      unit: 'A',
      status: 'good',
      trend: 'stable',
      color: 'blue',
      type: 'system',
      description: 'System current consumption'
    },
    {
      id: 'power',
      name: 'Power Usage',
      icon: <Power className="w-8 h-8" />,
      value: 22,
      unit: 'W',
      status: 'good',
      trend: 'down',
      color: 'green',
      type: 'system',
      description: 'Active power consumption'
    },
    {
      id: 'energy',
      name: 'Energy Today',
      icon: <Cpu className="w-8 h-8" />,
      value: 0.45,
      unit: 'kWh',
      status: 'good',
      trend: 'up',
      color: 'orange',
      type: 'system',
      description: 'Daily energy consumption'
    },
    {
      id: 'battery',
      name: 'Battery Status',
      icon: <BatteryCharging className="w-8 h-8" />,
      value: 85,
      unit: '%',
      status: 'good',
      trend: 'up',
      color: 'green',
      type: 'system',
      description: 'Backup battery charge level'
    },
    // Container Parameters
    {
      id: 'temperature',
      name: 'Temperature',
      icon: <Thermometer className="w-8 h-8" />,
      value: 12.5,
      unit: '°C',
      status: 'good',
      trend: 'stable',
      color: 'temp',
      type: 'container',
      description: 'Storage temperature'
    },
    {
      id: 'humidity',
      name: 'Humidity',
      icon: <Droplets className="w-8 h-8" />,
      value: 65,
      unit: '%',
      status: 'good',
      trend: 'down',
      color: 'humidity',
      type: 'container',
      description: 'Relative humidity level'
    },
    {
      id: 'vibration',
      name: 'Vibration',
      icon: <Activity className="w-8 h-8" />,
      value: 0.02,
      unit: 'g',
      status: 'good',
      trend: 'stable',
      color: 'vibration',
      type: 'container',
      description: 'Mechanical vibration'
    },
    {
      id: 'light',
      name: 'Light Intensity',
      icon: <Sun className="w-8 h-8" />,
      value: 150,
      unit: 'lux',
      status: 'warning',
      trend: 'up',
      color: 'light',
      type: 'container',
      description: 'Ambient light level'
    },
    {
      id: 'ammonia',
      name: 'Ammonia (NH₃)',
      icon: <Wind className="w-8 h-8" />,
      value: 2.1,
      unit: 'ppm',
      status: 'good',
      trend: 'down',
      color: 'ammonia',
      type: 'container',
      description: 'Ammonia concentration'
    },
    {
      id: 'co2',
      name: 'Carbon Dioxide',
      icon: <Gauge className="w-8 h-8" />,
      value: 380,
      unit: 'ppm',
      status: 'good',
      trend: 'stable',
      color: 'co2',
      type: 'container',
      description: 'CO₂ concentration'
    }
  ]);

  // Define parameter thresholds
  const thresholds = {
    // System Parameters
    voltage: { min: 11.5, max: 12.8 },
    current: { min: 0, max: 2.5 },
    power: { min: 0, max: 30 },
    energy: { min: 0, max: 1.0 },
    battery: { min: 20, max: 100 },
    // Container Parameters
    temperature: { min: 8, max: 18 },
    humidity: { min: 60, max: 80 },
    vibration: { min: 0, max: 0.05 },
    light: { min: 0, max: 200 },
    ammonia: { min: 0, max: 5 },
    co2: { min: 300, max: 500 }
  };

  // Check if parameter is out of threshold
  const isOutOfThreshold = (param: Parameter) => {
    const threshold = thresholds[param.id as keyof typeof thresholds];
    if (!threshold) return false; // Skip threshold check if not defined
    return param.value < threshold.min || param.value > threshold.max;
  };

  // Update onion condition based on parameters
  useEffect(() => {
    const checkOnionCondition = (params: Parameter[]) => {
      const temp = params.find(p => p.id === 'temperature')?.value || 0;
      const humidity = params.find(p => p.id === 'humidity')?.value || 0;
      const ammonia = params.find(p => p.id === 'ammonia')?.value || 0;

      if (temp >= 10 && temp <= 15 && humidity >= 65 && humidity <= 75 && ammonia < 3) {
        return 'Excellent';
      } else if (temp >= 8 && temp <= 18 && humidity >= 60 && humidity <= 80 && ammonia < 4) {
        return 'Good';
      } else if (temp >= 5 && temp <= 20 && humidity >= 55 && humidity <= 85 && ammonia < 5) {
        return 'Fair';
      } else {
        return 'Poor';
      }
    };

    const intervalId = setInterval(() => {
      setParameters(prev => {
        const updatedParams = prev.map(param => {
          const newValue = param.value + (Math.random() - 0.5) * 4;
          const threshold = thresholds[param.id as keyof typeof thresholds];
          
          let newStatus: 'good' | 'warning' | 'critical' = 'good';
          if (newValue < threshold.min || newValue > threshold.max) {
            newStatus = 'critical';
          } else if (
            newValue < threshold.min + (threshold.max - threshold.min) * 0.1 || 
            newValue > threshold.max - (threshold.max - threshold.min) * 0.1
          ) {
            newStatus = 'warning';
          }

          return {
            ...param,
            value: Math.max(0, newValue),
            status: newStatus,
            trend: Math.random() > 0.7 ? (Math.random() > 0.5 ? 'up' : 'down') : param.trend
          };
        });

        // Update onion condition based on new parameters
        setOnionCondition(checkOnionCondition(updatedParams));

        return updatedParams;
      });
    }, 5000);

    return () => clearInterval(intervalId);
  }, []);

  // Simulate live data updates with threshold checking
  useEffect(() => {
    const interval = setInterval(() => {
      setParameters(prev => prev.map(param => {
        const newValue = param.value + (Math.random() - 0.5) * 4; // More variation for demo
        const threshold = thresholds[param.id as keyof typeof thresholds];
        
        let newStatus: 'good' | 'warning' | 'critical' = 'good';
        if (newValue < threshold.min || newValue > threshold.max) {
          newStatus = 'critical';
        } else if (
          newValue < threshold.min + (threshold.max - threshold.min) * 0.1 || 
          newValue > threshold.max - (threshold.max - threshold.min) * 0.1
        ) {
          newStatus = 'warning';
        }

        return {
          ...param,
          value: Math.max(0, newValue),
          status: newStatus,
          trend: Math.random() > 0.7 ? (Math.random() > 0.5 ? 'up' : 'down') : param.trend
        };
      }));
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'good': return 'text-green-600 bg-green-50';
      case 'warning': return 'text-yellow-600 bg-yellow-50';
      case 'critical': return 'text-red-600 bg-red-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'up': return <TrendingUp className="w-4 h-4 text-green-600" />;
      case 'down': return <TrendingUp className="w-4 h-4 text-red-600 rotate-180" />;
      default: return <div className="w-4 h-4 bg-gray-400 rounded-full" />;
    }
  };

  return (
      <div>
        <Navigation 
          userInfo={userInfo} 
          onNavigate={onNavigate} 
          currentPage="dashboard" 
          onLogout={onLogout}
        />
  
        <div className="container mx-auto px-6 py-8">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-8">
          <div>
            <h1 className="text-4xl font-bold gradient-primary bg-clip-text text-transparent mb-2">
              Storage Monitoring
            </h1>
            <p className="text-muted-foreground">
              Real-time environmental parameters for {userInfo.productId}
            </p>
          </div>
          <div className="flex items-center space-x-4 mt-4 lg:mt-0">
            <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
              <div className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse" />
              System Online
            </Badge>
            <Button variant="outline" size="sm" className="hover:bg-accent/10">
              <Bell className="w-4 h-4 mr-2" />
              Alerts
            </Button>
          </div>
        </div>

        {/* Storage Information */}
        <div className="mb-8">
          <Card className="bg-white/90 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="w-6 h-6 text-primary" />
                Storage Duration & Condition
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Storage Duration */}
                <div className="flex items-center space-x-4 bg-primary/5 rounded-lg p-4">
                  <div className="p-3 bg-primary/10 rounded-full">
                    <Clock className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Storage Duration</p>
                    <p className="text-xl font-bold text-primary">
                      {Math.floor((new Date().getTime() - storageStartDate.getTime()) / (1000 * 60 * 60 * 24))} days
                    </p>
                  </div>
                </div>

                {/* Start Date */}
                <div className="flex items-center space-x-4 bg-blue-50/50 rounded-lg p-4">
                  <div className="p-3 bg-blue-100/50 rounded-full">
                    <Calendar className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Start Date</p>
                    <p className="text-xl font-bold text-blue-600">
                      {storageStartDate.toLocaleDateString('en-US', { 
                        month: 'short', 
                        day: 'numeric', 
                        year: 'numeric' 
                      })}
                    </p>
                  </div>
                </div>

                {/* Onion Condition */}
                <div className="flex items-center space-x-4 bg-green-50/50 rounded-lg p-4">
                  <div className="p-3 bg-green-100/50 rounded-full">
                    <CircleDot className="w-6 h-6 text-green-600" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Onion Condition</p>
                    <div className="flex items-center gap-2">
                      <p className="text-xl font-bold text-green-600">{onionCondition}</p>
                      <div className={`w-2 h-2 rounded-full ${
                        onionCondition === 'Excellent' ? 'bg-green-500' :
                        onionCondition === 'Good' ? 'bg-green-400' :
                        onionCondition === 'Fair' ? 'bg-yellow-500' :
                        'bg-red-500'
                      } animate-pulse`} />
                    </div>
                  </div>
                </div>
              </div>

              {/* Storage Tips */}
              <div className="mt-6 p-4 bg-gradient-to-r from-primary/5 to-transparent rounded-lg border border-primary/10">
                <p className="text-sm text-muted-foreground">
                  <span className="font-semibold text-primary">Storage Tip:</span>{' '}
                  {onionCondition === 'Excellent' ? 'Maintain current storage conditions for optimal preservation.' :
                   onionCondition === 'Good' ? 'Monitor humidity levels closely to prevent sprouting.' :
                   onionCondition === 'Fair' ? 'Check ventilation and remove any damaged onions.' :
                   'Immediate attention required. Check storage conditions and segregate affected produce.'}
                </p>
              </div>
            </CardContent>
          </Card>
        </div>


        {/* Parameters Toggle and Section */}
        <div className="mb-8">
          <div className="flex flex-col items-center gap-6 mb-6">
            <ToggleGroup type="single" value={activeView} onValueChange={(value) => value && setActiveView(value as 'system' | 'container')}>
              <ToggleGroupItem value="system" aria-label="Show System Parameters" className="flex items-center gap-2">
                <Cpu className="w-4 h-4" />
                System
              </ToggleGroupItem>
              <ToggleGroupItem value="container" aria-label="Show Container Parameters" className="flex items-center gap-2">
                <Gauge className="w-4 h-4" />
                Container
              </ToggleGroupItem>
            </ToggleGroup>

            <div className="flex items-center gap-4 w-full">
              <div className="flex-1 border-t border-border/60"></div>
              <h2 className="text-2xl font-bold text-primary flex items-center gap-2">
                {activeView === 'system' ? (
                  <>
                    <Cpu className="w-6 h-6" />
                    System Parameters
                  </>
                ) : (
                  <>
                    <Gauge className="w-6 h-6" />
                    Container Parameters
                  </>
                )}
              </h2>
              <div className="flex-1 border-t border-border/60"></div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 mb-8">
            {parameters
              .filter(param => param.type === activeView)
              .map((param) => (
                <Card
                  key={param.id}
                  className={`parameter-card ${selectedParameter === param.id ? 'ring-2 ring-primary shadow-strong' : ''} ${
                    param.status === 'critical' ? 'critical' : ''
                  } ${isOutOfThreshold(param) ? 'danger-alert' : ''} hover:scale-[1.02] transition-all duration-200`}
                  onClick={() => setSelectedParameter(selectedParameter === param.id ? null : param.id)}
                >
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <div className={`text-${param.color} p-2 rounded-lg bg-${param.color}/10`}>
                        {param.icon}
                      </div>
                      <div className="flex items-center space-x-2">
                        {getTrendIcon(param.trend)}
                        <Badge 
                          variant="secondary" 
                          className={`text-xs ${getStatusColor(param.status)}`}
                        >
                          {param.status}
                        </Badge>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <h3 className="font-semibold text-foreground mb-1">{param.name}</h3>
                    <p className="text-xs text-muted-foreground mb-3">{param.description}</p>
                    <div className="flex items-baseline space-x-2">
                      <span className="text-2xl font-bold text-primary">
                        {param.value.toFixed(
                          param.unit === '°C' || param.unit === 'g' ? 1 :
                          param.unit === 'kWh' ? 2 : 0
                        )}
                      </span>
                      <span className="text-sm text-muted-foreground">{param.unit}</span>
                    </div>
                    {param.id === 'battery' && (
                      <div className="mt-2 h-2 bg-gray-200 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-green-500 transition-all duration-500"
                          style={{ width: `${param.value}%` }}
                        />
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
          </div>
        </div>

        {/* Live Graph Modal */}
        {selectedParameter && (
          <Card className="mb-8 shadow-strong border-primary/20">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-primary">
                  Live Data: {parameters.find(p => p.id === selectedParameter)?.name}
                </CardTitle>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setSelectedParameter(null)}
                >
                  Close
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <ParameterGraph 
                parameterId={selectedParameter}
                parameterName={parameters.find(p => p.id === selectedParameter)?.name || ''}
                color={parameters.find(p => p.id === selectedParameter)?.color || 'primary'}
              />
            </CardContent>
          </Card>
        )}

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="hover:shadow-medium transition-all duration-300 cursor-pointer" 
                onClick={() => onNavigate('schemes')}>
            <CardContent className="p-6 text-center">
              <Gift className="w-12 h-12 text-accent mx-auto mb-4" />
              <h3 className="font-semibold text-foreground mb-2">Government Schemes</h3>
              <p className="text-sm text-muted-foreground">
                Explore funding opportunities for farmers
              </p>
            </CardContent>
          </Card>

          {/* <Card className="hover:shadow-medium transition-all duration-300 cursor-pointer"
                onClick={() => onNavigate('about')}>
            <CardContent className="p-6 text-center">
              <Info className="w-12 h-12 text-primary mx-auto mb-4" />
              <h3 className="font-semibold text-foreground mb-2">About System</h3>
              <p className="text-sm text-muted-foreground">
                Learn about our hardware solution
              </p>
            </CardContent>
          </Card> */}

          <Card className="hover:shadow-medium transition-all duration-300 cursor-pointer"
                onClick={() => onNavigate('settings')}>
            <CardContent className="p-6 text-center">
              <Settings className="w-12 h-12 text-secondary-foreground mx-auto mb-4" />
              <h3 className="font-semibold text-foreground mb-2">Settings</h3>
              <p className="text-sm text-muted-foreground">
                Configure language and preferences
              </p>
            </CardContent>
          </Card>

          <Card className="hover:shadow-medium transition-all duration-300 cursor-pointer"
                onClick={() => onNavigate('weather')}>
            <CardContent className="p-6 text-center">
              <CloudSun className="w-12 h-12 text-blue-500 mx-auto mb-4" />
              <h3 className="font-semibold text-foreground mb-2">Weather Report</h3>
              <p className="text-sm text-muted-foreground">
                Check weather conditions for farming
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};