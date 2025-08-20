import React from 'react';
import { Image, StyleSheet } from 'react-native';

interface NewLogoProps {
  width?: number;
  height?: number;
}

export default function NewLogo({ width = 137, height = 22 }: NewLogoProps) {
  return (
    <Image
      source={{ uri: '/Logo.svg' }}
      style={[
        styles.logo,
        {
          width,
          height,
          resizeMode: 'contain',
        },
      ]}
    />
  );
}

const styles = StyleSheet.create({
  logo: {
    // Estilo base para o logo
  },
});
