import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Modal,
  SafeAreaView,
  TextInput,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { fonts, fontWeights } from '../utils/fonts';

interface KidsExitBottomSheetProps {
  visible: boolean;
  onClose: () => void;
  onConfirmExit: () => void;
}

export default function KidsExitBottomSheet({ 
  visible, 
  onClose, 
  onConfirmExit 
}: KidsExitBottomSheetProps) {
  const [code, setCode] = useState(['', '', '', '']);
  const [focusedIndex, setFocusedIndex] = useState(0);

  // Código de proteção (pode ser configurável)
  const PROTECTION_CODE = '9999';

  const handleCodeChange = (value: string, index: number) => {
    if (value.length <= 1 && /^\d*$/.test(value)) {
      const newCode = [...code];
      newCode[index] = value;
      setCode(newCode);

      // Auto-focus próximo campo
      if (value && index < 3) {
        setFocusedIndex(index + 1);
      }
    }
  };

  const handleKeyPress = (key: string, index: number) => {
    if (key === 'Backspace' && !code[index] && index > 0) {
      setFocusedIndex(index - 1);
    }
  };

  const handleConfirm = () => {
    const enteredCode = code.join('');
    
    if (enteredCode.length !== 4) {
      Alert.alert('Erro', 'Digite o código completo de 4 dígitos.');
      return;
    }

    if (enteredCode === PROTECTION_CODE) {
      // Código correto - sair do perfil
      onConfirmExit();
      handleClose();
    } else {
      // Código incorreto
      Alert.alert('Código Incorreto', 'O código digitado está incorreto. Tente novamente.');
      setCode(['', '', '', '']);
      setFocusedIndex(0);
    }
  };

  const handleClose = () => {
    setCode(['', '', '', '']);
    setFocusedIndex(0);
    onClose();
  };

  if (!visible) return null;

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent={true}
      onRequestClose={handleClose}
    >
      <View style={styles.overlay}>
        <View style={styles.bottomSheet}>
          <SafeAreaView>
            {/* Header */}
            <View style={styles.header}>
              <Text style={styles.title}>Sair do Perfil Infantil</Text>
              <TouchableOpacity onPress={handleClose} style={styles.closeButton}>
                <Ionicons name="close" size={24} color="#AB4766" />
              </TouchableOpacity>
            </View>

            {/* Divider Line */}
            <View style={styles.divider} />

            {/* Content */}
            <View style={styles.content}>
              <Text style={styles.description}>
                Digite o código para sair deste perfil.
              </Text>

              <Text style={styles.codeLabel}>Código de proteção</Text>

              {/* Code Input */}
              <View style={styles.codeContainer}>
                {code.map((digit, index) => (
                  <TextInput
                    key={index}
                    style={[
                      styles.codeInput,
                      focusedIndex === index && styles.codeInputFocused
                    ]}
                    value={digit}
                    onChangeText={(value) => handleCodeChange(value, index)}
                    onFocus={() => setFocusedIndex(index)}
                    onKeyPress={({ nativeEvent }) => handleKeyPress(nativeEvent.key, index)}
                    keyboardType="numeric"
                    maxLength={1}
                    selectTextOnFocus
                    autoFocus={index === 0}
                  />
                ))}
              </View>

              {/* Confirm Button */}
              <TouchableOpacity 
                style={styles.confirmButton}
                onPress={handleConfirm}
                activeOpacity={0.8}
              >
                <Text style={styles.confirmButtonText}>Ok</Text>
              </TouchableOpacity>
            </View>
          </SafeAreaView>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  bottomSheet: {
    backgroundColor: '#EAE2F6', // Fundo roxo claro como na imagem
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    paddingBottom: 20,
    minHeight: 320,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingTop: 20,
    paddingBottom: 16,
  },
  title: {
    fontFamily: 'Roboto Serif',
    fontSize: 18,
    fontWeight: '400', // Regular
    color: '#AB4766',
    lineHeight: 21.6, // 120% de 18px
  },
  closeButton: {
    padding: 4,
  },
  divider: {
    height: 1,
    backgroundColor: '#AB4766',
    marginHorizontal: 0,
    marginTop: 16,
    marginBottom: 16,
    opacity: 0.2,
  },
  content: {
    paddingHorizontal: 24,
    paddingBottom: 24,
    paddingTop: 8,
  },
  description: {
    fontFamily: fonts.almarai,
    fontSize: 16,
    color: '#AB4766',
    lineHeight: 24,
    marginBottom: 32,
  },
  codeLabel: {
    fontFamily: fonts.almaraiBold,
    fontSize: 14,
    fontWeight: fontWeights.bold,
    color: '#AB4766',
    lineHeight: 21,
    marginBottom: 16,
  },
  codeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 32,
    paddingHorizontal: 20,
  },
  codeInput: {
    width: 60,
    height: 60,
    borderWidth: 2,
    borderColor: '#AB4766',
    borderRadius: 8,
    backgroundColor: 'transparent', // Sem fundo
    textAlign: 'center',
    fontFamily: fonts.almaraiBold,
    fontSize: 24,
    fontWeight: fontWeights.bold,
    color: '#AB4766',
  },
  codeInputFocused: {
    borderColor: '#AB4766',
    borderWidth: 3,
  },
  confirmButton: {
    backgroundColor: '#AB4766',
    paddingVertical: 16,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
  confirmButtonText: {
    fontFamily: fonts.almaraiBold,
    fontSize: 16,
    fontWeight: fontWeights.bold,
    color: '#FFFFFF',
    lineHeight: 24,
  },
});
