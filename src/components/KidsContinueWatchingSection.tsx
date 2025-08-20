import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import ContinueWatchingCard from './ContinueWatchingCard';
import { fonts } from '../utils/fonts';

interface Video {
  id: string;
  thumbnail: string;
  title: string;
  progress: number;
}

interface KidsContinueWatchingSectionProps {
  videos: Video[];
  onVideoPress: (videoId: string) => void;
  onSeeMore: () => void;
}

export default function KidsContinueWatchingSection({ 
  videos, 
  onVideoPress,
  onSeeMore 
}: KidsContinueWatchingSectionProps) {
  return (
    <View style={styles.container}>
      {/* Section Header */}
      <View style={styles.header}>
        <Text style={styles.title}>Continuar assistindo</Text>
        
        <TouchableOpacity 
          style={styles.seeMoreButton}
          onPress={onSeeMore}
          activeOpacity={0.7}
        >
          <Text style={styles.seeMoreText}>Ver mais</Text>
          <Ionicons name="chevron-forward" size={24} color="#69162B" />
        </TouchableOpacity>
      </View>

      {/* Videos Horizontal Scroll */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {videos.map((video) => (
          <ContinueWatchingCard
            key={video.id}
            thumbnail={video.thumbnail}
            title={video.title}
            progress={video.progress}
            onPress={() => onVideoPress(video.id)}
          />
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 24,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  title: {
    fontFamily: 'RobotoSerif-Regular',
    fontSize: 18,
    color: '#69162B',
    lineHeight: 21.6, // 1.2 * 18
  },
  seeMoreButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#D2C8E3', // Nova cor para kids
    paddingLeft: 16,
    paddingRight: 8,
    paddingVertical: 12,
    borderRadius: 8,
    gap: 8,
    height: 42,
  },
  seeMoreText: {
    fontFamily: 'Almarai-Bold',
    fontSize: 14,
    color: '#69162B',
    lineHeight: 21, // 1.5 * 14
  },
  scrollContent: {
    paddingHorizontal: 16,
  },
});
