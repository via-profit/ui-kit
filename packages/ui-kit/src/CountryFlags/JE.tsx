import * as React from 'react';

const JE: React.ForwardRefRenderFunction<SVGSVGElement, React.SVGProps<SVGSVGElement>> = (
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
    <path fill="#FFF" d="M0 0h513v342H0z" />
    <path
      fill="#D80027"
      d="M301.8 171 513 30.2V0h-45.3L256.5 140.8 45.3 0H0v30.2L211.2 171 0 311.8V342h45.3l211.2-140.8L467.7 342H513v-30.2z"
    />
    <path
      fill="#FFDA44"
      d="m233.7 44.6 22.3 5.6 22.3-5.6 4-20.9-14.9 6.5L256 14.8l-11.4 15.4-14.9-6.5z"
    />
    <path
      fill="#D80027"
      d="M233.7 44.6s-4 12.9-4 29.9c0 27.9 26.3 41.3 26.3 41.3s26.3-15.5 26.3-41.3c0-15.4-4-29.9-4-29.9s-8.1-5-22.3-5-22.3 5-22.3 5z"
    />
  </svg>
);

export default React.forwardRef(JE);
