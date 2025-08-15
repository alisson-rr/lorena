import React from 'react';
import Svg, { Path } from 'react-native-svg';

interface CommentIconProps {
  color?: string;
  size?: number;
}

export default function CommentIcon({ color = "#69162B", size = 22 }: CommentIconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 22 22" fill="none">
      <Path 
        d="M5.15741 18C3.85729 17.8721 2.88335 17.4816 2.23017 16.8284C1.05859 15.6569 1.05859 13.7712 1.05859 10V9.5C1.05859 5.72876 1.05859 3.84315 2.23017 2.67157C3.40174 1.5 5.28736 1.5 9.05859 1.5H13.0586C16.8298 1.5 18.7154 1.5 19.887 2.67157C21.0586 3.84315 21.0586 5.72876 21.0586 9.5V10C21.0586 13.7712 21.0586 15.6569 19.887 16.8284C18.7154 18 16.8298 18 13.0586 18C12.4981 18.0125 12.0517 18.0551 11.6132 18.155C10.4148 18.4309 9.30512 19.0441 8.20846 19.5789C6.64588 20.3408 5.86459 20.7218 5.37429 20.3651C4.43629 19.6665 5.35313 17.5019 5.55859 16.5"
        stroke={color}
        strokeWidth={1.5}
        strokeLinecap="round"
      />
    </Svg>
  );
}