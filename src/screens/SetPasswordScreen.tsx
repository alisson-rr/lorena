import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  SafeAreaView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import LoreLogo from '../components/LoreLogo';
import { fonts, fontWeights } from '../utils/fonts';
import { RootStackParamList } from '../navigation/types';
import { LinearGradient, PRIMARY_GRADIENT, gradientStyle } from '../styles/gradients';

type SetPasswordScreenNavigationProp = StackNavigationProp<RootStackParamList, 'SetPassword'>;

export default function SetPasswordScreen() {
  const navigation = useNavigation<SetPasswordScreenNavigationProp>();
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleContinue = () => {
    console.log('Password set successfully');
    // Navigate to profile selection after setting password
    navigation.navigate('ProfileSelection');
  };

  // Password validation helpers
  const hasMinLength = password.length >= 8;
  const hasUpperAndLower = /[A-Z]/.test(password) && /[a-z]/.test(password);
  const hasNumber = /\d/.test(password);
  const hasSpecialChar = /[!@#$%*&(){}<>?\\|]/.test(password);

  const isPasswordValid = hasMinLength && hasUpperAndLower && hasNumber && hasSpecialChar;
  const passwordsMatch = password === confirmPassword && password !== '';

  return (
    <LinearGradient
      style={gradientStyle}
      colors={PRIMARY_GRADIENT.colors}
      locations={PRIMARY_GRADIENT.locations}
      start={PRIMARY_GRADIENT.start}
      end={PRIMARY_GRADIENT.end}
    >
      <SafeAreaView style={styles.container}>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={styles.keyboardView}
        >
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.content}>
            {/* Header with Logo */}
            <View style={styles.header}>
              <LoreLogo />
            </View>

            {/* Form Section */}
            <View style={styles.formSection}>
              {/* Title and Subtitle */}
              <View style={styles.titleSection}>
                <Text style={styles.title}>ÚLTIMO PASSO</Text>
                <Text style={styles.subtitle}>
                  Para finalizar, crie uma senha para{'\n'}acessar sua conta.
                </Text>
              </View>

              <View style={styles.formFields}>
                {/* Password Input */}
                <View style={styles.passwordSection}>
                  <View style={styles.inputGroup}>
                    <Text style={styles.label}>Senha</Text>
                    <View style={styles.passwordInputContainer}>
                      <TextInput
                        style={styles.passwordInput}
                        placeholder="Digite sua nova senha"
                        placeholderTextColor="#D8BFC4"
                        value={password}
                        onChangeText={setPassword}
                        secureTextEntry={!showPassword}
                      />
                      <TouchableOpacity
                        onPress={() => setShowPassword(!showPassword)}
                        style={styles.eyeButton}
                      >
                        <Ionicons 
                          name={showPassword ? "eye-outline" : "eye-off-outline"} 
                          size={20} 
                          color="#D8BFC4" 
                        />
                      </TouchableOpacity>
                    </View>
                  </View>

                  {/* Password Requirements */}
                  <View style={styles.requirementsList}>
                    <View style={styles.requirementItem}>
                      <Text style={[styles.requirementText, hasMinLength && styles.requirementMet]}>
                        • Mínimo de 8 caracteres
                      </Text>
                    </View>
                    <View style={styles.requirementItem}>
                      <Text style={[styles.requirementText, hasUpperAndLower && styles.requirementMet]}>
                        • Letras MAIÚSCULAS e minúsculas
                      </Text>
                    </View>
                    <View style={styles.requirementItem}>
                      <Text style={[styles.requirementText, hasNumber && styles.requirementMet]}>
                        • Ao menos um número
                      </Text>
                    </View>
                    <View style={styles.requirementItem}>
                      <Text style={[styles.requirementText, hasSpecialChar && styles.requirementMet]}>
                        • Caracteres especiais (!@#$%*&(){`{}<>?\\|`})
                      </Text>
                    </View>
                  </View>
                </View>

                {/* Confirm Password Input */}
                <View style={styles.inputGroup}>
                  <Text style={styles.label}>Confirmar Senha</Text>
                  <View style={styles.passwordInputContainer}>
                    <TextInput
                      style={styles.passwordInput}
                      placeholder="Confirme sua nova senha"
                      placeholderTextColor="#D8BFC4"
                      value={confirmPassword}
                      onChangeText={setConfirmPassword}
                      secureTextEntry={!showConfirmPassword}
                    />
                    <TouchableOpacity
                      onPress={() => setShowConfirmPassword(!showConfirmPassword)}
                      style={styles.eyeButton}
                    >
                      <Ionicons 
                        name={showConfirmPassword ? "eye-outline" : "eye-off-outline"} 
                        size={20} 
                        color="#D8BFC4" 
                      />
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            </View>

            {/* Continue Button - Fixed at bottom */}
            <View style={styles.bottomSection}>
              <TouchableOpacity
                style={[
                  styles.continueButton,
                  (!isPasswordValid || !passwordsMatch) && styles.continueButtonDisabled
                ]}
                onPress={handleContinue}
                activeOpacity={0.8}
                disabled={!isPasswordValid || !passwordsMatch}
              >
                <Text style={styles.continueButtonText}>Continuar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'transparent',
  },
  keyboardView: {
    flex: 1,
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
    marginBottom: 24,
  },
  formSection: {
    flex: 1,
    width: '100%',
    maxWidth: 343,
    alignSelf: 'center',
  },
  titleSection: {
    gap: 8,
    marginBottom: 16,
  },
  title: {
    fontFamily: fonts.anton,
    fontSize: 32,
    color: '#FFFFFF',
    textAlign: 'center',
    textTransform: 'uppercase',
    lineHeight: 38,
  },
  subtitle: {
    fontFamily: fonts.almarai,
    fontSize: 16,
    color: '#FFFFFF',
    textAlign: 'center',
    lineHeight: 24,
  },
  formFields: {
    gap: 16,
  },
  passwordSection: {
    gap: 8,
  },
  inputGroup: {
    gap: 12,
  },
  label: {
    fontFamily: 'Almarai-Bold',
    fontSize: 16,
    color: '#FFFFFF',
    lineHeight: 24,
  },
  passwordInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1.5,
    borderColor: 'rgba(255, 255, 255, 0.5)',
    borderRadius: 8,
    height: 48,
  },
  passwordInput: {
    flex: 1,
    paddingHorizontal: 12,
    paddingVertical: 8,
    fontFamily: fonts.almarai,
    fontSize: 16,
    color: '#FFFFFF',
  },
  eyeButton: {
    padding: 12,
  },
  requirementsList: {
    paddingLeft: 4,
  },
  requirementItem: {
    paddingVertical: 2,
  },
  requirementText: {
    fontFamily: fonts.almarai,
    fontSize: 13,
    color: '#FFFFFF',
    lineHeight: 20,
    opacity: 0.7,
  },
  requirementMet: {
    opacity: 1,
    color: '#5AF2B4',
  },
  bottomSection: {
    width: '100%',
    maxWidth: 343,
    alignSelf: 'center',
    marginTop: 32,
  },
  continueButton: {
    backgroundColor: '#5AF2B4',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  continueButtonDisabled: {
    opacity: 0.5,
  },
  continueButtonText: {
    fontFamily: 'Almarai-Bold',
    fontSize: 16,
    color: '#252525',
    lineHeight: 24,
  },
});