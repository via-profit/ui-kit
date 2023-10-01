import * as React from 'react';

const AR: React.ForwardRefRenderFunction<SVGSVGElement, React.SVGProps<SVGSVGElement>> = (
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
    <path fill="#FFF" d="M0 0h512v342H0z" />
    <path fill="#338AF3" d="M0 0h512v114H0zM0 228h512v114H0z" />
    <circle fill="#FFDA44" stroke="#d6ab00" strokeWidth="5" cx="256.5" cy="171" r="40" />
  </svg>
);

export default React.forwardRef(AR);
