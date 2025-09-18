import { useState } from "react";
import { Eye, EyeOff, User, Mail, Shield, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface LoginPageProps {
  onLogin: (credentials: { email: string; username: string; productId: string }) => void;
}

export const LoginPage = ({ onLogin }: LoginPageProps) => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    username: "",
    productId: "",
    password: ""
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onLogin({
      email: formData.email,
      username: formData.username,
      productId: formData.productId
    });
  };

  const handleInputChange = (field: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({ ...prev, [field]: e.target.value }));
  };

  return (
    <div className="min-h-screen gradient-earth flex items-center justify-center p-6 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-white rounded-full animate-pulse-glow" />
        <div className="absolute bottom-1/4 right-1/4 w-48 h-48 bg-accent rounded-full animate-float" />
      </div>

      <div className="relative z-10 w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <div className="w-16 h-16 gradient-primary rounded-2xl flex items-center justify-center shadow-strong">
              <Shield className="w-8 h-8 text-white" />
            </div>
          </div>
          <h1 className="text-3xl font-bold text-white mb-2">Welcome Back</h1>
          <p className="text-white/80">Access your onion monitoring dashboard</p>
        </div>

        {/* Login Form */}
        <Card className="bg-white/95 backdrop-blur-md shadow-strong border-0">
          <CardHeader>
            <CardTitle className="text-2xl text-center text-primary">
              Farm Login
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Email Field */}
              <div className="space-y-2">
                <Label htmlFor="email" className="text-foreground font-medium">
                  Email Address
                </Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 w-5 h-5 text-muted-foreground" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="farmer@example.com"
                    value={formData.email}
                    onChange={handleInputChange('email')}
                    className="pl-10 h-12 border-2 border-border/50 focus:border-primary rounded-xl"
                    required
                  />
                </div>
              </div>

              {/* Username Field */}
              <div className="space-y-2">
                <Label htmlFor="username" className="text-foreground font-medium">
                  Username
                </Label>
                <div className="relative">
                  <User className="absolute left-3 top-3 w-5 h-5 text-muted-foreground" />
                  <Input
                    id="username"
                    type="text"
                    placeholder="Your username"
                    value={formData.username}
                    onChange={handleInputChange('username')}
                    className="pl-10 h-12 border-2 border-border/50 focus:border-primary rounded-xl"
                    required
                  />
                </div>
              </div>

              {/* Product ID Field */}
              <div className="space-y-2">
                <Label htmlFor="productId" className="text-foreground font-medium">
                  Product ID
                </Label>
                <div className="relative">
                  <Shield className="absolute left-3 top-3 w-5 h-5 text-muted-foreground" />
                  <Input
                    id="productId"
                    type="text"
                    placeholder="OG-XXXX-XXXX"
                    value={formData.productId}
                    onChange={handleInputChange('productId')}
                    className="pl-10 h-12 border-2 border-border/50 focus:border-primary rounded-xl"
                    required
                  />
                </div>
              </div>

              {/* Password Field */}
              <div className="space-y-2">
                <Label htmlFor="password" className="text-foreground font-medium">
                  Password
                </Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    value={formData.password}
                    onChange={handleInputChange('password')}
                    className="pr-12 h-12 border-2 border-border/50 focus:border-primary rounded-xl"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-3 w-5 h-5 text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {showPassword ? <EyeOff /> : <Eye />}
                  </button>
                </div>
              </div>

              {/* Submit Button */}
              <Button
                type="submit"
                className="w-full h-12 gradient-primary text-white font-semibold rounded-xl shadow-medium hover:shadow-strong transition-all duration-300 hover:scale-[1.02]"
              >
                Access Dashboard
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </form>

            {/* Additional Info */}
            <div className="mt-6 text-center text-sm text-muted-foreground">
              <p>Secure access to your onion storage monitoring system</p>
            </div>
          </CardContent>
        </Card>

        {/* Footer */}
        <div className="text-center mt-6 text-white/70 text-sm">
          <p>Protected by OnionGuard Security</p>
        </div>
      </div>
    </div>
  );
};