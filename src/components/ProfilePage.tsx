import { useState } from "react";
import { 
  User, 
  Mail, 
  Smartphone, 
  Camera, 
  Edit, 
  Save, 
  Upload,
  Check,
  X
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Navigation } from "./Navigation";
import { useToast } from "@/hooks/use-toast";

interface ProfilePageProps {
  userInfo: {
    email: string;
    username: string;
    productId: string;
  };
  onNavigate: (page: string) => void;
}

interface ProfileData {
  username: string;
  email: string;
  phone: string;
  firstName: string;
  lastName: string;
  farmLocation: string;
  profilePicture: string | null;
}

export const ProfilePage = ({ userInfo, onNavigate }: ProfilePageProps) => {
  const { toast } = useToast();
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState<ProfileData>({
    username: userInfo.username,
    email: userInfo.email,
    phone: "+91 98765 43210",
    firstName: "Rajesh",
    lastName: "Kumar",
    farmLocation: "Nashik, Maharashtra",
    profilePicture: null
  });

  const [tempProfileData, setTempProfileData] = useState<ProfileData>(profileData);

  const handleEditToggle = () => {
    if (isEditing) {
      setTempProfileData(profileData);
    }
    setIsEditing(!isEditing);
  };

  const handleSave = () => {
    setProfileData(tempProfileData);
    setIsEditing(false);
    toast({
      title: "Profile Updated",
      description: "Your profile information has been saved successfully",
    });
  };

  const handleInputChange = (field: keyof ProfileData, value: string) => {
    setTempProfileData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleProfilePictureChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setTempProfileData(prev => ({
          ...prev,
          profilePicture: e.target?.result as string
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const getInitials = () => {
    return `${profileData.firstName.charAt(0)}${profileData.lastName.charAt(0)}`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/30 to-secondary">
      <Navigation 
        userInfo={userInfo} 
        onNavigate={onNavigate} 
        currentPage="profile" 
      />

      <div className="container mx-auto px-6 py-8">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-8">
          <div>
            <h1 className="text-4xl font-bold gradient-primary bg-clip-text text-transparent mb-2">
              Profile Settings
            </h1>
            <p className="text-muted-foreground">
              Manage your personal information and preferences
            </p>
          </div>
          <div className="flex items-center space-x-4 mt-4 lg:mt-0">
            {isEditing ? (
              <>
                <Button
                  onClick={handleSave}
                  className="gradient-primary text-white shadow-medium hover:shadow-strong"
                >
                  <Save className="w-4 h-4 mr-2" />
                  Save Changes
                </Button>
                <Button
                  variant="outline"
                  onClick={handleEditToggle}
                >
                  <X className="w-4 h-4 mr-2" />
                  Cancel
                </Button>
              </>
            ) : (
              <Button
                onClick={handleEditToggle}
                variant="outline"
                className="hover:bg-accent/10"
              >
                <Edit className="w-4 h-4 mr-2" />
                Edit Profile
              </Button>
            )}
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Profile Picture Section */}
          <div className="lg:col-span-1">
            <Card className="shadow-medium border-0">
              <CardHeader>
                <CardTitle className="text-primary text-center">Profile Picture</CardTitle>
              </CardHeader>
              <CardContent className="text-center space-y-6">
                <div className="relative mx-auto w-32 h-32">
                  <Avatar className="w-32 h-32 border-4 border-primary/20">
                    <AvatarImage 
                      src={isEditing ? tempProfileData.profilePicture || undefined : profileData.profilePicture || undefined} 
                      alt="Profile" 
                    />
                    <AvatarFallback className="text-2xl font-bold bg-gradient-primary text-white">
                      {getInitials()}
                    </AvatarFallback>
                  </Avatar>
                  {isEditing && (
                    <div className="absolute inset-0 bg-black/50 rounded-full flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity cursor-pointer">
                      <Camera className="w-8 h-8 text-white" />
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleProfilePictureChange}
                        className="absolute inset-0 opacity-0 cursor-pointer"
                      />
                    </div>
                  )}
                </div>
                
                {isEditing && (
                  <div>
                    <Label htmlFor="picture-upload" className="cursor-pointer">
                      <Button variant="outline" className="w-full" asChild>
                        <span>
                          <Upload className="w-4 h-4 mr-2" />
                          Upload New Picture
                        </span>
                      </Button>
                    </Label>
                    <input
                      id="picture-upload"
                      type="file"
                      accept="image/*"
                      onChange={handleProfilePictureChange}
                      className="hidden"
                    />
                  </div>
                )}

                {/* Quick Info */}
                <div className="bg-primary/5 rounded-xl p-4">
                  <h3 className="font-semibold text-primary mb-2">Account Info</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Product ID:</span>
                      <span className="font-medium">{userInfo.productId}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Status:</span>
                      <span className="text-green-600 font-medium">Active</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Member Since:</span>
                      <span className="font-medium">Jan 2024</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Profile Information */}
          <div className="lg:col-span-2">
            <Card className="shadow-medium border-0">
              <CardHeader>
                <CardTitle className="flex items-center text-primary">
                  <User className="w-6 h-6 mr-3" />
                  Personal Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="firstName" className="text-sm font-medium">First Name</Label>
                    <Input
                      id="firstName"
                      value={isEditing ? tempProfileData.firstName : profileData.firstName}
                      onChange={(e) => handleInputChange('firstName', e.target.value)}
                      disabled={!isEditing}
                      className={`mt-1 ${!isEditing ? 'bg-muted/50' : ''}`}
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="lastName" className="text-sm font-medium">Last Name</Label>
                    <Input
                      id="lastName"
                      value={isEditing ? tempProfileData.lastName : profileData.lastName}
                      onChange={(e) => handleInputChange('lastName', e.target.value)}
                      disabled={!isEditing}
                      className={`mt-1 ${!isEditing ? 'bg-muted/50' : ''}`}
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="username" className="text-sm font-medium">Username</Label>
                  <Input
                    id="username"
                    value={isEditing ? tempProfileData.username : profileData.username}
                    onChange={(e) => handleInputChange('username', e.target.value)}
                    disabled={!isEditing}
                    className={`mt-1 ${!isEditing ? 'bg-muted/50' : ''}`}
                  />
                </div>

                <div>
                  <Label htmlFor="email" className="text-sm font-medium">Email Address</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input
                      id="email"
                      type="email"
                      value={isEditing ? tempProfileData.email : profileData.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      disabled={!isEditing}
                      className={`mt-1 pl-10 ${!isEditing ? 'bg-muted/50' : ''}`}
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="phone" className="text-sm font-medium">Phone Number</Label>
                  <div className="relative">
                    <Smartphone className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input
                      id="phone"
                      value={isEditing ? tempProfileData.phone : profileData.phone}
                      onChange={(e) => handleInputChange('phone', e.target.value)}
                      disabled={!isEditing}
                      className={`mt-1 pl-10 ${!isEditing ? 'bg-muted/50' : ''}`}
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="farmLocation" className="text-sm font-medium">Farm Location</Label>
                  <Input
                    id="farmLocation"
                    value={isEditing ? tempProfileData.farmLocation : profileData.farmLocation}
                    onChange={(e) => handleInputChange('farmLocation', e.target.value)}
                    disabled={!isEditing}
                    className={`mt-1 ${!isEditing ? 'bg-muted/50' : ''}`}
                    placeholder="City, State"
                  />
                </div>

                {isEditing && (
                  <div className="flex items-center justify-end space-x-4 pt-4 border-t border-border">
                    <Button
                      variant="outline"
                      onClick={handleEditToggle}
                      className="hover:bg-muted"
                    >
                      Cancel
                    </Button>
                    <Button
                      onClick={handleSave}
                      className="gradient-primary text-white shadow-medium hover:shadow-strong"
                    >
                      <Check className="w-4 h-4 mr-2" />
                      Save Changes
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};