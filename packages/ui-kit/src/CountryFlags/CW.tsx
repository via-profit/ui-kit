import * as React from 'react';

const CW: React.ForwardRefRenderFunction<SVGSVGElement, React.SVGProps<SVGSVGElement>> = (
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
    <path fill="#002b7f" d="M0 0h513v342H0z" />
    <path fill="#f9e814" d="M0 233.5h513v51H0z" />
    <g fill="#FFF">
      <path d="m168.7 86.5 12.9 39.8h41.8l-33.8 24.5 12.9 39.7-33.8-24.5-33.8 24.5 12.9-39.7-33.8-24.5h41.8zM85.4 32.5l7.8 23.9h25L97.9 71.1l7.8 23.8-20.3-14.7-20.3 14.7 7.8-23.8-20.3-14.7h25.1z" />
    </g>
  </svg>
);

export default React.forwardRef(CW);
