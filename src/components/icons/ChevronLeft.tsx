import React, { SVGProps } from 'react';

/**
 * Props for ChevronLeft12 icon.
 * @param color - Icon fill color (defaults to 'currentColor')
 * @param width - Icon width & height (defaults to 16px)
 */
export interface ChevronLeft12Props extends Omit<SVGProps<SVGSVGElement>, 'width' | 'height'> {
  color?: string;
  width?: number | string;
}

export function ChevronLeft12({ color = 'currentColor', width = 16, ...props }: ChevronLeft12Props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 12 12"
      width={width}
      height={width}
      {...props}
    >
      <path
        fill={color}
        fillRule="evenodd"
        d="M7.85 2.15a.5.5 0 0 1 0 .707L4.7 6.007l3.15 3.15a.5.5 0 0 1-.707.707l-3.5-3.5a.5.5 0 0 1 0-.707l3.5-3.5a.5.5 0 0 1 .707 0z"
        clipRule="evenodd"
      />
    </svg>
  );
}
