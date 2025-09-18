import { useState } from "react";
import { WelcomePage } from "@/components/WelcomePage";
import { LoginPage } from "@/components/LoginPage";
import { Dashboard } from "@/components/Dashboard";
import { SchemesPage } from "@/components/SchemesPage";
import { AboutPage } from "@/components/AboutPage";
import { SettingsPage } from "@/components/SettingsPage";
import { ProfilePage } from "@/components/ProfilePage";

type Page = 'welcome' | 'login' | 'dashboard' | 'schemes' | 'about' | 'settings' | 'profile';

interface UserInfo {
  email: string;
  username: string;
  productId: string;
}

const Index = () => {
  const [currentPage, setCurrentPage] = useState<Page>('welcome');
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);

  const handleGetStarted = () => {
    setCurrentPage('login');
  };

  const handleLogin = (credentials: UserInfo) => {
    setUserInfo(credentials);
    setCurrentPage('dashboard');
  };

  const handleNavigate = (page: Page) => {
    if (page === 'welcome') {
      setUserInfo(null);
    }
    setCurrentPage(page);
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'welcome':
        return <WelcomePage onGetStarted={handleGetStarted} />;
      case 'login':
        return <LoginPage onLogin={handleLogin} />;
      case 'dashboard':
        return userInfo ? (
          <Dashboard userInfo={userInfo} onNavigate={handleNavigate} />
        ) : (
          <WelcomePage onGetStarted={handleGetStarted} />
        );
      case 'schemes':
        return userInfo ? (
          <SchemesPage userInfo={userInfo} onNavigate={handleNavigate} />
        ) : (
          <WelcomePage onGetStarted={handleGetStarted} />
        );
      case 'about':
        return userInfo ? (
          <AboutPage userInfo={userInfo} onNavigate={handleNavigate} />
        ) : (
          <WelcomePage onGetStarted={handleGetStarted} />
        );
      case 'settings':
        return userInfo ? (
          <SettingsPage userInfo={userInfo} onNavigate={handleNavigate} />
        ) : (
          <WelcomePage onGetStarted={handleGetStarted} />
        );
      case 'profile':
        return userInfo ? (
          <ProfilePage userInfo={userInfo} onNavigate={handleNavigate} />
        ) : (
          <WelcomePage onGetStarted={handleGetStarted} />
        );
      default:
        return <WelcomePage onGetStarted={handleGetStarted} />;
    }
  };

  return <>{renderPage()}</>;
};

export default Index;
