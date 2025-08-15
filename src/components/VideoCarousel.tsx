import React, { useState, useRef } from 'react';
import {
  View,
  ScrollView,
  StyleSheet,
  Dimensions,
  NativeSyntheticEvent,
  NativeScrollEvent,
} from 'react-native';
import VideoBanner from './VideoBanner';

const { width: screenWidth } = Dimensions.get('window');

interface Video {
  id: string;
  image: string;
  title: string;
}

interface VideoCarouselProps {
  videos: Video[];
  onVideoPlay: (videoId: string) => void;
}

export default function VideoCarousel({ videos, onVideoPlay }: VideoCarouselProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const scrollViewRef = useRef<ScrollView>(null);

  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const scrollPosition = event.nativeEvent.contentOffset.x;
    const index = Math.round(scrollPosition / screenWidth);
    setActiveIndex(index);
  };

  return (
    <View style={styles.container}>
      <ScrollView
        ref={scrollViewRef}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={handleScroll}
        scrollEventThrottle={16}
        decelerationRate="fast"
        snapToAlignment="center"
        contentContainerStyle={styles.scrollContent}
      >
        {videos.map((video, index) => (
          <View key={video.id} style={styles.slide}>
            <VideoBanner
              image={video.image}
              title={video.title}
              onPlay={() => onVideoPlay(video.id)}
              showContent={index !== 0}
            />
          </View>
        ))}
      </ScrollView>

      {/* Pagination Dots */}
      <View style={styles.pagination}>
        {videos.map((_, index) => (
          <View
            key={index}
            style={[
              styles.paginationDot,
              index === activeIndex && styles.paginationDotActive,
            ]}
          />
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 16,
  },
  scrollContent: {
    paddingHorizontal: 0,
  },
  slide: {
    width: screenWidth,
    alignItems: 'center',
  },
  pagination: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 12,
    gap: 8,
  },
  paginationDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#D8BFC4',
  },
  paginationDotActive: {
    backgroundColor: '#69162B',
    width: 24,
  },
});