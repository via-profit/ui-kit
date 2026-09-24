import * as React from 'react';

const MenuOutline: React.ForwardRefRenderFunction<SVGSVGElement, React.SVGProps<SVGSVGElement>> = (
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
    strokeWidth={1.8}
    strokeLinecap="round"
    {...props}
    ref={ref}
  >
    <path d="M4 6h16M4 12h16M4 18h16" />
  </svg>
);

export default React.forwardRef(MenuOutline);
