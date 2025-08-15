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

interface OptionsMenuProps {
  visible: boolean;
  onClose: () => void;
  onReport: () => void;
  position?: { x: number; y: number };
}

export default function OptionsMenu({ 
  visible, 
  onClose, 
  onReport,
  position = { x: 0, y: 0 }
}: OptionsMenuProps) {
  const handleReport = () => {
    onReport();
    onClose();
  };

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <TouchableWithoutFeedback onPress={onClose}>
        <View style={styles.modalOverlay}>
          <TouchableWithoutFeedback>
            <View style={[styles.menuContainer, { top: position.y, right: 20 }]}>
              <TouchableOpacity 
                style={styles.menuItem} 
                onPress={handleReport}
                activeOpacity={0.7}
              >
                <Ionicons name="flag-outline" size={20} color="#69162B" />
                <Text style={styles.menuItemText}>Denunciar</Text>
              </TouchableOpacity>
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
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
  },
  menuContainer: {
    position: 'absolute',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    paddingVertical: 8,
    paddingHorizontal: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.15,
    shadowRadius: 3.84,
    elevation: 5,
    minWidth: 140,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 8,
    gap: 10,
  },
  menuItemText: {
    fontFamily: fonts.almarai,
    fontSize: 14,
    color: '#69162B',
  },
});