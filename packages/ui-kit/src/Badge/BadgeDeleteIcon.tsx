import React from 'react';

export type BadgeDeleteIconProps = React.SVGProps<SVGSVGElement>;

const BadgeDeleteIcon: React.ForwardRefRenderFunction<SVGSVGElement, BadgeDeleteIconProps> = (
  props,
  ref,
) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    version="1.1"
    width="1em"
    height="1em"
    viewBox="0 0 512 512"
    aria-hidden
    focusable="false"
    {...props}
    ref={ref}
  >
    <path
      d="m256 0c-141.11 0-256 114.89-256 256s114.89 256 256 256 256-114.89 256-256-114.89-256-256-256zm0 39.385c119.81 0 216.62 96.805 216.62 216.62s-96.805 216.62-216.62 216.62-216.62-96.805-216.62-216.62 96.805-216.62 216.62-216.62zm-78.769 118.15a19.692 19.692 0 0 0-5.0961 0.67068 19.692 19.692 0 0 0-8.8293 5.0961 19.692 19.692 0 0 0 0 27.851l64.844 64.844-64.844 64.844a19.692 19.692 0 0 0 0 27.851 19.692 19.692 0 0 0 27.851 0l64.844-64.844 64.844 64.844a19.692 19.692 0 0 0 27.851 0 19.692 19.692 0 0 0 0-27.851l-64.844-64.844 64.844-64.844a19.692 19.692 0 0 0 0-27.851 19.692 19.692 0 0 0-27.851 0l-64.844 64.844-64.844-64.844a19.692 19.692 0 0 0-13.925-5.7669z"
      fill="currentColor"
    />
  </svg>
);

export default React.forwardRef(BadgeDeleteIcon);
