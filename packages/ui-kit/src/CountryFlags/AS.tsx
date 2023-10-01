import * as React from 'react';

const AS: React.ForwardRefRenderFunction<SVGSVGElement, React.SVGProps<SVGSVGElement>> = (
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
    <path fill="#10338c" d="M0 0h513v342H0z" />
    <path fill="#D80027" d="M513 33 95.3 171 513 310.76V342L0 171 513 0z" />
    <path fill="#FFF" d="M513 287.18v24.58L81.72 171 513 30v24.16" />
    <path
      fill="#A2001D"
      d="m476.98 140.21-21.89 10.68-3.18-15.32 31.19-29.77s-9.42-40.65-13.75-44.98l-112.32 55.82-6.84 36.76-31.9 28.59-.4 34.2 34.29-22.76 67.23-2.66-1.51 38.11h22.23l11.9-44.64 31.55-24.61-6.6-19.42z"
    />
    <path
      fill="#EFC100"
      stroke="#231F20"
      strokeMiterlimit="10"
      d="m317.89 238.41-22.24-11.11 22.24-11.11h144.46v22.22z"
    />
  </svg>
);

export default React.forwardRef(AS);
