import * as React from 'react';

const CZ: React.ForwardRefRenderFunction<SVGSVGElement, React.SVGProps<SVGSVGElement>> = (
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
    <path fill="#11457e" d="M0 0h513v342H0z" />
    <path fill="#d7141a" d="M513 171v171H0l215-171z" />
    <path fill="#FFF" d="M513 0v171H215.185L0 0z" />
  </svg>
);

export default React.forwardRef(CZ);
