import * as React from 'react';

const BT: React.ForwardRefRenderFunction<SVGSVGElement, React.SVGProps<SVGSVGElement>> = (
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
    <path fill="#FF7415" d="M0 0h513v342H0z" />
    <path fill="#FFDA44" d="M513 0H0v342" />
    <path
      fill="none"
      stroke="#FFF"
      strokeWidth="42"
      strokeMiterlimit="10"
      d="M128.7 255.5s35 54 67.3 32.4c56.9-37.9-68.9-108.6-2.9-152.6 58.3-38.8 76.6 103.5 137.6 62.8 59-39.3-64.7-111.4-9.2-148.4 33.4-22.2 67.1 32.6 67.1 32.6"
    />
  </svg>
);

export default React.forwardRef(BT);
