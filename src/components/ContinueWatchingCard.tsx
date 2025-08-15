import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Dimensions,
} from 'react-native';
import { fonts } from '../utils/fonts';

const { width: screenWidth } = Dimensions.get('window');
const cardWidth = (screenWidth - 48) / 2.3; // Aproximadamente 2.3 cards visíveis

interface ContinueWatchingCardProps {
  thumbnail: string;
  title: string;
  progress: number; // 0 to 100
  onPress: () => void;
}

export default function ContinueWatchingCard({ 
  thumbnail, 
  title, 
  progress, 
  onPress 
}: ContinueWatchingCardProps) {
  return (
    <TouchableOpacity 
      style={styles.container} 
      onPress={onPress}
      activeOpacity={0.9}
    >
      <View style={styles.thumbnailContainer}>
        <Image source={{ uri: thumbnail }} style={styles.thumbnail} />
        
        {/* Progress Bar */}
        <View style={styles.progressBarContainer}>
          <View style={styles.progressBarBackground}>
            <View 
              style={[
                styles.progressBar, 
                { width: `${progress}%` }
              ]} 
            />
          </View>
        </View>
      </View>
      
      <Text style={styles.title} numberOfLines={1}>
        {title}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    width: cardWidth,
    marginRight: 12,
  },
  thumbnailContainer: {
    width: '100%',
    aspectRatio: 16/9,
    borderRadius: 8,
    overflow: 'hidden',
    backgroundColor: '#FFF8F5',
    marginBottom: 8,
  },
  thumbnail: {
    width: '100%',
    height: '100%',
  },
  progressBarContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 4,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
  },
  progressBarBackground: {
    flex: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
  },
  progressBar: {
    height: '100%',
    backgroundColor: '#FF0000',
  },
  title: {
    fontFamily: 'Almarai-Bold',
    fontSize: 13,
    color: '#69162B',
    lineHeight: 19.5, // 1.5 * 13
  },
});