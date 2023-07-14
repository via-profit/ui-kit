import * as React from 'react';

const TH: React.ForwardRefRenderFunction<SVGSVGElement, React.SVGProps<SVGSVGElement>> = (
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
    <path fill="#FFF" d="M0 85.334h512V426.66H0z" />
    <path fill="#0052B4" d="M0 194.056h512v123.882H0z" />
    <g fill="#D80027">
      <path d="M0 85.334h512v54.522H0zM0 372.143h512v54.522H0z" />
    </g>
  </svg>
);

export default React.forwardRef(TH);
