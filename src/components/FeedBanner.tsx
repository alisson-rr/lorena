import React from 'react';
import {
  View,
  Image,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
} from 'react-native';

const { width: screenWidth } = Dimensions.get('window');

interface FeedBannerProps {
  image: string;
  currentIndex?: number;
  totalCount?: number;
  onPress?: () => void;
}

export default function FeedBanner({ 
  image, 
  currentIndex = 0, 
  totalCount = 3,
  onPress 
}: FeedBannerProps) {
  return (
    <View style={styles.container}>
      <TouchableOpacity 
        activeOpacity={0.9} 
        onPress={onPress}
        style={styles.bannerWrapper}
      >
        <Image 
          source={{ uri: image }} 
          style={[styles.bannerImage, { resizeMode: 'cover' }]}
        />
      </TouchableOpacity>
      
      {/* Dots Indicator */}
      <View style={styles.dotsContainer}>
        {Array.from({ length: totalCount }).map((_, index) => (
          <View
            key={index}
            style={[
              styles.dot,
              index === currentIndex && styles.activeDot
            ]}
          />
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 16,
    alignItems: 'center',
    gap: 12,
  },
  bannerWrapper: {
    marginHorizontal: 16,
    width: screenWidth - 32,
  },
  bannerImage: {
    width: '100%',
    height: 200,
    borderRadius: 20,
    backgroundColor: '#E8E0DD',
  },
  dotsContainer: {
    flexDirection: 'row',
    gap: 6,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#D8BFC4',
  },
  activeDot: {
    backgroundColor: '#8F7E81',
  },
});