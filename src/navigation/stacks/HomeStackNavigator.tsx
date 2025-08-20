import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { HomeStackParamList } from '../types';
import ConditionalHomeScreen from '../../components/ConditionalHomeScreen';
import VideoDetailScreen from '../../screens/VideoDetailScreen';
import KidsVideoDetailScreen from '../../screens/KidsVideoDetailScreen';
import KidsWebSeriesScreen from '../../screens/KidsWebSeriesScreen';
import ConditionalCategoryDetailScreen from '../../components/ConditionalCategoryDetailScreen';
import NotificationsScreen from '../../screens/NotificationsScreen';

const Stack = createStackNavigator<HomeStackParamList>();

export default function HomeStackNavigator() {
  return (
    <Stack.Navigator 
      screenOptions={{ 
        headerShown: false,
        cardStyle: { backgroundColor: '#F1E1DD' }
      }}
    >
      <Stack.Screen name="Home" component={ConditionalHomeScreen} />
      <Stack.Screen name="VideoDetail" component={VideoDetailScreen} />
      <Stack.Screen name="KidsVideoDetail" component={KidsVideoDetailScreen} />
      <Stack.Screen name="KidsWebSeries" component={KidsWebSeriesScreen} />
      <Stack.Screen name="CategoryDetail" component={ConditionalCategoryDetailScreen} />
      <Stack.Screen name="Notifications" component={NotificationsScreen} />
    </Stack.Navigator>
  );
}