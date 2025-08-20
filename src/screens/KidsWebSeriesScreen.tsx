import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  ImageBackground,
  Image,
  Dimensions,
  ActivityIndicator,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { fonts, fontWeights } from '../utils/fonts';
import { useAppNavigation } from '../hooks/useAppNavigation';
import { useRoute, RouteProp } from '@react-navigation/native';
import PlayIcon from '../components/icons/PlayIcon';
import { WebView } from 'react-native-webview';
import { KIDS_HOME_GRADIENT } from '../styles/gradients';

const { width: screenWidth } = Dimensions.get('window');

type KidsWebSeriesRouteParams = {
  KidsWebSeries: {
    seriesId: string;
    title?: string;
    thumbnail?: string;
    description?: string;
  };
};

interface Episode {
  id: string;
  title: string;
  thumbnail: string;
  duration?: string;
  episodeNumber: number;
}

// Mock data for webseries details
const mockSeriesData = {
  id: 'series-1',
  title: 'WEBSÉRIE INFANTIL EDUCATIVA',
  description: 'Uma websérie especialmente criada para crianças, com conteúdo educativo e divertido. Acompanhe as aventuras dos personagens enquanto aprendem sobre valores importantes como amizade, respeito e colaboração.',
  thumbnail: '/display.png',
  embedUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ', // Mock YouTube embed
  duration: '25:00',
  views: 25420,
  likes: 892,
  category: 'WebSéries',
  ageRating: 'L',
  releaseDate: '2024-01-10',
  totalEpisodes: 12,
  currentSeason: 1,
};

// Mock episodes
const mockEpisodes: Episode[] = [
  {
    id: 'episode-1',
    title: 'Episódio 1 - O Início da Aventura',
    thumbnail: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=400&h=600&fit=crop',
    duration: '20:15',
    episodeNumber: 1,
  },
  {
    id: 'episode-2',
    title: 'Episódio 2 - Novos Amigos',
    thumbnail: 'https://images.unsplash.com/photo-1505628346881-b72b27e84530?w=400&h=600&fit=crop',
    duration: '22:30',
    episodeNumber: 2,
  },
  {
    id: 'episode-3',
    title: 'Episódio 3 - A Grande Descoberta',
    thumbnail: 'https://images.unsplash.com/photo-1516975080664-ed2fc6a32937?w=400&h=600&fit=crop',
    duration: '25:10',
    episodeNumber: 3,
  },
  {
    id: 'episode-4',
    title: 'Episódio 4 - Trabalhando Juntos',
    thumbnail: 'https://images.unsplash.com/photo-1535223289827-42f1e9919769?w=400&h=600&fit=crop',
    duration: '23:45',
    episodeNumber: 4,
  },
  {
    id: 'episode-5',
    title: 'Episódio 5 - Superando Desafios',
    thumbnail: 'https://images.unsplash.com/photo-1551103782-8ab07afd45c1?w=400&h=600&fit=crop',
    duration: '24:20',
    episodeNumber: 5,
  },
];

export default function KidsWebSeriesScreen() {
  const navigation = useAppNavigation();
  const route = useRoute<RouteProp<KidsWebSeriesRouteParams, 'KidsWebSeries'>>();
  const { seriesId } = route.params || { seriesId: '' };

  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [seriesData, setSeriesData] = useState(mockSeriesData);
  const [episodes, setEpisodes] = useState<Episode[]>([]);

  useEffect(() => {
    loadSeriesData();
  }, [seriesId]);

  const loadSeriesData = async () => {
    try {
      setIsLoading(true);
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // In production, fetch real data based on seriesId
      setSeriesData(mockSeriesData);
      setEpisodes(mockEpisodes);
    } catch (error) {
      console.error('Error loading series:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleBack = () => {
    navigation.goBack();
  };

  const handlePlay = () => {
    setIsPlaying(true);
  };

  const handleEpisodePress = (episode: Episode) => {
    // Navigate to KidsVideoDetail for the episode
    navigation.navigate('KidsVideoDetail' as any, {
      videoId: episode.id,
      title: episode.title,
      thumbnail: episode.thumbnail,
    });
  };

  if (isLoading) {
    return (
      <LinearGradient
        colors={KIDS_HOME_GRADIENT.colors}
        start={KIDS_HOME_GRADIENT.start}
        end={KIDS_HOME_GRADIENT.end}
        locations={KIDS_HOME_GRADIENT.locations}
        style={styles.container}
      >
        <SafeAreaView style={styles.safeArea}>
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color="#AB4766" />
          </View>
        </SafeAreaView>
      </LinearGradient>
    );
  }

  return (
    <LinearGradient
      colors={KIDS_HOME_GRADIENT.colors}
      start={KIDS_HOME_GRADIENT.start}
      end={KIDS_HOME_GRADIENT.end}
      locations={KIDS_HOME_GRADIENT.locations}
      style={styles.container}
    >
      <SafeAreaView style={styles.safeArea}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={handleBack} style={styles.backButton}>
            <Ionicons name="chevron-back" size={24} color="#AB4766" />
          </TouchableOpacity>
        </View>

        <ScrollView 
          style={styles.scrollView}
          showsVerticalScrollIndicator={false}
        >
          {/* Series Player / Thumbnail */}
          <View style={styles.videoContainer}>
            {isPlaying ? (
              <View style={styles.webViewContainer}>
                <WebView
                  source={{ uri: seriesData.embedUrl }}
                  style={styles.webView}
                  allowsFullscreenVideo
                  javaScriptEnabled
                  domStorageEnabled
                />
              </View>
            ) : (
              <ImageBackground
                source={{ uri: seriesData.thumbnail }}
                style={styles.thumbnail}
                imageStyle={styles.thumbnailImage}
              >
                <LinearGradient
                  colors={['transparent', 'transparent', 'rgba(156, 0, 226, 0.4)', 'rgba(156, 0, 226, 0.8)', '#9C00E2']}
                  locations={[0, 0.2, 0.4, 0.7, 1]}
                  style={styles.gradient}
                >
                  <View style={styles.thumbnailContent}>
                    <Text style={styles.videoTitle}>{seriesData.title}</Text>
                    
                    <TouchableOpacity 
                      style={styles.playButton}
                      onPress={handlePlay}
                      activeOpacity={0.9}
                    >
                      <PlayIcon color="#FFFFFF" size={20} />
                      <Text style={styles.playButtonText}>Assistir</Text>
                    </TouchableOpacity>
                  </View>
                </LinearGradient>
              </ImageBackground>
            )}
          </View>

          {/* Description */}
          <View style={styles.descriptionContainer}>
            <Text style={styles.description}>{seriesData.description}</Text>
          </View>

          {/* Series Info */}
          <View style={styles.infoContainer}>
            <Text style={styles.infoText}>
              Temporada {seriesData.currentSeason} • {seriesData.totalEpisodes} episódios
            </Text>
          </View>

          {/* Divider */}
          <View style={styles.divider} />

          {/* Episodes Section */}
          <View style={styles.episodesSection}>
            <Text style={styles.episodesTitle}>Episódios</Text>
            
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.episodesScrollContent}
            >
              {episodes.map((episode) => (
                <TouchableOpacity
                  key={episode.id}
                  style={styles.episodeItem}
                  onPress={() => handleEpisodePress(episode)}
                  activeOpacity={0.9}
                >
                  <Image 
                    source={{ uri: episode.thumbnail }}
                    style={styles.episodeThumbnail}
                  />
                  <Text style={styles.episodeTitle} numberOfLines={2}>
                    {episode.title}
                  </Text>
                  <Text style={styles.episodeDuration}>{episode.duration}</Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
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
    paddingHorizontal: 16,
    backgroundColor: 'transparent',
  },
  backButton: {
    padding: 4,
  },
  scrollView: {
    flex: 1,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  videoContainer: {
    width: screenWidth - 32,
    height: 467,
    marginHorizontal: 16,
    marginTop: 12,
    borderRadius: 20,
    overflow: 'hidden',
    backgroundColor: '#D2C8E3',
  },
  webViewContainer: {
    flex: 1,
    backgroundColor: '#000',
  },
  webView: {
    flex: 1,
  },
  thumbnail: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  thumbnailImage: {
    borderRadius: 20,
  },
  gradient: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  thumbnailContent: {
    padding: 24,
    paddingBottom: 24,
    gap: 20,
  },
  videoTitle: {
    fontFamily: fonts.anton,
    fontSize: 32,
    color: '#F0EBEA',
    textTransform: 'uppercase',
    lineHeight: 38.4, // 1.2 * 32
    textAlign: 'center',
  },
  playButton: {
    backgroundColor: '#AB4766', // Cor do botão kids
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    gap: 8,
    width: '100%', // Full width como na KidsHomeScreen
  },
  playButtonText: {
    fontFamily: fonts.almaraiBold,
    fontSize: 16,
    fontWeight: fontWeights.bold,
    color: '#FFFFFF', // Texto branco
    lineHeight: 24, // 1.5 * 16
  },
  descriptionContainer: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    marginTop: 24,
  },
  description: {
    fontFamily: fonts.almarai,
    fontSize: 16,
    color: '#AB4766', // Cor do texto kids
    lineHeight: 24, // 1.5 * 16
  },
  infoContainer: {
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  infoText: {
    fontFamily: fonts.almaraiBold,
    fontSize: 14,
    color: '#AB4766',
    lineHeight: 21,
  },
  divider: {
    height: 1,
    backgroundColor: '#D2C8E3', // Cor do divider kids
    marginHorizontal: 16,
    marginVertical: 24,
  },
  episodesSection: {
    paddingBottom: 40,
  },
  episodesTitle: {
    fontFamily: 'Roboto Serif',
    fontSize: 18,
    color: '#AB4766', // Cor do título kids
    lineHeight: 21.6, // 1.2 * 18
    marginBottom: 16,
    paddingHorizontal: 16,
  },
  episodesScrollContent: {
    paddingHorizontal: 16,
    gap: 12,
  },
  episodeItem: {
    width: 124,
    marginRight: 12,
  },
  episodeThumbnail: {
    width: 124,
    height: 180,
    borderRadius: 8,
    backgroundColor: '#D2C8E3',
    borderWidth: 1,
    borderColor: '#AB4766',
    marginBottom: 8,
  },
  episodeTitle: {
    fontFamily: fonts.almaraiBold,
    fontSize: 13,
    fontWeight: fontWeights.bold,
    color: '#AB4766', // Cor do texto kids
    lineHeight: 19.5, // 1.5 * 13
    marginBottom: 4,
  },
  episodeDuration: {
    fontFamily: fonts.almarai,
    fontSize: 11,
    color: '#8F7E81',
    lineHeight: 16.5,
  },
});
