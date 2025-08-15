import React from 'react';
import Svg, { Path } from 'react-native-svg';

interface HomeIconProps {
  color?: string;
  size?: number;
}

export default function HomeIcon({ color = "#69162B", size = 21 }: HomeIconProps) {
  return (
    <Svg width={size} height={size * 22/21} viewBox="0 0 21 22" fill="none">
      <Path 
        d="M1 9.86712C1 8.64293 1.56058 7.48615 2.52142 6.72759L8.02142 2.38548C9.47466 1.23819 11.5253 1.23819 12.9786 2.38548L18.4786 6.72759C19.4394 7.48615 20 8.64293 20 9.86712V16.4287C20 18.6378 18.2091 20.4287 16 20.4287H14.5C13.9477 20.4287 13.5 19.981 13.5 19.4287V16.4287C13.5 15.3241 12.6046 14.4287 11.5 14.4287H9.5C8.39543 14.4287 7.5 15.3241 7.5 16.4287V19.4287C7.5 19.981 7.05228 20.4287 6.5 20.4287H5C2.79086 20.4287 1 18.6378 1 16.4287L1 9.86712Z" 
        fill={color}
        stroke={color} 
        strokeWidth={1.5}
      />
    </Svg>
  );
}