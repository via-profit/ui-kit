import * as React from 'react';

const CM: React.ForwardRefRenderFunction<SVGSVGElement, React.SVGProps<SVGSVGElement>> = (
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
    <path fill="#ce1126" d="M0 0h513v342H0z" />
    <path fill="#007a5e" d="M0 0h171v342H0z" />
    <g fill="#fcd116">
      <path d="M342 0h171v342H342zM256 102.2l17.2 53H329L283.9 188l17.2 53-45.1-32.7-45.1 32.7 17.2-53-45.1-32.8h55.8z" />
    </g>
  </svg>
);

export default React.forwardRef(CM);
