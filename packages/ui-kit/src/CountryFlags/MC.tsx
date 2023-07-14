import * as React from 'react';

const MC: React.ForwardRefRenderFunction<SVGSVGElement, React.SVGProps<SVGSVGElement>> = (
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
    <path fill="#FFF" d="M0 85.333h512v341.333H0z" />
    <path fill="#c70000" d="M0 85.333h512V256H0z" />
  </svg>
);

export default React.forwardRef(MC);
