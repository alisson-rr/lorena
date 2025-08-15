import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Modal,
  TextInput,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { fonts, fontWeights } from '../utils/fonts';

interface DeleteAccountDialogProps {
  visible: boolean;
  onClose: () => void;
  onConfirm: (password: string) => Promise<void>;
}

export default function DeleteAccountDialog({ 
  visible, 
  onClose, 
  onConfirm 
}: DeleteAccountDialogProps) {
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleDelete = async () => {
    if (!password.trim()) return;
    
    setLoading(true);
    try {
      await onConfirm(password);
      setPassword('');
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    setPassword('');
    setShowPassword(false);
    onClose();
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={handleClose}
    >
      <View style={styles.modalOverlay}>
        <TouchableOpacity 
          style={styles.modalBackdrop} 
          activeOpacity={1}
          onPress={handleClose}
        />
        
        <KeyboardAvoidingView 
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={styles.keyboardView}
        >
          <View style={styles.modalContainer}>
            {/* Header */}
            <View style={styles.header}>
              <View style={styles.headerContent}>
                <View style={styles.headerRow}>
                  <Text style={styles.title}>Deletar Conta</Text>
                  <TouchableOpacity onPress={handleClose}>
                    <Ionicons name="close" size={24} color="#69162B" />
                  </TouchableOpacity>
                </View>
              </View>
              <View style={styles.headerBorder} />
            </View>

            {/* Content */}
            <View style={styles.content}>
              <View style={styles.formSection}>
                <View style={styles.messageContainer}>
                  <Text style={styles.message}>
                    Para deletar sua conta, você deve confirmar sua senha no campo abaixo. Ao confirmar esta ação, ela não poderá ser desfeita.
                  </Text>
                  
                  {/* Password Input */}
                  <View style={styles.inputContainer}>
                    <View style={styles.labelContainer}>
                      <Text style={styles.inputLabel}>Senha Atual</Text>
                    </View>
                    
                    <View style={styles.inputWrapper}>
                      <TextInput
                        style={styles.input}
                        value={password}
                        onChangeText={setPassword}
                        placeholder="Digite sua senha atual"
                        placeholderTextColor="#4D4847"
                        secureTextEntry={!showPassword}
                        editable={!loading}
                      />
                      <TouchableOpacity 
                        onPress={() => setShowPassword(!showPassword)} 
                        style={styles.eyeIcon}
                      >
                        <Ionicons 
                          name={showPassword ? "eye-outline" : "eye-off-outline"} 
                          size={24} 
                          color="#69162B" 
                        />
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>

                {/* Buttons */}
                <View style={styles.buttonsContainer}>
                  <TouchableOpacity 
                    style={[
                      styles.deleteButton,
                      (!password.trim() || loading) && styles.deleteButtonDisabled
                    ]}
                    onPress={handleDelete}
                    activeOpacity={0.8}
                    disabled={!password.trim() || loading}
                  >
                    {loading ? (
                      <ActivityIndicator color="#F0EBEA" />
                    ) : (
                      <Text style={styles.deleteButtonText}>Deletar</Text>
                    )}
                  </TouchableOpacity>

                  <TouchableOpacity 
                    style={styles.cancelButton}
                    onPress={handleClose}
                    activeOpacity={0.7}
                    disabled={loading}
                  >
                    <Text style={styles.cancelButtonText}>Cancelar</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </View>
        </KeyboardAvoidingView>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
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
    backgroundColor: 'rgba(0, 0, 0, 0.25)',
  },
  keyboardView: {
    justifyContent: 'flex-end',
  },
  modalContainer: {
    backgroundColor: '#F0EBEA',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: -5,
    },
    shadowOpacity: 0.25,
    shadowRadius: 15,
    elevation: 20,
  },
  header: {
    backgroundColor: '#F0EBEA',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    position: 'relative',
  },
  headerContent: {
    padding: 24,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 20,
  },
  headerBorder: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 1,
    backgroundColor: '#D8BFC4',
  },
  title: {
    fontFamily: 'Roboto Serif',
    fontSize: 18,
    color: '#69162B',
    flex: 1,
    lineHeight: 21.6, // 1.2 * 18
  },
  content: {
    backgroundColor: '#F0EBEA',
    padding: 24,
  },
  formSection: {
    gap: 32,
  },
  messageContainer: {
    gap: 24,
  },
  message: {
    fontFamily: fonts.almarai,
    fontSize: 16,
    color: '#4D4847',
    lineHeight: 24, // 1.5 * 16
  },
  inputContainer: {
    gap: 12,
  },
  labelContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  inputLabel: {
    fontFamily: fonts.almaraiBold,
    fontSize: 16,
    color: '#69162B',
    lineHeight: 24, // 1.5 * 16
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
    paddingRight: 48,
    paddingVertical: 8,
    fontFamily: fonts.almarai,
    fontSize: 16,
    color: '#69162B',
    backgroundColor: 'transparent',
  },
  eyeIcon: {
    position: 'absolute',
    right: 12,
    top: 12,
  },
  buttonsContainer: {
    gap: 12,
  },
  deleteButton: {
    backgroundColor: '#DC372A',
    height: 48,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
    paddingVertical: 12,
  },
  deleteButtonDisabled: {
    opacity: 0.5,
  },
  deleteButtonText: {
    fontFamily: fonts.almaraiBold,
    fontSize: 16,
    color: '#F0EBEA',
    lineHeight: 24, // 1.5 * 16
  },
  cancelButton: {
    height: 48,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
    paddingVertical: 12,
  },
  cancelButtonText: {
    fontFamily: fonts.almaraiBold,
    fontSize: 16,
    color: '#69162B',
    lineHeight: 24, // 1.5 * 16
  },
});