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
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import LoreLogo from '../components/LoreLogo';
import { fonts, fontWeights } from '../utils/fonts';
import { RootStackParamList } from '../navigation/types';
import { LinearGradient, PRIMARY_GRADIENT, gradientStyle } from '../styles/gradients';

type SignUpScreenNavigationProp = StackNavigationProp<RootStackParamList, 'SignUp'>;

export default function SignUpScreen() {
  const navigation = useNavigation<SignUpScreenNavigationProp>();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  const handleContinue = () => {
    console.log('Continue with:', { name, email });
    // Navigate to next screen in registration flow
    navigation.navigate('LeadData');
  };

  const handleGoogleSignIn = () => {
    console.log('Sign in with Google');
  };

  const handleAppleSignIn = () => {
    console.log('Sign in with Apple');
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
              <Text style={styles.title}>CRIE SUA CONTA</Text>

              {/* Name Input */}
              <View style={styles.inputGroup}>
                <Text style={styles.label}>Nome</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Digite seu nome"
                  placeholderTextColor="#D8BFC4"
                  value={name}
                  onChangeText={setName}
                  autoCapitalize="words"
                />
              </View>

              {/* Email Input */}
              <View style={styles.inputGroup}>
                <Text style={styles.label}>Email</Text>
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

              {/* Continue Button */}
              <TouchableOpacity
                style={styles.continueButton}
                onPress={handleContinue}
                activeOpacity={0.8}
              >
                <Text style={styles.continueButtonText}>Continuar</Text>
              </TouchableOpacity>
            </View>

            {/* Divider */}
            <View style={styles.divider} />

            {/* Social Login Section */}
            <View style={styles.socialSection}>
              <TouchableOpacity
                style={styles.socialButton}
                onPress={handleGoogleSignIn}
                activeOpacity={0.8}
              >
                <Text style={styles.socialButtonText}>Continuar com Google</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.socialButton}
                onPress={handleAppleSignIn}
                activeOpacity={0.8}
              >
                <Text style={styles.socialButtonText}>Continuar com Apple</Text>
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
    alignItems: 'center',
    gap: 16,
  },
  header: {
    alignItems: 'center',
    marginBottom: 16,
  },
  formSection: {
    width: '100%',
    maxWidth: 343,
    gap: 24,
  },
  title: {
    fontFamily: fonts.anton,
    fontSize: 32,
    color: '#FFFFFF',
    textAlign: 'center',
    textTransform: 'uppercase',
    lineHeight: 38,
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
  input: {
    height: 48,
    borderWidth: 1.5,
    borderColor: '#F1E1DD',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
    fontFamily: fonts.almarai,
    fontSize: 16,
    color: '#F0EBEA',
    backgroundColor: 'transparent',
  },
  continueButton: {
    backgroundColor: '#5AF2B4',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 8,
  },
  continueButtonText: {
    fontFamily: 'Almarai-Bold',
    fontSize: 16,
    color: '#252525',
    lineHeight: 24,
  },
  divider: {
    height: StyleSheet.hairlineWidth,
    width: '100%',
    maxWidth: 343,
    backgroundColor: '#8F7E81',
    marginVertical: 32,
  },
  socialSection: {
    width: '100%',
    maxWidth: 343,
    gap: 12,
  },
  socialButton: {
    borderWidth: 2,
    borderColor: '#5AF2B4',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  socialButtonText: {
    fontFamily: 'Almarai-Bold',
    fontSize: 16,
    color: '#5AF2B4',
    lineHeight: 24,
  },
});