import * as React from 'react';

const PW: React.ForwardRefRenderFunction<SVGSVGElement, React.SVGProps<SVGSVGElement>> = (
  props,
  ref,
) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 85.333 512 341.333"
    width="1.5em"
    height="1em"
    {...props}
    ref={ref}
  >
    <path fill="#338AF3" d="M0 85.331h512v341.337H0z" />
    <circle fill="#FFDA44" cx="218.902" cy="255.994" r="74.207" />
  </svg>
);

export default React.forwardRef(PW);
