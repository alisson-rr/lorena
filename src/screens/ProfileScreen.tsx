import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { fonts, fontWeights } from '../utils/fonts';
import { LinearGradient, HOME_GRADIENT, gradientStyle } from '../styles/gradients';
import NewLogo from '../components/NewLogo';
import MenuIcon from '../components/icons/MenuIcon';
import NotificationIcon from '../components/icons/NotificationIcon';
import FlowerIcon from '../components/icons/FlowerIcon';
import StarIcon from '../components/icons/StarIcon';
import LogoutIcon from '../components/icons/LogoutIcon';
import Sidebar from '../components/Sidebar';
import { useAppNavigation, ProfileScreenNavigationProp } from '../hooks/useAppNavigation';

interface ChildProfile {
  id: string;
  name: string;
  icon: 'flower' | 'star';
  color: string;
}

export default function ProfileScreen() {
  const navigation = useAppNavigation<ProfileScreenNavigationProp>();
  const [sidebarVisible, setSidebarVisible] = useState(false);

  const childProfiles: ChildProfile[] = [
    { id: '1', name: 'Antônia', icon: 'flower', color: '#AB4766' },
    { id: '2', name: 'Maria', icon: 'star', color: '#AB4766' },
  ];

  const menuItems = [
    { label: 'Minha Conta', onPress: () => navigation.navigate('MyAccount') },
    { label: 'Histórico', onPress: () => navigation.navigate('History') },
    { label: 'Editar Perfis Infantis', onPress: () => console.log('Editar Perfis') },
    { label: 'Privacidade e Termos', onPress: () => console.log('Privacidade') },
  ];

  return (
    <LinearGradient
      style={gradientStyle}
      colors={HOME_GRADIENT.colors}
      locations={HOME_GRADIENT.locations}
      start={HOME_GRADIENT.start}
      end={HOME_GRADIENT.end}
    >
      <SafeAreaView style={styles.container}>
      {/* Sidebar */}
      <Sidebar 
        visible={sidebarVisible}
        onClose={() => setSidebarVisible(false)}
      />
      
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.menuButton}
          onPress={() => setSidebarVisible(true)}
        >
          <MenuIcon />
        </TouchableOpacity>
        
        <View style={styles.logoContainer}>
          <NewLogo width={120} height={40} />
        </View>
        
        <TouchableOpacity 
          style={styles.notificationButton}
          onPress={() => navigation.navigate('Notifications')}
        >
          <NotificationIcon />
        </TouchableOpacity>
      </View>

      {/* Content Area */}
      <ScrollView 
        style={styles.content}
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
      >
        {/* Child Profiles */}
        <View style={styles.profilesSection}>
          {childProfiles.map((profile) => (
            <TouchableOpacity key={profile.id} style={styles.profileItem} activeOpacity={0.7}>
              <View style={[styles.profileAvatar, { backgroundColor: profile.color }]}>
                {profile.icon === 'flower' ? (
                  <FlowerIcon size={56} />
                ) : (
                  <StarIcon size={56} />
                )}
              </View>
              <Text style={styles.profileName}>{profile.name}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Menu Items */}
        <View style={styles.menuSection}>
          {menuItems.map((item, index) => (
            <TouchableOpacity 
              key={index} 
              style={[styles.menuItem, index === menuItems.length - 1 && styles.lastMenuItem]}
              onPress={item.onPress}
              activeOpacity={0.7}
            >
              <Text style={styles.menuItemText}>{item.label}</Text>
              {(index === 0 || index === 1) && (
                <View style={styles.arrowContainer}>
                  <View style={styles.arrow} />
                </View>
              )}
            </TouchableOpacity>
          ))}

          {/* Logout */}
          <TouchableOpacity 
            style={[styles.menuItem, styles.logoutMenuItem]}
            onPress={() => console.log('Logout')}
            activeOpacity={0.7}
          >
            <Text style={[styles.menuItemText, styles.logoutText]}>Sair</Text>
            <View style={styles.logoutIcon}>
              <LogoutIcon size={18} color="#69162B" />
            </View>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'transparent',
  },
  header: {
    height: 48,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 24,
    backgroundColor: '#F1E1DD',
  },
  menuButton: {
    padding: 4,
  },
  logoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  notificationButton: {
    padding: 4,
  },
  content: {
    flex: 1,
    backgroundColor: 'transparent',
  },
  contentContainer: {
    paddingTop: 30,
    paddingBottom: 20,
  },
  profilesSection: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 40,
    paddingVertical: 20,
    marginBottom: 30,
  },
  profileItem: {
    alignItems: 'center',
  },
  profileAvatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  profileIcon: {
    fontSize: 36,
  },
  profileName: {
    fontFamily: fonts.almarai,
    fontSize: 14,
    color: '#69162B',
  },
  menuSection: {
    marginHorizontal: 20,
    backgroundColor: '#F8F2F0',
    borderRadius: 16,
    overflow: 'hidden',
    paddingHorizontal: 16,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: 'transparent',
    paddingVertical: 18,
    borderBottomWidth: 1,
    borderBottomColor: '#E2D4D0',
  },
  lastMenuItem: {
    borderBottomWidth: 1,
    borderBottomColor: '#E2D4D0',
  },
  logoutMenuItem: {
    borderBottomWidth: 0,
  },
  menuItemText: {
    fontFamily: fonts.almarai,
    fontSize: 15,
    color: '#69162B',
    flex: 1,
    lineHeight: 20,
  },
  arrowContainer: {
    width: 24,
    height: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  arrow: {
    width: 8,
    height: 8,
    borderTopWidth: 2,
    borderRightWidth: 2,
    borderColor: '#69162B',
    transform: [{ rotate: '45deg' }],
    marginRight: 4,
  },
  logoutIcon: {
    width: 24,
    height: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoutText: {
    color: '#69162B',
    fontFamily: fonts.almarai,
  },
});