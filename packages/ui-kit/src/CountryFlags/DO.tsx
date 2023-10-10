import * as React from 'react';

const DO: React.ForwardRefRenderFunction<SVGSVGElement, React.SVGProps<SVGSVGElement>> = (
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
    <path fill="#D80027" d="M0 215.2h211.5v126.1H0z" />
    <path fill="#0052B4" d="M0 0h211.5v126.2H0z" />
    <path fill="#D80027" d="M300.5 0H512v126.2H300.5z" />
    <path fill="#0052B4" d="M300.5 215.2H512v126.1H300.5z" />
    <g stroke="#FFF" strokeWidth="5" strokeMiterlimit="10">
      <path fill="#0052B4" d="M256 130h-49.9v49.4s19.5 6 49.9 6V130z" />
      <path
        fill="#D80027"
        d="M206.1 179.4v6c0 27.5 22.3 49.9 49.9 49.9v-49.9c-30.4 0-49.9-6-49.9-6z"
      />
      <path fill="#0052B4" d="M256 235.3c27.5 0 49.9-22.3 49.9-49.9v-6s-19.5 6-49.9 6v49.9z" />
      <path fill="#D80027" d="M256 130v55.4c30.4 0 49.9-6 49.9-6V130H256z" />
    </g>
  </svg>
);

export default React.forwardRef(DO);
