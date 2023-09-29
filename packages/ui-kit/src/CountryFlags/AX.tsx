import * as React from 'react';

const AX: React.ForwardRefRenderFunction<SVGSVGElement, React.SVGProps<SVGSVGElement>> = (
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
    <path
      fill="#FFDA44"
      d="M513 210.9H202.2V342h-79.8V210.9H0V131.1h122.4V0h79.8v131.1H513v61.2z"
    />
    <path fill="#D80027" d="M513 149.7v42.6H183.7V342H141V192.3H0v-42.6h141V0h42.7v149.7z" />
  </svg>
);

export default React.forwardRef(AX);