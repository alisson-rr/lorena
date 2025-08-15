import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  TextInput,
  ActivityIndicator,
  Alert,
  Modal,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { fonts, fontWeights } from '../utils/fonts';
import { LinearGradient, HOME_GRADIENT, gradientStyle } from '../styles/gradients';
import NotificationIcon from '../components/icons/NotificationIcon';
import Sidebar from '../components/Sidebar';
import { useUser } from '../hooks/useUser';
import { brazilianStates, genderOptions, monthOptions } from '../services/userService';
import { useAppNavigation, MyAccountScreenNavigationProp } from '../hooks/useAppNavigation';
import DeleteAccountDialog from '../components/DeleteAccountDialog';
import AccountDeletedModal from '../components/AccountDeletedModal';

interface InputFieldProps {
  label: string;
  value: string;
  onChangeText?: (text: string) => void;
  editable?: boolean;
  showDropdown?: boolean;
  onDropdownPress?: () => void;
  keyboardType?: 'default' | 'numeric' | 'email-address';
  maxLength?: number;
}

const InputField = ({ 
  label, 
  value, 
  onChangeText, 
  editable = true,
  showDropdown = false,
  onDropdownPress,
  keyboardType = 'default',
  maxLength
}: InputFieldProps) => {
  return (
    <View style={styles.inputContainer}>
      <Text style={styles.inputLabel}>{label}</Text>
      <View style={styles.inputWrapper}>
        <TextInput
          style={styles.input}
          value={value}
          onChangeText={onChangeText}
          editable={editable && !showDropdown}
          placeholderTextColor="#69162B"
          keyboardType={keyboardType}
          maxLength={maxLength}
        />
        {showDropdown && (
          <TouchableOpacity onPress={onDropdownPress} style={styles.dropdownIcon}>
            <Ionicons name="chevron-down" size={24} color="#69162B" />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

interface DropdownModalProps {
  visible: boolean;
  onClose: () => void;
  title: string;
  options: { value: string; label: string }[];
  selectedValue: string;
  onSelect: (value: string) => void;
}

const DropdownModal = ({ visible, onClose, title, options, selectedValue, onSelect }: DropdownModalProps) => {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={styles.modalOverlay}>
        <TouchableOpacity style={styles.modalBackdrop} onPress={onClose} />
        <View style={styles.modalContent}>
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>{title}</Text>
            <TouchableOpacity onPress={onClose}>
              <Ionicons name="close" size={24} color="#69162B" />
            </TouchableOpacity>
          </View>
          <ScrollView style={styles.modalScroll}>
            {options.map((option) => (
              <TouchableOpacity
                key={option.value}
                style={[
                  styles.modalOption,
                  selectedValue === option.value && styles.modalOptionSelected
                ]}
                onPress={() => {
                  onSelect(option.value);
                  onClose();
                }}
              >
                <Text style={[
                  styles.modalOptionText,
                  selectedValue === option.value && styles.modalOptionTextSelected
                ]}>
                  {option.label}
                </Text>
                {selectedValue === option.value && (
                  <Ionicons name="checkmark" size={20} color="#69162B" />
                )}
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
};

export default function MyAccountScreen() {
  const navigation = useAppNavigation<MyAccountScreenNavigationProp>();
  const { user, loading, error, updateUser } = useUser();
  
  // Form states
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [genero, setGenero] = useState('');
  const [dia, setDia] = useState('');
  const [mes, setMes] = useState('');
  const [ano, setAno] = useState('');
  const [estado, setEstado] = useState('');
  const [cidade, setCidade] = useState('');
  
  // UI states
  const [saving, setSaving] = useState(false);
  const [hasChanges, setHasChanges] = useState(false);
  const [showGenderModal, setShowGenderModal] = useState(false);
  const [showStateModal, setShowStateModal] = useState(false);
  const [showMonthModal, setShowMonthModal] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [showDeletedModal, setShowDeletedModal] = useState(false);
  const [sidebarVisible, setSidebarVisible] = useState(false);

  // Initialize form with user data
  useEffect(() => {
    if (user) {
      setNome(user.nome);
      setEmail(user.email);
      setGenero(user.genero);
      setDia(user.dataNascimento.dia);
      setMes(user.dataNascimento.mes);
      setAno(user.dataNascimento.ano);
      setEstado(user.estado);
      setCidade(user.cidade);
    }
  }, [user]);

  // Check for changes
  useEffect(() => {
    if (user) {
      const changed = 
        nome !== user.nome ||
        email !== user.email ||
        genero !== user.genero ||
        dia !== user.dataNascimento.dia ||
        mes !== user.dataNascimento.mes ||
        ano !== user.dataNascimento.ano ||
        estado !== user.estado ||
        cidade !== user.cidade;
      setHasChanges(changed);
    }
  }, [nome, email, genero, dia, mes, ano, estado, cidade, user]);

  const handleSave = async () => {
    if (!hasChanges) return;

    // Validate fields
    if (!nome.trim()) {
      Alert.alert('Erro', 'Por favor, preencha o nome');
      return;
    }

    if (!email.trim() || !email.includes('@')) {
      Alert.alert('Erro', 'Por favor, insira um email válido');
      return;
    }

    setSaving(true);
    
    const success = await updateUser({
      nome,
      email,
      genero: genero as any,
      dataNascimento: { dia, mes, ano },
      estado,
      cidade
    });

    setSaving(false);

    if (success) {
      Alert.alert('Sucesso', 'Dados atualizados com sucesso!');
      setHasChanges(false);
    } else {
      Alert.alert('Erro', error || 'Não foi possível atualizar os dados');
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

  const handleResetPassword = () => {
    navigation.navigate('ResetPassword');
  };

  const handleDeleteAccount = () => {
    setShowDeleteDialog(true);
  };

  const handleConfirmDelete = async (password: string) => {
    try {
      // In production, this would delete the account with the API
      console.log('Delete account with password:', password);
      
      // Simulating API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Close delete dialog and show success modal
      setShowDeleteDialog(false);
      
      // Show success modal after a small delay for smooth transition
      setTimeout(() => {
        setShowDeletedModal(true);
      }, 300);
      
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível deletar a conta. Verifique sua senha e tente novamente.');
      throw error; // Re-throw to keep loading state in dialog
    }
  };

  const handleDeletedModalClose = () => {
    setShowDeletedModal(false);
    // In production, would navigate to Welcome screen and reset navigation
    // For now, navigate back after modal closes
    setTimeout(() => {
      navigation.goBack();
    }, 300);
  };

  if (loading) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#69162B" />
          <Text style={styles.loadingText}>Carregando dados...</Text>
        </View>
      </SafeAreaView>
    );
  }

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
        
        <View style={styles.notificationContainer}>
          <TouchableOpacity 
            style={styles.notificationButton}
            onPress={() => navigation.navigate('Notifications')}
            activeOpacity={0.7}
          >
            <NotificationIcon />
          </TouchableOpacity>
          <View style={styles.notificationDot} />
        </View>
      </View>

      {/* Content */}
      <ScrollView 
        style={styles.content}
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.title}>Minha Conta</Text>

        <View style={styles.formSection}>
          <InputField 
            label="Nome" 
            value={nome} 
            onChangeText={setNome}
          />

          <InputField 
            label="Email" 
            value={email} 
            onChangeText={setEmail}
            keyboardType="email-address"
          />

          <InputField 
            label="Gênero" 
            value={genero} 
            showDropdown={true}
            onDropdownPress={() => setShowGenderModal(true)}
          />

          {/* Data de nascimento */}
          <View style={styles.dateSection}>
            <Text style={styles.inputLabel}>Data de nascimento</Text>
            <View style={styles.dateRow}>
              <View style={styles.dateInputWrapper}>
                <TextInput
                  style={styles.dateInput}
                  value={dia}
                  onChangeText={setDia}
                  keyboardType="numeric"
                  maxLength={2}
                  placeholder="DD"
                  placeholderTextColor="#C7A8AE"
                />
              </View>
              
              <TouchableOpacity 
                style={styles.dateInputWrapper}
                onPress={() => setShowMonthModal(true)}
              >
                <TextInput
                  style={styles.dateInput}
                  value={mes}
                  editable={false}
                  placeholder="MM"
                  placeholderTextColor="#C7A8AE"
                />
                <View style={styles.dateDropdownIcon}>
                  <Ionicons name="chevron-down" size={24} color="#69162B" />
                </View>
              </TouchableOpacity>
              
              <View style={styles.dateInputWrapper}>
                <TextInput
                  style={styles.dateInput}
                  value={ano}
                  onChangeText={setAno}
                  keyboardType="numeric"
                  maxLength={4}
                  placeholder="AAAA"
                  placeholderTextColor="#C7A8AE"
                />
              </View>
            </View>
          </View>

          <InputField 
            label="Estado" 
            value={estado} 
            showDropdown={true}
            onDropdownPress={() => setShowStateModal(true)}
          />

          <InputField 
            label="Cidade" 
            value={cidade} 
            onChangeText={setCidade}
          />
        </View>

        {/* Actions Section */}
        <View style={styles.actionsSection}>
          <TouchableOpacity 
            style={styles.actionItem}
            onPress={handleResetPassword}
            activeOpacity={0.7}
          >
            <Text style={styles.actionText}>Redefinir Senha</Text>
            <View style={styles.arrow} />
          </TouchableOpacity>

          <View style={styles.divider} />

          <TouchableOpacity 
            style={styles.deleteButton}
            onPress={handleDeleteAccount}
            activeOpacity={0.7}
          >
            <Ionicons name="trash-outline" size={24} color="#DC372A" />
            <Text style={styles.settingDeleteText}>Deletar Conta</Text>
          </TouchableOpacity>
        </View>

        {/* Buttons */}

        <View style={styles.buttonsSection}>
          <TouchableOpacity 
            style={[styles.saveButton, !hasChanges && styles.saveButtonDisabled]}
            onPress={handleSave}
            activeOpacity={hasChanges ? 0.8 : 1}
            disabled={saving || !hasChanges}
          >
            {saving ? (
              <ActivityIndicator color="#F0EBEA" />
            ) : (
              <Text style={styles.saveButtonText}>Salvar</Text>
            )}
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.cancelButton}
            onPress={handleCancel}
            activeOpacity={0.7}
          >
            <Text style={styles.cancelButtonText}>Cancelar</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      {/* Modals */}
      <DropdownModal
        visible={showGenderModal}
        onClose={() => setShowGenderModal(false)}
        title="Selecione o gênero"
        options={genderOptions}
        selectedValue={genero}
        onSelect={setGenero}
      />

      <DropdownModal
        visible={showStateModal}
        onClose={() => setShowStateModal(false)}
        title="Selecione o estado"
        options={brazilianStates}
        selectedValue={estado}
        onSelect={setEstado}
      />

      <DropdownModal
        visible={showMonthModal}
        onClose={() => setShowMonthModal(false)}
        title="Selecione o mês"
        options={monthOptions}
        selectedValue={mes}
        onSelect={setMes}
      />

      {/* Delete Account Dialog */}
      <DeleteAccountDialog
        visible={showDeleteDialog}
        onClose={() => setShowDeleteDialog(false)}
        onConfirm={handleConfirmDelete}
      />

      {/* Account Deleted Success Modal */}
      <AccountDeletedModal
        visible={showDeletedModal}
        onClose={handleDeletedModalClose}
      />
    </SafeAreaView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'transparent',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 12,
    fontFamily: fonts.almarai,
    fontSize: 16,
    color: '#69162B',
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
  inputWrapper: {
    position: 'relative',
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
  dropdownIcon: {
    position: 'absolute',
    right: 12,
    top: 12,
  },
  dateSection: {
    gap: 12,
  },
  dateRow: {
    flexDirection: 'row',
    gap: 12,
  },
  dateInputWrapper: {
    flex: 1,
    position: 'relative',
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
  },
  dateDropdownIcon: {
    position: 'absolute',
    right: 12,
    top: 12,
  },
  actionsSection: {
    marginTop: 24,
    gap: 8,
  },
  actionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 20,
  },
  actionText: {
    fontFamily: fonts.almarai,
    fontSize: 16,
    color: '#69162B',
  },
  arrow: {
    width: 8,
    height: 8,
    borderTopWidth: 2,
    borderRightWidth: 2,
    borderColor: '#69162B',
    transform: [{ rotate: '45deg' }],
  },
  divider: {
    height: 1,
    backgroundColor: '#D8BFC4',
  },
  deleteButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingVertical: 12,
  },
  deleteText: {
    fontFamily: fonts.almaraiBold,
    fontSize: 16,
    color: '#DC372A',
  },
  buttonsSection: {
    marginTop: 24,
    gap: 12,
  },
  saveButton: {
    backgroundColor: '#69162B',
    height: 48,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
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
  },
  cancelButtonText: {
    fontFamily: fonts.almaraiBold,
    fontSize: 16,
    color: '#69162B',
  },
  // Modal styles
  modalOverlay: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  modalBackdrop: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: '#F1E1DD',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    maxHeight: '70%',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#E2D4D0',
  },
  modalTitle: {
    fontFamily: fonts.almaraiBold,
    fontSize: 18,
    color: '#69162B',
  },
  modalScroll: {
    padding: 8,
  },
  modalOption: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 12,
    borderRadius: 8,
  },
  modalOptionSelected: {
    backgroundColor: '#F8F2F0',
  },
  modalOptionText: {
    fontFamily: fonts.almarai,
    fontSize: 16,
    color: '#69162B',
  },
  modalOptionTextSelected: {
    fontFamily: fonts.almaraiBold,
  },
  bottomNav: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    backgroundColor: '#F1E1DD',
    borderTopWidth: 1,
    borderTopColor: '#D8BFC4',
    paddingTop: 12,
    paddingHorizontal: 32,
    paddingBottom: 20,
  },
  navItem: {
    alignItems: 'center',
    gap: 4,
    width: 57,
  },
  navLabel: {
    fontFamily: fonts.almaraiBold,
    fontSize: 12,
    color: '#8F7E81',
  },
  navLabelActive: {
    color: '#69162B',
  },
  notificationContainer: {
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
  settingsSection: {
    marginTop: 24,
    marginBottom: 24,
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: 60,
    paddingVertical: 16,
  },
  settingText: {
    fontFamily: 'Inter-Regular',
    fontSize: 16,
    color: '#69162B',
    flex: 1,
  },
  settingDivider: {
    height: 1,
    backgroundColor: '#D8BFC4',
    marginVertical: 0,
  },
  settingDeleteText: {
    fontFamily: 'Inter-Bold',
    fontSize: 16,
    color: '#DC372A',
    marginLeft: 8,
  },
});