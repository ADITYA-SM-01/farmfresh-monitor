import { useState } from "react";
import { 
  Globe, 
  Bell, 
  Shield, 
  Smartphone, 
  Monitor, 
  Save, 
  User, 
  Mail,
  Check,
  Volume2,
  VolumeX
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Navigation } from "./Navigation";
import { useToast } from "@/hooks/use-toast";

interface SettingsPageProps {
  userInfo: {
    email: string;
    username: string;
    productId: string;
  };
  onNavigate: (page: string) => void;
}

interface Language {
  code: string;
  name: string;
  nativeName: string;
  flag: string;
}

interface NotificationSettings {
  email: boolean;
  sms: boolean;
  push: boolean;
  sound: boolean;
}

export const SettingsPage = ({ userInfo, onNavigate }: SettingsPageProps) => {
  const { toast } = useToast();
  const [selectedLanguage, setSelectedLanguage] = useState('en');
  const [notifications, setNotifications] = useState<NotificationSettings>({
    email: true,
    sms: true,
    push: true,
    sound: true
  });

  const languages: Language[] = [
    { code: 'en', name: 'English', nativeName: 'English', flag: '🇺🇸' },
    { code: 'hi', name: 'Hindi', nativeName: 'हिंदी', flag: '🇮🇳' },
    { code: 'ta', name: 'Tamil', nativeName: 'தமிழ்', flag: '🇮🇳' },
    { code: 'te', name: 'Telugu', nativeName: 'తెలుగు', flag: '🇮🇳' },
    { code: 'kn', name: 'Kannada', nativeName: 'ಕನ್ನಡ', flag: '🇮🇳' },
    { code: 'ml', name: 'Malayalam', nativeName: 'മലയാളം', flag: '🇮🇳' }
  ];

  const handleLanguageChange = (langCode: string) => {
    setSelectedLanguage(langCode);
    const selectedLang = languages.find(lang => lang.code === langCode);
    toast({
      title: "Language Updated",
      description: `Interface language changed to ${selectedLang?.name}`,
    });
  };

  const handleNotificationToggle = (type: keyof NotificationSettings) => {
    setNotifications(prev => ({
      ...prev,
      [type]: !prev[type]
    }));
  };

  const handleSaveSettings = () => {
    toast({
      title: "Settings Saved",
      description: "Your preferences have been updated successfully",
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/30 to-secondary">
      <Navigation 
        userInfo={userInfo} 
        onNavigate={onNavigate} 
        currentPage="settings"
        onLogout={() => onNavigate('welcome')}
      />

      <div className="container mx-auto px-6 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold gradient-primary bg-clip-text text-transparent mb-2">
            Settings
          </h1>
          <p className="text-muted-foreground">
            Customize your OnionGuard experience and preferences
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Settings */}
          <div className="lg:col-span-2 space-y-6">
            
            {/* Language Settings */}
            <Card className="shadow-medium border-0">
              <CardHeader>
                <CardTitle className="flex items-center text-primary">
                  <Globe className="w-6 h-6 mr-3" />
                  Language & Region
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label className="text-sm font-medium text-foreground mb-4 block">
                    Select your preferred language for the interface
                  </Label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {languages.map((language) => (
                      <div
                        key={language.code}
                        onClick={() => handleLanguageChange(language.code)}
                        className={`p-4 rounded-xl border-2 cursor-pointer transition-all duration-200 hover:shadow-soft ${
                          selectedLanguage === language.code
                            ? 'border-primary bg-primary/5 shadow-soft'
                            : 'border-border hover:border-primary/50'
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-3">
                            <span className="text-2xl">{language.flag}</span>
                            <div>
                              <p className="font-medium text-foreground">{language.name}</p>
                              <p className="text-sm text-muted-foreground">{language.nativeName}</p>
                            </div>
                          </div>
                          {selectedLanguage === language.code && (
                            <Check className="w-5 h-5 text-primary" />
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Notification Settings */}
            <Card className="shadow-medium border-0">
              <CardHeader>
                <CardTitle className="flex items-center text-primary">
                  <Bell className="w-6 h-6 mr-3" />
                  Notification Preferences
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 bg-muted/50 rounded-xl">
                    <div className="flex items-center space-x-3">
                      <Mail className="w-5 h-5 text-primary" />
                      <div>
                        <Label className="font-medium">Email Notifications</Label>
                        <p className="text-sm text-muted-foreground">Receive alerts via email</p>
                      </div>
                    </div>
                    <Switch 
                      checked={notifications.email}
                      onCheckedChange={() => handleNotificationToggle('email')}
                    />
                  </div>

                  <div className="flex items-center justify-between p-4 bg-muted/50 rounded-xl">
                    <div className="flex items-center space-x-3">
                      <Smartphone className="w-5 h-5 text-primary" />
                      <div>
                        <Label className="font-medium">SMS Alerts</Label>
                        <p className="text-sm text-muted-foreground">Critical alerts via SMS</p>
                      </div>
                    </div>
                    <Switch 
                      checked={notifications.sms}
                      onCheckedChange={() => handleNotificationToggle('sms')}
                    />
                  </div>

                  <div className="flex items-center justify-between p-4 bg-muted/50 rounded-xl">
                    <div className="flex items-center space-x-3">
                      <Monitor className="w-5 h-5 text-primary" />
                      <div>
                        <Label className="font-medium">Push Notifications</Label>
                        <p className="text-sm text-muted-foreground">Browser push notifications</p>
                      </div>
                    </div>
                    <Switch 
                      checked={notifications.push}
                      onCheckedChange={() => handleNotificationToggle('push')}
                    />
                  </div>

                  <div className="flex items-center justify-between p-4 bg-muted/50 rounded-xl">
                    <div className="flex items-center space-x-3">
                      {notifications.sound ? (
                        <Volume2 className="w-5 h-5 text-primary" />
                      ) : (
                        <VolumeX className="w-5 h-5 text-muted-foreground" />
                      )}
                      <div>
                        <Label className="font-medium">Sound Alerts</Label>
                        <p className="text-sm text-muted-foreground">Audio notifications</p>
                      </div>
                    </div>
                    <Switch 
                      checked={notifications.sound}
                      onCheckedChange={() => handleNotificationToggle('sound')}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Security Settings */}
            <Card className="shadow-medium border-0">
              <CardHeader>
                <CardTitle className="flex items-center text-primary">
                  <Shield className="w-6 h-6 mr-3" />
                  Security & Privacy
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <Button variant="outline" className="justify-start h-12">
                    <Shield className="w-4 h-4 mr-3" />
                    Change Password
                  </Button>
                  <Button variant="outline" className="justify-start h-12">
                    <Smartphone className="w-4 h-4 mr-3" />
                    Two-Factor Auth
                  </Button>
                </div>
                
                <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-xl">
                  <p className="text-sm text-yellow-800">
                    <strong>Security Tip:</strong> Enable two-factor authentication for enhanced account security.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar Info */}
          <div className="space-y-6">
            {/* User Profile */}
            <Card className="shadow-soft border-0">
              <CardHeader>
                <CardTitle className="text-lg text-primary">Profile Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-center">
                  <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-3">
                    <User className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="font-semibold text-foreground">{userInfo.username}</h3>
                  <p className="text-sm text-muted-foreground">{userInfo.email}</p>
                  <Badge variant="outline" className="mt-2 bg-secondary/50">
                    {userInfo.productId}
                  </Badge>
                </div>
              </CardContent>
            </Card>

            {/* Quick Stats */}
            <Card className="shadow-soft border-0">
              <CardHeader>
                <CardTitle className="text-lg text-primary">System Status</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Device Status</span>
                  <Badge className="bg-green-100 text-green-800">Online</Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Last Sync</span>
                  <span className="text-sm font-medium">2 min ago</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Data Points</span>
                  <span className="text-sm font-medium">1,247</span>
                </div>
              </CardContent>
            </Card>

            {/* Language Info */}
            <Card className="shadow-soft border-0 bg-primary/5">
              <CardContent className="p-6">
                <h3 className="font-semibold text-primary mb-2">Current Language</h3>
                <div className="flex items-center space-x-2">
                  <span className="text-xl">
                    {languages.find(lang => lang.code === selectedLanguage)?.flag}
                  </span>
                  <div>
                    <p className="font-medium text-foreground">
                      {languages.find(lang => lang.code === selectedLanguage)?.name}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {languages.find(lang => lang.code === selectedLanguage)?.nativeName}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Save Button */}
        <div className="mt-8 text-center">
          <Button 
            onClick={handleSaveSettings}
            className="gradient-primary text-white px-8 py-3 text-lg font-semibold shadow-medium hover:shadow-strong transition-all duration-300"
          >
            <Save className="w-5 h-5 mr-2" />
            Save All Settings
          </Button>
        </div>
      </div>
    </div>
  );
};