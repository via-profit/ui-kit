import * as React from 'react';

const SC: React.ForwardRefRenderFunction<SVGSVGElement, React.SVGProps<SVGSVGElement>> = (
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
    <path fill="#FFF" d="M0 85.337h512v341.326H0z" />
    <path fill="#FFDA44" d="M235.454 85.337 0 426.663 427.345 85.337z" />
    <path fill="#6DA544" d="M512 329.393 0 426.663h512z" />
    <path fill="#D80027" d="M512 85.337h-84.655L0 426.663l512-204.512z" />
    <path fill="#0052B4" d="M0 85.337v341.326L235.454 85.337z" />
  </svg>
);

export default React.forwardRef(SC);
