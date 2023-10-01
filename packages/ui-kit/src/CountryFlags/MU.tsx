import * as React from 'react';

const MU: React.ForwardRefRenderFunction<SVGSVGElement, React.SVGProps<SVGSVGElement>> = (
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
    <path fill="#f7ce00" d="M0 85.331h512v341.326H0z" />
    <path fill="#e32737" d="M0 85.331h512v85.337H0z" />
    <path fill="#191f6a" d="M0 170.657h512v85.337H0z" />
    <path fill="#00a04e" d="M0 341.331h512v85.337H0z" />
  </svg>
);

export default React.forwardRef(MU);
