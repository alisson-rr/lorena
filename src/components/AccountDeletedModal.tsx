import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Modal,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { fonts, fontWeights } from '../utils/fonts';

interface AccountDeletedModalProps {
  visible: boolean;
  onClose: () => void;
}

export default function AccountDeletedModal({ 
  visible, 
  onClose 
}: AccountDeletedModalProps) {
  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContainer}>
          {/* Header */}
          <View style={styles.header}>
            <View style={styles.headerContent}>
              <View style={styles.headerRow}>
                <Text style={styles.title}>Conta Deletada</Text>
                <TouchableOpacity onPress={onClose}>
                  <Ionicons name="close" size={24} color="#69162B" />
                </TouchableOpacity>
              </View>
            </View>
            <View style={styles.headerBorder} />
          </View>

          {/* Content */}
          <View style={styles.content}>
            <Text style={styles.message}>
              Vamos sentir a sua falta! Esperamos reencontrar você em breve.
            </Text>

            {/* OK Button */}
            <TouchableOpacity 
              style={styles.okButton}
              onPress={onClose}
              activeOpacity={0.8}
            >
              <Text style={styles.okButtonText}>Ok</Text>
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
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.25)',
  },
  modalContainer: {
    backgroundColor: '#F0EBEA',
    borderRadius: 24,
    marginHorizontal: 24,
    width: '90%',
    maxWidth: 375,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: -5,
    },
    shadowOpacity: 0.25,
    shadowRadius: 10,
    elevation: 20,
  },
  header: {
    backgroundColor: '#F0EBEA',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    position: 'relative',
  },
  headerContent: {
    padding: 24,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 20,
  },
  headerBorder: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 1,
    backgroundColor: '#D8BFC4',
  },
  title: {
    fontFamily: 'Roboto Serif',
    fontSize: 18,
    color: '#69162B',
    flex: 1,
    lineHeight: 21.6, // 1.2 * 18
  },
  content: {
    backgroundColor: '#F0EBEA',
    padding: 24,
    paddingTop: 24,
    paddingBottom: 24,
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
    gap: 32,
  },
  message: {
    fontFamily: fonts.almarai,
    fontSize: 16,
    color: '#4D4847',
    lineHeight: 24, // 1.5 * 16
    textAlign: 'left',
  },
  okButton: {
    backgroundColor: '#69162B',
    height: 48,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
    paddingVertical: 12,
    marginTop: 8,
  },
  okButtonText: {
    fontFamily: fonts.almaraiBold,
    fontSize: 16,
    color: '#F0EBEA',
    lineHeight: 24, // 1.5 * 16
  },
});