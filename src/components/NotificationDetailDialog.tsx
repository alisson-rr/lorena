import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Modal,
  SafeAreaView,
  ScrollView,
  Image,
  Linking,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { fonts, fontWeights } from '../utils/fonts';

interface NotificationDetailDialogProps {
  visible: boolean;
  onClose: () => void;
  title: string;
  date: string;
  time: string;
  description: string;
  image?: string;
  link?: string;
}

export default function NotificationDetailDialog({
  visible,
  onClose,
  title,
  date,
  time,
  description,
  image,
  link,
}: NotificationDetailDialogProps) {
  
  const handleAccessLink = () => {
    if (link) {
      Linking.openURL(link).catch((err) => {
        console.error('Failed to open URL:', err);
      });
    }
  };

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent={true}
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <View style={styles.container}>
          <SafeAreaView style={styles.safeArea}>
            {/* Header */}
            <View style={styles.header}>
              <Text style={styles.headerTitle}>Notificação aberta</Text>
              <TouchableOpacity 
                style={styles.closeButton}
                onPress={onClose}
              >
                <Ionicons name="close" size={28} color="#69162B" />
              </TouchableOpacity>
            </View>

            {/* Content */}
            <ScrollView 
              style={styles.content}
              contentContainerStyle={styles.contentContainer}
              showsVerticalScrollIndicator={false}
            >
              {/* Optional Image */}
              {image && (
                <View style={styles.imageContainer}>
                  <Image 
                    source={{ uri: image }}
                    style={styles.image}
                    resizeMode="cover"
                  />
                </View>
              )}

              {/* Title */}
              <Text style={styles.title}>
                {title}
                {link && ' - link'}
              </Text>

              {/* Date and Time */}
              <Text style={styles.dateTime}>
                {date} · {time}
              </Text>

              {/* Description */}
              <Text style={styles.description}>
                {description}
              </Text>

              {/* Optional Access Button */}
              {link && (
                <TouchableOpacity 
                  style={styles.accessButton}
                  onPress={handleAccessLink}
                  activeOpacity={0.8}
                >
                  <Text style={styles.accessButtonText}>Acessar</Text>
                </TouchableOpacity>
              )}
            </ScrollView>
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
  container: {
    backgroundColor: '#F0EBEA',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    borderWidth: 1,
    borderColor: '#D8BFC4',
    maxHeight: '90%',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: -2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  safeArea: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingTop: 20,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#D8BFC4',
  },
  headerTitle: {
    fontFamily: 'RobotoSerif-Regular',
    fontSize: 18,
    color: '#69162B',
    lineHeight: 27,
  },
  closeButton: {
    padding: 4,
  },
  content: {
    flex: 1,
  },
  contentContainer: {
    padding: 24,
    paddingBottom: 40,
  },
  imageContainer: {
    width: '100%',
    height: 200,
    borderRadius: 12,
    overflow: 'hidden',
    marginBottom: 20,
    backgroundColor: '#D8BFC4',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  title: {
    fontFamily: 'Almarai-Bold',
    fontSize: 16,
    color: '#4D4847',
    lineHeight: 24,
    marginBottom: 8,
  },
  dateTime: {
    fontFamily: 'Almarai',
    fontSize: 12,
    color: '#8F7E81',
    lineHeight: 18,
    marginBottom: 16,
  },
  description: {
    fontFamily: 'Almarai',
    fontSize: 14,
    color: '#4D4847',
    lineHeight: 21,
    marginBottom: 24,
  },
  accessButton: {
    backgroundColor: '#69162B',
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
    marginTop: 8,
  },
  accessButtonText: {
    fontFamily: 'Almarai-Bold',
    fontSize: 16,
    color: '#FFFFFF',
    lineHeight: 24,
  },
});