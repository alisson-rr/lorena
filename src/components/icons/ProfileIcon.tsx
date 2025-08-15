import React from 'react';
import Svg, { Path, Circle } from 'react-native-svg';

interface ProfileIconProps {
  color?: string;
  size?: number;
}

export default function ProfileIcon({ color = "#8F7E81", size = 17 }: ProfileIconProps) {
  const height = size * 20/17;
  return (
    <Svg width={size} height={height} viewBox="0 0 17 20" fill="none">
      <Circle 
        cx="8.5" 
        cy="5.67871" 
        r="4" 
        stroke={color} 
        strokeWidth={1.5}
        fill="none"
      />
      <Path 
        d="M1.5 15.6134C1.5 14.753 2.04085 13.9855 2.85109 13.6962V13.6962C6.50404 12.3916 10.496 12.3916 14.1489 13.6962V13.6962C14.9591 13.9855 15.5 14.753 15.5 15.6134V16.9289C15.5 18.1163 14.4483 19.0285 13.2728 18.8605L12.3184 18.7242C9.78565 18.3624 7.21435 18.3624 4.68162 18.7242L3.72721 18.8605C2.5517 19.0285 1.5 18.1163 1.5 16.9289V15.6134Z" 
        stroke={color} 
        strokeWidth={1.5}
        fill="none"
      />
    </Svg>
  );
}