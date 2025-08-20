import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ImageBackground } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MainTabParamList } from './types';
import { fonts, fontWeights } from '../utils/fonts';
import KidsExitBottomSheet from '../components/KidsExitBottomSheet';

// Import Stacks
import HomeStackNavigator from './stacks/HomeStackNavigator';
import CategoriesStackNavigator from './stacks/CategoriesStackNavigator';

// Import Icons
import HomeIcon from '../components/icons/HomeIcon';
import PlayIcon from '../components/icons/PlayIcon';
import LogoutIcon from '../components/icons/LogoutIcon';

const Tab = createBottomTabNavigator<MainTabParamList>();

// Custom Tab Bar Component for Kids
function KidsCustomTabBar({ state, descriptors, navigation }: any) {
  const [showExitBottomSheet, setShowExitBottomSheet] = useState(false);

  const handleLogout = () => {
    setShowExitBottomSheet(true);
  };

  const handleConfirmExit = () => {
    console.log('Exiting kids profile...');
    // Implementar lógica de saída do perfil kids
    // Por exemplo: navegar para ProfileSelection ou Login
  };

  return (
    <ImageBackground
      source={require('../../assets/bottomNavigationPlay.png')}
      style={styles.tabBarContainer}
      resizeMode="stretch"
      imageStyle={{ width: '100%', height: '100%' }}
    >
      <View style={styles.tabBarContent}>
        {/* Home Tab */}
        <TouchableOpacity 
          style={styles.tabItem} 
          onPress={() => navigation.navigate('HomeTab')}
          activeOpacity={0.7}
        >
          <View style={styles.iconContainer}>
            <HomeIcon color={state.index === 0 ? '#69162B' : '#8F7E81'} />
          </View>
          <Text style={[
            styles.tabLabel,
            { color: state.index === 0 ? '#69162B' : '#8F7E81' }
          ]}>
            Home
          </Text>
        </TouchableOpacity>

        {/* Categories Tab */}
        <TouchableOpacity 
          style={styles.tabItem} 
          onPress={() => navigation.navigate('CategoriesTab')}
          activeOpacity={0.7}
        >
          <View style={styles.iconContainer}>
            <PlayIcon color={state.index === 1 ? '#69162B' : '#8F7E81'} />
          </View>
          <Text style={[
            styles.tabLabel,
            { color: state.index === 1 ? '#69162B' : '#8F7E81' }
          ]}>
            Categorias
          </Text>
        </TouchableOpacity>

        {/* Logout Tab */}
        <TouchableOpacity 
          style={styles.tabItem} 
          onPress={handleLogout}
          activeOpacity={0.7}
        >
          <View style={styles.iconContainer}>
            <LogoutIcon color="#8F7E81" size={24} />
          </View>
          <Text style={[styles.tabLabel, { color: '#8F7E81' }]}>
            Sair
          </Text>
        </TouchableOpacity>
      </View>
      
      {/* Kids Exit Bottom Sheet */}
      <KidsExitBottomSheet
        visible={showExitBottomSheet}
        onClose={() => setShowExitBottomSheet(false)}
        onConfirmExit={handleConfirmExit}
      />
    </ImageBackground>
  );
}

export default function KidsBottomTabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: '#69162B',
        tabBarInactiveTintColor: '#8F7E81',
        tabBarStyle: { display: 'none' }, // Remove o tab bar padrão
      }}
      tabBar={(props) => <KidsCustomTabBar {...props} />}
    >
      <Tab.Screen 
        name="HomeTab" 
        component={HomeStackNavigator}
        options={{
          tabBarLabel: 'Home',
        }}
      />
      <Tab.Screen 
        name="CategoriesTab" 
        component={CategoriesStackNavigator}
        options={{
          tabBarLabel: 'Categorias',
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
