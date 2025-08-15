import React from 'react';
import Svg, { Circle, Path } from 'react-native-svg';

interface ShareIconProps {
  size?: number;
  color?: string;
}

export default function ShareIcon({ size = 24, color = '#69162B' }: ShareIconProps) {
  // Original SVG is 19x22, so we scale proportionally
  const scale = size / 22;
  const width = 19 * scale;
  const height = size;

  return (
    <Svg width={width} height={height} viewBox="0 0 19 22" fill="none">
      <Circle 
        cx="15.5" 
        cy="3.5" 
        r="2.5" 
        stroke={color} 
        strokeWidth="1.5"
        fill="none"
      />
      <Circle 
        cx="3.5" 
        cy="10.5" 
        r="2.5" 
        stroke={color} 
        strokeWidth="1.5"
        fill="none"
      />
      <Path 
        d="M13 5L6 9" 
        stroke={color} 
        strokeWidth="1.5" 
        strokeLinecap="round" 
        strokeLinejoin="round"
      />
      <Path 
        d="M5.5 12.5L13 17" 
        stroke={color} 
        strokeWidth="1.5" 
        strokeLinecap="round" 
        strokeLinejoin="round"
      />
      <Circle 
        cx="15.5" 
        cy="18.5" 
        r="2.5" 
        stroke={color} 
        strokeWidth="1.5"
        fill="none"
      />
    </Svg>
  );
}