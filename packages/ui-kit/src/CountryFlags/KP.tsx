import * as React from 'react';

const KP: React.ForwardRefRenderFunction<SVGSVGElement, React.SVGProps<SVGSVGElement>> = (
  props,
  ref,
) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 513 342"
    width="1.5em"
    height="1em"
    {...props}
    ref={ref}
  >
    <path fill="#91DC5A" d="M0 0h513v342H0z" />
    <path fill="#FFF" d="M0 0h513v342H0z" />
    <g fill="#0052B4">
      <path d="M0 0h513v57.188H0zM0 284.1h513v57.177H0z" />
    </g>
    <path fill="#D80027" d="M0 79.9h513v181.582H0z" />
    <circle fill="#FFF" cx="190.33" cy="171" r="65.668" />
    <path
      fill="#D80027"
      d="m190.3 105 14.8 45.3h47.7l-38.6 28.1 14.8 45.5-38.7-28.2-38.6 28.1 14.8-45.4-38.6-28.1h47.7z"
    />
  </svg>
);

export default React.forwardRef(KP);
