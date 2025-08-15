import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { CategoriesStackParamList } from '../types';
import CategoriesScreen from '../../screens/CategoriesScreen';
import CategoryDetailScreen from '../../screens/CategoryDetailScreen';
import VideoDetailScreen from '../../screens/VideoDetailScreen';
import NotificationsScreen from '../../screens/NotificationsScreen';

const Stack = createStackNavigator<CategoriesStackParamList>();

export default function CategoriesStackNavigator() {
  return (
    <Stack.Navigator 
      screenOptions={{ 
        headerShown: false,
        cardStyle: { backgroundColor: '#F1E1DD' }
      }}
    >
      <Stack.Screen name="Categories" component={CategoriesScreen} />
      <Stack.Screen name="CategoryDetail" component={CategoryDetailScreen} />
      <Stack.Screen name="VideoDetail" component={VideoDetailScreen} />
      <Stack.Screen name="Notifications" component={NotificationsScreen} />
    </Stack.Navigator>
  );
}