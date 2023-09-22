import * as React from 'react';

const GR: React.ForwardRefRenderFunction<SVGSVGElement, React.SVGProps<SVGSVGElement>> = (
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
    <g fill="#0d5eaf">
      <path d="M0 0h513v38H0zM0 76h513v38H0zM0 152h513v38H0zM0 228h513v38H0zM0 304h513v38H0z" />
      <path d="M0 0h190v190H0z" />
    </g>
    <g fill="#FFF">
      <path d="M0 76h190v38H0z" />
      <path d="M76 0h38v190H76z" />
    </g>
  </svg>
);

export default React.forwardRef(GR);
