import React, { useState, useRef } from 'react';
import {
  View,
  ScrollView,
  StyleSheet,
  Dimensions,
  NativeSyntheticEvent,
  NativeScrollEvent,
} from 'react-native';
import PromoBanner from './PromoBanner';

const { width: screenWidth } = Dimensions.get('window');

interface Promo {
  id: string;
  title: string;
  image: string;
  backgroundColor?: string[];
}

interface PromoCarouselProps {
  promos: Promo[];
  onPromoPress: (promoId: string) => void;
}

export default function PromoCarousel({ promos, onPromoPress }: PromoCarouselProps) {
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
        {promos.map((promo) => (
          <View key={promo.id} style={styles.slide}>
            <PromoBanner
              title={promo.title}
              image={promo.image}
              backgroundColor={promo.backgroundColor}
              onPress={() => onPromoPress(promo.id)}
            />
          </View>
        ))}
      </ScrollView>

      {/* Pagination Dots */}
      <View style={styles.pagination}>
        {promos.map((_, index) => (
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
    marginVertical: 20,
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