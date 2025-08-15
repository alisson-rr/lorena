import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Modal,
  Alert,
  Dimensions,
  Animated,
  TouchableWithoutFeedback,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { fonts } from '../utils/fonts';

const { height: screenHeight } = Dimensions.get('window');

interface ForgotPasswordBottomSheetProps {
  visible: boolean;
  onClose: () => void;
  onSubmit: (email: string) => void;
}

export default function ForgotPasswordBottomSheet({ 
  visible, 
  onClose, 
  onSubmit 
}: ForgotPasswordBottomSheetProps) {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [slideAnim] = useState(new Animated.Value(screenHeight));

  React.useEffect(() => {
    if (visible) {
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start();
    } else {
      Animated.timing(slideAnim, {
        toValue: screenHeight,
        duration: 250,
        useNativeDriver: true,
      }).start();
    }
  }, [visible, slideAnim]);

  const handleSubmit = async () => {
    if (!email.trim()) {
      Alert.alert('Erro', 'Por favor, digite seu e-mail');
      return;
    }

    if (!email.includes('@')) {
      Alert.alert('Erro', 'Por favor, digite um e-mail válido');
      return;
    }

    setLoading(true);
    try {
      await onSubmit(email);
      setEmail('');
      onClose();
    } catch (error) {
      Alert.alert('Erro', 'Ocorreu um erro. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    setEmail('');
    onClose();
  };

  const handleBackdropPress = () => {
    handleClose();
  };

  if (!visible) return null;

  return (
    <Modal
      visible={visible}
      transparent
      animationType="none"
      onRequestClose={handleClose}
    >
      <TouchableWithoutFeedback onPress={handleBackdropPress}>
        <View style={styles.backdrop}>
          <TouchableWithoutFeedback>
            <Animated.View 
              style={[
                styles.bottomSheet,
                {
                  transform: [{ translateY: slideAnim }]
                }
              ]}
            >
              {/* Handle */}
              <View style={styles.handle} />

              {/* Header */}
              <View style={styles.header}>
                <Text style={styles.title}>Recuperar Senha</Text>
                <TouchableOpacity
                  style={styles.closeButton}
                  onPress={handleClose}
                  activeOpacity={0.7}
                >
                  <Ionicons name="close" size={24} color="#69162B" />
                </TouchableOpacity>
              </View>

              {/* Content */}
              <View style={styles.content}>
                <Text style={styles.description}>
                  Informe seu e-mail e enviaremos um link para você redefinir sua senha.
                </Text>

                {/* Email Input */}
                <View style={styles.inputContainer}>
                  <Text style={styles.label}>Email</Text>
                  <TextInput
                    style={styles.input}
                    placeholder="email@email.com"
                    placeholderTextColor="#8F7E81"
                    value={email}
                    onChangeText={setEmail}
                    keyboardType="email-address"
                    autoCapitalize="none"
                    autoCorrect={false}
                    editable={!loading}
                  />
                </View>

                {/* Submit Button */}
                <TouchableOpacity
                  style={[
                    styles.submitButton,
                    (!email.trim() || loading) && styles.submitButtonDisabled
                  ]}
                  onPress={handleSubmit}
                  activeOpacity={0.8}
                  disabled={!email.trim() || loading}
                >
                  <Text style={styles.submitButtonText}>
                    {loading ? 'Enviando...' : 'Enviar Instruções'}
                  </Text>
                </TouchableOpacity>
              </View>
            </Animated.View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
}

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  bottomSheet: {
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    paddingTop: 8,
    paddingBottom: 34, // Safe area for bottom
    maxHeight: screenHeight * 0.6,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: -4,
    },
    shadowOpacity: 0.25,
    shadowRadius: 16,
    elevation: 16,
  },
  handle: {
    width: 36,
    height: 4,
    backgroundColor: '#D8BFC4',
    borderRadius: 2,
    alignSelf: 'center',
    marginBottom: 20,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 24,
    paddingBottom: 20,
  },
  title: {
    fontFamily: 'RobotoSerif-Regular',
    fontSize: 20,
    color: '#69162B',
    lineHeight: 24,
    fontWeight: 'normal',
  },
  closeButton: {
    padding: 4,
  },
  content: {
    paddingHorizontal: 24,
    gap: 24,
  },
  description: {
    fontFamily: 'Almarai',
    fontSize: 16,
    color: '#69162B',
    lineHeight: 24,
    textAlign: 'left',
  },
  inputContainer: {
    gap: 12,
  },
  label: {
    fontFamily: 'Almarai-Bold',
    fontSize: 14,
    color: '#69162B',
    lineHeight: 21,
  },
  input: {
    height: 56,
    borderWidth: 1,
    borderColor: '#D8BFC4',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 16,
    fontFamily: 'Almarai',
    fontSize: 16,
    color: '#69162B',
    backgroundColor: '#FFFFFF',
  },
  submitButton: {
    backgroundColor: '#69162B',
    height: 56,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 16,
  },
  submitButtonDisabled: {
    opacity: 0.5,
  },
  submitButtonText: {
    fontFamily: 'Almarai-Bold',
    fontSize: 18,
    color: '#FFFFFF',
    lineHeight: 27,
  },
});
