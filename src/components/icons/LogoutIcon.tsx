import React from 'react';
import Svg, { Path } from 'react-native-svg';

interface LogoutIconProps {
  size?: number;
  color?: string;
}

export default function LogoutIcon({ size = 14, color = '#69162B' }: LogoutIconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 14 14" fill="none">
      <Path 
        d="M8.33333 1.06334C8.02866 1.02161 7.71702 1 7.4 1C3.86538 1 1 3.68629 1 7C1 10.3137 3.86538 13 7.4 13C7.71702 13 8.02866 12.9784 8.33333 12.9367" 
        stroke={color} 
        strokeWidth="1.5" 
        strokeLinecap="round"
      />
      <Path 
        d="M13.0007 6.99992L6.33398 6.99992M13.0007 6.99992C13.0007 6.5331 11.6711 5.66094 11.334 5.33325M13.0007 6.99992C13.0007 7.46674 11.6711 8.3389 11.334 8.66659" 
        stroke={color} 
        strokeWidth="1.5" 
        strokeLinecap="round" 
        strokeLinejoin="round"
      />
    </Svg>
  );
}