import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
  Dimensions,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import PlayIcon from './icons/PlayIcon';
import { fonts, fontWeights } from '../utils/fonts';

const { width: screenWidth } = Dimensions.get('window');

interface KidsVideoBannerProps {
  image: string;
  title: string;
  onPlay: () => void;
  showContent?: boolean;
}

export default function KidsVideoBanner({ image, title, onPlay, showContent = true }: KidsVideoBannerProps) {
  return (
    <View style={styles.container}>
      <ImageBackground 
        source={{ uri: image }} 
        style={styles.imageBackground}
        imageStyle={styles.image}
      >
        <LinearGradient
          colors={['transparent', 'transparent', 'rgba(156, 0, 226, 0.4)', 'rgba(156, 0, 226, 0.8)', '#9C00E2']}
          locations={[0, 0.2, 0.4, 0.7, 1]}
          style={styles.gradient}
        >
          {showContent && (
            <View style={styles.content}>
              <Text style={styles.title}>{title}</Text>
              
              <TouchableOpacity 
                style={styles.playButton} 
                onPress={onPlay}
                activeOpacity={0.9}
              >
                <View style={styles.playIconContainer}>
                  <PlayIcon color="#FFFFFF" size={16} />
                </View>
                <Text style={styles.playButtonText}>Assistir</Text>
              </TouchableOpacity>
            </View>
          )}
        </LinearGradient>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: screenWidth - 32,
    height: 460, // Adjusted height to match Figma
    marginHorizontal: 16,
    borderRadius: 16,
    overflow: 'hidden',
    backgroundColor: '#FFF8F5',
  },
  imageBackground: {
    flex: 1,
  },
  image: {
    borderRadius: 16,
  },
  gradient: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  content: {
    padding: 24,
    paddingBottom: 32,
  },
  title: {
    fontFamily: fonts.anton,
    fontSize: 28, // Adjusted to match Figma
    color: '#FFFFFF',
    textTransform: 'uppercase',
    lineHeight: 33.6, // 1.2 * 28
    marginBottom: 20,
  },
  playButton: {
    backgroundColor: '#AB4766', // Cor customizada para kids
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 14,
    paddingHorizontal: 24,
    borderRadius: 8,
    gap: 8,
    width: '100%', // Full width
  },
  playIconContainer: {
    width: 20,
    height: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  playButtonText: {
    fontFamily: fonts.almaraiBold,
    fontSize: 16,
    fontWeight: fontWeights.bold,
    color: '#FFFFFF', // Texto branco
  },
});
