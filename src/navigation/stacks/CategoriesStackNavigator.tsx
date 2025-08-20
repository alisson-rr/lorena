import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { CategoriesStackParamList } from '../types';
import ConditionalCategoriesScreen from '../../components/ConditionalCategoriesScreen';
import ConditionalCategoryDetailScreen from '../../components/ConditionalCategoryDetailScreen';
import VideoDetailScreen from '../../screens/VideoDetailScreen';
import KidsVideoDetailScreen from '../../screens/KidsVideoDetailScreen';
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
      <Stack.Screen name="Categories" component={ConditionalCategoriesScreen} />
      <Stack.Screen name="CategoryDetail" component={ConditionalCategoryDetailScreen} />
      <Stack.Screen name="VideoDetail" component={VideoDetailScreen} />
      <Stack.Screen name="KidsVideoDetail" component={KidsVideoDetailScreen} />
      <Stack.Screen name="Notifications" component={NotificationsScreen} />
    </Stack.Navigator>
  );
}