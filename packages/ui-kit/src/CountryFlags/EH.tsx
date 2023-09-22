import * as React from 'react';

const EH: React.ForwardRefRenderFunction<SVGSVGElement, React.SVGProps<SVGSVGElement>> = (
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
    <path d="M0 0h513v114H0z" />
    <path fill="#428823" d="M0 228h513v114H0z" />
    <g fill="#D80027">
      <path d="M256 171 0 342V0zM309.1 171c0-22.9 13.1-42.1 34.6-46.8-3.3-.7-6.7-1.1-10.3-1.1-26.4 0-47.9 21.4-47.9 47.9s21.4 47.9 47.9 47.9c3.5 0 7-.4 10.3-1.1-21.5-5.1-34.6-24.2-34.6-46.8z" />
      <path d="m365 129.2 10.3 31.7h33.3l-27 19.6 10.3 31.7-26.9-19.6-27 19.6 10.3-31.7-27-19.6h33.4z" />
    </g>
  </svg>
);

export default React.forwardRef(EH);
