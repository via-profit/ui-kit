import * as React from 'react';

import isLabelled from './isLabelled';

const IC: React.ForwardRefRenderFunction<SVGSVGElement, React.SVGProps<SVGSVGElement>> = (
  props,
  ref,
) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 300 200"
    width="1.5em"
    height="1em"
    aria-hidden={isLabelled(props) ? undefined : true}
    role={isLabelled(props) ? 'img' : undefined}
    {...props}
    ref={ref}
  >
    <path fill="#fc0" d="M0 0h300v200H0z" />
    <path fill="#0768a9" d="M0 0h200v200H0z" />
    <path fill="#fff" d="M0 0h100v200H0z" />
  </svg>
);

export default React.forwardRef(IC);
