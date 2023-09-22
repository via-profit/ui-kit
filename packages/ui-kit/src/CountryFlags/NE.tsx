import * as React from 'react';

const NE: React.ForwardRefRenderFunction<SVGSVGElement, React.SVGProps<SVGSVGElement>> = (
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
    <path fill="#e05206" d="M0 85.337h512v113.775H0z" />
    <path fill="#0db02b" d="M0 312.888h512v113.775H0z" />
    <circle fill="#e05206" cx="256" cy="256" r="32" />
  </svg>
);

export default React.forwardRef(NE);
