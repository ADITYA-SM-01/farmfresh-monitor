import { useState } from "react";
import { ArrowRight, Thermometer, Droplets, Activity, Sun, Wind, Gauge } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface WelcomePageProps {
  onGetStarted: () => void;
}

export const WelcomePage = ({ onGetStarted }: WelcomePageProps) => {
  const [currentStep, setCurrentStep] = useState(0);

  const steps = [
    {
      title: "Welcome to OnionGuard",
      description: "Advanced monitoring system for onion storage facilities",
      icon: <Gauge className="w-16 h-16 text-primary" />,
      content: "Monitor temperature, humidity, gases, and environmental conditions to maximize onion storage life and minimize losses."
    },
    {
      title: "Real-time Monitoring",
      description: "Track 6 critical parameters",
      icon: <Activity className="w-16 h-16 text-accent" />,
      content: "Get live data on temperature, humidity, vibration, light intensity, ammonia levels, and CO2 concentration."
    },
    {
      title: "Government Schemes",
      description: "Access funding opportunities",
      icon: <Sun className="w-16 h-16 text-primary-light" />,
      content: "Discover government schemes and subsidies available for onion farmers and storage facility improvements."
    }
  ];

  const parameters = [
    { name: "Temperature", icon: <Thermometer className="w-8 h-8" />, color: "temp" },
    { name: "Humidity", icon: <Droplets className="w-8 h-8" />, color: "humidity" },
    { name: "Vibration", icon: <Activity className="w-8 h-8" />, color: "vibration" },
    { name: "Light", icon: <Sun className="w-8 h-8" />, color: "light" },
    { name: "Ammonia", icon: <Wind className="w-8 h-8" />, color: "ammonia" },
    { name: "CO2", icon: <Gauge className="w-8 h-8" />, color: "co2" },
  ];

  return (
    <div className="min-h-screen gradient-hero text-white relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-20 w-32 h-32 bg-white rounded-full animate-float" />
        <div className="absolute top-40 right-32 w-24 h-24 bg-accent rounded-full animate-float" style={{ animationDelay: '1s' }} />
        <div className="absolute bottom-32 left-1/3 w-40 h-40 bg-primary-light rounded-full animate-float" style={{ animationDelay: '2s' }} />
      </div>

      <div className="relative z-10 container mx-auto px-6 py-12">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-6xl font-bold mb-6 bg-gradient-to-r from-white to-accent-light bg-clip-text text-transparent">
            OnionGuard
          </h1>
          <p className="text-xl opacity-90 max-w-2xl mx-auto">
            Smart Storage Monitoring System for Maximum Onion Preservation
          </p>
        </div>

        {/* Main Content */}
        <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
          {/* Instructions Steps */}
          <div className="space-y-8">
            <Card className="bg-white/10 backdrop-blur-md border-white/20">
              <CardHeader className="text-center pb-4">
                <div className="flex justify-center mb-4">
                  {steps[currentStep].icon}
                </div>
                <CardTitle className="text-2xl text-white">{steps[currentStep].title}</CardTitle>
                <p className="text-accent-light font-medium">{steps[currentStep].description}</p>
              </CardHeader>
              <CardContent>
                <p className="text-white/90 text-center leading-relaxed">
                  {steps[currentStep].content}
                </p>
              </CardContent>
            </Card>

            {/* Step Navigation */}
            <div className="flex justify-center space-x-2">
              {steps.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentStep(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    index === currentStep 
                      ? 'bg-accent scale-125' 
                      : 'bg-white/30 hover:bg-white/50'
                  }`}
                />
              ))}
            </div>
          </div>

          {/* Parameters Overview */}
          <div className="space-y-6">
            <h2 className="text-3xl font-bold text-center text-white mb-8">
              Monitoring Parameters
            </h2>
            <div className="grid grid-cols-2 gap-4">
              {parameters.map((param, index) => (
                <div
                  key={param.name}
                  className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 hover:bg-white/20 transition-all duration-300 cursor-pointer group"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="flex flex-col items-center text-center space-y-3">
                    <div className={`text-${param.color} group-hover:scale-110 transition-transform duration-300`}>
                      {param.icon}
                    </div>
                    <span className="text-white font-medium">{param.name}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center">
          <Button 
            onClick={onGetStarted}
            size="lg"
            className="bg-accent hover:bg-accent-light text-white px-8 py-4 text-lg font-semibold rounded-full shadow-strong hover:shadow-accent/30 transition-all duration-300 hover:scale-105"
          >
            Get Started
            <ArrowRight className="ml-2 w-5 h-5" />
          </Button>
          <p className="mt-4 text-white/70">
            Start monitoring your onion storage facility today
          </p>
        </div>
      </div>
    </div>
  );
};