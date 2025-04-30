import React from 'react';

interface PhoneIconProps {
  width?: number;
  height?: number;
  color?: string;
}

const PhoneIcon: React.FC<PhoneIconProps> = ({
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
      <rect
        x="6"
        y="2"
        width="12"
        height="20"
        rx="2"
        ry="2"
        stroke={color}
        strokeWidth="0.5"
      />
      <circle cx="12" cy="18" r="0.2" fill={color} />
    </svg>
  );
};

export default PhoneIcon;
