import * as React from 'react';

import isLabelled from './isLabelled';

const DK: React.ForwardRefRenderFunction<SVGSVGElement, React.SVGProps<SVGSVGElement>> = (
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
    <path fill="#c60c30" d="M0 0h513v342H0z" />
    <path fill="#FFF" d="M190 0h-60v140H0v60h130v142h60V200h323v-60H190z" />
  </svg>
);

export default React.forwardRef(DK);
