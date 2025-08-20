import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  Dimensions,
  TextInput,
  SafeAreaView,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { fonts, fontWeights } from '../utils/fonts';
import { KIDS_HOME_GRADIENT } from '../styles/gradients';
import { useAppNavigation } from '../hooks/useAppNavigation';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

export default function KidsBlockScreen() {
  const navigation = useAppNavigation();
  const [code, setCode] = useState(['', '', '', '']);
  const [showError, setShowError] = useState(false);

  const handleCodeChange = (value: string, index: number) => {
    if (value.length <= 1 && /^\d*$/.test(value)) {
      const newCode = [...code];
      newCode[index] = value;
      setCode(newCode);
      setShowError(false);
    }
  };

  const handleUnblock = () => {
    const enteredCode = code.join('');
    // Verificar se o código está correto (exemplo: 9999)
    if (enteredCode === '9999') {
      // Navegar de volta para seleção de perfil ou tela anterior
      navigation.goBack();
      setCode(['', '', '', '']);
    } else {
      setShowError(true);
    }
  };

  const handleForgotCode = () => {
    // Implementar lógica para esqueci o código
    console.log('Esqueci o código');
  };

  const isCodeComplete = code.every(digit => digit !== '');

  return (
    <LinearGradient
      colors={KIDS_HOME_GRADIENT.colors}
      start={KIDS_HOME_GRADIENT.start}
      end={KIDS_HOME_GRADIENT.end}
      locations={KIDS_HOME_GRADIENT.locations}
      style={styles.container}
    >
      <SafeAreaView style={styles.safeArea}>
        {/* Logo no topo */}
        <View style={styles.topLogoContainer}>
          <Image 
            source={require('../../public/logo_kids_pink.png')}
            style={styles.topLogo}
            resizeMode="contain"
          />
        </View>

        {/* Conteúdo central */}
        <View style={styles.centerContent}>
          {/* Character Image */}
          <Image 
            source={require('../../public/PersonagemKids.png')}
            style={styles.characterImage}
            resizeMode="contain"
          />

          {/* Message */}
          <Text style={styles.message}>
            Seu tempo acabou! Entregue o celular para a pessoa responsável.
          </Text>

          {/* Seção do código - também no centro */}
          <View style={styles.codeSection}>
            {/* Protection Code Title */}
            <Text style={styles.codeTitle}>
              Código de proteção
            </Text>

            {/* Code Input */}
            <View style={styles.codeContainer}>
              {code.map((digit, index) => (
                <TextInput
                  key={index}
                  style={[
                    styles.codeInput,
                    showError && styles.codeInputError
                  ]}
                  value={digit}
                  onChangeText={(value) => handleCodeChange(value, index)}
                  keyboardType="numeric"
                  maxLength={1}
                  textAlign="center"
                />
              ))}
            </View>

            {/* Helper Text */}
            <Text style={styles.helperText}>
              O código é necessário para sair deste perfil.
            </Text>
          </View>
        </View>

        {/* Botões no final */}
        <View style={styles.buttonsContainer}>
          {/* Unblock Button */}
          <TouchableOpacity 
            style={[
              styles.unblockButton,
              !isCodeComplete && styles.unblockButtonDisabled
            ]}
            onPress={handleUnblock}
            disabled={!isCodeComplete}
            activeOpacity={0.8}
          >
            <Text style={styles.unblockButtonText}>Desbloquear</Text>
          </TouchableOpacity>

          {/* Forgot Code Button */}
          <TouchableOpacity 
            style={styles.forgotButton}
            onPress={handleForgotCode}
            activeOpacity={0.8}
          >
            <Text style={styles.forgotButtonText}>Esqueci o código</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  safeArea: {
    flex: 1,
  },
  // Logo no topo - mesma altura da KidsHomeScreen
  topLogoContainer: {
    height: 48,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingTop: 8,
  },
  topLogo: {
    width: 120,
    height: 40,
  },
  // Conteúdo central - personagem, texto e código centralizados
  centerContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 32,
  },
  characterImage: {
    width: 120,
    height: 120,
    marginBottom: 24,
  },
  message: {
    fontFamily: 'Almarai',
    fontSize: 16,
    color: '#AB4766',
    lineHeight: 24,
    textAlign: 'center',
    maxWidth: 300,
    marginBottom: 40,
  },
  // Seção do código - dentro do centro mas alinhada à esquerda
  codeSection: {
    width: '100%',
    alignItems: 'flex-start', // Alinha conteúdo à esquerda
  },
  codeTitle: {
    fontFamily: 'Almarai-Bold',
    fontSize: 16,
    color: '#AB4766',
    marginBottom: 16,
    textAlign: 'left',
  },
  codeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
    width: '100%',
  },
  codeInput: {
    flex: 1,
    maxWidth: '22%',
    height: 44, // Altura fixa de 44px como solicitado
    borderWidth: 2,
    borderColor: '#AB4766',
    borderRadius: 12,
    backgroundColor: 'transparent',
    fontSize: 24,
    fontFamily: 'Almarai-Bold',
    color: '#AB4766',
    textAlign: 'center',
  },
  codeInputError: {
    borderColor: '#DC372A',
  },
  helperText: {
    fontFamily: 'Almarai',
    fontSize: 14,
    color: '#999999', // Cinza como solicitado
    textAlign: 'left', // Alinhado à esquerda
    opacity: 1,
  },
  // Botões no final da página
  buttonsContainer: {
    paddingHorizontal: 32,
    paddingBottom: 32,
    gap: 16,
  },
  unblockButton: {
    backgroundColor: '#AB4766',
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
    shadowColor: '#AB4766',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  unblockButtonDisabled: {
    backgroundColor: '#D2C8E3',
    shadowOpacity: 0,
    elevation: 0,
  },
  unblockButtonText: {
    fontFamily: 'Almarai-Bold',
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFFFFF',
    lineHeight: 24,
  },
  forgotButton: {
    backgroundColor: '#D2C8E3',
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
  },
  forgotButtonText: {
    fontFamily: 'Almarai-Bold',
    fontSize: 16,
    fontWeight: 'bold',
    color: '#AB4766',
    lineHeight: 24,
  },
});
