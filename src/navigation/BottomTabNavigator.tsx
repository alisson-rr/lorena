import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ImageBackground } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MainTabParamList } from './types';
import { fonts, fontWeights } from '../utils/fonts';

// Import Stacks
import HomeStackNavigator from './stacks/HomeStackNavigator';
import CategoriesStackNavigator from './stacks/CategoriesStackNavigator';
import FeedStackNavigator from './stacks/FeedStackNavigator';
import ProfileStackNavigator from './stacks/ProfileStackNavigator';

// Import Icons
import HomeIcon from '../components/icons/HomeIcon';
import PlayIcon from '../components/icons/PlayIcon';
import FeedIcon from '../components/icons/FeedIcon';
import ProfileIcon from '../components/icons/ProfileIcon';

const Tab = createBottomTabNavigator<MainTabParamList>();

// Custom Tab Bar Component
function CustomTabBar({ state, descriptors, navigation }: any) {
  return (
    <ImageBackground
      source={require('../../assets/bottomNavigationPlay.png')}
      style={styles.tabBarContainer}
      resizeMode="stretch"
      imageStyle={{ width: '100%', height: '100%' }}
    >
      <View style={styles.tabBarContent}>
          {state.routes.map((route: any, index: number) => {
            const { options } = descriptors[route.key];
            const label = options.tabBarLabel || route.name;
            const isFocused = state.index === index;

            const onPress = () => {
              const event = navigation.emit({
                type: 'tabPress',
                target: route.key,
                canPreventDefault: true,
              });

              if (!isFocused && !event.defaultPrevented) {
                navigation.navigate(route.name);
              }
            };

            return (
              <TouchableOpacity 
                key={route.key} 
                style={styles.tabItem} 
                onPress={onPress}
                activeOpacity={0.7}
              >
                <View style={styles.iconContainer}>
                  {options.tabBarIcon({
                    color: isFocused ? '#69162B' : '#8F7E81'
                  })}
                </View>
                <Text style={[
                  styles.tabLabel,
                  { color: isFocused ? '#69162B' : '#8F7E81' }
                ]}>
                  {label}
                </Text>
              </TouchableOpacity>
            );
                  })}
      </View>
    </ImageBackground>
  );
}

export default function BottomTabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: '#69162B',
        tabBarInactiveTintColor: '#8F7E81',
        tabBarStyle: { display: 'none' }, // Remove o tab bar padrão
      }}
      tabBar={(props) => <CustomTabBar {...props} />}
    >
      <Tab.Screen 
        name="HomeTab" 
        component={HomeStackNavigator}
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({ color }) => <HomeIcon color={color} />,
        }}
      />
      <Tab.Screen 
        name="CategoriesTab" 
        component={CategoriesStackNavigator}
        options={{
          tabBarLabel: 'Categorias',
          tabBarIcon: ({ color }) => <PlayIcon color={color} />,
        }}
      />
      <Tab.Screen 
        name="FeedTab" 
        component={FeedStackNavigator}
        options={{
          tabBarLabel: 'Feed',
          tabBarIcon: ({ color }) => <FeedIcon color={color} />,
        }}
      />
      <Tab.Screen 
        name="ProfileTab" 
        component={ProfileStackNavigator}
        options={{
          tabBarLabel: 'Minha Conta',
          tabBarIcon: ({ color }) => <ProfileIcon color={color} />,
        }}
      />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  tabBarContainer: {
    height: 90,
    width: '100%',
    backgroundColor: 'transparent',
  },

  tabBarContent: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    paddingHorizontal: 20,
    paddingVertical: 10,
    zIndex: 1,
    position: 'relative',
  },
  tabItem: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 4,
  },
  iconContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 24,
  },
  tabLabel: {
    fontFamily: 'Almarai-Bold',
    fontSize: 12,
    lineHeight: 18,
    textAlign: 'center',
  },
});