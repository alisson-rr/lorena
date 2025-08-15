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

interface ReportDialogProps {
  visible: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

export default function ReportDialog({ 
  visible, 
  onClose, 
  onConfirm 
}: ReportDialogProps) {
  const handleConfirm = () => {
    onConfirm();
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
                <Text style={styles.title}>Denunciar comentário</Text>
                <TouchableOpacity onPress={onClose} style={styles.closeButton}>
                  <Ionicons name="close" size={24} color="#69162B" />
                </TouchableOpacity>
              </View>

              {/* Content */}
              <View style={styles.content}>
                <Text style={styles.message}>
                  Tem certeza de que deseja denunciar este comentário?
                </Text>
              </View>

              {/* Actions */}
              <View style={styles.actions}>
                <TouchableOpacity 
                  style={[styles.button, styles.confirmButton]}
                  onPress={handleConfirm}
                  activeOpacity={0.8}
                >
                  <Text style={styles.confirmButtonText}>Sim</Text>
                </TouchableOpacity>

                <TouchableOpacity 
                  style={[styles.button, styles.cancelButton]}
                  onPress={onClose}
                  activeOpacity={0.8}
                >
                  <Text style={styles.cancelButtonText}>Não</Text>
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
    borderWidth: 1,
    borderColor: '#D8BFC4',
    maxHeight: '50%',
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
    flexDirection: 'row',
    padding: 20,
    paddingTop: 0,
    gap: 12,
  },
  button: {
    flex: 1,
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
  },
  confirmButton: {
    backgroundColor: '#69162B',
  },
  confirmButtonText: {
    fontFamily: fonts.almaraiBold,
    fontSize: 16,
    color: '#FFFFFF',
  },
  cancelButton: {
    backgroundColor: '#DC372A',
  },
  cancelButtonText: {
    fontFamily: fonts.almaraiBold,
    fontSize: 16,
    color: '#FFFFFF',
  },
});