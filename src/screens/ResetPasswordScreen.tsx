import React, { useState } from 'react';
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
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { fonts, fontWeights } from '../utils/fonts';
import NotificationIcon from '../components/icons/NotificationIcon';
import { useUser } from '../hooks/useUser';
import { useAppNavigation, ResetPasswordScreenNavigationProp } from '../hooks/useAppNavigation';
import { LinearGradient, HOME_GRADIENT, gradientStyle } from '../styles/gradients';

interface PasswordInputProps {
  label: string;
  value: string;
  onChangeText: (text: string) => void;
  placeholder: string;
  showPassword: boolean;
  onTogglePassword: () => void;
  error?: string;
}

const PasswordInput = ({ 
  label, 
  value, 
  onChangeText, 
  placeholder,
  showPassword,
  onTogglePassword,
  error
}: PasswordInputProps) => {
  return (
    <View style={styles.inputContainer}>
      <Text style={styles.inputLabel}>{label}</Text>
      <View style={[styles.inputWrapper, error ? styles.inputWrapperError : null]}>
        <TextInput
          style={styles.input}
          value={value}
          onChangeText={onChangeText}
          placeholder={placeholder}
          placeholderTextColor="#4D4847"
          secureTextEntry={!showPassword}
        />
        <TouchableOpacity onPress={onTogglePassword} style={styles.eyeIcon}>
          <Ionicons 
            name={showPassword ? "eye-outline" : "eye-off-outline"} 
            size={24} 
            color="#69162B" 
          />
        </TouchableOpacity>
      </View>
      {error && <Text style={styles.errorText}>{error}</Text>}
    </View>
  );
};

// Password validation helper
const validatePassword = (password: string) => {
  const requirements = {
    minLength: password.length >= 8,
    hasUpperCase: /[A-Z]/.test(password),
    hasLowerCase: /[a-z]/.test(password),
    hasNumber: /[0-9]/.test(password),
    hasSpecial: /[!@#$%*&(){}<>?\\|]/.test(password),
  };
  
  const isValid = Object.values(requirements).every(req => req);
  return { isValid, requirements };
};

export default function ResetPasswordScreen() {
  const navigation = useAppNavigation<ResetPasswordScreenNavigationProp>();
  const { resetPassword } = useUser();
  
  // Form states
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  
  // UI states
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<{
    current?: string;
    new?: string;
    confirm?: string;
  }>({});

  // Validate password requirements
  const passwordValidation = validatePassword(newPassword);

  const handleResetPassword = async () => {
    // Clear previous errors
    setErrors({});
    
    // Validate current password
    if (!currentPassword) {
      setErrors(prev => ({ ...prev, current: 'Digite sua senha atual' }));
      return;
    }
    
    // Validate new password
    if (!newPassword) {
      setErrors(prev => ({ ...prev, new: 'Digite sua nova senha' }));
      return;
    }
    
    if (!passwordValidation.isValid) {
      setErrors(prev => ({ ...prev, new: 'A senha não atende aos requisitos' }));
      return;
    }
    
    // Validate password confirmation
    if (confirmPassword !== newPassword) {
      setErrors(prev => ({ ...prev, confirm: 'As senhas não coincidem' }));
      return;
    }
    
    // Check if new password is different from current
    if (currentPassword === newPassword) {
      Alert.alert('Erro', 'A nova senha deve ser diferente da senha atual');
      return;
    }
    
    setLoading(true);
    
    try {
      const success = await resetPassword(currentPassword, newPassword);
      
      if (success) {
        Alert.alert(
          'Sucesso', 
          'Sua senha foi redefinida com sucesso!',
          [
            {
              text: 'OK',
              onPress: () => navigation.goBack()
            }
          ]
        );
      } else {
        Alert.alert('Erro', 'Senha atual incorreta. Por favor, tente novamente.');
        setErrors({ current: 'Senha atual incorreta' });
      }
    } catch (error) {
      Alert.alert('Erro', 'Ocorreu um erro ao redefinir a senha. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    if (currentPassword || newPassword || confirmPassword) {
      Alert.alert(
        'Cancelar alterações?',
        'Você perderá as informações inseridas.',
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
          onPress={() => navigation.goBack()}
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
        <Text style={styles.title}>Redefinir Senha</Text>

        <View style={styles.formSection}>
          {/* Current Password */}
          <PasswordInput
            label="Senha Atual"
            value={currentPassword}
            onChangeText={setCurrentPassword}
            placeholder="Digite sua senha atual"
            showPassword={showCurrentPassword}
            onTogglePassword={() => setShowCurrentPassword(!showCurrentPassword)}
            error={errors.current}
          />

          {/* New Password */}
          <View style={styles.newPasswordSection}>
            <PasswordInput
              label="Nova Senha"
              value={newPassword}
              onChangeText={setNewPassword}
              placeholder="Digite sua nova senha"
              showPassword={showNewPassword}
              onTogglePassword={() => setShowNewPassword(!showNewPassword)}
              error={errors.new}
            />
            
            {/* Password Requirements */}
            <View style={styles.requirementsList}>
              <View style={styles.requirementItem}>
                <Text style={[
                  styles.requirementDot,
                  passwordValidation.requirements.minLength && styles.requirementMet
                ]}>•</Text>
                <Text style={[
                  styles.requirementText,
                  passwordValidation.requirements.minLength && styles.requirementTextMet
                ]}>
                  Mínimo de 8 caracteres
                </Text>
              </View>
              
              <View style={styles.requirementItem}>
                <Text style={[
                  styles.requirementDot,
                  (passwordValidation.requirements.hasUpperCase && passwordValidation.requirements.hasLowerCase) && styles.requirementMet
                ]}>•</Text>
                <Text style={[
                  styles.requirementText,
                  (passwordValidation.requirements.hasUpperCase && passwordValidation.requirements.hasLowerCase) && styles.requirementTextMet
                ]}>
                  Letras MAIÚSCULAS e minúsculas
                </Text>
              </View>
              
              <View style={styles.requirementItem}>
                <Text style={[
                  styles.requirementDot,
                  passwordValidation.requirements.hasNumber && styles.requirementMet
                ]}>•</Text>
                <Text style={[
                  styles.requirementText,
                  passwordValidation.requirements.hasNumber && styles.requirementTextMet
                ]}>
                  Ao menos um número
                </Text>
              </View>
              
              <View style={styles.requirementItem}>
                <Text style={[
                  styles.requirementDot,
                  passwordValidation.requirements.hasSpecial && styles.requirementMet
                ]}>•</Text>
                <Text style={[
                  styles.requirementText,
                  passwordValidation.requirements.hasSpecial && styles.requirementTextMet
                ]}>
                  Caracteres especiais (!@#$%*&(){`{}<>`}?\|)
                </Text>
              </View>
            </View>
          </View>

          {/* Confirm Password */}
          <PasswordInput
            label="Confirmar Nova Senha"
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            placeholder="Confirme sua nova senha"
            showPassword={showConfirmPassword}
            onTogglePassword={() => setShowConfirmPassword(!showConfirmPassword)}
            error={errors.confirm}
          />
        </View>

        {/* Buttons */}
        <View style={styles.buttonsSection}>
          <TouchableOpacity 
            style={[
              styles.resetButton,
              (!currentPassword || !newPassword || !confirmPassword || !passwordValidation.isValid) && styles.resetButtonDisabled
            ]}
            onPress={handleResetPassword}
            activeOpacity={0.8}
            disabled={loading || !currentPassword || !newPassword || !confirmPassword || !passwordValidation.isValid}
          >
            {loading ? (
              <ActivityIndicator color="#F0EBEA" />
            ) : (
              <Text style={styles.resetButtonText}>Redefinir Senha</Text>
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
  notificationContainer: {
    position: 'relative',
  },
  notificationButton: {
    padding: 4,
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
    textTransform: 'uppercase',
    lineHeight: 38,
  },
  formSection: {
    flex: 1,
    gap: 16,
  },
  inputContainer: {
    gap: 12,
  },
  inputLabel: {
    fontFamily: 'Almarai-Bold',
    fontSize: 16,
    color: '#69162B',
    marginBottom: 12,
  },
  inputWrapper: {
    position: 'relative',
  },
  inputWrapperError: {
    borderColor: '#DC372A',
  },
  input: {
    height: 48,
    borderWidth: 1.5,
    borderColor: '#69162B',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingRight: 48,
    paddingVertical: 8,
    fontFamily: 'Almarai',
    fontSize: 16,
    color: '#4D4847',
    backgroundColor: 'transparent',
  },
  eyeIcon: {
    position: 'absolute',
    right: 12,
    top: 12,
  },
  errorText: {
    fontFamily: fonts.almarai,
    fontSize: 13,
    color: '#DC372A',
    marginTop: 4,
  },
  newPasswordSection: {
    gap: 8,
  },
  requirementsList: {
    paddingLeft: 8,
    gap: 4,
  },
  requirementItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 8,
  },
  requirementDot: {
    fontFamily: fonts.almarai,
    fontSize: 13,
    color: '#69162B',
    lineHeight: 19.5,
  },
  requirementMet: {
    color: '#4CAF50',
  },
  requirementText: {
    fontFamily: fonts.almarai,
    fontSize: 13,
    color: '#69162B',
    lineHeight: 19.5,
    flex: 1,
  },
  requirementTextMet: {
    color: '#4CAF50',
  },
  buttonsSection: {
    marginTop: 24,
    gap: 12,
  },
  resetButton: {
    backgroundColor: '#69162B',
    height: 48,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  resetButtonDisabled: {
    opacity: 0.5,
  },
  resetButtonText: {
    fontFamily: 'Almarai-Bold',
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
    fontFamily: 'Almarai-Bold',
    fontSize: 16,
    color: '#69162B',
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
});