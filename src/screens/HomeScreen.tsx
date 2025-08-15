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
import { HOME_GRADIENT } from '../styles/gradients';
import NewLogo from '../components/NewLogo';
import MenuIcon from '../components/icons/MenuIcon';
import NotificationIcon from '../components/icons/NotificationIcon';
import VideoCarousel from '../components/VideoCarousel';
import ContinueWatchingSection from '../components/ContinueWatchingSection';
import FeaturedVideoCard from '../components/FeaturedVideoCard';
import SelectedVideosSection from '../components/SelectedVideosSection';
import SpecialAnnouncementCard from '../components/SpecialAnnouncementCard';
import LiveStreamCard from '../components/LiveStreamCard';
import PromoCarousel from '../components/PromoCarousel';
import Sidebar from '../components/Sidebar';
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

// Mock data for continue watching
const continueWatchingVideos = [
  {
    id: '1',
    thumbnail: 'https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?w=300&h=200&fit=crop',
    title: 'Espaço para o título do vídeo em duas linhas',
    progress: 65,
  },
  {
    id: '2',
    thumbnail: 'https://images.unsplash.com/photo-1560419015-7c427e8ae5ba?w=300&h=200&fit=crop',
    title: 'Espaço para o título do vídeo em duas linhas',
    progress: 30,
  },
  {
    id: '3',
    thumbnail: 'https://images.unsplash.com/photo-1612287230202-1ff1d85d1bdf?w=300&h=200&fit=crop',
    title: 'Espaço para o título do vídeo em duas linhas',
    progress: 80,
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

// Mock data for promo carousel
const promoData = [
  {
    id: '1',
    title: 'A confiança de uma pessoa saudável',
    image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=200&h=250&fit=crop',
    backgroundColor: ['#FFB6D9', '#FFC0E3', '#FFD4EC'],
  },
  {
    id: '2',
    title: 'Descubra seu potencial',
    image: 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=200&h=250&fit=crop',
    backgroundColor: ['#B6D9FF', '#C0E3FF', '#D4ECFF'],
  },
  {
    id: '3',
    title: 'Transforme sua vida',
    image: 'https://images.unsplash.com/photo-1594744803329-e58b31de8bf5?w=200&h=250&fit=crop',
    backgroundColor: ['#D9B6FF', '#E3C0FF', '#ECD4FF'],
  },
];


export default function HomeScreen() {
  const navigation = useAppNavigation<HomeScreenNavigationProp>();
  const [sidebarVisible, setSidebarVisible] = useState(false);
  
  const handleVideoPlay = (videoId: string) => {
    navigation.navigate('VideoDetail', {
      videoId: videoId,
      title: 'ESPAÇO PARA O TÍTULO DO VÍDEO...',
    });
  };

  const handleContinueWatching = (videoId: string) => {
    navigation.navigate('VideoDetail', {
      videoId: videoId,
      title: 'Espaço para o título do vídeo em duas linhas',
    });
  };

  const handleSeeMore = () => {
    console.log('See more continue watching');
    // Implementar navegação para lista completa
  };

  const handleSeeMoreSelected = () => {
    navigation.navigate('CategoryDetail', {
      categoryId: 'selected',
      categoryName: 'Selecionados',
    });
  };

  const handlePromoPress = (promoId: string) => {
    console.log('Promo pressed:', promoId);
    // Implementar navegação para promoção
  };

  return (
    <LinearGradient
      colors={HOME_GRADIENT.colors}
      start={HOME_GRADIENT.start}
      end={HOME_GRADIENT.end}
      locations={HOME_GRADIENT.locations}
      style={styles.container}
    >
      <SafeAreaView style={styles.safeArea}>
        {/* Sidebar */}
        <Sidebar 
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
          <NewLogo width={120} height={40} />
        </View>
        
        <TouchableOpacity 
          style={styles.notificationButton}
          onPress={() => navigation.navigate('Notifications')}
        >
          <NotificationIcon />
        </TouchableOpacity>
      </View>

      {/* Content Area */}
      <ScrollView 
        style={styles.content} 
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
      >
        {/* Video Carousel - Main Banner */}
        <VideoCarousel 
          videos={mockVideos}
          onVideoPlay={handleVideoPlay}
        />

        {/* Continue Watching Section */}
        <ContinueWatchingSection
          videos={continueWatchingVideos}
          onVideoPress={handleContinueWatching}
          onSeeMore={handleSeeMore}
        />

        {/* Live Stream Card */}
        <LiveStreamCard
          image="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=500&fit=crop"
          title="ESPAÇO PARA O TÍTULO DO VÍDEO DUAS LINHAS..."
          viewCount="1298"
          onPress={() => console.log('Live stream clicked')}
        />

        {/* Promo Carousel */}
        <PromoCarousel
          promos={promoData}
          onPromoPress={handlePromoPress}
        />

        {/* Next Live Announcement */}
        <SpecialAnnouncementCard
          image="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&h=480&fit=crop"
          subtitle="Próxima live"
          title="ANÚNCIO ESPECIAL DE FINAL DE ANO"
          onPress={() => console.log('Next live announcement clicked')}
        />

        {/* Selected Videos Section */}
        <SelectedVideosSection
          title="Selecionados"
          videos={selectedVideos}
          onVideoPress={handleVideoPlay}
          onSeeMore={handleSeeMoreSelected}
        />
      </ScrollView>
      </SafeAreaView>
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
  content: {
    flex: 1,
    backgroundColor: 'transparent',
  },
  contentContainer: {
    paddingBottom: 20,
  },
});