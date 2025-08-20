import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { fonts, fontWeights } from '../utils/fonts';
import { KIDS_HOME_GRADIENT } from '../styles/gradients';
import KidsLogo from '../components/KidsLogo';
import MenuIcon from '../components/icons/MenuIcon';
import NotificationIcon from '../components/icons/NotificationIcon';
import KidsVideoCarousel from '../components/KidsVideoCarousel';
import KidsGamesSection from '../components/KidsGamesSection';
import KidsSelectedVideosSection from '../components/KidsSelectedVideosSection';
import KidsSidebar from '../components/KidsSidebar';
import KidsTimerInfoModal from '../components/KidsTimerInfoModal';
import { useAppNavigation, HomeScreenNavigationProp } from '../hooks/useAppNavigation';

// Mock data for videos
const mockVideos = [
  {
    id: '1',
    // Usando uma imagem que representa melhor o tema de fantasia/gaming do design
    image: '/display.png',
    title: 'ESPAÇO PARA O TÍTULO DO VÍDEO DUAS LINHAS...'
  },
  {
    id: '2',
    image: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=400&h=600&fit=crop',
    title: 'OUTRO VÍDEO INCRÍVEL PARA ASSISTIR'
  },
  {
    id: '3',
    image: 'https://images.unsplash.com/photo-1552820728-8b83bb6b773f?w=400&h=600&fit=crop',
    title: 'MAIS UM CONTEÚDO EXCLUSIVO'
  },
];



// Mock data for selected videos
const selectedVideos = [
  {
    id: '1',
    thumbnail: 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?w=200&h=350&fit=crop',
    title: 'Espaço para título em duas',
    isLive: true,
  },
  {
    id: '2',
    thumbnail: 'https://images.unsplash.com/photo-1574482620811-1aa16ffe3c82?w=200&h=350&fit=crop',
    title: 'Espaço para título em duas',
    viewCount: '4.2K',
  },
  {
    id: '3',
    thumbnail: 'https://images.unsplash.com/photo-1536520002442-39764a41e987?w=200&h=350&fit=crop',
    title: 'Espaço para título',
  },
  {
    id: '4',
    thumbnail: 'https://images.unsplash.com/photo-1581833971358-2c8b550f87b3?w=200&h=350&fit=crop',
    title: 'Espaço para título em duas',
  },
];




export default function KidsHomeScreen() {
  const navigation = useAppNavigation<HomeScreenNavigationProp>();
  const [sidebarVisible, setSidebarVisible] = useState(false);
  const [timerModalVisible, setTimerModalVisible] = useState(false);
  
  const handleTimerPress = () => {
    setTimerModalVisible(true);
  };

  const handleBlockPress = () => {
    navigation.navigate('KidsBlock');
  };
  
  const handleVideoPlay = (videoId: string) => {
    navigation.navigate('KidsVideoDetail', {
      videoId: videoId,
      title: 'ESPAÇO PARA O TÍTULO DO VÍDEO...',
    });
  };

  const handleGamePress = (gameId: string) => {
    navigation.navigate('KidsVideoDetail', {
      videoId: gameId,
      title: 'Espaço para o título do jogo',
    });
  };

  const handleSeeMoreGames = () => {
    navigation.navigate('CategoryDetail', {
      categoryId: 'cat-games',
      categoryName: 'Jogos',
    });
  };

  const handleSeeMoreSelected = () => {
    navigation.navigate('CategoryDetail', {
      categoryId: 'selected',
      categoryName: 'Selecionados',
    });
  };



  return (
    <LinearGradient
      colors={KIDS_HOME_GRADIENT.colors}
      start={KIDS_HOME_GRADIENT.start}
      end={KIDS_HOME_GRADIENT.end}
      locations={KIDS_HOME_GRADIENT.locations}
      style={styles.container}
    >
      <SafeAreaView style={styles.safeArea}>
        {/* Sidebar */}
        <KidsSidebar 
          visible={sidebarVisible}
          onClose={() => setSidebarVisible(false)}
        />
        
        {/* Header */}
        <View style={styles.header}>
        <TouchableOpacity 
          style={styles.menuButton}
          onPress={() => setSidebarVisible(true)}
        >
          <MenuIcon />
        </TouchableOpacity>
        
        <View style={styles.logoContainer}>
          <KidsLogo width={120} height={40} />
        </View>
        
        {/* Espaço vazio para manter o logo centralizado */}
        <View style={styles.notificationButton} />
      </View>

      {/* Botões Timer e Bloqueio */}
      <View style={styles.controlButtonsContainer}>
        <TouchableOpacity 
          style={styles.controlButton}
          onPress={handleTimerPress}
          activeOpacity={0.7}
        >
          <Text style={styles.controlButtonText}>Timer</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.controlButton}
          onPress={handleBlockPress}
          activeOpacity={0.7}
        >
          <Text style={styles.controlButtonText}>Bloqueio</Text>
        </TouchableOpacity>
      </View>

      {/* Content Area */}
      <ScrollView 
        style={styles.content} 
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
      >
        {/* Video Carousel - Main Banner */}
        <KidsVideoCarousel 
          videos={mockVideos}
          onVideoPlay={handleVideoPlay}
        />

        {/* Games Section */}
        <KidsGamesSection
          onGamePress={handleGamePress}
          onSeeMore={handleSeeMoreGames}
        />

        {/* Selected Videos Section */}
        <KidsSelectedVideosSection
          title="Selecionados"
          videos={selectedVideos}
          onVideoPress={handleVideoPlay}
          onSeeMore={handleSeeMoreSelected}
        />
      </ScrollView>
      </SafeAreaView>
      
      {/* Timer Info Modal */}
      <KidsTimerInfoModal
        visible={timerModalVisible}
        onClose={() => setTimerModalVisible(false)}
        timeRemaining={15}
      />
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  safeArea: {
    flex: 1,
  },
  header: {
    height: 48,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 24,
    backgroundColor: 'transparent',
  },
  menuButton: {
    padding: 4,
  },
  logoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  notificationButton: {
    padding: 4,
  },
  controlButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingVertical: 16,
    gap: 16,
  },
  controlButton: {
    backgroundColor: '#AB4766',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 20,
    minWidth: 100,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 4,
  },
  controlButtonText: {
    fontFamily: 'Almarai-Bold',
    fontSize: 14,
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  content: {
    flex: 1,
    backgroundColor: 'transparent',
  },
  contentContainer: {
    paddingBottom: 20,
  },
});
