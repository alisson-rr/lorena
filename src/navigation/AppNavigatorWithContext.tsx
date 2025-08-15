import React from 'react';
import { NavigationProvider, useNavigation } from '../context/NavigationContext';
import WelcomeScreen from '../screens/WelcomeScreen';
import SignUpScreen from '../screens/SignUpScreen';
import LeadDataScreen from '../screens/LeadDataScreen';
import MissingDataScreen from '../screens/MissingDataScreen';
import SetPasswordScreen from '../screens/SetPasswordScreen';
import HomeScreen from '../screens/HomeScreen';
import CategoriesScreen from '../screens/CategoriesScreen';
import FeedScreen from '../screens/FeedScreen';
import ProfileScreen from '../screens/ProfileScreen';
import HistoryScreen from '../screens/HistoryScreen';
import MyAccountScreen from '../screens/MyAccountScreen';
import ResetPasswordScreen from '../screens/ResetPasswordScreen';

function NavigatorContent() {
  const { currentScreen, navigate } = useNavigation();

  switch (currentScreen) {
    case 'SetPassword':
      return (
        <SetPasswordScreen 
          onContinue={() => {
            console.log('Registration complete!');
            navigate('Home');
          }}
        />
      );
    
    case 'Home':
      return (
        <HomeScreen 
          onNavigateToProfile={() => navigate('Profile')}
        />
      );
    
    case 'Categories':
      return (
        <CategoriesScreen 
          onNavigateToHome={() => navigate('Home')}
          onNavigateToFeed={() => navigate('Feed')}
          onNavigateToProfile={() => navigate('Profile')}
        />
      );
    
    case 'Feed':
      return (
        <FeedScreen 
          onNavigateToProfile={() => navigate('Profile')}
        />
      );
    
    case 'Profile':
      return (
        <ProfileScreen 
          onNavigateToHome={() => navigate('Home')}
        />
      );
    
    case 'History':
      return <HistoryScreen />;
    
    case 'MyAccount':
      return <MyAccountScreen />;
    
    case 'ResetPassword':
      return <ResetPasswordScreen />;
    
    case 'MissingData':
      return (
        <MissingDataScreen 
          onContinue={() => navigate('SetPassword')}
        />
      );
    
    case 'LeadData':
      return (
        <LeadDataScreen 
          onContinue={() => navigate('MissingData')}
        />
      );
    
    case 'SignUp':
      return (
        <SignUpScreen 
          onContinue={() => navigate('LeadData')}
        />
      );
    
    case 'Welcome':
    default:
      return (
        <WelcomeScreen 
          onNavigateToSignUp={() => navigate('SignUp')}
        />
      );
  }
}

export default function AppNavigatorWithContext() {
  return (
    <NavigationProvider>
      <NavigatorContent />
    </NavigationProvider>
  );
}