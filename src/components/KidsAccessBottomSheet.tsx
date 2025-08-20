import React, { useState } from 'react';
import {
  View,
  Text,
  Modal,
  TouchableOpacity,
  SafeAreaView,
  StyleSheet,
  Image,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { fonts, fontWeights } from '../utils/fonts';

interface KidsAccessBottomSheetProps {
  visible: boolean;
  onClose: () => void;
  onStartAccess: (timeLimit: number | null) => void;
  childName: string;
}

export const KidsAccessBottomSheet: React.FC<KidsAccessBottomSheetProps> = ({
  visible,
  onClose,
  onStartAccess,
  childName,
}) => {
  const [timeLimit, setTimeLimit] = useState(1);
  const [noTimeLimit, setNoTimeLimit] = useState(false);

  const handleClose = () => {
    onClose();
  };

  const handleTimeIncrease = () => {
    if (!noTimeLimit) {
      setTimeLimit(prev => prev + 1);
    }
  };

  const handleTimeDecrease = () => {
    if (!noTimeLimit && timeLimit > 1) {
      setTimeLimit(prev => prev - 1);
    }
  };

  const handleNoTimeLimitToggle = () => {
    setNoTimeLimit(prev => !prev);
  };

  const handleStartAccess = () => {
    const finalTimeLimit = noTimeLimit ? null : timeLimit;
    onStartAccess(finalTimeLimit);
  };

  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      onRequestClose={handleClose}
    >
      <View style={styles.overlay}>
        <View style={styles.bottomSheet}>
          <SafeAreaView>
            {/* Header */}
            <View style={styles.header}>
              <Text style={styles.title}>Acesso Infantil</Text>
              <TouchableOpacity onPress={handleClose} style={styles.closeButton}>
                <Ionicons name="close" size={24} color="#AB4766" />
              </TouchableOpacity>
            </View>

            {/* Divider Line */}
            <View style={styles.divider} />

            {/* Content */}
            <View style={styles.content}>
              <Text style={styles.description}>
                Quanto tempo {childName} terá de acesso?
              </Text>

              {/* Time Controls */}
              <View style={styles.timeControls}>
                <TouchableOpacity 
                  onPress={handleTimeDecrease}
                  style={[styles.timeButton, (noTimeLimit || timeLimit <= 1) && styles.timeButtonDisabled]}
                  disabled={noTimeLimit || timeLimit <= 1}
                >
                  <Ionicons 
                    name="remove" 
                    size={24} 
                    color={noTimeLimit || timeLimit <= 1 ? '#AB476680' : '#AB4766'} 
                  />
                </TouchableOpacity>

                <View style={styles.timeDisplay}>
                  <Text style={[styles.timeText, noTimeLimit && styles.timeTextDisabled]}>
                    {timeLimit} {timeLimit === 1 ? 'hora' : 'horas'}
                  </Text>
                </View>

                <TouchableOpacity 
                  onPress={handleTimeIncrease}
                  style={[styles.timeButton, noTimeLimit && styles.timeButtonDisabled]}
                  disabled={noTimeLimit}
                >
                  <Ionicons 
                    name="add" 
                    size={24} 
                    color={noTimeLimit ? '#AB476680' : '#AB4766'} 
                  />
                </TouchableOpacity>
              </View>

              {/* No Time Limit Checkbox */}
              <TouchableOpacity 
                style={styles.checkboxContainer}
                onPress={handleNoTimeLimitToggle}
              >
                <View style={[styles.checkbox, noTimeLimit && styles.checkboxChecked]}>
                  {noTimeLimit && (
                    <Ionicons name="checkmark" size={16} color="#FFFFFF" />
                  )}
                </View>
                <Text style={styles.checkboxLabel}>Sem limite de tempo</Text>
              </TouchableOpacity>

              {/* Start Button */}
              <TouchableOpacity 
                style={styles.startButton}
                onPress={handleStartAccess}
              >
                <Text style={styles.startButtonText}>Começar</Text>
              </TouchableOpacity>
            </View>
          </SafeAreaView>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  bottomSheet: {
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    minHeight: 400,
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
    fontWeight: '400',
    color: '#AB4766',
    lineHeight: 21.6,
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
    textAlign: 'center',
    marginBottom: 32,
  },
  timeControls: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 32,
  },
  timeButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: 'transparent',
    borderWidth: 2,
    borderColor: '#AB4766',
    justifyContent: 'center',
    alignItems: 'center',
  },
  timeButtonDisabled: {
    borderColor: '#AB476680',
  },
  timeDisplay: {
    marginHorizontal: 40,
    alignItems: 'center',
  },
  timeText: {
    fontFamily: 'Roboto Serif',
    fontSize: 24,
    fontWeight: '400',
    color: '#AB4766',
    lineHeight: 28.8,
  },
  timeTextDisabled: {
    color: '#AB476680',
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 32,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderRadius: 4,
    borderWidth: 2,
    borderColor: '#AB4766',
    backgroundColor: 'transparent',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  checkboxChecked: {
    backgroundColor: '#AB4766',
  },
  checkboxLabel: {
    fontFamily: fonts.almarai,
    fontSize: 16,
    color: '#AB4766',
    lineHeight: 24,
  },
  startButton: {
    backgroundColor: '#AB4766',
    borderRadius: 8,
    paddingVertical: 16,
    alignItems: 'center',
    marginTop: 8,
    width: '100%',
  },
  startButtonText: {
    fontFamily: fonts.almaraiBold,
    fontSize: 16,
    fontWeight: fontWeights.bold,
    color: '#FFFFFF',
    lineHeight: 24,
  },
});
