import React from 'react';
import Svg, { Path } from 'react-native-svg';

interface FilterIconProps {
  size?: number;
  color?: string;
}

export default function FilterIcon({ size = 22, color = '#69162B' }: FilterIconProps) {
  const width = 18;
  const height = 22;
  const scale = size / height;
  
  return (
    <Svg width={width * scale} height={size} viewBox="0 0 18 22" fill="none">
      <Path d="M1 4.00073L7 4.00049" stroke={color} strokeWidth="1.5" strokeLinecap="round"/>
      <Path d="M10 4.00049L17 4.00049" stroke={color} strokeWidth="1.5" strokeLinecap="round"/>
      <Path d="M13 8.00049L13 14.0005" stroke={color} strokeWidth="1.5" strokeLinecap="round"/>
      <Path d="M7 1.00049L7 7.00049" stroke={color} strokeWidth="1.5" strokeLinecap="round"/>
      <Path d="M9 15.0005L9 21.0005" stroke={color} strokeWidth="1.5" strokeLinecap="round"/>
      <Path d="M13 11.0002L17 11.0005" stroke={color} strokeWidth="1.5" strokeLinecap="round"/>
      <Path d="M1 11.0007L10 11.0005" stroke={color} strokeWidth="1.5" strokeLinecap="round"/>
      <Path d="M9 18.0005L17 18.0005" stroke={color} strokeWidth="1.5" strokeLinecap="round"/>
      <Path d="M1 18.0007L6 18.0005" stroke={color} strokeWidth="1.5" strokeLinecap="round"/>
    </Svg>
  );
}