import * as React from 'react';

const FO: React.ForwardRefRenderFunction<SVGSVGElement, React.SVGProps<SVGSVGElement>> = (
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
    <path
      fill="#0F61A5"
      d="M513 214.5H206.2V342H118.4V214.5H0v-87.7h118.4V0H206.2v126.8H513V192z"
    />
    <path fill="#E50E3D" d="M513 149.3V192H183.7v150H141V192H0v-42.7h141V0h42.7v149.3z" />
  </svg>
);

export default React.forwardRef(FO);
