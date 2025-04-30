import React from 'react';

interface IconProps {
  width?: number;
  height?: number;
  color?: string;
}

const GamepadIcon: React.FC<IconProps> = ({
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
      <rect x="5" y="9" width="14" height="6" rx="2" stroke={color} strokeWidth="0.5" />
      <path d="M8 12h-2m1-1v2" stroke={color} strokeWidth="0.5" />
      <circle cx="16" cy="12" r="1" fill={color} />
    </svg>
  );
};

export default GamepadIcon;
