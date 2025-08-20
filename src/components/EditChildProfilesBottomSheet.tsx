import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Modal,
  TouchableWithoutFeedback,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { fonts } from '../utils/fonts';
import FlowerIcon from './icons/FlowerIcon';
import StarIcon from './icons/StarIcon';
import { useAppNavigation, RootNavigationProp } from '../hooks/useAppNavigation';

interface ChildProfile {
  id: string;
  name: string;
  icon: 'flower' | 'star';
  color: string;
}

interface EditChildProfilesBottomSheetProps {
  visible: boolean;
  onClose: () => void;
}

export default function EditChildProfilesBottomSheet({ visible, onClose }: EditChildProfilesBottomSheetProps) {
  const navigation = useAppNavigation<RootNavigationProp>();
  
  const childProfiles: ChildProfile[] = [
    { id: '1', name: 'Antônia', icon: 'flower', color: '#AB4766' },
    { id: '2', name: 'Maria', icon: 'star', color: '#AB4766' },
  ];

  const handleEditProfile = (profileId: string, profileName: string, profileIcon: 'flower' | 'star') => {
    onClose();
    navigation.navigate('EditChildProfile', {
      profileId,
      profileName,
      profileIcon,
    });
  };

  const handleAddProfile = () => {
    onClose();
    navigation.navigate('AddChildProfile');
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={styles.modalOverlay}>
        <TouchableWithoutFeedback onPress={onClose}>
          <View style={styles.touchableArea} />
        </TouchableWithoutFeedback>
        
        <View style={styles.modalContent}>
          {/* Header */}
          <View style={styles.header}>
            <Text style={styles.title}>Editar Perfis Infantis</Text>
            <TouchableOpacity onPress={onClose} style={styles.closeButton}>
              <Ionicons name="close" size={24} color="#69162B" />
            </TouchableOpacity>
          </View>

          {/* Profiles Grid */}
          <View style={styles.profilesContainer}>
            <View style={styles.profilesRow}>
              {childProfiles.map((profile) => (
                <TouchableOpacity
                  key={profile.id}
                  style={styles.profileItem}
                  onPress={() => handleEditProfile(profile.id, profile.name, profile.icon)}
                  activeOpacity={0.7}
                >
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

            {/* Add New Profile */}
            <TouchableOpacity
              style={styles.addProfileItem}
              onPress={handleAddProfile}
              activeOpacity={0.7}
            >
              <View style={styles.addProfileAvatar}>
                <Ionicons name="add" size={32} color="#FFFFFF" />
              </View>
              <Text style={styles.addProfileText}>Novo Perfil</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  touchableArea: {
    flex: 1,
  },
  modalContent: {
    backgroundColor: '#F0EBEA',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    paddingBottom: 20,
    borderWidth: 1,
    borderColor: '#D8BFC4',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#D8BFC4',
  },
  title: {
    fontFamily: fonts.robotoSerif,
    fontSize: 24,
    color: '#69162B',
  },
  closeButton: {
    padding: 4,
  },
  profilesContainer: {
    padding: 30,
    alignItems: 'center',
  },
  profilesRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 40,
    marginBottom: 40,
  },
  profileItem: {
    alignItems: 'center',
    gap: 12,
  },
  addProfileItem: {
    alignItems: 'center',
    gap: 12,
  },
  profileAvatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  addProfileAvatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#69162B',
  },
  profileName: {
    fontFamily: fonts.almarai,
    fontSize: 14,
    color: '#69162B',
    textAlign: 'center',
  },
  addProfileText: {
    fontFamily: fonts.almarai,
    fontSize: 14,
    color: '#69162B',
    textAlign: 'center',
  },
});
