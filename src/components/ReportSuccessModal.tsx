import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Modal,
  TouchableWithoutFeedback,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { fonts, fontWeights } from '../utils/fonts';

interface ReportSuccessModalProps {
  visible: boolean;
  onClose: () => void;
}

export default function ReportSuccessModal({ 
  visible, 
  onClose 
}: ReportSuccessModalProps) {
  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <TouchableWithoutFeedback onPress={onClose}>
        <View style={styles.modalOverlay}>
          <TouchableWithoutFeedback onPress={() => {}}>
            <View style={styles.modalContent}>
          {/* Header */}
          <View style={styles.header}>
            <Text style={styles.title}>Denúncia enviada</Text>
            <TouchableOpacity onPress={onClose} style={styles.closeButton}>
              <Ionicons name="close" size={24} color="#69162B" />
            </TouchableOpacity>
          </View>

          {/* Content */}
          <View style={styles.content}>
            <Text style={styles.message}>
              Agradecemos a sua denúncia e a avaliaremos em breve.
            </Text>
          </View>

          {/* Action */}
          <View style={styles.actions}>
            <TouchableOpacity 
              style={styles.okButton}
              onPress={onClose}
              activeOpacity={0.8}
            >
              <Text style={styles.okButtonText}>Ok</Text>
            </TouchableOpacity>
          </View>
            </View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  modalContent: {
    backgroundColor: '#F0EBEA',
    borderRadius: 24,
    borderWidth: 1,
    borderColor: '#D8BFC4',
    width: '100%',
    maxWidth: 400,
    paddingBottom: 20,
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
    fontFamily: 'RobotoSerif-Regular',
    fontSize: 18,
    color: '#69162B',
    fontWeight: 'normal',
  },
  closeButton: {
    padding: 4,
  },
  content: {
    padding: 20,
    paddingVertical: 30,
  },
  message: {
    fontFamily: fonts.almarai,
    fontSize: 16,
    color: '#4D4847',
    lineHeight: 24,
    textAlign: 'center',
  },
  actions: {
    paddingHorizontal: 20,
  },
  okButton: {
    backgroundColor: '#69162B',
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
  },
  okButtonText: {
    fontFamily: fonts.almaraiBold,
    fontSize: 16,
    color: '#FFFFFF',
  },
});