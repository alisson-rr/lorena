import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import CategoryCard from './CategoryCard';
import { fonts, fontWeights } from '../utils/fonts';
import { Ionicons } from '@expo/vector-icons';

interface Category {
  id: string;
  image: string;
  title: string;
}

interface CategorySectionProps {
  title: string;
  categories: Category[];
  onCategoryPress: (categoryId: string) => void;
  onSeeMore: () => void;
}

export default function CategorySection({ 
  title, 
  categories, 
  onCategoryPress,
  onSeeMore 
}: CategorySectionProps) {
  return (
    <View style={styles.container}>
      {/* Section Header */}
      <View style={styles.header}>
        <Text style={styles.title}>{title}</Text>
        
        <TouchableOpacity 
          style={styles.seeMoreButton}
          onPress={onSeeMore}
          activeOpacity={0.7}
        >
          <Text style={styles.seeMoreText}>Ver mais</Text>
          <Ionicons name="chevron-forward" size={16} color="#69162B" />
        </TouchableOpacity>
      </View>

      {/* Categories Horizontal Scroll */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {categories.map((category) => (
          <View key={category.id} style={styles.cardWrapper}>
            <CategoryCard
              image={category.image}
              title={category.title}
              onPress={() => onCategoryPress(category.id)}
            />
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 24,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    marginBottom: 12,
  },
  title: {
    fontFamily: 'Almarai-Bold',
    fontSize: 16,
    color: '#69162B',
  },
  seeMoreButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F1E1DD',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    gap: 4,
  },
  seeMoreText: {
    fontFamily: fonts.almarai,
    fontSize: 14,
    color: '#69162B',
  },
  scrollContent: {
    paddingHorizontal: 16,
    gap: 8,
  },
  cardWrapper: {
    marginRight: 8,
  },
});