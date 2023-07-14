import * as React from 'react';

const MW: React.ForwardRefRenderFunction<SVGSVGElement, React.SVGProps<SVGSVGElement>> = (
  props,
  ref,
) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 512 342"
    width="1.5em"
    height="1em"
    {...props}
    ref={ref}
  >
    <path fill="#272727" d="M0 0h512v114H0z" />
    <path fill="#e40112" d="M0 114h512v114H0z" />
    <path fill="#07893f" d="M0 228h512v114H0z" />
    <circle fill="#e40112" cx="256" cy="125" r="95" />
  </svg>
);

export default React.forwardRef(MW);
