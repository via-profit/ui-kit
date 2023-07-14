import * as React from 'react';

const CG: React.ForwardRefRenderFunction<SVGSVGElement, React.SVGProps<SVGSVGElement>> = (
  props,
  ref,
) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 85.333 513 342"
    width="1.5em"
    height="1em"
    {...props}
    ref={ref}
  >
    <path fill="#da1a35" d="M0 85.331h513v342H0z" />
    <path fill="#009543" d="M443.726 85.331 102.4 426.657H0V85.331z" />
    <path fill="#fbde4a" d="M500.124 85.331 158.798 426.657H11.876L353.202 85.331z" />
  </svg>
);

export default React.forwardRef(CG);
