import * as React from 'react';

const BS: React.ForwardRefRenderFunction<SVGSVGElement, React.SVGProps<SVGSVGElement>> = (
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
    <path fill="#ffc72c" d="M0 0h513v342H0z" />
    <g fill="#00778b">
      <path d="M0 0h513v114H0zM0 228h513v114H0z" />
    </g>
    <path d="M256 171 0 342V0z" />
  </svg>
);

export default React.forwardRef(BS);
