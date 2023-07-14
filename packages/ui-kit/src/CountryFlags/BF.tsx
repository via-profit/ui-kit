import * as React from 'react';

const BF: React.ForwardRefRenderFunction<SVGSVGElement, React.SVGProps<SVGSVGElement>> = (
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
    <path fill="#3d944f" d="M0 0h513v342H0z" />
    <path fill="#ef2b2d" d="M0 0h513v171H0z" />
    <path
      fill="#FFDA44"
      d="m256 102.6 16.9 52h54.7l-44.2 32.2 16.8 52-44.2-32.1-44.2 32.1 16.8-52-44.2-32.2h54.7z"
    />
  </svg>
);

export default React.forwardRef(BF);
