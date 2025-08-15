import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import LoreLogo from '../components/LoreLogo';
import FlowerIcon from '../components/icons/FlowerIcon';
import StarIcon from '../components/icons/StarIcon';
import { fonts, fontWeights } from '../utils/fonts';
import { RootStackParamList } from '../navigation/types';
import { LinearGradient, PRIMARY_GRADIENT, gradientStyle } from '../styles/gradients';

type ProfileSelectionScreenNavigationProp = StackNavigationProp<RootStackParamList, 'ProfileSelection'>;

interface Profile {
  id: string;
  name: string;
  type: 'flower' | 'star' | 'initial';
  color: string;
  initial?: string;
}

export default function ProfileSelectionScreen() {
  const navigation = useNavigation<ProfileSelectionScreenNavigationProp>();
  const [selectedProfile, setSelectedProfile] = useState<string | null>(null);

  const profiles: Profile[] = [
    { id: '1', name: 'Antônia', type: 'flower', color: '#AB4766' },
    { id: '2', name: 'Maria', type: 'star', color: '#AB4766' },
    { id: '3', name: 'Mariana', type: 'initial', color: '#69162B', initial: 'M' },
  ];

  const handleProfileSelect = (profileId: string) => {
    setSelectedProfile(profileId);
    // Navigate to home with selected profile
    setTimeout(() => {
      navigation.navigate('MainTabs');
    }, 300);
  };

  const handleLogout = () => {
    // Navigate back to login
    navigation.goBack();
  };

  const renderProfileIcon = (profile: Profile) => {
    if (profile.type === 'flower') {
      return <FlowerIcon size={80} />;
    } else if (profile.type === 'star') {
      return <StarIcon size={80} />;
    } else if (profile.type === 'initial' && profile.initial) {
      return (
        <Text style={styles.profileInitial}>{profile.initial}</Text>
      );
    }
    return null;
  };

  return (
    <LinearGradient
      style={gradientStyle}
      colors={PRIMARY_GRADIENT.colors}
      locations={PRIMARY_GRADIENT.locations}
      start={PRIMARY_GRADIENT.start}
      end={PRIMARY_GRADIENT.end}
    >
      <SafeAreaView style={styles.container}>
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
        <View style={styles.content}>
          {/* Header with Logo */}
          <View style={styles.header}>
            <LoreLogo />
          </View>

          {/* Main Content */}
          <View style={styles.mainContent}>
            {/* Title */}
            <Text style={styles.title}>
              COM QUAL PERFIL VOCÊ{'\n'}QUER COMEÇAR?
            </Text>

            {/* Profiles Grid */}
            <View style={styles.profilesContainer}>
              <View style={styles.profilesGrid}>
                {profiles.map((profile) => (
                  <TouchableOpacity
                    key={profile.id}
                    style={styles.profileItem}
                    onPress={() => handleProfileSelect(profile.id)}
                    activeOpacity={0.8}
                  >
                    <View 
                      style={[
                        styles.profileAvatar,
                        { backgroundColor: profile.color },
                        selectedProfile === profile.id && styles.profileAvatarSelected
                      ]}
                    >
                      {renderProfileIcon(profile)}
                    </View>
                    <Text style={styles.profileName}>{profile.name}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          </View>

          {/* Logout Button */}
          <View style={styles.bottomSection}>
            <TouchableOpacity
              style={styles.logoutButton}
              onPress={handleLogout}
              activeOpacity={0.7}
            >
              <Text style={styles.logoutButtonText}>Sair</Text>
            </TouchableOpacity>
          </View>
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
  scrollContent: {
    flexGrow: 1,
  },
  content: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 20,
    paddingBottom: 16,
    minHeight: '100%',
  },
  header: {
    alignItems: 'center',
    marginBottom: 40,
  },
  mainContent: {
    flex: 1,
    alignItems: 'center',
  },
  title: {
    fontFamily: fonts.anton,
    fontSize: 32,
    color: '#F0EBEA',
    textAlign: 'center',
    textTransform: 'uppercase',
    lineHeight: 38,
    marginBottom: 40,
    maxWidth: 281,
  },
  profilesContainer: {
    flex: 1,
    justifyContent: 'center',
    paddingVertical: 32,
  },
  profilesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: 40,
    width: '100%',
  },
  profileItem: {
    alignItems: 'center',
    gap: 8,
  },
  profileAvatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.15,
    shadowRadius: 15,
    elevation: 8,
    borderWidth: 1,
    borderColor: 'transparent',
  },
  profileAvatarSelected: {
    borderColor: '#5AF2B4',
    borderWidth: 3,
  },
  profileInitial: {
    fontFamily: fonts.almarai,
    fontSize: 48,
    color: '#F0EBEA',
    lineHeight: 72,
  },
  profileName: {
    fontFamily: 'Almarai-Bold',
    fontSize: 14,
    color: '#F0EBEA',
    lineHeight: 21,
  },
  bottomSection: {
    width: '100%',
    gap: 12,
  },
  logoutButton: {
    borderWidth: 2,
    borderColor: '#5AF2B4',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoutButtonText: {
    fontFamily: 'Almarai-Bold',
    fontSize: 16,
    color: '#5AF2B4',
    lineHeight: 24,
  },
});