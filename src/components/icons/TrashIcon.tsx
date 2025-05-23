import React, { SVGProps } from 'react';

/**
 * Props for TrashBinOutline icon.
 * @param color - Stroke and fill color (defaults to 'currentColor')
 * @param width - Icon width & height (defaults to 16px)
 */
export interface TrashBinOutlineProps extends Omit<SVGProps<SVGSVGElement>, 'width' | 'height'> {
  color?: string;
  width?: number | string;
}

export function TrashBinOutline({ color = 'currentColor', width = 16, ...props }: TrashBinOutlineProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 512 512"
      width={width}
      height={width}
      {...props}
    >
      <path
        fill="none"
        stroke={color}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="32"
        d="m432 144l-28.67 275.74A32 32 0 0 1 371.55 448H140.46a32 32 0 0 1-31.78-28.26L80 144"
      />
      <rect
        width="448"
        height="80"
        x="32"
        y="64"
        fill="none"
        stroke={color}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="32"
        rx="16"
        ry="16"
      />
      <path
        fill="none"
        stroke={color}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="32"
        d="M312 240L200 352m112 0L200 240"
      />
    </svg>
  );
}
