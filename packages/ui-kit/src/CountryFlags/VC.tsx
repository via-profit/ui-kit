import * as React from 'react';

const VC: React.ForwardRefRenderFunction<SVGSVGElement, React.SVGProps<SVGSVGElement>> = (
  props,
  ref,
) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 85.333 512 341.333"
    width="1.5em"
    height="1em"
    {...props}
    ref={ref}
  >
    <path fill="#FFDA44" d="M0 85.331h512v341.337H0z" />
    <path fill="#338AF3" d="M0 85.331h170.663v341.337H0z" />
    <g fill="#6DA544">
      <path d="M341.337 85.331H512v341.337H341.337zM214.261 283.82l-33.393-50.086 33.392-50.087 33.392 50.087zM297.739 283.82l-33.391-50.086 33.391-50.087 33.393 50.087zM256 350.603l-33.391-50.087L256 250.429l33.391 50.087z" />
    </g>
  </svg>
);

export default React.forwardRef(VC);
