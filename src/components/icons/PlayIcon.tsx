import React from 'react';
import Svg, { Path } from 'react-native-svg';

interface PlayIconProps {
  color?: string;
  size?: number;
}

export default function PlayIcon({ color = "#8F7E81", size = 17 }: PlayIconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 17 17" fill="none">
      <Path 
        d="M15.3906 9.27468C15.0371 10.6177 13.3667 11.5667 10.0257 13.4648C6.79605 15.2996 5.1812 16.2171 3.87983 15.8483C3.3418 15.6958 2.85159 15.4063 2.45624 15.0074C1.5 14.0426 1.5 12.1713 1.5 8.42871C1.5 4.68611 1.5 2.81481 2.45624 1.85003C2.85159 1.45116 3.3418 1.1616 3.87983 1.00913C5.1812 0.64036 6.79605 1.55779 10.0257 3.39264C13.3667 5.29068 15.0371 6.23971 15.3906 7.58274C15.5365 8.1371 15.5365 8.72032 15.3906 9.27468Z" 
        stroke={color} 
        strokeWidth={1.5} 
        strokeLinejoin="round"
      />
    </Svg>
  );
}