import * as React from 'react';

const NG: React.ForwardRefRenderFunction<SVGSVGElement, React.SVGProps<SVGSVGElement>> = (
  props,
  ref,
) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 85.5 513 342"
    width="1.5em"
    height="1em"
    {...props}
    ref={ref}
  >
    <path fill="#FFF" d="M0 85.5h513v342H0z" />
    <g fill="#007b23">
      <path d="M0 85.5h171v342H0zM342 85.5h171v342H342z" />
    </g>
  </svg>
);

export default React.forwardRef(NG);
