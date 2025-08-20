import React from 'react';
import { View, StyleSheet, Image } from 'react-native';

export default function LoreLogo() {
  return (
    <View style={styles.container}>
      <Image 
        source={{ uri: '/horizontal.svg' }}
        style={[styles.logo, { resizeMode: 'contain' }]}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
  },
  logo: {
    width: 149,
    height: 40,
  },
});