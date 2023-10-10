import * as React from 'react';

const BQ: React.ForwardRefRenderFunction<SVGSVGElement, React.SVGProps<SVGSVGElement>> = (
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
    <path fill="#FFF" d="M0 0h513v342H0z" />
    <path fill="#012a87" d="M0 342h513V0z" />
    <path fill="#f9d90f" d="M250.4 0H0v166.9z" />
    <path
      fill="#dc171d"
      d="m140.4 118.3 12.2 21.2h24.5l-12.3 21.1 12.3 21.2h-24.5L140.4 203l-12.2-21.2h-24.5l12.3-21.2-12.3-21.1h24.5z"
    />
    <circle
      fill="none"
      stroke="#000"
      strokeWidth="9"
      strokeMiterlimit="10"
      cx="140.4"
      cy="160.6"
      r="57.7"
    />
  </svg>
);

export default React.forwardRef(BQ);
