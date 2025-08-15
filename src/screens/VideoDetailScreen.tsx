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

const { width: screenWidth } = Dimensions.get('window');

type VideoDetailRouteParams = {
  VideoDetail: {
    videoId: string;
    title?: string;
    thumbnail?: string;
    description?: string;
  };
};

interface RelatedVideo {
  id: string;
  title: string;
  thumbnail: string;
  duration?: string;
}

// Mock data for video details
const mockVideoData = {
  id: 'video-1',
  title: 'ESPAÇO PARA O TÍTULO DO VÍDEO...',
  description: 'Esse é um espaço para o texto de descrição do vídeo, onde você pode introduzir o conteúdo apresentado, destacando os principais tópicos abordados. Utilize essa área para fornecer uma visão geral do episódio.',
  thumbnail: '/display.png',
  embedUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ', // Mock YouTube embed
  duration: '12:30',
  views: 15420,
  likes: 342,
  category: 'Educativo',
  ageRating: 'L',
  releaseDate: '2024-01-15',
};

// Mock related videos
const mockRelatedVideos: RelatedVideo[] = [
  {
    id: 'related-1',
    title: 'Espaço para o título do vídeo',
    thumbnail: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=400&h=600&fit=crop',
    duration: '10:15',
  },
  {
    id: 'related-2',
    title: 'Espaço para o título do vídeo',
    thumbnail: 'https://images.unsplash.com/photo-1505628346881-b72b27e84530?w=400&h=600&fit=crop',
    duration: '15:45',
  },
  {
    id: 'related-3',
    title: 'Espaço para o título do vídeo',
    thumbnail: 'https://images.unsplash.com/photo-1516975080664-ed2fc6a32937?w=400&h=600&fit=crop',
    duration: '08:20',
  },
  {
    id: 'related-4',
    title: 'Espaço para o título do vídeo',
    thumbnail: 'https://images.unsplash.com/photo-1535223289827-42f1e9919769?w=400&h=600&fit=crop',
    duration: '20:10',
  },
  {
    id: 'related-5',
    title: 'Espaço para o título do vídeo',
    thumbnail: 'https://images.unsplash.com/photo-1551103782-8ab07afd45c1?w=400&h=600&fit=crop',
    duration: '13:25',
  },
];

export default function VideoDetailScreen() {
  const navigation = useAppNavigation();
  const route = useRoute<RouteProp<VideoDetailRouteParams, 'VideoDetail'>>();
  const { videoId } = route.params || { videoId: '' };

  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [videoData, setVideoData] = useState(mockVideoData);
  const [relatedVideos, setRelatedVideos] = useState<RelatedVideo[]>([]);

  useEffect(() => {
    loadVideoData();
  }, [videoId]);

  const loadVideoData = async () => {
    try {
      setIsLoading(true);
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // In production, fetch real data based on videoId
      setVideoData(mockVideoData);
      setRelatedVideos(mockRelatedVideos);
    } catch (error) {
      console.error('Error loading video:', error);
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

  const handleRelatedVideoPress = (video: RelatedVideo) => {
    // Navigate to the same screen with new video
    navigation.navigate('VideoDetail' as any, {
      videoId: video.id,
      title: video.title,
      thumbnail: video.thumbnail,
    });
  };

  if (isLoading) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#69162B" />
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={handleBack} style={styles.backButton}>
          <Ionicons name="chevron-back" size={24} color="#69162B" />
        </TouchableOpacity>
      </View>

      <ScrollView 
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
      >
        {/* Video Player / Thumbnail */}
        <View style={styles.videoContainer}>
          {isPlaying ? (
            <View style={styles.webViewContainer}>
              <WebView
                source={{ uri: videoData.embedUrl }}
                style={styles.webView}
                allowsFullscreenVideo
                javaScriptEnabled
                domStorageEnabled
              />
            </View>
          ) : (
            <ImageBackground
              source={{ uri: videoData.thumbnail }}
              style={styles.thumbnail}
              imageStyle={styles.thumbnailImage}
            >
              <LinearGradient
                colors={['transparent', 'transparent', 'rgba(156, 0, 226, 0.4)', 'rgba(156, 0, 226, 0.8)', '#9C00E2']}
                locations={[0, 0.2, 0.4, 0.7, 1]}
                style={styles.gradient}
              >
                <View style={styles.thumbnailContent}>
                  <Text style={styles.videoTitle}>{videoData.title}</Text>
                  
                  <TouchableOpacity 
                    style={styles.playButton}
                    onPress={handlePlay}
                    activeOpacity={0.9}
                  >
                    <PlayIcon color="#252525" size={20} />
                    <Text style={styles.playButtonText}>Assistir</Text>
                  </TouchableOpacity>
                </View>
              </LinearGradient>
            </ImageBackground>
          )}
        </View>

        {/* Description */}
        <View style={styles.descriptionContainer}>
          <Text style={styles.description}>{videoData.description}</Text>
        </View>

        {/* Divider */}
        <View style={styles.divider} />

        {/* Related Videos Section */}
        <View style={styles.relatedSection}>
          <Text style={styles.relatedTitle}>Assista também</Text>
          
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.relatedScrollContent}
          >
            {relatedVideos.map((video) => (
              <TouchableOpacity
                key={video.id}
                style={styles.relatedVideoItem}
                onPress={() => handleRelatedVideoPress(video)}
                activeOpacity={0.9}
              >
                <Image 
                  source={{ uri: video.thumbnail }}
                  style={styles.relatedThumbnail}
                />
                <Text style={styles.relatedVideoTitle} numberOfLines={2}>
                  {video.title}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF8F5',
  },
  header: {
    height: 48,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    backgroundColor: '#FFF8F5',
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
    backgroundColor: '#F0EBEA',
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
    backgroundColor: '#5AF2B4',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    gap: 8,
  },
  playButtonText: {
    fontFamily: fonts.almaraiBold,
    fontSize: 16,
    fontWeight: fontWeights.bold,
    color: '#252525',
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
    color: '#69162B',
    lineHeight: 24, // 1.5 * 16
  },
  divider: {
    height: 1,
    backgroundColor: '#D8BFC4',
    marginHorizontal: 16,
    marginVertical: 24,
  },
  relatedSection: {
    paddingBottom: 40,
  },
  relatedTitle: {
    fontFamily: 'Roboto Serif',
    fontSize: 18,
    color: '#69162B',
    lineHeight: 21.6, // 1.2 * 18
    marginBottom: 16,
    paddingHorizontal: 16,
  },
  relatedScrollContent: {
    paddingHorizontal: 16,
    gap: 12,
  },
  relatedVideoItem: {
    width: 124,
    marginRight: 12,
  },
  relatedThumbnail: {
    width: 124,
    height: 180,
    borderRadius: 8,
    backgroundColor: '#E8E0DD',
    borderWidth: 1,
    borderColor: '#D8BFC4',
    marginBottom: 8,
  },
  relatedVideoTitle: {
    fontFamily: fonts.almaraiBold,
    fontSize: 13,
    fontWeight: fontWeights.bold,
    color: '#69162B',
    lineHeight: 19.5, // 1.5 * 13
  },
});