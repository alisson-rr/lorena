import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { ProfileStackParamList } from '../types';
import ProfileScreen from '../../screens/ProfileScreen';
import MyAccountScreen from '../../screens/MyAccountScreen';
import ResetPasswordScreen from '../../screens/ResetPasswordScreen';
import HistoryScreen from '../../screens/HistoryScreen';
import NotificationsScreen from '../../screens/NotificationsScreen';

const Stack = createStackNavigator<ProfileStackParamList>();

export default function ProfileStackNavigator() {
  return (
    <Stack.Navigator 
      screenOptions={{ 
        headerShown: false,
        cardStyle: { backgroundColor: '#F1E1DD' }
      }}
    >
      <Stack.Screen name="Profile" component={ProfileScreen} />
      <Stack.Screen name="MyAccount" component={MyAccountScreen} />
      <Stack.Screen name="ResetPassword" component={ResetPasswordScreen} />
      <Stack.Screen name="History" component={HistoryScreen} />
      <Stack.Screen name="Notifications" component={NotificationsScreen} />
    </Stack.Navigator>
  );
}