import * as React from 'react';

const CD: React.ForwardRefRenderFunction<SVGSVGElement, React.SVGProps<SVGSVGElement>> = (
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
    <path fill="#338AF3" d="M0 0h513v342H0z" />
    <path fill="#FFDA44" d="M513 66.9V0H411.7L0 274.4V342h100.3z" />
    <path fill="#D80027" d="M513 0v40.1L60.2 342H0v-40.8L451.8 0z" />
    <path
      fill="#FFDA44"
      d="m93.6 31.2 16.3 50.4H163l-42.9 31.2 16.4 50.5-42.9-31.2-43 31.2L67 112.8 24.1 81.6h53.1z"
    />
  </svg>
);

export default React.forwardRef(CD);
