import React, { useState, useRef } from 'react';
import {
  View,
  ScrollView,
  StyleSheet,
  Dimensions,
  NativeSyntheticEvent,
  NativeScrollEvent,
} from 'react-native';
import KidsVideoBanner from './KidsVideoBanner';

const { width: screenWidth } = Dimensions.get('window');

interface Video {
  id: string;
  image: string;
  title: string;
}

interface KidsVideoCarouselProps {
  videos: Video[];
  onVideoPlay: (videoId: string) => void;
}

export default function KidsVideoCarousel({ videos, onVideoPlay }: KidsVideoCarouselProps) {
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
            <KidsVideoBanner
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
    marginBottom: 32,
  },
  scrollContent: {
    alignItems: 'center',
  },
  slide: {
    width: screenWidth,
    alignItems: 'center',
  },
  pagination: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 16,
    gap: 8,
  },
  paginationDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#8F7E81',
  },
  paginationDotActive: {
    backgroundColor: '#4D4847',
    width: 24,
  },
});
