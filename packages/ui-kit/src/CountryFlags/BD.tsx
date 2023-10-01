import * as React from 'react';

const BD: React.ForwardRefRenderFunction<SVGSVGElement, React.SVGProps<SVGSVGElement>> = (
  props,
  ref,
) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 85.333 513 342"
    width="1.5em"
    height="1em"
    {...props}
    ref={ref}
  >
    <path fill="#2d6e41" d="M0 85.331h513v342H0z" />
    <circle fill="#F40B32" cx="218.902" cy="256.5" r="115" />
  </svg>
);

export default React.forwardRef(BD);
