import React from 'react';

interface IconProps {
  width?: number;
  height?: number;
  color?: string;
}

const LaptopIcon: React.FC<IconProps> = ({
  width = 24,
  height = 24,
  color = 'currentColor',
}) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      fill="none"
      viewBox="0 0 24 24"
      stroke={color}
      strokeWidth={1.5}
    >
      <rect x="4" y="5" width="16" height="10" rx="1" stroke={color} strokeWidth="0.5" />
      <path d="M2 18h20" stroke={color} strokeWidth="0.5" />
    </svg>
  );
};

export default LaptopIcon;
