import { useState, useEffect } from "react";
import { ArrowRight, Thermometer, Droplets, Activity, Sun, Wind, Gauge, Leaf, Shield, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

interface WelcomePageProps {
  onGetStarted: () => void;
}

export const WelcomePage = ({ onGetStarted }: WelcomePageProps) => {
  const [currentFeature, setCurrentFeature] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
    const interval = setInterval(() => {
      setCurrentFeature((prev) => (prev + 1) % 3);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const features = [
    {
      title: "Smart Monitoring",
      description: "AI-powered environmental control",
      icon: <Gauge className="w-12 h-12" />,
      content: "Advanced sensors monitor 6 critical parameters in real-time to ensure optimal storage conditions."
    },
    {
      title: "Loss Prevention",
      description: "Reduce waste by up to 40%",
      icon: <Shield className="w-12 h-12" />,
      content: "Early warning systems and automated alerts help prevent spoilage before it happens."
    },
    {
      title: "Government Support",
      description: "Access funding opportunities",
      icon: <TrendingUp className="w-12 h-12" />,
      content: "Connect with subsidies and schemes designed to modernize onion farming infrastructure."
    }
  ];

  const parameters = [
    { name: "Temperature", icon: <Thermometer className="w-6 h-6" />, gradient: "from-red-400 to-orange-500" },
    { name: "Humidity", icon: <Droplets className="w-6 h-6" />, gradient: "from-blue-400 to-cyan-500" },
    { name: "Vibration", icon: <Activity className="w-6 h-6" />, gradient: "from-purple-400 to-pink-500" },
    { name: "Light", icon: <Sun className="w-6 h-6" />, gradient: "from-yellow-400 to-orange-400" },
    { name: "Ammonia", icon: <Wind className="w-6 h-6" />, gradient: "from-green-400 to-emerald-500" },
    { name: "CO2", icon: <Gauge className="w-6 h-6" />, gradient: "from-indigo-400 to-blue-500" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-green-50 to-orange-50 relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-primary/5 via-transparent to-accent/5" />
        <div className="absolute top-20 left-20 w-64 h-64 bg-primary/10 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-32 right-32 w-48 h-48 bg-accent/10 rounded-full blur-2xl animate-float" style={{ animationDelay: '2s' }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-green-200/20 rounded-full blur-3xl animate-pulse" />
      </div>

      <div className="relative z-10">
        {/* Hero Section */}
        <div className="container mx-auto px-6 pt-20 pb-16">
          <div className={`text-center transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <div className="flex justify-center mb-8">
              <div className="relative">
                <div className="w-24 h-24 bg-gradient-to-br from-primary to-primary-light rounded-2xl flex items-center justify-center shadow-xl">
                  <Leaf className="w-12 h-12 text-white" />
                </div>
                <div className="absolute -inset-4 bg-gradient-to-r from-primary/20 to-accent/20 rounded-3xl blur-xl -z-10 animate-pulse" />
              </div>
            </div>
            
            <h1 className="text-7xl font-black mb-6 bg-gradient-to-r from-primary via-green-600 to-accent bg-clip-text text-transparent">
              OnionGuard
            </h1>
            
            <p className="text-2xl text-muted-foreground mb-4 max-w-3xl mx-auto font-medium">
              Revolutionary IoT monitoring system that extends onion storage life
            </p>
            
            <p className="text-lg text-muted-foreground/80 max-w-2xl mx-auto mb-12">
              Reduce losses, maximize profits, and get government funding support
            </p>

            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto mb-16">
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-soft border border-white/50">
                <div className="text-3xl font-bold text-primary mb-2">40%</div>
                <div className="text-sm text-muted-foreground">Loss Reduction</div>
              </div>
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-soft border border-white/50">
                <div className="text-3xl font-bold text-accent mb-2">24/7</div>
                <div className="text-sm text-muted-foreground">Live Monitoring</div>
              </div>
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-soft border border-white/50">
                <div className="text-3xl font-bold text-primary-light mb-2">₹50L+</div>
                <div className="text-sm text-muted-foreground">Govt. Schemes</div>
              </div>
            </div>
          </div>
        </div>

        {/* Features Section */}
        <div className="container mx-auto px-6 pb-16">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Dynamic Feature Card */}
            <div className="space-y-8">
              <Card className="bg-white/90 backdrop-blur-md border-0 shadow-strong overflow-hidden">
                <CardContent className="p-8">
                  <div className="flex items-center space-x-4 mb-6">
                    <div className={`w-16 h-16 bg-gradient-to-br from-primary to-primary-light rounded-xl flex items-center justify-center text-white transition-all duration-500`}>
                      {features[currentFeature].icon}
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-foreground">{features[currentFeature].title}</h3>
                      <p className="text-accent font-semibold">{features[currentFeature].description}</p>
                    </div>
                  </div>
                  <p className="text-muted-foreground text-lg leading-relaxed">
                    {features[currentFeature].content}
                  </p>
                </CardContent>
              </Card>

              {/* Feature Navigation */}
              <div className="flex justify-center space-x-3">
                {features.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentFeature(index)}
                    className={`h-2 rounded-full transition-all duration-300 ${
                      index === currentFeature 
                        ? 'w-8 bg-primary' 
                        : 'w-2 bg-muted hover:bg-primary/50'
                    }`}
                  />
                ))}
              </div>
            </div>

            {/* Parameters Grid */}
            <div className="space-y-8">
              <div className="text-center">
                <h2 className="text-4xl font-bold text-foreground mb-4">
                  Smart Sensors
                </h2>
                <p className="text-muted-foreground text-lg">
                  Monitor critical parameters with precision
                </p>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                {parameters.map((param, index) => (
                  <div
                    key={param.name}
                    className={`group bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-white/50 hover:shadow-medium transition-all duration-300 cursor-pointer hover:-translate-y-1`}
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <div className="flex flex-col items-center text-center space-y-3">
                      <div className={`w-12 h-12 bg-gradient-to-r ${param.gradient} rounded-xl flex items-center justify-center text-white group-hover:scale-110 transition-transform duration-300`}>
                        {param.icon}
                      </div>
                      <span className="text-foreground font-semibold">{param.name}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="container mx-auto px-6 pb-20">
          <div className="text-center bg-gradient-to-r from-primary to-primary-light rounded-3xl p-12 text-white shadow-strong">
            <h3 className="text-3xl font-bold mb-4">Ready to Transform Your Storage?</h3>
            <p className="text-xl opacity-90 mb-8 max-w-2xl mx-auto">
              Join thousands of farmers already using OnionGuard to protect their harvest
            </p>
            
            <Button 
              onClick={onGetStarted}
              size="lg"
              className="bg-white text-primary hover:bg-white/90 px-12 py-4 text-lg font-bold rounded-full shadow-strong hover:shadow-xl transition-all duration-300 hover:scale-105"
            >
              Start Monitoring Now
              <ArrowRight className="ml-3 w-6 h-6" />
            </Button>
            
            <div className="mt-6 flex items-center justify-center space-x-6 text-sm opacity-80">
              <div className="flex items-center space-x-2">
                <Shield className="w-4 h-4" />
                <span>Secure Login</span>
              </div>
              <div className="flex items-center space-x-2">
                <Activity className="w-4 h-4" />
                <span>Real-time Data</span>
              </div>
              <div className="flex items-center space-x-2">
                <TrendingUp className="w-4 h-4" />
                <span>Government Schemes</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};