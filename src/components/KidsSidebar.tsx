import React, { useEffect, useRef, useState } from 'react';
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
import KidsExitBottomSheet from './KidsExitBottomSheet';

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const SIDEBAR_WIDTH = 320; // Fixed width for sidebar

interface KidsSidebarProps {
  visible: boolean;
  onClose: () => void;
}

export default function KidsSidebar({ visible, onClose }: KidsSidebarProps) {
  const navigation = useAppNavigation();
  const translateX = useRef(new Animated.Value(-SIDEBAR_WIDTH)).current;
  const overlayOpacity = useRef(new Animated.Value(0)).current;
  const [showExitBottomSheet, setShowExitBottomSheet] = useState(false);

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
    setShowExitBottomSheet(true);
  };

  const handleConfirmExit = () => {
    console.log('Exiting kids profile from sidebar...');
    // Implementar lógica de saída do perfil kids
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
                    source={require('../../public/logo_kids_white.png')}
                    style={styles.logo}
                    resizeMode="contain"
                  />
                  <TouchableOpacity onPress={onClose} style={styles.closeButton}>
                    <Ionicons name="close-outline" size={28} color="#EAE2F6" />
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
                    <Text style={styles.userName}>Antônia</Text>
                    <TouchableOpacity 
                      style={styles.logoutButton}
                      onPress={handleLogout}
                      activeOpacity={0.7}
                    >
                      <Text style={styles.logoutText}>Sair</Text>
                      <LogoutIcon size={24} color="#EAE2F6" />
                    </TouchableOpacity>
                  </View>
                </View>
              </SafeAreaView>
            </Animated.View>
          </TouchableWithoutFeedback>
        </Animated.View>
      </TouchableWithoutFeedback>
      
      {/* Kids Exit Bottom Sheet */}
      <KidsExitBottomSheet
        visible={showExitBottomSheet}
        onClose={() => setShowExitBottomSheet(false)}
        onConfirmExit={handleConfirmExit}
      />
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
    backgroundColor: '#AB4766', // Nova cor de fundo para kids
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
    backgroundColor: 'rgba(234, 226, 246, 0.3)', // Usando a cor #EAE2F6 com transparência
    marginHorizontal: 0,
  },
  categoriesSection: {
    paddingTop: 32,
    paddingHorizontal: 32,
  },
  categoriesTitle: {
    fontFamily: 'RobotoSerif-Regular',
    fontSize: 16,
    color: '#D2C8E3', // Cor específica para "Categorias"
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
    fontFamily: 'Almarai',
    fontSize: 16,
    color: '#EAE2F6', // Cor para demais textos
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
    fontFamily: 'Almarai',
    fontSize: 16,
    color: '#EAE2F6', // Cor para demais textos
    lineHeight: 24,
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  logoutText: {
    fontFamily: 'Almarai',
    fontSize: 16,
    color: '#EAE2F6', // Cor para demais textos
    lineHeight: 24,
  },
});
