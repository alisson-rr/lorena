import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Dimensions,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { fonts, fontWeights } from '../utils/fonts';

const { width: screenWidth } = Dimensions.get('window');

interface PromoBannerProps {
  title: string;
  image: string;
  backgroundColor?: string[];
  onPress: () => void;
}

export default function PromoBanner({ 
  title, 
  image,
  backgroundColor = ['#FFB6D9', '#FFC0E3', '#FFD4EC'],
  onPress 
}: PromoBannerProps) {
  return (
    <TouchableOpacity 
      style={styles.container}
      onPress={onPress}
      activeOpacity={0.95}
    >
      <LinearGradient
        colors={backgroundColor}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.gradient}
      >
        <View style={styles.content}>
          <Text style={styles.title}>{title}</Text>
          <Image source={{ uri: image }} style={styles.image} resizeMode="contain" />
        </View>
      </LinearGradient>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    width: screenWidth - 32,
    height: 200,
    marginHorizontal: 16,
    borderRadius: 16,
    overflow: 'hidden',
  },
  gradient: {
    flex: 1,
  },
  content: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 24,
  },
  title: {
    flex: 1,
    fontFamily: 'Almarai-Bold',
    fontSize: 24,
    color: '#69162B',
    lineHeight: 28.8, // 1.2 * 24
    marginRight: 16,
  },
  image: {
    width: 140,
    height: 160,
  },
});