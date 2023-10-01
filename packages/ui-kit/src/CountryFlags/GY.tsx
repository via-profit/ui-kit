import * as React from 'react';

const GY: React.ForwardRefRenderFunction<SVGSVGElement, React.SVGProps<SVGSVGElement>> = (
  props,
  ref,
) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 900 600"
    width="1.5em"
    height="1em"
    {...props}
    ref={ref}
  >
    <path fill="#009E49" d="M0 0h900v600H0V0z" />
    <path fill="#FFF" d="m0 0 947 300L0 600V0z" />
    <path fill="#FFD00D" d="M0 26.1 870 300 0 573.9V26.1z" />
    <path fill="#2D2D2D" d="m0 0 450 300L0 600V0z" />
    <path fill="#D3132F" d="m0 35 397.5 265L0 565V35z" />
  </svg>
);

export default React.forwardRef(GY);
