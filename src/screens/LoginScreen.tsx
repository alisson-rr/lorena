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
import ForgotPasswordBottomSheet from '../components/ForgotPasswordBottomSheet';
import { fonts, fontWeights } from '../utils/fonts';
import { RootStackParamList } from '../navigation/types';
import { LinearGradient, PRIMARY_GRADIENT, gradientStyle } from '../styles/gradients';

type LoginScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Login'>;

export default function LoginScreen() {
  const navigation = useNavigation<LoginScreenNavigationProp>();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showForgotPasswordBottomSheet, setShowForgotPasswordBottomSheet] = useState(false);

  const handleLogin = () => {
    console.log('Login with:', email, password);
    
    // Login mockado - aceita qualquer email/senha para teste
    // Para acesso direto à home, use: admin@teste.com / admin
    if (email === 'admin@teste.com' && password === 'admin') {
      // Vai direto para MainTabs (Home)
      navigation.navigate('MainTabs');
    } else if (email.includes('@') && password.length >= 6) {
      // Qualquer email válido vai para seleção de perfil
      navigation.navigate('ProfileSelection');
    } else {
      // Mostra erro para dados inválidos
      console.log('Login inválido - use qualquer email válido e senha com 6+ caracteres');
    }
  };

  const handleForgotPassword = () => {
    setShowForgotPasswordBottomSheet(true);
  };

  const handleForgotPasswordSubmit = async (email: string) => {
    console.log('Forgot password for email:', email);
    // Here you would make the API call to send the reset email
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Navigate to success screen
    navigation.navigate('ForgotPasswordSuccess', { email });
  };

  const isFormValid = email.includes('@') && password.length >= 6;

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
              {/* Title */}
              <Text style={styles.title}>
                ENTRE NO UNIVERSO{'\n'}LORE IN PLAY
              </Text>

              <View style={styles.formFields}>
                {/* Email Input */}
                <View style={styles.inputGroup}>
                  <Text style={styles.label}>Email</Text>
                  <View style={styles.inputContainer}>
                    <TextInput
                      style={styles.input}
                      placeholder="email@email.com"
                      placeholderTextColor="#D8BFC4"
                      value={email}
                      onChangeText={setEmail}
                      keyboardType="email-address"
                      autoCapitalize="none"
                    />
                  </View>
                </View>

                {/* Password Input */}
                <View style={styles.inputGroup}>
                  <Text style={styles.label}>Senha</Text>
                  <View style={styles.passwordInputContainer}>
                    <TextInput
                      style={styles.passwordInput}
                      placeholder="Digite sua senha"
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
                        size={24} 
                        color="#D8BFC4" 
                      />
                    </TouchableOpacity>
                  </View>
                </View>
              </View>

              {/* Buttons */}
              <View style={styles.buttonsSection}>
                <TouchableOpacity
                  style={[
                    styles.loginButton,
                    !isFormValid && styles.loginButtonDisabled
                  ]}
                  onPress={handleLogin}
                  activeOpacity={0.8}
                  disabled={!isFormValid}
                >
                  <Text style={styles.loginButtonText}>Entrar</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.forgotPasswordButton}
                  onPress={handleForgotPassword}
                  activeOpacity={0.7}
                >
                  <Text style={styles.forgotPasswordText}>Esqueceu a senha?</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </ScrollView>
        </KeyboardAvoidingView>
      </SafeAreaView>

      {/* Forgot Password Bottom Sheet */}
      <ForgotPasswordBottomSheet
        visible={showForgotPasswordBottomSheet}
        onClose={() => setShowForgotPasswordBottomSheet(false)}
        onSubmit={handleForgotPasswordSubmit}
      />
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
    marginBottom: 40,
  },
  formSection: {
    flex: 1,
    width: '100%',
    maxWidth: 343,
    alignSelf: 'center',
    gap: 40,
  },
  title: {
    fontFamily: fonts.anton,
    fontSize: 32,
    color: '#F0EBEA',
    textAlign: 'center',
    textTransform: 'uppercase',
    lineHeight: 38,
  },
  formFields: {
    gap: 16,
  },
  inputGroup: {
    gap: 12,
  },
  label: {
    fontFamily: 'Almarai-Bold',
    fontSize: 16,
    color: '#F1E1DD',
    lineHeight: 24,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1.5,
    borderColor: '#F1E1DD',
    borderRadius: 8,
    height: 48,
  },
  input: {
    flex: 1,
    paddingHorizontal: 12,
    paddingVertical: 8,
    fontFamily: fonts.almarai,
    fontSize: 16,
    color: '#FFFFFF',
  },
  passwordInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1.5,
    borderColor: '#F1E1DD',
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
  buttonsSection: {
    gap: 12,
  },
  loginButton: {
    backgroundColor: '#5AF2B4',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  loginButtonDisabled: {
    opacity: 0.5,
  },
  loginButtonText: {
    fontFamily: 'Almarai-Bold',
    fontSize: 16,
    color: '#252525',
    lineHeight: 24,
  },
  forgotPasswordButton: {
    paddingVertical: 12,
    paddingHorizontal: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  forgotPasswordText: {
    fontFamily: 'Almarai-Bold',
    fontSize: 16,
    color: '#5AF2B4',
    lineHeight: 24,
  },
});