import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Modal,
  TouchableWithoutFeedback,
  Linking,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { fonts } from '../utils/fonts';

interface PrivacyTermsBottomSheetProps {
  visible: boolean;
  onClose: () => void;
}

export default function PrivacyTermsBottomSheet({ visible, onClose }: PrivacyTermsBottomSheetProps) {
  const handleTermsPress = () => {
    // In production, this would open the terms and conditions document
    console.log('Opening Terms and Conditions');
    // Linking.openURL('https://example.com/terms');
    onClose();
  };

  const handlePrivacyPress = () => {
    // In production, this would open the privacy policy document
    console.log('Opening Privacy Policy');
    // Linking.openURL('https://example.com/privacy');
    onClose();
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={styles.modalOverlay}>
        <TouchableWithoutFeedback onPress={onClose}>
          <View style={styles.touchableArea} />
        </TouchableWithoutFeedback>
        
        <View style={styles.modalContent}>
          {/* Header */}
          <View style={styles.header}>
            <Text style={styles.title}>Privacidade e Termos</Text>
            <TouchableOpacity onPress={onClose} style={styles.closeButton}>
              <Ionicons name="close" size={24} color="#69162B" />
            </TouchableOpacity>
          </View>

          {/* Options */}
          <View style={styles.optionsContainer}>
            <TouchableOpacity
              style={styles.optionItem}
              onPress={handleTermsPress}
              activeOpacity={0.7}
            >
              <Text style={styles.optionText}>Termos e Condições</Text>
              <Ionicons name="document-text-outline" size={20} color="#69162B" />
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.optionItem}
              onPress={handlePrivacyPress}
              activeOpacity={0.7}
            >
              <Text style={styles.optionText}>Política de Privacidade</Text>
              <Ionicons name="document-text-outline" size={20} color="#69162B" />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  touchableArea: {
    flex: 1,
  },
  modalContent: {
    backgroundColor: '#F0EBEA',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    paddingBottom: 20,
    borderWidth: 1,
    borderColor: '#D8BFC4',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#D8BFC4',
  },
  title: {
    fontFamily: fonts.robotoSerif,
    fontSize: 24,
    color: '#69162B',
  },
  closeButton: {
    padding: 4,
  },
  optionsContainer: {
    padding: 20,
  },
  optionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 16,
    paddingHorizontal: 4,
  },
  optionText: {
    fontFamily: fonts.almarai,
    fontSize: 16,
    color: '#69162B',
    flex: 1,
  },
});
