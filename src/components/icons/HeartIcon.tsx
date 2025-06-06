import React from 'react';

interface HeartIconProps {
  width?: number;
  color?: string;
  stroke?: string;
}

const HeartIcon: React.FC<HeartIconProps> = ({
  width = 24,
  color = 'currentColor',
  stroke,
}) => (
  <svg
    width={width}
    height={width}
    viewBox="0 0 24 24"
    fill={color}
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3 9.24 3 10.91 3.81 12 5.09 13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
      stroke={stroke}
      strokeWidth="1"
    />
  </svg>
);

export default HeartIcon;
