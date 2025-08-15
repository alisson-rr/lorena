import React from 'react';
import Svg, { Rect } from 'react-native-svg';

interface FeedIconProps {
  color?: string;
  size?: number;
}

export default function FeedIcon({ color = "#8F7E81", size = 19 }: FeedIconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 19 19" fill="none">
      <Rect 
        x="1" 
        y="0.928711" 
        width="7" 
        height="4" 
        rx="2" 
        stroke={color} 
        strokeWidth={1.5}
        fill="none"
      />
      <Rect 
        x="1" 
        y="7.92871" 
        width="7" 
        height="10" 
        rx="2.5" 
        stroke={color} 
        strokeWidth={1.5}
        fill="none"
      />
      <Rect 
        x="11" 
        y="0.928711" 
        width="7" 
        height="10" 
        rx="2.5" 
        stroke={color} 
        strokeWidth={1.5}
        fill="none"
      />
      <Rect 
        x="11" 
        y="13.9287" 
        width="7" 
        height="4" 
        rx="2" 
        stroke={color} 
        strokeWidth={1.5}
        fill="none"
      />
    </Svg>
  );
}