import React from 'react';

interface EyeIconProps {
  width?: number;
  color?: string;
}

const EyeIcon: React.FC<EyeIconProps> = ({ width = 24, color = 'currentColor' }) => (
  <svg
    width={width}
    height={width}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M12 4.5C7.305 4.5 3.157 7.36 1.5 12c1.657 4.64 5.805 7.5 10.5 7.5s8.843-2.86 10.5-7.5C20.843 7.36 16.695 4.5 12 4.5z"
      stroke="black"
      strokeWidth="1"
      fill={color}
    />
    <circle cx="12" cy="12" r="3" stroke="black" strokeWidth="1" fill={color} />
  </svg>
);

export default EyeIcon;
