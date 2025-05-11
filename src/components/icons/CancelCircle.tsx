import { SVGProps } from 'react';

export function CancelCircle(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      width="24px"
      height="24px"
      {...props}
    >
      <g fill="none" stroke="currentColor" strokeWidth="1.5">
        <circle cx="12" cy="12" r="9.25"></circle>
        <path
          strokeLinecap="round"
          d="m8.875 8.875l6.25 6.25m0-6.25l-6.25 6.25"
        ></path>
      </g>
    </svg>
  );
}
