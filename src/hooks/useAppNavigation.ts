import { useNavigation, CompositeNavigationProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { 
  RootStackParamList, 
  MainTabParamList,
  ProfileStackParamList,
  HomeStackParamList,
  CategoriesStackParamList,
  FeedStackParamList
} from '../navigation/types';

// Navigation prop types for each screen
export type RootNavigationProp = StackNavigationProp<RootStackParamList>;

export type ProfileScreenNavigationProp = CompositeNavigationProp<
  StackNavigationProp<ProfileStackParamList, 'Profile'>,
  BottomTabNavigationProp<MainTabParamList>
>;

export type MyAccountScreenNavigationProp = StackNavigationProp<
  ProfileStackParamList,
  'MyAccount'
>;

export type ResetPasswordScreenNavigationProp = StackNavigationProp<
  ProfileStackParamList,
  'ResetPassword'
>;

export type HistoryScreenNavigationProp = StackNavigationProp<
  ProfileStackParamList,
  'History'
>;

export type HomeScreenNavigationProp = CompositeNavigationProp<
  StackNavigationProp<HomeStackParamList, 'Home'>,
  BottomTabNavigationProp<MainTabParamList>
>;

export type CategoriesScreenNavigationProp = CompositeNavigationProp<
  StackNavigationProp<CategoriesStackParamList, 'Categories'>,
  BottomTabNavigationProp<MainTabParamList>
>;

export type CategoryDetailScreenNavigationProp = StackNavigationProp<
  CategoriesStackParamList,
  'CategoryDetail'
>;

export type FeedScreenNavigationProp = CompositeNavigationProp<
  StackNavigationProp<FeedStackParamList, 'Feed'>,
  BottomTabNavigationProp<MainTabParamList>
>;

export type EditChildProfileScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'EditChildProfile'
>;

export type AddChildProfileScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'AddChildProfile'
>;

// Generic hook for navigation
export function useAppNavigation<T = RootNavigationProp>() {
  return useNavigation<T>();
}