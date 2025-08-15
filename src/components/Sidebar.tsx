import React, { useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Modal,
  SafeAreaView,
  TouchableWithoutFeedback,
  Dimensions,
  Animated,
  Image,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import LogoutIcon from './icons/LogoutIcon';
import { fonts, fontWeights } from '../utils/fonts';
import { useAppNavigation } from '../hooks/useAppNavigation';

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const SIDEBAR_WIDTH = 320; // Fixed width for sidebar

interface SidebarProps {
  visible: boolean;
  onClose: () => void;
}

export default function Sidebar({ visible, onClose }: SidebarProps) {
  const navigation = useAppNavigation();
  const translateX = useRef(new Animated.Value(-SIDEBAR_WIDTH)).current;
  const overlayOpacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (visible) {
      // Slide in from left
      Animated.parallel([
        Animated.timing(translateX, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.timing(overlayOpacity, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }),
      ]).start();
    } else {
      // Slide out to left
      Animated.parallel([
        Animated.timing(translateX, {
          toValue: -SIDEBAR_WIDTH,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.timing(overlayOpacity, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }),
      ]).start();
    }
  }, [visible]);

  const categories = [
    { id: 'coreografias', name: 'Coreografias' },
    { id: 'entrevistas', name: 'Entrevistas' },
    { id: 'jogos', name: 'Jogos' },
    { id: 'resenhas', name: 'Resenhas' },
    { id: 'webseries', name: 'Webséries' },
  ];

  const handleCategoryPress = (categoryId: string, categoryName: string) => {
    onClose();
    // Navigate to CategoryDetailScreen
    navigation.navigate('CategoryDetail', {
      categoryId,
      categoryName,
    });
  };

  const handleLogout = () => {
    console.log('Logout pressed');
    // Implement logout functionality
    onClose();
  };

  return (
    <Modal
      visible={visible}
      animationType="none"
      transparent={true}
      onRequestClose={onClose}
    >
      <TouchableWithoutFeedback onPress={onClose}>
        <Animated.View style={[styles.overlay, { opacity: overlayOpacity }]}>
          <TouchableWithoutFeedback>
            <Animated.View style={[styles.sidebar, { transform: [{ translateX }] }]}>
              <SafeAreaView style={styles.container}>
                {/* Header */}
                <View style={styles.header}>
                  <Image 
                    source={{ uri: '/LogoBranco.svg' }}
                    style={styles.logo}
                    resizeMode="contain"
                  />
                  <TouchableOpacity onPress={onClose} style={styles.closeButton}>
                    <Ionicons name="close-outline" size={28} color="#FFFFFF" />
                  </TouchableOpacity>
                </View>

                {/* Divider */}
                <View style={styles.divider} />

                {/* Categories Section */}
                <View style={styles.categoriesSection}>
                  <Text style={styles.categoriesTitle}>Categorias</Text>
                  
                  <View style={styles.categoriesList}>
                    {categories.map((category) => (
                      <TouchableOpacity
                        key={category.id}
                        style={styles.categoryItem}
                        onPress={() => handleCategoryPress(category.id, category.name)}
                        activeOpacity={0.7}
                      >
                        <Text style={styles.categoryText}>{category.name}</Text>
                      </TouchableOpacity>
                    ))}
                  </View>
                </View>

                {/* Spacer */}
                <View style={styles.spacer} />

                {/* Bottom Section */}
                <View>
                  {/* Divider */}
                  <View style={styles.divider} />
                  
                  {/* User Section */}
                  <View style={styles.userSection}>
                    <Text style={styles.userName}>Mariana Santos</Text>
                    <TouchableOpacity 
                      style={styles.logoutButton}
                      onPress={handleLogout}
                      activeOpacity={0.7}
                    >
                      <Text style={styles.logoutText}>Sair</Text>
                      <LogoutIcon size={24} color="#FFFFFF" />
                    </TouchableOpacity>
                  </View>
                </View>
              </SafeAreaView>
            </Animated.View>
          </TouchableWithoutFeedback>
        </Animated.View>
      </TouchableWithoutFeedback>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    flexDirection: 'row',
  },
  sidebar: {
    width: SIDEBAR_WIDTH,
    backgroundColor: '#69162B',
    borderTopRightRadius: 24,
    borderBottomRightRadius: 24,
    shadowColor: '#000',
    shadowOffset: {
      width: 4,
      height: 0,
    },
    shadowOpacity: 0.25,
    shadowRadius: 16,
    elevation: 16,
    overflow: 'hidden',
  },
  container: {
    flex: 1,
    paddingTop: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 32,
    paddingBottom: 20,
    paddingTop: 10,
  },
  logo: {
    width: 120,
    height: 40,
  },
  closeButton: {
    padding: 4,
  },
  divider: {
    height: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    marginHorizontal: 0,
  },
  categoriesSection: {
    paddingTop: 32,
    paddingHorizontal: 32,
  },
  categoriesTitle: {
    fontFamily: 'RobotoSerif-Regular',
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.7)',
    marginBottom: 28,
    lineHeight: 24,
    letterSpacing: 0.5,
  },
  categoriesList: {
    gap: 8,
  },
  categoryItem: {
    paddingVertical: 14,
  },
  categoryText: {
    fontFamily: 'RobotoSerif-Regular',
    fontSize: 16,
    color: '#FFFFFF',
    lineHeight: 24,
  },
  spacer: {
    flex: 1,
  },
  userSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 32,
    paddingVertical: 24,
  },
  userName: {
    fontFamily: 'RobotoSerif-Regular',
    fontSize: 16,
    color: '#FFFFFF',
    lineHeight: 24,
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  logoutText: {
    fontFamily: 'RobotoSerif-Regular',
    fontSize: 16,
    color: '#FFFFFF',
    lineHeight: 24,
  },
});