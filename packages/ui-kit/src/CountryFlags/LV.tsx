import * as React from 'react';

const LV: React.ForwardRefRenderFunction<SVGSVGElement, React.SVGProps<SVGSVGElement>> = (
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
    <g fill="#A2001D">
      <path className="st1" d="M0 0h513v127.6H0zM0 214.4h513V342H0z" />
    </g>
  </svg>
);

export default React.forwardRef(LV);
