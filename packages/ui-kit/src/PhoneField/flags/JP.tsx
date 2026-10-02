import * as React from 'react';

import isLabelled from './isLabelled';

const JP: React.ForwardRefRenderFunction<SVGSVGElement, React.SVGProps<SVGSVGElement>> = (
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
    <path fill="#FFF" d="M0 0h512v342H0z" />
    <circle fill="#D80027" cx="256.5" cy="171" r="96" />
  </svg>
);

export default React.forwardRef(JP);
