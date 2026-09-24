import * as React from 'react';

const CheckOutline: React.ForwardRefRenderFunction<SVGSVGElement, React.SVGProps<SVGSVGElement>> = (
  props,
  ref,
) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    width="1em"
    height="1em"
    fill="none"
    stroke="currentColor"
    strokeWidth={2}
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
    ref={ref}
  >
    <path d="m5 12.5 4.5 4.5L19 7.5" />
  </svg>
);

export default React.forwardRef(CheckOutline);
