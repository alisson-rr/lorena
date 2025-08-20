import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
  Dimensions,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { fonts, fontWeights } from '../utils/fonts';

const { width: screenWidth } = Dimensions.get('window');

interface SpecialAnnouncementCardProps {
  image: string;
  subtitle: string;
  title: string;
  onPress: () => void;
}

export default function SpecialAnnouncementCard({ 
  image, 
  subtitle,
  title, 
  onPress 
}: SpecialAnnouncementCardProps) {
  return (
    <TouchableOpacity 
      style={styles.container}
      onPress={onPress}
      activeOpacity={0.95}
    >
      <ImageBackground 
        source={{ uri: image }} 
        style={styles.imageBackground}
        imageStyle={styles.image}
      >
        <LinearGradient
          colors={['transparent', 'transparent', 'rgba(156, 0, 226, 0.4)', 'rgba(156, 0, 226, 0.8)', '#9C00E2']}
          locations={[0, 0.2, 0.4, 0.7, 1]}
          style={styles.gradient}
        >
          <View style={styles.content}>
            <Text style={styles.subtitle}>{subtitle}</Text>
            <Text style={styles.title}>{title}</Text>
          </View>
        </LinearGradient>
      </ImageBackground>
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
  },
  imageBackground: {
    flex: 1,
  },
  image: {
    borderRadius: 16,
  },
  gradient: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 30,
  },
  content: {
    alignItems: 'center',
    paddingHorizontal: 24,
  },
  subtitle: {
    fontFamily: fonts.almarai,
    fontSize: 14,
    color: '#FFFFFF',
    marginBottom: 16,
    opacity: 0.9,
    textTransform: 'capitalize',
  },
  title: {
    fontFamily: fonts.anton,
    fontSize: 28,
    color: '#FFFFFF',
    textTransform: 'uppercase',
    lineHeight: 33.6, // 1.2 * 28
    textAlign: 'center',
  },
});