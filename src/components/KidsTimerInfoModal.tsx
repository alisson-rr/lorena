import React from 'react';
import {
  View,
  Text,
  Modal,
  TouchableOpacity,
  StyleSheet,
  Image,
  Dimensions,
} from 'react-native';
import { fonts, fontWeights } from '../utils/fonts';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

interface KidsTimerInfoModalProps {
  visible: boolean;
  onClose: () => void;
  timeRemaining?: number; // em minutos
}

export default function KidsTimerInfoModal({
  visible,
  onClose,
  timeRemaining = 15,
}: KidsTimerInfoModalProps) {
  const handleClose = () => {
    onClose();
  };

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={handleClose}
    >
      <View style={styles.overlay}>
        <View style={styles.modalContainer}>
          {/* Character Image */}
          <Image 
            source={require('../../public/PersonagemKids.png')}
            style={styles.characterImage}
            resizeMode="contain"
          />

          {/* Message */}
          <Text style={styles.message}>
            Você tem <Text style={styles.highlightText}>{timeRemaining} minutos</Text> para seguir assistindo.
          </Text>

          {/* OK Button */}
          <TouchableOpacity 
            style={styles.okButton}
            onPress={handleClose}
            activeOpacity={0.8}
          >
            <Text style={styles.okButtonText}>Ok</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 24,
  },
  modalContainer: {
    backgroundColor: '#EAE2F6',
    borderRadius: 24,
    paddingHorizontal: 32,
    paddingVertical: 40,
    alignItems: 'center',
    width: SCREEN_WIDTH - 48,
    maxWidth: 400,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.25,
    shadowRadius: 16,
    elevation: 16,
  },
  characterImage: {
    width: 120,
    height: 120,
    marginBottom: 32,
  },
  message: {
    fontFamily: 'Almarai',
    fontSize: 16,
    color: '#AB4766',
    lineHeight: 24,
    textAlign: 'center',
    marginBottom: 32,
  },
  highlightText: {
    fontFamily: 'Almarai-Bold',
    fontWeight: 'bold',
    color: '#AB4766',
  },
  okButton: {
    backgroundColor: '#AB4766',
    borderRadius: 12,
    paddingVertical: 16,
    paddingHorizontal: 48,
    alignItems: 'center',
    minWidth: 120,
    shadowColor: '#AB4766',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  okButtonText: {
    fontFamily: 'Almarai-Bold',
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFFFFF',
    lineHeight: 24,
  },
});
