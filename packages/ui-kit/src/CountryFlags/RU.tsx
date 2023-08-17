import * as React from 'react';

const RU: React.ForwardRefRenderFunction<SVGSVGElement, React.SVGProps<SVGSVGElement>> = (
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
    <path fill="#FFF" d="M0 85.33v341.332h512V85.33z" />
    <path fill="#0052B4" d="M0 85.333h512V426.67H0z" />
    <path fill="#FFF" d="M0 85.333h512v113.775H0z" />
    <path strokeWidth="32" fill="#D80027" d="M0 312.884h512v113.775H0z" />
  </svg>
);

export default React.forwardRef(RU);
