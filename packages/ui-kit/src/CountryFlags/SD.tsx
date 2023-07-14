import * as React from 'react';

const SD: React.ForwardRefRenderFunction<SVGSVGElement, React.SVGProps<SVGSVGElement>> = (
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
    <path fill="#D80027" d="M0 85.337h512v113.775H0z" />
    <path d="M0 312.888h512v113.775H0z" />
    <path fill="#496E2D" d="M0 426.668V85.331l256 170.675z" />
  </svg>
);

export default React.forwardRef(SD);
