import { 
  Shield, 
  Cpu, 
  Wifi, 
  Battery, 
  Thermometer, 
  TrendingUp, 
  Users, 
  Award,
  Leaf,
  BarChart,
  Clock,
  CheckCircle
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Navigation } from "./Navigation";

interface AboutPageProps {
  userInfo: {
    email: string;
    username: string;
    productId: string;
  };
  onNavigate: (page: string) => void;
}

export const AboutPage = ({ userInfo, onNavigate }: AboutPageProps) => {
  const features = [
    {
      icon: <Thermometer className="w-8 h-8" />,
      title: "Multi-Sensor Monitoring",
      description: "Advanced sensors for temperature, humidity, gases, and environmental conditions"
    },
    {
      icon: <Wifi className="w-8 h-8" />,
      title: "Real-time Connectivity",
      description: "Continuous data transmission with IoT connectivity and cloud integration"
    },
    {
      icon: <Battery className="w-8 h-8" />,
      title: "Long Battery Life",
      description: "Efficient power management with solar charging capability for extended operation"
    },
    {
      icon: <Shield className="w-8 h-8" />,
      title: "Weather Resistant",
      description: "IP65 rated protection for harsh agricultural environments and conditions"
    }
  ];

  const benefits = [
    {
      icon: <TrendingUp className="w-6 h-6 text-green-600" />,
      title: "Reduce Storage Losses",
      description: "Up to 40% reduction in post-harvest losses through optimal storage conditions"
    },
    {
      icon: <BarChart className="w-6 h-6 text-blue-600" />,
      title: "Increase Profit Margins",
      description: "Better quality preservation leads to higher market prices and reduced wastage"
    },
    {
      icon: <Clock className="w-6 h-6 text-purple-600" />,
      title: "Extended Storage Life",
      description: "Increase onion storage life by 60-80% with precise environmental control"
    },
    {
      icon: <Leaf className="w-6 h-6 text-green-500" />,
      title: "Sustainable Farming",
      description: "Eco-friendly monitoring solution supporting sustainable agricultural practices"
    }
  ];

  const specifications = [
    { label: "Operating Temperature", value: "-20°C to +60°C" },
    { label: "Humidity Range", value: "0-100% RH" },
    { label: "Gas Detection", value: "NH₃, CO₂, H₂S, Ethylene" },
    { label: "Data Transmission", value: "4G/WiFi/LoRaWAN" },
    { label: "Battery Life", value: "2+ years (solar assisted)" },
    { label: "Sensor Accuracy", value: "±0.5°C, ±3%RH" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/30 to-secondary">
      <Navigation 
        userInfo={userInfo} 
        onNavigate={onNavigate} 
        currentPage="about"
        onLogout={() => onNavigate('welcome')}
      />

      <div className="container mx-auto px-6 py-8">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <div className="flex justify-center mb-6">
            <div className="w-20 h-20 gradient-hero rounded-3xl flex items-center justify-center shadow-strong animate-float">
              <Cpu className="w-10 h-10 text-white" />
            </div>
          </div>
          <h1 className="text-5xl font-bold gradient-primary bg-clip-text text-transparent mb-6">
            OnionGuard Hardware
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Revolutionary IoT-based monitoring system designed specifically for onion storage facilities. 
            Our hardware solution combines advanced sensors, AI analytics, and real-time monitoring 
            to maximize storage life and minimize post-harvest losses.
          </p>
        </div>

        {/* Problem & Solution */}
        <div className="grid lg:grid-cols-2 gap-12 mb-16">
          <Card className="shadow-medium border-0 bg-red-50/50">
            <CardHeader>
              <CardTitle className="text-2xl text-red-700 flex items-center">
                <TrendingUp className="w-6 h-6 mr-3 rotate-180" />
                The Challenge
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-red-500 rounded-full mt-2" />
                  <p className="text-muted-foreground">
                    <strong>25-40% post-harvest losses</strong> due to improper storage conditions
                  </p>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-red-500 rounded-full mt-2" />
                  <p className="text-muted-foreground">
                    <strong>Lack of real-time monitoring</strong> leads to delayed corrective actions
                  </p>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-red-500 rounded-full mt-2" />
                  <p className="text-muted-foreground">
                    <strong>Manual monitoring</strong> is time-consuming and often inaccurate
                  </p>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-red-500 rounded-full mt-2" />
                  <p className="text-muted-foreground">
                    <strong>Poor market prices</strong> for damaged or low-quality produce
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-medium border-0 bg-green-50/50">
            <CardHeader>
              <CardTitle className="text-2xl text-green-700 flex items-center">
                <CheckCircle className="w-6 h-6 mr-3" />
                Our Solution
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-green-500 rounded-full mt-2" />
                  <p className="text-muted-foreground">
                    <strong>24/7 automated monitoring</strong> of critical storage parameters
                  </p>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-green-500 rounded-full mt-2" />
                  <p className="text-muted-foreground">
                    <strong>AI-powered alerts</strong> for immediate corrective actions
                  </p>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-green-500 rounded-full mt-2" />
                  <p className="text-muted-foreground">
                    <strong>Remote access</strong> via mobile app and web dashboard
                  </p>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-green-500 rounded-full mt-2" />
                  <p className="text-muted-foreground">
                    <strong>Data-driven insights</strong> for optimal storage management
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Key Features */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center text-primary mb-12">
            Advanced Hardware Features
          </h2>
          <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <Card 
                key={index} 
                className="text-center shadow-medium hover:shadow-strong transition-all duration-300 hover:-translate-y-1 border-0"
              >
                <CardContent className="p-6">
                  <div className="flex justify-center mb-4">
                    <div className="w-16 h-16 gradient-primary rounded-2xl flex items-center justify-center text-white">
                      {feature.icon}
                    </div>
                  </div>
                  <h3 className="font-semibold text-foreground mb-3">{feature.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Benefits Section */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center text-primary mb-12">
            Measurable Benefits for Farmers
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            {benefits.map((benefit, index) => (
              <Card key={index} className="shadow-soft border-0 hover:shadow-medium transition-all duration-300">
                <CardContent className="p-6">
                  <div className="flex items-start space-x-4">
                    <div className="p-3 bg-muted rounded-xl">
                      {benefit.icon}
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground mb-2">{benefit.title}</h3>
                      <p className="text-muted-foreground leading-relaxed">
                        {benefit.description}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Technical Specifications */}
        <div className="grid lg:grid-cols-3 gap-8 mb-16">
          <div className="lg:col-span-2">
            <Card className="shadow-medium border-0">
              <CardHeader>
                <CardTitle className="text-2xl text-primary">Technical Specifications</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-4">
                  {specifications.map((spec, index) => (
                    <div key={index} className="flex justify-between items-center py-3 border-b border-border/50 last:border-0">
                      <span className="font-medium text-foreground">{spec.label}</span>
                      <span className="text-primary font-semibold">{spec.value}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-6">
            <Card className="shadow-soft border-0 text-center">
              <CardContent className="p-6">
                <Award className="w-12 h-12 text-accent mx-auto mb-4" />
                <h3 className="font-semibold text-foreground mb-2">ISO Certified</h3>
                <p className="text-sm text-muted-foreground">
                  Quality management system certified for agricultural equipment
                </p>
              </CardContent>
            </Card>

            <Card className="shadow-soft border-0 text-center">
              <CardContent className="p-6">
                <Users className="w-12 h-12 text-primary mx-auto mb-4" />
                <h3 className="font-semibold text-foreground mb-2">500+ Farmers</h3>
                <p className="text-sm text-muted-foreground">
                  Trusted by farmers across multiple states for onion storage
                </p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* CTA Section */}
        <Card className="gradient-hero text-white shadow-strong border-0">
          <CardContent className="p-12 text-center">
            <h2 className="text-3xl font-bold mb-4">Ready to Transform Your Storage?</h2>
            <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
              Join hundreds of progressive farmers who have already reduced their storage losses 
              and increased profitability with OnionGuard monitoring system.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg"
                className="bg-accent hover:bg-accent-light text-white px-8 font-semibold"
                onClick={() => onNavigate('dashboard')}
              >
                View Live Demo
              </Button>
              <Button 
                size="lg"
                variant="outline" 
                className="border-white/50 text-white hover:bg-white/10 px-8"
              >
                Request Quote
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};