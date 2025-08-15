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

interface FeaturedVideoCardProps {
  image: string;
  title: string;
  onPlay: () => void;
}

export default function FeaturedVideoCard({ image, title, onPlay }: FeaturedVideoCardProps) {
  return (
    <TouchableOpacity 
      style={styles.container}
      onPress={onPlay}
      activeOpacity={0.95}
    >
      <ImageBackground 
        source={{ uri: image }} 
        style={styles.imageBackground}
        imageStyle={styles.image}
      >
        <LinearGradient
          colors={['transparent', 'rgba(156, 0, 226, 0.7)', 'rgba(156, 0, 226, 0.9)']}
          style={styles.gradient}
        >
          <View style={styles.content}>
            <Text style={styles.title}>{title}</Text>
            
            <TouchableOpacity 
              style={styles.playButton} 
              onPress={onPlay}
              activeOpacity={0.9}
            >
              <View style={styles.playIconContainer}>
                <PlayIcon color="#252525" size={14} />
              </View>
              <Text style={styles.playButtonText}>Assistir</Text>
            </TouchableOpacity>
          </View>
        </LinearGradient>
      </ImageBackground>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    width: screenWidth - 32,
    height: 200,
    marginHorizontal: 16,
    borderRadius: 12,
    overflow: 'hidden',
    marginBottom: 12,
  },
  imageBackground: {
    flex: 1,
  },
  image: {
    borderRadius: 12,
  },
  gradient: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  content: {
    padding: 16,
  },
  title: {
    fontFamily: fonts.anton,
    fontSize: 24,
    color: '#FFFFFF',
    textTransform: 'uppercase',
    lineHeight: 28,
    marginBottom: 12,
  },
  playButton: {
    backgroundColor: '#5AF2B4',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 8,
    gap: 6,
    alignSelf: 'flex-start',
  },
  playIconContainer: {
    width: 18,
    height: 18,
    alignItems: 'center',
    justifyContent: 'center',
  },
  playButtonText: {
    fontFamily: fonts.almaraiBold,
    fontSize: 14,
    fontWeight: fontWeights.bold,
    color: '#252525',
  },
});