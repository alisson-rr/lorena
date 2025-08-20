import React from 'react';
import { Image, StyleSheet } from 'react-native';

interface KidsLogoProps {
  width?: number;
  height?: number;
}

export default function KidsLogo({ width = 120, height = 40 }: KidsLogoProps) {
  return (
    <Image 
      source={require('../../public/logo_kids_pink.png')} 
      style={[styles.logo, { width, height }]}
      resizeMode="contain"
    />
  );
}

const styles = StyleSheet.create({
  logo: {
    // Estilos base do logo
  },
});
