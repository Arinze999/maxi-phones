import React from 'react';

interface StarIconProps {
  width?: number;
  color?: string;
}

const StarIcon: React.FC<StarIconProps> = ({
  width = 24,
  color = 'currentColor',
}) => (
  <svg
    width={width}
    height={width}
    viewBox="0 0 24 24"
    fill={color}
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M12 2l2.917 5.909L21 9.182l-4.5 4.386L17.833 21 12 17.727 6.167 21l1.333-7.432L3 9.182l6.083-1.273L12 2z"
      stroke=""
      strokeWidth="1"
    />
  </svg>
);

export default StarIcon;
