import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface NotificationIconProps {
  color?: string;
  size?: number;
  hasNotification?: boolean;
}

export default function NotificationIcon({ 
  color = "#69162B", 
  size = 20, 
  hasNotification = true 
}: NotificationIconProps) {
  return (
    <View style={styles.container}>
      <Ionicons name="notifications-outline" size={size} color={color} />
      {hasNotification && <View style={styles.dot} />}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'relative',
  },
  dot: {
    position: 'absolute',
    top: 0,
    right: 0,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#DC372A',
  },
});