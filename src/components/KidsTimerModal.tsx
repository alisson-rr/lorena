import React from 'react';
import {
  View,
  Text,
  Modal,
  TouchableOpacity,
  SafeAreaView,
  StyleSheet,
  Image,
} from 'react-native';
import { fonts, fontWeights } from '../utils/fonts';

interface KidsTimerModalProps {
  visible: boolean;
  onClose: () => void;
  timeRemaining?: number; // em horas
  hasTimeLimit: boolean;
}

export const KidsTimerModal: React.FC<KidsTimerModalProps> = ({
  visible,
  onClose,
  timeRemaining,
  hasTimeLimit,
}) => {
  const handleClose = () => {
    onClose();
  };

  const getTimeText = () => {
    if (!hasTimeLimit) {
      return 'Sua diversão começa agora!\nAproveite 2 horas para ver vídeo e jogos!';
    }
    
    if (timeRemaining && timeRemaining > 0) {
      const hours = Math.floor(timeRemaining);
      const minutes = Math.round((timeRemaining - hours) * 60);
      
      if (hours > 0 && minutes > 0) {
        return `Sua diversão começa agora!\nAproveite ${hours}h${minutes}min para ver vídeo e jogos!`;
      } else if (hours > 0) {
        return `Sua diversão começa agora!\nAproveite ${hours} ${hours === 1 ? 'hora' : 'horas'} para ver vídeo e jogos!`;
      } else {
        return `Sua diversão começa agora!\nAproveite ${minutes} minutos para ver vídeo e jogos!`;
      }
    }
    
    return 'Sua diversão começa agora!\nAproveite 2 horas para ver vídeo e jogos!';
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
                <Text style={styles.closeButtonText}>×</Text>
              </TouchableOpacity>
            </View>

            {/* Divider Line */}
            <View style={styles.divider} />

            {/* Content */}
            <View style={styles.content}>
              {/* Character Image */}
              <View style={styles.characterContainer}>
                <Image 
                  source={require('../../public/PersonagemKids.png')}
                  style={styles.characterImage}
                  resizeMode="contain"
                />
              </View>

              {/* Message */}
              <Text style={styles.message}>
                {getTimeText()}
              </Text>

              {/* OK Button */}
              <TouchableOpacity 
                style={styles.okButton}
                onPress={handleClose}
              >
                <Text style={styles.okButtonText}>Ok</Text>
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
    width: 32,
    height: 32,
    justifyContent: 'center',
    alignItems: 'center',
  },
  closeButtonText: {
    fontSize: 24,
    color: '#AB4766',
    fontWeight: '300',
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
    alignItems: 'center',
  },
  characterContainer: {
    width: 120,
    height: 120,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 24,
  },
  characterImage: {
    width: 80,
    height: 80,
  },
  message: {
    fontFamily: fonts.almarai,
    fontSize: 16,
    color: '#AB4766',
    lineHeight: 24,
    textAlign: 'center',
    marginBottom: 32,
  },
  okButton: {
    backgroundColor: '#AB4766',
    borderRadius: 8,
    paddingVertical: 16,
    alignItems: 'center',
    width: '100%',
  },
  okButtonText: {
    fontFamily: fonts.almaraiBold,
    fontSize: 16,
    fontWeight: fontWeights.bold,
    color: '#FFFFFF',
    lineHeight: 24,
  },
});
