import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import LoreLogo from '../components/LoreLogo';
import { fonts } from '../utils/fonts';
import { RootStackParamList } from '../navigation/types';
import { LinearGradient, PRIMARY_GRADIENT, gradientStyle } from '../styles/gradients';

type ForgotPasswordSuccessScreenNavigationProp = StackNavigationProp<RootStackParamList, 'ForgotPasswordSuccess'>;
type ForgotPasswordSuccessScreenRouteProp = RouteProp<RootStackParamList, 'ForgotPasswordSuccess'>;

export default function ForgotPasswordSuccessScreen() {
  const navigation = useNavigation<ForgotPasswordSuccessScreenNavigationProp>();
  const route = useRoute<ForgotPasswordSuccessScreenRouteProp>();
  const [countdown, setCountdown] = useState(60);
  const [canResend, setCanResend] = useState(false);

  const email = route.params?.email || '';

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          setCanResend(true);
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const handleResendInstructions = () => {
    // Reset countdown
    setCountdown(60);
    setCanResend(false);
    
    // Here you would make the API call to resend the email
    console.log('Resending instructions to:', email);
    
    // Restart countdown
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          setCanResend(true);
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const handleBackToLogin = () => {
    navigation.navigate('Login');
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
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
        <View style={styles.content}>
          {/* Header with Logo */}
          <View style={styles.header}>
            <LoreLogo />
          </View>

          {/* Main Content */}
          <View style={styles.mainContent}>
            {/* Title and Description grouped together */}
            <View style={styles.textGroup}>
              <Text style={styles.title}>
                AS INSTRUÇÕES{'\n'}FORAM ENVIADAS!
              </Text>

              <Text style={styles.description}>
                Um e-mail com instruções para redefinir sua senha foi enviado para o seu endereço de e-mail registrado. Verifique sua caixa de entrada e spam.
              </Text>

              {/* Email display */}
              {email && (
                <View style={styles.emailContainer}>
                  <Text style={styles.emailLabel}>E-mail enviado para:</Text>
                  <Text style={styles.emailText}>{email}</Text>
                </View>
              )}
            </View>
          </View>

          {/* Bottom Section */}
          <View style={styles.bottomSection}>
            {/* Resend Button */}
            <TouchableOpacity
              style={[
                styles.resendButton,
                !canResend && styles.resendButtonDisabled
              ]}
              onPress={handleResendInstructions}
              activeOpacity={0.8}
              disabled={!canResend}
            >
              <Text style={[
                styles.resendButtonText,
                !canResend && styles.resendButtonTextDisabled
              ]}>
                {canResend 
                  ? 'Reenviar Instruções' 
                  : `Reenviar Instruções (${formatTime(countdown)})`
                }
              </Text>
            </TouchableOpacity>

            {/* Back to Login */}
            <TouchableOpacity
              style={styles.loginButton}
              onPress={handleBackToLogin}
              activeOpacity={0.7}
            >
              <Text style={styles.loginButtonText}>Login</Text>
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'transparent',
  },
  content: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 20,
    paddingBottom: 16,
  },
  header: {
    alignItems: 'center',
    marginBottom: 40,
    paddingVertical: 24,
  },
  mainContent: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingHorizontal: 16,
    paddingTop: 32,
  },
  textGroup: {
    alignItems: 'center',
    gap: 24,
    maxWidth: 343,
  },
  title: {
    fontFamily: 'Anton',
    fontSize: 32,
    color: '#F0EBEA',
    textAlign: 'center',
    textTransform: 'uppercase',
    lineHeight: 38,
    maxWidth: 343,
  },
  description: {
    fontFamily: 'Almarai',
    fontSize: 16,
    color: '#F0EBEA',
    textAlign: 'center',
    lineHeight: 24,
    maxWidth: 343,
  },
  emailContainer: {
    alignItems: 'center',
    gap: 8,
    paddingHorizontal: 16,
    paddingVertical: 16,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },
  emailLabel: {
    fontFamily: 'Almarai',
    fontSize: 14,
    color: '#F1E1DD',
    textAlign: 'center',
  },
  emailText: {
    fontFamily: 'Almarai-Bold',
    fontSize: 16,
    color: '#F0EBEA',
    textAlign: 'center',
  },
  bottomSection: {
    gap: 16,
    paddingHorizontal: 16,
    marginTop: 32,
  },
  resendButton: {
    backgroundColor: '#5AF2B4',
    height: 48,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  resendButtonDisabled: {
    backgroundColor: 'rgba(90, 242, 180, 0.3)',
  },
  resendButtonText: {
    fontFamily: 'Almarai-Bold',
    fontSize: 16,
    color: '#252525',
    lineHeight: 24,
  },
  resendButtonTextDisabled: {
    color: 'rgba(37, 37, 37, 0.6)',
  },
  loginButton: {
    height: 48,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: '#5AF2B4',
    backgroundColor: 'transparent',
  },
  loginButtonText: {
    fontFamily: 'Almarai-Bold',
    fontSize: 16,
    color: '#5AF2B4',
    lineHeight: 24,
  },
});
