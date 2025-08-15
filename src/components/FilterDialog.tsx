import React, { useState } from 'react';
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

interface Profile {
  id: string;
  name: string;
  icon: 'flower' | 'star';
  selected: boolean;
}

interface FilterDialogProps {
  visible: boolean;
  onClose: () => void;
  onApplyFilter: (selectedProfiles: string[]) => void;
}

export default function FilterDialog({ 
  visible, 
  onClose, 
  onApplyFilter 
}: FilterDialogProps) {
  const [profiles, setProfiles] = useState<Profile[]>([
    { id: '1', name: 'Antônia', icon: 'flower', selected: true },
    { id: '2', name: 'Maria', icon: 'star', selected: true },
  ]);

  const handleToggleProfile = (id: string) => {
    setProfiles(prev => prev.map(profile => 
      profile.id === id 
        ? { ...profile, selected: !profile.selected }
        : profile
    ));
  };

  const handleApply = () => {
    const selectedProfileNames = profiles
      .filter(p => p.selected)
      .map(p => p.name);
    onApplyFilter(selectedProfileNames);
    onClose();
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
            <Text style={styles.title}>Filtros</Text>
            <TouchableOpacity onPress={onClose} style={styles.closeButton}>
              <Ionicons name="close" size={24} color="#69162B" />
            </TouchableOpacity>
          </View>

          {/* Profiles Section */}
          <View style={styles.profilesSection}>
            <Text style={styles.sectionTitle}>Perfis</Text>
            
            {profiles.map((profile) => (
              <TouchableOpacity
                key={profile.id}
                style={styles.profileItem}
                onPress={() => handleToggleProfile(profile.id)}
                activeOpacity={0.7}
              >
                <View style={styles.profileLeft}>
                  <View style={[
                    styles.checkbox,
                    profile.selected && styles.checkboxSelected
                  ]}>
                    {profile.selected && (
                      <Ionicons name="checkmark" size={16} color="#FFFFFF" />
                    )}
                  </View>
                  
                  <View style={[styles.profileAvatar, { backgroundColor: '#AB4766' }]}>
                    {profile.icon === 'flower' ? (
                      <FlowerIcon size={20} />
                    ) : (
                      <StarIcon size={20} />
                    )}
                  </View>
                  
                  <Text style={styles.profileName}>{profile.name}</Text>
                </View>
              </TouchableOpacity>
            ))}
          </View>

          {/* Apply Button */}
          <TouchableOpacity 
            style={styles.applyButton}
            onPress={handleApply}
            activeOpacity={0.8}
          >
            <Text style={styles.applyButtonText}>Filtrar</Text>
          </TouchableOpacity>
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
  profilesSection: {
    padding: 20,
  },
  sectionTitle: {
    fontFamily: fonts.almaraiBold,
    fontSize: 16,
    color: '#69162B',
    marginBottom: 16,
  },
  profileItem: {
    marginBottom: 16,
  },
  profileLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  checkbox: {
    width: 32,
    height: 32,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: '#69162B',
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkboxSelected: {
    backgroundColor: '#69162B',
    borderColor: '#69162B',
  },
  profileAvatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
  },
  profileName: {
    fontFamily: fonts.almarai,
    fontSize: 16,
    color: '#69162B',
  },
  applyButton: {
    backgroundColor: '#69162B',
    marginHorizontal: 20,
    marginTop: 10,
    height: 56,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  applyButtonText: {
    fontFamily: fonts.almaraiBold,
    fontSize: 16,
    color: '#FFFFFF',
  },
});