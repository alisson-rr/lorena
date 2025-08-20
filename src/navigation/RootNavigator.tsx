import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { RootStackParamList } from './types';
import { ProfileProvider } from '../context/ProfileContext';

// Splash Screen
import SplashScreen from '../screens/SplashScreen';

// Auth Screens
import WelcomeScreen from '../screens/WelcomeScreen';
import LoginScreen from '../screens/LoginScreen';
import SignUpScreen from '../screens/SignUpScreen';
import LeadDataScreen from '../screens/LeadDataScreen';

import SetPasswordScreen from '../screens/SetPasswordScreen';
import ProfileSelectionScreen from '../screens/ProfileSelectionScreen';
import ForgotPasswordSuccessScreen from '../screens/ForgotPasswordSuccessScreen';
import EditChildProfileScreen from '../screens/EditChildProfileScreen';
import AddChildProfileScreen from '../screens/AddChildProfileScreen';
import KidsBlockScreen from '../screens/KidsBlockScreen';

// Main Navigation
import ConditionalBottomTabNavigator from './ConditionalBottomTabNavigator';

const Stack = createStackNavigator<RootStackParamList>();

export default function RootNavigator() {
  // In production, this would check authentication state
  // PARA TESTES: Mude para true para ir direto para MainTabs (Home)
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showSplash, setShowSplash] = useState(true);

  const handleSplashFinish = () => {
    setShowSplash(false);
  };

  if (showSplash) {
    return <SplashScreen onFinish={handleSplashFinish} />;
  }

  return (
    <ProfileProvider>
      <NavigationContainer>
        <Stack.Navigator 
          screenOptions={{ 
            headerShown: false,
            cardStyle: { backgroundColor: '#F1E1DD' }
          }}
        >
          {!isAuthenticated ? (
            <>
              <Stack.Screen name="Welcome" component={WelcomeScreen} />
              <Stack.Screen name="Login" component={LoginScreen} />
              <Stack.Screen name="SignUp" component={SignUpScreen} />
              <Stack.Screen name="LeadData" component={LeadDataScreen} />

              <Stack.Screen name="SetPassword" component={SetPasswordScreen} />
              <Stack.Screen name="ProfileSelection" component={ProfileSelectionScreen} />
              <Stack.Screen name="ForgotPasswordSuccess" component={ForgotPasswordSuccessScreen} />
              <Stack.Screen name="EditChildProfile" component={EditChildProfileScreen} />
              <Stack.Screen name="AddChildProfile" component={AddChildProfileScreen} />
              <Stack.Screen name="KidsBlock" component={KidsBlockScreen} />
              <Stack.Screen name="MainTabs" component={ConditionalBottomTabNavigator} />
          </>
        ) : (
          <>
            <Stack.Screen name="MainTabs" component={ConditionalBottomTabNavigator} />
              <Stack.Screen name="EditChildProfile" component={EditChildProfileScreen} />
              <Stack.Screen name="AddChildProfile" component={AddChildProfileScreen} />
              <Stack.Screen name="KidsBlock" component={KidsBlockScreen} />
            </>
          )}
        </Stack.Navigator>
      </NavigationContainer>
    </ProfileProvider>
  );
}