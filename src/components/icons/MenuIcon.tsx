import React from 'react';
import Svg, { Path } from 'react-native-svg';

interface MenuIconProps {
  color?: string;
  size?: number;
}

export default function MenuIcon({ color = "#69162B", size = 24 }: MenuIconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path d="M3 7H21" stroke={color} strokeWidth={2} strokeLinecap="round"/>
      <Path d="M3 12H21" stroke={color} strokeWidth={2} strokeLinecap="round"/>
      <Path d="M3 17H21" stroke={color} strokeWidth={2} strokeLinecap="round"/>
    </Svg>
  );
}