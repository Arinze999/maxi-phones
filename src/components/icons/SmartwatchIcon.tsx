import React from 'react';

interface IconProps {
  width?: number;
  height?: number;
  color?: string;
}

const SmartwatchIcon: React.FC<IconProps> = ({
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
      {/* Watch body */}
      <rect x="8" y="6" width="8" height="12" rx="2" stroke={color} strokeWidth="0.5" />
      {/* Top strap */}
      <rect x="9" y="2" width="6" height="2" rx="1" fill={color} />
      {/* Bottom strap */}
      <rect x="9" y="20" width="6" height="2" rx="1" fill={color} />
      {/* Screen/crown dot */}
      <circle cx="12" cy="12" r="1" fill={color} />
    </svg>
  );
};

export default SmartwatchIcon;
