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
const cardWidth = (screenWidth - 48) / 3;

interface CategoryCardProps {
  image: string;
  title: string;
  onPress: () => void;
}

export default function CategoryCard({ image, title, onPress }: CategoryCardProps) {
  return (
    <TouchableOpacity 
      style={styles.container} 
      onPress={onPress}
      activeOpacity={0.9}
    >
      <Image source={{ uri: image }} style={styles.image} />
      <Text style={styles.title} numberOfLines={2}>
        {title}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    width: cardWidth,
    marginBottom: 16,
  },
  image: {
    width: '100%',
    height: cardWidth,
    borderRadius: 8,
    backgroundColor: '#FFF8F5',
    marginBottom: 4,
  },
  title: {
    fontFamily: fonts.almarai,
    fontSize: 11,
    color: '#69162B',
    textAlign: 'center',
    lineHeight: 14,
  },
});