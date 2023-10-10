import * as React from 'react';

const SZ: React.ForwardRefRenderFunction<SVGSVGElement, React.SVGProps<SVGSVGElement>> = (
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
    <path fill="#2B5DEA" d="M0 0h900v600H0V0z" />
    <path fill="#FFDF29" d="M0 100h900v400H0V100z" />
    <path fill="#D70000" d="M0 150h900v300H0V150z" />
    <path
      fill="#FFF"
      d="M450 171.4v257.2c114.3 0 171.4-85.7 214.3-128.6-42.9-42.9-100-128.6-214.3-128.6z"
    />
    <path d="M450 171.4c-100 0-171.4 85.7-214.3 128.6C278.6 342.9 350 428.6 450 428.6V171.4z" />
    <path fill="#FFF" d="M346.3 254.3h21v91.3h-21zM398.2 254.3h21v91.3h-21z" />
    <path d="M477.8 254.3h21v91.3h-21zM529.7 254.3h21v91.3h-21z" />
  </svg>
);

export default React.forwardRef(SZ);
