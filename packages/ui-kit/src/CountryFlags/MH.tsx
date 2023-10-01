import * as React from 'react';

const MH: React.ForwardRefRenderFunction<SVGSVGElement, React.SVGProps<SVGSVGElement>> = (
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
    <path fill="#1E509C" d="M0 0h513v342H0z" />
    <path fill="#FFF" d="M513 176.1V81.3L0 342l513-165.9z" />
    <path fill="#F18D36" d="M513 0v81.3L0 342 513 0z" />
    <path
      fill="#FFF"
      d="m126.7 99.3-7.8-54.1-7.7 54.1-20.8-23.7 10.7 31.6-31.5-10.7 23.6 20.8-54.1 7.7 54.1 7.7-23.6 20.8 31.5-10.7-10.7 31.6 20.8-23.7 7.7 54.1 7.8-54.1 20.7 23.7-10.6-31.6 31.5 10.7-23.6-20.8 54-7.7-54-7.7 23.6-20.8-31.5 10.7 10.6-31.6z"
    />
  </svg>
);

export default React.forwardRef(MH);
