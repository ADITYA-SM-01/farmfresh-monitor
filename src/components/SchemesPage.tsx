import { Gift, ExternalLink, Calendar, DollarSign, Users, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Navigation } from "./Navigation";

interface Scheme {
  id: string;
  title: string;
  description: string;
  amount: string;
  eligibility: string[];
  deadline: string;
  status: 'active' | 'upcoming' | 'closed';
  category: string;
}

interface SchemesPageProps {
  userInfo: {
    email: string;
    username: string;
    productId: string;
  };
  onNavigate: (page: string) => void;
}

export const SchemesPage = ({ userInfo, onNavigate }: SchemesPageProps) => {
  const schemes: Scheme[] = [
    {
      id: '1',
      title: 'National Horticulture Mission - Storage Infrastructure',
      description: 'Financial assistance for setting up cold storage, warehouses, and processing units for onion farmers.',
      amount: '₹50 Lakhs - ₹2 Crores',
      eligibility: ['Farmer Producer Organizations', 'Individual Farmers with >2 acres', 'Agricultural Cooperatives'],
      deadline: '2024-12-31',
      status: 'active',
      category: 'Infrastructure'
    },
    {
      id: '2',
      title: 'PM-KISAN Samman Nidhi Yojana',
      description: 'Direct income support to eligible farmer families for agricultural expenses and investments.',
      amount: '₹6,000 per year',
      eligibility: ['Small & Marginal Farmers', 'Landholding up to 2 hectares', 'Valid Aadhaar Card'],
      deadline: 'Ongoing',
      status: 'active',
      category: 'Direct Benefit'
    },
    {
      id: '3',
      title: 'Kisan Credit Card - Equipment Finance',
      description: 'Easy credit facility for purchasing agricultural equipment, including storage monitoring systems.',
      amount: 'Up to ₹3 Lakhs',
      eligibility: ['All farmers with valid land records', 'Good credit history', 'Crop cultivation proof'],
      deadline: 'Ongoing',
      status: 'active',
      category: 'Credit'
    },
    {
      id: '4',
      title: 'Technology Mission on Onion Development',
      description: 'Specialized scheme for onion cultivation improvement, storage facilities, and technology adoption.',
      amount: '₹1-5 Lakhs',
      eligibility: ['Onion farmers', 'Technology adoption commitment', 'Minimum 1 acre cultivation'],
      deadline: '2024-10-15',
      status: 'active',
      category: 'Technology'
    },
    {
      id: '5',
      title: 'State Agricultural Marketing Scheme',
      description: 'Support for better market linkage and price realization for onion farmers.',
      amount: '₹25,000 - ₹1 Lakh',
      eligibility: ['Registered farmer groups', 'Market linkage plan', 'Quality certification'],
      deadline: '2024-11-30',
      status: 'upcoming',
      category: 'Marketing'
    },
    {
      id: '6',
      title: 'Digital Agriculture Initiative',
      description: 'Subsidy for adopting digital monitoring and IoT solutions in agriculture.',
      amount: '50% subsidy up to ₹2 Lakhs',
      eligibility: ['Progressive farmers', 'Technology readiness', 'Training completion'],
      deadline: '2024-09-30',
      status: 'active',
      category: 'Digital'
    }
  ];

  const getStatusBadge = (status: string) => {
    const styles = {
      active: 'bg-green-100 text-green-800 border-green-300',
      upcoming: 'bg-blue-100 text-blue-800 border-blue-300',
      closed: 'bg-gray-100 text-gray-800 border-gray-300'
    };
    
    return (
      <Badge 
        variant="outline" 
        className={`${styles[status as keyof typeof styles]} font-medium`}
      >
        {status.toUpperCase()}
      </Badge>
    );
  };

  const getCategoryIcon = (category: string) => {
    const icons: Record<string, JSX.Element> = {
      'Infrastructure': <Users className="w-5 h-5" />,
      'Direct Benefit': <DollarSign className="w-5 h-5" />,
      'Credit': <FileText className="w-5 h-5" />,
      'Technology': <Gift className="w-5 h-5" />,
      'Marketing': <ExternalLink className="w-5 h-5" />,
      'Digital': <Calendar className="w-5 h-5" />
    };
    
    return icons[category] || <Gift className="w-5 h-5" />;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/30 to-secondary">
      <Navigation 
        userInfo={userInfo} 
        onNavigate={onNavigate} 
        currentPage="schemes"
        onLogout={() => onNavigate('welcome')}
      />

      <div className="container mx-auto px-6 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold gradient-primary bg-clip-text text-transparent mb-4">
            Government Schemes
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Explore funding opportunities and government support programs for onion farmers and agricultural infrastructure development
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="text-center shadow-soft">
            <CardContent className="p-6">
              <div className="w-12 h-12 gradient-primary rounded-full flex items-center justify-center mx-auto mb-3">
                <Gift className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-primary">6</h3>
              <p className="text-muted-foreground">Available Schemes</p>
            </CardContent>
          </Card>
          
          <Card className="text-center shadow-soft">
            <CardContent className="p-6">
              <div className="w-12 h-12 gradient-accent rounded-full flex items-center justify-center mx-auto mb-3">
                <DollarSign className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-accent">₹2+ Cr</h3>
              <p className="text-muted-foreground">Maximum Funding</p>
            </CardContent>
          </Card>
          
          <Card className="text-center shadow-soft">
            <CardContent className="p-6">
              <div className="w-12 h-12 bg-gradient-to-r from-primary to-accent rounded-full flex items-center justify-center mx-auto mb-3">
                <Calendar className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-primary">5</h3>
              <p className="text-muted-foreground">Active Programs</p>
            </CardContent>
          </Card>
        </div>

        {/* Schemes Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {schemes.map((scheme) => (
            <Card key={scheme.id} className="shadow-medium hover:shadow-strong transition-all duration-300 border-0">
              <CardHeader>
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center space-x-2">
                    <div className={`p-2 rounded-lg bg-primary/10`}>
                      {getCategoryIcon(scheme.category)}
                    </div>
                    <Badge variant="outline" className="text-xs">
                      {scheme.category}
                    </Badge>
                  </div>
                  {getStatusBadge(scheme.status)}
                </div>
                <CardTitle className="text-xl text-primary leading-tight">
                  {scheme.title}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-muted-foreground leading-relaxed">
                  {scheme.description}
                </p>
                
                <div className="bg-muted/50 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-foreground">Funding Amount</span>
                    <span className="text-lg font-bold text-accent">{scheme.amount}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-foreground">Application Deadline</span>
                    <span className="text-sm text-muted-foreground">{scheme.deadline}</span>
                  </div>
                </div>

                <div>
                  <h4 className="font-medium text-foreground mb-2">Eligibility Criteria</h4>
                  <ul className="space-y-1">
                    {scheme.eligibility.map((criteria, index) => (
                      <li key={index} className="text-sm text-muted-foreground flex items-start">
                        <span className="w-1.5 h-1.5 bg-primary rounded-full mt-2 mr-2 flex-shrink-0" />
                        {criteria}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="flex space-x-3 pt-2">
                  <Button 
                    className="flex-1 gradient-primary text-white hover:shadow-medium"
                    size="sm"
                  >
                    Apply Now
                    <ExternalLink className="w-4 h-4 ml-2" />
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm"
                    className="px-4"
                  >
                    Details
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Help Section */}
        <Card className="mt-12 gradient-earth text-white">
          <CardContent className="p-8 text-center">
            <h2 className="text-2xl font-bold mb-4">Need Help with Applications?</h2>
            <p className="text-white/90 mb-6 max-w-2xl mx-auto">
              Our team can help you understand eligibility criteria, prepare documentation, 
              and guide you through the application process for these government schemes.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                variant="secondary" 
                className="bg-white/20 border-white/30 text-white hover:bg-white/30"
              >
                Contact Support
              </Button>
              <Button 
                variant="outline" 
                className="border-white/50 text-white hover:bg-white/10"
              >
                Download Guide
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};