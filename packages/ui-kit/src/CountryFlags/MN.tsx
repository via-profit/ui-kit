import * as React from 'react';

const MN: React.ForwardRefRenderFunction<SVGSVGElement, React.SVGProps<SVGSVGElement>> = (
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
    <path fill="#095FAD" d="M0 0h513v342H0z" />
    <g fill="#BE1229">
      <path d="M342 0h171v342H342zM0 0h171v342H0z" />
    </g>
    <g fill="#FFDA44">
      <path d="M108.3 166.3h14.8v74.2h-14.8zM48.9 166.3h14.8v74.2H48.9z" />
      <circle cx="86" cy="203.4" r="14.8" />
      <path d="M71.2 225.7h29.7v14.8H71.2zM71.2 166.3h29.7v14.8H71.2z" />
      <circle cx="86" cy="144" r="14.8" />
      <path d="M76.3 123.9h19.5L86 108.3z" />
    </g>
  </svg>
);

export default React.forwardRef(MN);
