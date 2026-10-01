import * as React from 'react';

import isLabelled from './isLabelled';

const FI: React.ForwardRefRenderFunction<SVGSVGElement, React.SVGProps<SVGSVGElement>> = (
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
    <path fill="#FFF" d="M0 0h513v342H0z" />
    <path fill="#2E52B2" d="M513 129.3V212H203.7v130H121V212H0v-82.7h121V0h82.7v129.3z" />
  </svg>
);

export default React.forwardRef(FI);
