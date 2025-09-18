import { useState } from "react";
import { 
  Monitor, 
  Gift, 
  Info, 
  Settings, 
  User, 
  Menu,
  X,
  Shield,
  UserCircle,
  CloudSun
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { LogoutDialog } from "./LogoutDialog";

interface NavigationProps {
  userInfo: {
    email: string;
    username: string;
    productId: string;
  };
  onNavigate: (page: string) => void;
  currentPage: string;
  onLogout: () => void;
}

export const Navigation = ({ userInfo, onNavigate, currentPage, onLogout }: NavigationProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: <Monitor className="w-5 h-5" /> },
    { id: 'weather', label: 'Weather', icon: <CloudSun className="w-5 h-5" /> },
    { id: 'schemes', label: 'Schemes', icon: <Gift className="w-5 h-5" /> },
    { id: 'about', label: 'About', icon: <Info className="w-5 h-5" /> },
    // { id: 'profile', label: 'Profile', icon: <UserCircle className="w-5 h-5" /> },
    { id: 'settings', label: 'Settings', icon: <Settings className="w-5 h-5" /> },
  ];

  return (
    <>
      {/* Desktop Navigation */}
      <nav className="bg-white/95 backdrop-blur-md border-b border-border/50 shadow-soft sticky top-0 z-40">
        <div className="container mx-auto px-6">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 gradient-primary rounded-xl flex items-center justify-center">
                <Shield className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-primary">OnionGuard</h1>
                <p className="text-xs text-muted-foreground hidden sm:block">
                  Storage Monitoring System
                </p>
              </div>
            </div>

            {/* Desktop Menu */}
            <div className="hidden lg:flex items-center space-x-1">
              {menuItems.map((item) => (
                <Button
                  key={item.id}
                  variant={currentPage === item.id ? "default" : "ghost"}
                  size="sm"
                  onClick={() => onNavigate(item.id)}
                  className={`${
                    currentPage === item.id 
                      ? 'bg-primary text-white shadow-medium' 
                      : 'hover:bg-muted'
                  } transition-all duration-200`}
                >
                  {item.icon}
                  <span className="ml-2">{item.label}</span>
                </Button>
              ))}
            </div>

            {/* User Info */}
            <div className="flex items-center space-x-4">
              {/* Product ID Badge */}
              <Badge variant="outline" className="hidden sm:flex bg-secondary/50">
                {userInfo.productId}
              </Badge>

              {/* User Menu */}
                <div 
                className="flex items-center space-x-2 cursor-pointer"
                onClick={() => onNavigate('profile')}
                >
                <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                  <User className="w-4 h-4 text-white" />
                </div>
                <div className="hidden md:block">
                  <p className="text-sm font-medium text-foreground">
                  {userInfo.username}
                  </p>
                  <p className="text-xs text-muted-foreground">
                  {userInfo.email}
                  </p>
                </div>
                </div>

              {/* Mobile Menu Toggle */}
              <Button
                variant="ghost"
                size="sm"
                className="lg:hidden"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </Button>

              {/* Logout */}
              <div className="hidden lg:flex">
                <LogoutDialog 
                  onLogout={onLogout} 
                  onNavigate={onNavigate}
                  className="!size-sm !w-auto" 
                />
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      {isMenuOpen && (
        <div className="lg:hidden fixed inset-0 z-50 bg-black/50 backdrop-blur-sm">
          <div className="fixed right-0 top-0 h-full w-80 bg-white shadow-strong">
            <div className="p-6">
              {/* Close Button */}
              <div className="flex justify-end mb-6">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <X className="w-5 h-5" />
                </Button>
              </div>

              {/* User Info */}
              <div className="mb-8 p-4 bg-muted rounded-xl" onClick={()=> onNavigate('profile')}>
                <div className="flex items-center space-x-3 mb-3">
                  <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center">
                    <User className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <p className="font-medium text-foreground">{userInfo.username}</p>
                    <p className="text-sm text-muted-foreground">{userInfo.email}</p>
                  </div>
                </div>
                <Badge variant="outline" className="bg-secondary/50">
                  {userInfo.productId}
                </Badge>
              </div>

              {/* Menu Items */}
              <div className="space-y-2">
                {menuItems.map((item) => (
                  <Button
                    key={item.id}
                    variant={currentPage === item.id ? "default" : "ghost"}
                    size="lg"
                    onClick={() => {
                      onNavigate(item.id);
                      setIsMenuOpen(false);
                    }}
                    className={`w-full justify-start ${
                      currentPage === item.id 
                        ? 'bg-primary text-white' 
                        : 'hover:bg-muted'
                    }`}
                  >
                    {item.icon}
                    <span className="ml-3">{item.label}</span>
                  </Button>
                ))}
                
                {/* Logout */}
                <LogoutDialog 
                  onLogout={() => {
                    onLogout();
                    setIsMenuOpen(false);
                  }} 
                  onNavigate={(page) => {
                    onNavigate(page);
                    setIsMenuOpen(false);
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};