import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { FeedStackParamList } from '../types';
import FeedScreen from '../../screens/FeedScreen';
import NotificationsScreen from '../../screens/NotificationsScreen';

const Stack = createStackNavigator<FeedStackParamList>();

export default function FeedStackNavigator() {
  return (
    <Stack.Navigator 
      screenOptions={{ 
        headerShown: false,
        cardStyle: { backgroundColor: '#F1E1DD' }
      }}
    >
      <Stack.Screen name="Feed" component={FeedScreen} />
      <Stack.Screen name="Notifications" component={NotificationsScreen} />
    </Stack.Navigator>
  );
}