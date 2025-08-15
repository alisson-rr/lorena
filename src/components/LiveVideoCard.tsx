import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Dimensions,
} from 'react-native';
import { fonts, fontWeights } from '../utils/fonts';

const { width: screenWidth } = Dimensions.get('window');
const cardWidth = 110; // Fixed width for consistent sizing

interface LiveVideoCardProps {
  thumbnail: string;
  title: string;
  isLive?: boolean;
  viewCount?: string;
  onPress: () => void;
}

export default function LiveVideoCard({ 
  thumbnail, 
  title, 
  isLive = false,
  viewCount,
  onPress 
}: LiveVideoCardProps) {
  return (
    <TouchableOpacity 
      style={styles.container} 
      onPress={onPress}
      activeOpacity={0.9}
    >
      <View style={styles.thumbnailContainer}>
        <Image source={{ uri: thumbnail }} style={styles.thumbnail} />
        
        {isLive && (
          <View style={styles.liveBadge}>
            <View style={styles.liveDot} />
            <Text style={styles.liveText}>LIVE</Text>
          </View>
        )}

        {viewCount && (
          <View style={styles.viewCountBadge}>
            <Text style={styles.viewCountText}>{viewCount}</Text>
          </View>
        )}
      </View>
      
      <Text style={styles.title} numberOfLines={2}>
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
    height: 160, // Fixed height for proper aspect ratio
    borderRadius: 8,
    overflow: 'hidden',
    backgroundColor: '#FFF8F5',
    marginBottom: 8,
  },
  thumbnail: {
    width: '100%',
    height: '100%',
  },
  liveBadge: {
    position: 'absolute',
    top: 8,
    left: 8,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#DC372A',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
    gap: 4,
  },
  liveDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#FFFFFF',
  },
  liveText: {
    fontFamily: fonts.almaraiBold,
    fontSize: 10,
    fontWeight: fontWeights.bold,
    color: '#FFFFFF',
  },
  viewCountBadge: {
    position: 'absolute',
    bottom: 8,
    left: 8,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  viewCountText: {
    fontFamily: fonts.almarai,
    fontSize: 10,
    color: '#FFFFFF',
  },
  title: {
    fontFamily: 'Almarai-Bold',
    fontSize: 13,
    color: '#69162B',
    lineHeight: 19.5, // 1.5 * 13
  },
});