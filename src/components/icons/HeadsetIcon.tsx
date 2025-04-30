import React from 'react';

interface IconProps {
  width?: number;
  height?: number;
  color?: string;
}

const HeadsetIcon: React.FC<IconProps> = ({
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
      <path
        d="M4 14v-2a8 8 0 0116 0v2M4 14v2a2 2 0 002 2h1v-4H4zm16 0v2a2 2 0 01-2 2h-1v-4h3z"
        stroke={color}
        strokeWidth="0.5"
      />
    </svg>
  );
};

export default HeadsetIcon;
