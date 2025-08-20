import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  TextInput,
  Alert,
  Modal,
  ImageBackground,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { fonts } from '../utils/fonts';
import { LinearGradient, HOME_GRADIENT, gradientStyle } from '../styles/gradients';
import FlowerIcon from '../components/icons/FlowerIcon';
import StarIcon from '../components/icons/StarIcon';
import HomeIcon from '../components/icons/HomeIcon';
import PlayIcon from '../components/icons/PlayIcon';
import FeedIcon from '../components/icons/FeedIcon';
import ProfileIcon from '../components/icons/ProfileIcon';
import { useAppNavigation, EditChildProfileScreenNavigationProp } from '../hooks/useAppNavigation';
import DeleteChildProfileDialog from '../components/DeleteChildProfileDialog';
import ChildProfileDeletedModal from '../components/ChildProfileDeletedModal';

interface ChildProfileData {
  id: string;
  name: string;
  icon: 'flower' | 'star';
  color: string;
  gender: string;
  day: string;
  month: string;
  year: string;
  protectionCode: string[];
}

interface EditChildProfileScreenProps {
  route?: {
    params?: {
      profileId: string;
      profileName: string;
      profileIcon: 'flower' | 'star';
    };
  };
}

export default function EditChildProfileScreen({ route }: EditChildProfileScreenProps) {
  const navigation = useAppNavigation<EditChildProfileScreenNavigationProp>();
  const profileId = route?.params?.profileId || '1';
  const initialName = route?.params?.profileName || 'Antônia';
  const initialIcon = route?.params?.profileIcon || 'flower';

  const [profileData, setProfileData] = useState<ChildProfileData>({
    id: profileId,
    name: initialName,
    icon: initialIcon,
    color: '#AB4766',
    gender: 'Feminino',
    day: '23',
    month: '12',
    year: '2018',
    protectionCode: ['9', '9', '9', '9'],
  });

  const [hasChanges, setHasChanges] = useState(false);
  const [saving, setSaving] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [showDeletedModal, setShowDeletedModal] = useState(false);
  
  // Modal states
  const [showGenderModal, setShowGenderModal] = useState(false);
  const [showMonthModal, setShowMonthModal] = useState(false);
  const [showYearModal, setShowYearModal] = useState(false);

  const genderOptions = ['Feminino', 'Masculino', 'Prefiro não dizer'];
  const monthOptions = ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'];
  const yearOptions = Array.from({ length: 20 }, (_, i) => `${2024 - i}`);

  // Check for changes
  useEffect(() => {
    const changed = 
      profileData.name !== initialName ||
      profileData.gender !== 'Feminino' ||
      profileData.day !== '23' ||
      profileData.month !== '12' ||
      profileData.year !== '2018' ||
      profileData.protectionCode.join('') !== '9999';
    setHasChanges(changed);
  }, [profileData, initialName]);

  const handleSave = async () => {
    if (!profileData.name.trim()) {
      Alert.alert('Erro', 'Por favor, preencha o nome do perfil');
      return;
    }

    setSaving(true);
    
    try {
      // In production, this would save to API
      console.log('Saving profile data:', profileData);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      Alert.alert('Sucesso', 'Perfil atualizado com sucesso!', [
        { text: 'OK', onPress: () => navigation.goBack() }
      ]);
      
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível salvar as alterações');
    } finally {
      setSaving(false);
    }
  };

  const handleCancel = () => {
    if (hasChanges) {
      Alert.alert(
        'Descartar alterações?',
        'Você tem alterações não salvas. Deseja descartá-las?',
        [
          { text: 'Continuar editando', style: 'cancel' },
          { 
            text: 'Descartar', 
            style: 'destructive',
            onPress: () => navigation.goBack()
          }
        ]
      );
    } else {
      navigation.goBack();
    }
  };

  const handleDeleteProfile = () => {
    setShowDeleteDialog(true);
  };

  const handleConfirmDelete = async (password: string) => {
    try {
      // In production, this would delete the profile with the API
      console.log('Delete profile with password:', password);
      
      // Simulating API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Close delete dialog and show success modal
      setShowDeleteDialog(false);
      
      // Show success modal after a small delay for smooth transition
      setTimeout(() => {
        setShowDeletedModal(true);
      }, 300);
      
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível deletar o perfil. Verifique sua senha e tente novamente.');
      throw error; // Re-throw to keep loading state in dialog
    }
  };

  const handleDeletedModalClose = () => {
    setShowDeletedModal(false);
    // Navigate back after modal closes
    setTimeout(() => {
      navigation.goBack();
    }, 300);
  };

  const toggleIcon = () => {
    setProfileData(prev => ({
      ...prev,
      icon: prev.icon === 'flower' ? 'star' : 'flower'
    }));
  };

  const updateProtectionCode = (index: number, value: string) => {
    const newCode = [...profileData.protectionCode];
    newCode[index] = value;
    setProfileData(prev => ({ ...prev, protectionCode: newCode }));
  };

  return (
    <LinearGradient
      style={gradientStyle}
      colors={HOME_GRADIENT.colors}
      locations={HOME_GRADIENT.locations}
      start={HOME_GRADIENT.start}
      end={HOME_GRADIENT.end}
    >
      <SafeAreaView style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity 
            style={styles.backButton}
            onPress={handleCancel}
            activeOpacity={0.7}
          >
            <Ionicons name="chevron-back" size={24} color="#69162B" />
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={styles.notificationButton}
            onPress={() => navigation.navigate('Notifications')}
            activeOpacity={0.7}
          >
            <Ionicons name="notifications-outline" size={20} color="#69162B" />
            <View style={styles.notificationDot} />
          </TouchableOpacity>
        </View>

        {/* Content */}
        <ScrollView 
          style={styles.content}
          contentContainerStyle={styles.contentContainer}
          showsVerticalScrollIndicator={false}
        >
          <Text style={styles.title}>Editar Perfil Infantil</Text>

          {/* Profile Avatar Section */}
          <View style={styles.avatarSection}>
            <View style={styles.avatarWrapper}>
              <TouchableOpacity 
                style={[styles.avatarContainer, { backgroundColor: profileData.color }]}
                onPress={toggleIcon}
                activeOpacity={0.8}
              >
                {profileData.icon === 'flower' ? (
                  <FlowerIcon size={56} />
                ) : (
                  <StarIcon size={56} />
                )}
              </TouchableOpacity>
              <View style={styles.editIconContainer}>
                <Ionicons name="pencil" size={16} color="#69162B" />
              </View>
            </View>
          </View>

          {/* Form Section */}
          <View style={styles.formSection}>
            {/* Name Input */}
            <View style={styles.inputContainer}>
              <Text style={styles.inputLabel}>Nome</Text>
              <TextInput
                style={styles.input}
                placeholder="Digite o nome"
                placeholderTextColor="#69162B"
                value={profileData.name}
                onChangeText={(text) => setProfileData(prev => ({ ...prev, name: text }))}
                autoCapitalize="words"
              />
            </View>

            {/* Gender Dropdown */}
            <View style={styles.inputContainer}>
              <Text style={styles.inputLabel}>Gênero</Text>
              <TouchableOpacity style={styles.dropdownInput} onPress={() => setShowGenderModal(true)}>
                <Text style={styles.dropdownText}>{profileData.gender}</Text>
                <Ionicons name="chevron-down" size={24} color="#69162B" />
              </TouchableOpacity>
            </View>

            {/* Birth Date */}
            <View style={styles.dateSection}>
              <Text style={styles.inputLabel}>Data de nascimento</Text>
              <View style={styles.dateRow}>
                <TextInput
                  style={styles.dateInput}
                  value={profileData.day}
                  onChangeText={(text) => setProfileData(prev => ({ ...prev, day: text }))}
                  keyboardType="numeric"
                  maxLength={2}
                  placeholder="DD"
                  placeholderTextColor="#C7A8AE"
                />
                
                <TouchableOpacity 
                  style={styles.dateDropdown}
                  onPress={() => setShowMonthModal(true)}
                >
                  <Text style={styles.dropdownText}>{profileData.month}</Text>
                  <Ionicons name="chevron-down" size={24} color="#69162B" />
                </TouchableOpacity>
                
                <TouchableOpacity 
                  style={styles.dateDropdown}
                  onPress={() => setShowYearModal(true)}
                >
                  <Text style={styles.dropdownText}>{profileData.year}</Text>
                  <Ionicons name="chevron-down" size={24} color="#69162B" />
                </TouchableOpacity>
              </View>
            </View>

            {/* Protection Code */}
            <View style={styles.inputContainer}>
              <Text style={styles.inputLabel}>Código de proteção</Text>
              <View style={styles.codeRow}>
                {profileData.protectionCode.map((digit, index) => (
                  <TextInput
                    key={index}
                    style={styles.codeInput}
                    value={digit}
                    onChangeText={(text) => updateProtectionCode(index, text)}
                    keyboardType="numeric"
                    maxLength={1}
                    textAlign="center"
                  />
                ))}
              </View>
            </View>
          </View>

          {/* Delete Button */}
          <TouchableOpacity 
            style={styles.deleteButton}
            onPress={handleDeleteProfile}
            activeOpacity={0.7}
          >
            <Ionicons name="trash-outline" size={24} color="#DC372A" />
            <Text style={styles.deleteButtonText}>Deletar Perfil</Text>
          </TouchableOpacity>

          {/* Save Button */}
          <TouchableOpacity 
            style={[styles.saveButton, !hasChanges && styles.saveButtonDisabled]}
            onPress={handleSave}
            activeOpacity={hasChanges ? 0.8 : 1}
            disabled={saving || !hasChanges}
          >
            <Text style={styles.saveButtonText}>
              {saving ? 'Salvando...' : 'Salvar'}
            </Text>
          </TouchableOpacity>

          {/* Cancel Button */}
          <TouchableOpacity 
            style={styles.cancelButton}
            onPress={handleCancel}
            activeOpacity={0.7}
          >
            <Text style={styles.cancelButtonText}>Cancelar</Text>
          </TouchableOpacity>
        </ScrollView>

        {/* Modals */}
        <Modal transparent visible={showGenderModal} animationType="fade" onRequestClose={() => setShowGenderModal(false)}>
          <View style={styles.modalBackdrop}>
            <View style={styles.modalContent}>
              {genderOptions.map((opt) => (
                <TouchableOpacity key={opt} style={styles.modalItem} onPress={() => { setShowGenderModal(false); setProfileData(prev => ({ ...prev, gender: opt })); }}>
                  <Text style={styles.modalItemText}>{opt}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        </Modal>

        <Modal transparent visible={showMonthModal} animationType="fade" onRequestClose={() => setShowMonthModal(false)}>
          <View style={styles.modalBackdrop}>
            <View style={styles.modalContent}>
              <ScrollView>
                {monthOptions.map((opt, idx) => (
                  <TouchableOpacity key={opt} style={styles.modalItem} onPress={() => { setShowMonthModal(false); setProfileData(prev => ({ ...prev, month: `${idx + 1}`.padStart(2, '0') })); }}>
                    <Text style={styles.modalItemText}>{opt}</Text>
                  </TouchableOpacity>
                ))}
              </ScrollView>
            </View>
          </View>
        </Modal>

        <Modal transparent visible={showYearModal} animationType="fade" onRequestClose={() => setShowYearModal(false)}>
          <View style={styles.modalBackdrop}>
            <View style={styles.modalContent}>
              <ScrollView>
                {yearOptions.map((opt) => (
                  <TouchableOpacity key={opt} style={styles.modalItem} onPress={() => { setShowYearModal(false); setProfileData(prev => ({ ...prev, year: opt })); }}>
                    <Text style={styles.modalItemText}>{opt}</Text>
                  </TouchableOpacity>
                ))}
              </ScrollView>
            </View>
          </View>
                 </Modal>

        {/* Delete Profile Dialog */}
        <DeleteChildProfileDialog
          visible={showDeleteDialog}
          onClose={() => setShowDeleteDialog(false)}
          onConfirm={handleConfirmDelete}
          profileName={profileData.name}
        />

        {/* Profile Deleted Modal */}
        <ChildProfileDeletedModal
          visible={showDeletedModal}
          onClose={handleDeletedModalClose}
          profileName={profileData.name}
        />

                 {/* Bottom Navigation */}
        <ImageBackground
          source={require('../../assets/bottomNavigationPlay.png')}
          style={styles.tabBarContainer}
          resizeMode="stretch"
          imageStyle={{ width: '100%', height: '100%' }}
        >
          <View style={styles.tabBarContent}>
            <TouchableOpacity style={styles.tabItem} activeOpacity={0.7}>
              <View style={styles.iconContainer}>
                <HomeIcon color="#8F7E81" />
              </View>
              <Text style={[styles.tabLabel, { color: '#8F7E81' }]}>Home</Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.tabItem} activeOpacity={0.7}>
              <View style={styles.iconContainer}>
                <PlayIcon color="#8F7E81" />
              </View>
              <Text style={[styles.tabLabel, { color: '#8F7E81' }]}>Categorias</Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.tabItem} activeOpacity={0.7}>
              <View style={styles.iconContainer}>
                <FeedIcon color="#8F7E81" />
              </View>
              <Text style={[styles.tabLabel, { color: '#8F7E81' }]}>Feed</Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.tabItem} activeOpacity={0.7}>
              <View style={styles.iconContainer}>
                <ProfileIcon color="#69162B" />
              </View>
              <Text style={[styles.tabLabel, { color: '#69162B' }]}>Minha Conta</Text>
            </TouchableOpacity>
          </View>
        </ImageBackground>
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
    height: 60,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 24,
    backgroundColor: '#F1E1DD',
  },
  backButton: {
    padding: 4,
  },
  notificationButton: {
    padding: 4,
    position: 'relative',
  },
  notificationDot: {
    position: 'absolute',
    top: 0,
    right: 0,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#DC372A',
  },
  content: {
    flex: 1,
  },
  contentContainer: {
    paddingTop: 12,
    paddingHorizontal: 16,
    paddingBottom: 40,
  },
  title: {
    fontFamily: 'RobotoSerif-Regular',
    fontSize: 24,
    color: '#69162B',
    marginBottom: 24,
    textAlign: 'left',
  },
  avatarSection: {
    alignItems: 'center',
    marginBottom: 24,
  },
  avatarWrapper: {
    position: 'relative',
  },
  avatarContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  editIconContainer: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: '#69162B',
  },
  formSection: {
    gap: 16,
  },
  inputContainer: {
    gap: 12,
  },
  inputLabel: {
    fontFamily: fonts.almaraiBold,
    fontSize: 16,
    color: '#69162B',
  },
  input: {
    height: 48,
    borderWidth: 1.5,
    borderColor: '#69162B',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
    fontFamily: fonts.almarai,
    fontSize: 16,
    color: '#69162B',
    backgroundColor: 'transparent',
  },
  dropdownInput: {
    height: 48,
    borderWidth: 1.5,
    borderColor: '#69162B',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: 'transparent',
  },
  dropdownText: {
    fontFamily: fonts.almarai,
    fontSize: 16,
    color: '#69162B',
    flex: 1,
  },
  dateSection: {
    gap: 12,
  },
  dateRow: {
    flexDirection: 'row',
    gap: 8,
  },
  dateInput: {
    height: 48,
    borderWidth: 1.5,
    borderColor: '#69162B',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
    fontFamily: fonts.almarai,
    fontSize: 16,
    color: '#69162B',
    backgroundColor: 'transparent',
    width: '33%',
    textAlign: 'center',
  },
  dateDropdown: {
    height: 48,
    borderWidth: 1.5,
    borderColor: '#69162B',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: 'transparent',
    width: '33%',
  },
  codeRow: {
    flexDirection: 'row',
    gap: 8,
  },
  codeInput: {
    height: 48,
    borderWidth: 1.5,
    borderColor: '#69162B',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
    fontFamily: fonts.almarai,
    fontSize: 16,
    color: '#69162B',
    backgroundColor: 'transparent',
    textAlign: 'center',
    width: '25%',
  },
  deleteButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingVertical: 12,
    marginTop: 24,
  },
  deleteButtonText: {
    fontFamily: 'Inter-Bold',
    fontSize: 16,
    color: '#DC372A',
    marginLeft: 8,
  },
  saveButton: {
    backgroundColor: '#69162B',
    height: 48,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 24,
  },
  saveButtonDisabled: {
    opacity: 0.5,
  },
  saveButtonText: {
    fontFamily: fonts.almaraiBold,
    fontSize: 16,
    color: '#F0EBEA',
  },
  cancelButton: {
    height: 48,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent',
    marginTop: 12,
  },
  cancelButtonText: {
    fontFamily: fonts.almaraiBold,
    fontSize: 16,
    color: '#69162B',
  },
  // Modal styles
  modalBackdrop: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
  },
  modalContent: {
    width: '100%',
    maxWidth: 343,
    backgroundColor: '#1E1E1E',
    borderRadius: 12,
    paddingVertical: 8,
  },
  modalItem: {
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  modalItemText: {
    fontFamily: fonts.almarai,
    fontSize: 16,
    color: '#F0EBEA',
  },
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
