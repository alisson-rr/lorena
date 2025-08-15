import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
  Dimensions,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { fonts, fontWeights } from '../utils/fonts';

const { width: screenWidth } = Dimensions.get('window');

interface LiveStreamCardProps {
  image: string;
  title: string;
  viewCount: string;
  onPress: () => void;
}

export default function LiveStreamCard({ 
  image, 
  title, 
  viewCount,
  onPress 
}: LiveStreamCardProps) {
  return (
    <TouchableOpacity 
      style={styles.container}
      onPress={onPress}
      activeOpacity={0.95}
    >
      {/* Image Section */}
      <View style={styles.imageSection}>
        <ImageBackground 
          source={{ uri: image }} 
          style={styles.imageBackground}
          imageStyle={styles.image}
        />
      </View>

      {/* White Card Section */}
      <View style={styles.whiteCard}>
        {/* Live Badge and View Count */}
        <View style={styles.badges}>
          <View style={styles.liveBadge}>
            <Text style={styles.liveText}>Live</Text>
          </View>
          
          <View style={styles.viewCountBadge}>
            <Ionicons name="eye" size={16} color="#FFFFFF" />
            <Text style={styles.viewCountText}>{viewCount}</Text>
          </View>
        </View>

        {/* Title */}
        <Text style={styles.title}>{title}</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    width: screenWidth - 32,
    height: 460,
    marginHorizontal: 16,
    borderRadius: 16,
    overflow: 'hidden',
    marginVertical: 24,
    backgroundColor: '#F0EBEA',
    borderWidth: 1,
    borderColor: '#D8BFC4',
  },
  imageSection: {
    flex: 1,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    overflow: 'hidden',
  },
  imageBackground: {
    flex: 1,
  },
  image: {
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
  },
  whiteCard: {
    backgroundColor: '#F0EBEA',
    paddingHorizontal: 24,
    paddingVertical: 20,
    borderRadius: 16,
    marginTop: -16,
  },
  badges: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 16,
  },
  liveBadge: {
    backgroundColor: '#F85A4E',
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 8,
  },
  liveText: {
    fontFamily: fonts.almarai,
    fontSize: 14,
    color: '#FFFFFF',
    lineHeight: 21,
  },
  viewCountBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(105, 22, 43, 0.8)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
    gap: 8,
  },
  viewCountText: {
    fontFamily: fonts.almarai,
    fontSize: 14,
    color: '#FFFFFF',
    lineHeight: 21,
  },
  title: {
    fontFamily: fonts.anton,
    fontSize: 24,
    color: '#69162B',
    textTransform: 'uppercase',
    lineHeight: 28.8, // 1.2 * 24
  },
});