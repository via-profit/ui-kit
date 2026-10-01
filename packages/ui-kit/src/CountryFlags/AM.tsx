import * as React from 'react';

import isLabelled from './isLabelled';

const AM: React.ForwardRefRenderFunction<SVGSVGElement, React.SVGProps<SVGSVGElement>> = (
  props,
  ref,
) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 513 342"
    width="1.5em"
    height="1em"
    aria-hidden={isLabelled(props) ? undefined : true}
    role={isLabelled(props) ? 'img' : undefined}
    {...props}
    ref={ref}
  >
    <path fill="#0052B4" d="M0 0h513v342H0z" />
    <path fill="#D80027" d="M0 0h513v114H0z" />
    <path fill="#FF9811" d="M0 228h513v114H0z" />
  </svg>
);

export default React.forwardRef(AM);
