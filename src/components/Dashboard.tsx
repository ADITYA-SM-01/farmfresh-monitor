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
  Gift
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
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
}

interface DashboardProps {
  userInfo: {
    email: string;
    username: string;
    productId: string;
  };
  onNavigate: (page: string) => void;
}

export const Dashboard = ({ userInfo, onNavigate }: DashboardProps) => {
  const [selectedParameter, setSelectedParameter] = useState<string | null>(null);
  const [parameters, setParameters] = useState<Parameter[]>([
    {
      id: 'temperature',
      name: 'Temperature',
      icon: <Thermometer className="w-8 h-8" />,
      value: 12.5,
      unit: '°C',
      status: 'good',
      trend: 'stable',
      color: 'temp'
    },
    {
      id: 'humidity',
      name: 'Humidity',
      icon: <Droplets className="w-8 h-8" />,
      value: 65,
      unit: '%',
      status: 'good',
      trend: 'down',
      color: 'humidity'
    },
    {
      id: 'vibration',
      name: 'Vibration',
      icon: <Activity className="w-8 h-8" />,
      value: 0.02,
      unit: 'g',
      status: 'good',
      trend: 'stable',
      color: 'vibration'
    },
    {
      id: 'light',
      name: 'Light Intensity',
      icon: <Sun className="w-8 h-8" />,
      value: 150,
      unit: 'lux',
      status: 'warning',
      trend: 'up',
      color: 'light'
    },
    {
      id: 'ammonia',
      name: 'Ammonia (NH₃)',
      icon: <Wind className="w-8 h-8" />,
      value: 2.1,
      unit: 'ppm',
      status: 'good',
      trend: 'down',
      color: 'ammonia'
    },
    {
      id: 'co2',
      name: 'Carbon Dioxide',
      icon: <Gauge className="w-8 h-8" />,
      value: 380,
      unit: 'ppm',
      status: 'good',
      trend: 'stable',
      color: 'co2'
    }
  ]);

  // Simulate live data updates
  useEffect(() => {
    const interval = setInterval(() => {
      setParameters(prev => prev.map(param => ({
        ...param,
        value: param.value + (Math.random() - 0.5) * 2,
        trend: Math.random() > 0.7 ? (Math.random() > 0.5 ? 'up' : 'down') : param.trend
      })));
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
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/30 to-secondary">
      <Navigation 
        userInfo={userInfo} 
        onNavigate={onNavigate} 
        currentPage="dashboard" 
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

        {/* Parameters Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 mb-8">
          {parameters.map((param) => (
            <Card
              key={param.id}
              className={`parameter-card ${selectedParameter === param.id ? 'ring-2 ring-primary shadow-strong' : ''}`}
              onClick={() => setSelectedParameter(selectedParameter === param.id ? null : param.id)}
            >
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <div className={`text-${param.color}`}>
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
                <h3 className="font-semibold text-foreground mb-2">{param.name}</h3>
                <div className="flex items-baseline space-x-2">
                  <span className="text-2xl font-bold text-primary">
                    {param.value.toFixed(param.unit === '°C' || param.unit === 'g' ? 1 : 0)}
                  </span>
                  <span className="text-sm text-muted-foreground">{param.unit}</span>
                </div>
                <p className="text-xs text-muted-foreground mt-2">
                  Click for live graph
                </p>
              </CardContent>
            </Card>
          ))}
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

          <Card className="hover:shadow-medium transition-all duration-300 cursor-pointer"
                onClick={() => onNavigate('about')}>
            <CardContent className="p-6 text-center">
              <Info className="w-12 h-12 text-primary mx-auto mb-4" />
              <h3 className="font-semibold text-foreground mb-2">About System</h3>
              <p className="text-sm text-muted-foreground">
                Learn about our hardware solution
              </p>
            </CardContent>
          </Card>

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
        </div>
      </div>
    </div>
  );
};