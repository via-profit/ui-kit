import * as React from 'react';

const AM: React.ForwardRefRenderFunction<SVGSVGElement, React.SVGProps<SVGSVGElement>> = (
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
    <path fill="#0052B4" d="M0 0h513v342H0z" />
    <path fill="#D80027" d="M0 0h513v114H0z" />
    <path fill="#FF9811" d="M0 228h513v114H0z" />
  </svg>
);

export default React.forwardRef(AM);
