import React from 'react';
import Svg, { G, Circle, Path } from 'react-native-svg';

interface InfoIconProps {
  size?: number;
  color?: string;
}

export default function InfoIcon({ size = 18, color = '#6C6A6A' }: InfoIconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 18 18" fill="none">
      <G opacity="0.5">
        <Circle 
          cx="9" 
          cy="9" 
          r="8" 
          stroke={color} 
          strokeWidth="1.5"
        />
        <Path 
          d="M6.59961 11.3997L11.3996 6.59973M11.3996 6.59973H7.79961M11.3996 6.59973V10.1997" 
          stroke={color} 
          strokeWidth="1.5" 
          strokeLinecap="round" 
          strokeLinejoin="round"
        />
      </G>
    </Svg>
  );
}