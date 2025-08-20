// Navigation type definitions for React Navigation

export type RootStackParamList = {
  // Auth Stack
  Welcome: undefined;
  Login: undefined;
  SignUp: undefined;
  LeadData: undefined;
  SetPassword: undefined;
  ProfileSelection: undefined;
  ForgotPasswordSuccess: { email: string };
  
  // Main Tab Navigator
  MainTabs: undefined;
  
  // Child Profile Management
  EditChildProfile: {
    profileId: string;
    profileName: string;
    profileIcon: 'flower' | 'star';
  };
  AddChildProfile: undefined;
  
  // Kids Block Screen
  KidsBlock: undefined;
};

export type MainTabParamList = {
  HomeTab: undefined;
  CategoriesTab: undefined;
  FeedTab: undefined;
  ProfileTab: undefined;
};

export type HomeStackParamList = {
  Home: undefined;
  VideoDetail: {
    videoId: string;
    title?: string;
    thumbnail?: string;
    description?: string;
  };
  KidsVideoDetail: {
    videoId: string;
    title?: string;
    thumbnail?: string;
    description?: string;
  };
  KidsWebSeries: {
    seriesId: string;
    title?: string;
    thumbnail?: string;
    description?: string;
  };
  CategoryDetail: {
    categoryId: string;
    categoryName: string;
  };
  Notifications: undefined;
};

export type CategoriesStackParamList = {
  Categories: undefined;
  CategoryDetail: {
    categoryId: string;
    categoryName: string;
  };
  VideoDetail: {
    videoId: string;
    title?: string;
    thumbnail?: string;
    description?: string;
  };
  KidsVideoDetail: {
    videoId: string;
    title?: string;
    thumbnail?: string;
    description?: string;
  };
  Notifications: undefined;
};

export type FeedStackParamList = {
  Feed: undefined;
  Notifications: undefined;
};

export type ProfileStackParamList = {
  Profile: undefined;
  MyAccount: undefined;
  ResetPassword: undefined;
  History: undefined;
  EditChildProfiles: undefined;
  PrivacyTerms: undefined;
  Notifications: undefined;
};