import * as React from 'react';

const TA: React.ForwardRefRenderFunction<SVGSVGElement, React.SVGProps<SVGSVGElement>> = (
  props,
  ref,
) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 512 341.3"
    width="1.5em"
    height="1em"
    {...props}
    ref={ref}
  >
    <path fill="#0052B4" d="M0 0h512v341.3H0z" />
    <path
      fill="#FFF"
      d="M256 0v117.4h-46.1l46.1 30.7v22.6h-22.6L160 121.8v48.9H96v-48.9l-73.4 48.9H0v-22.6l46.1-30.7H0v-64h46.1L0 22.7V0h22.6L96 48.9V0h64v48.9L233.4 0z"
    />
    <g fill="#D80027">
      <path d="M144 0h-32v69.4H0v32h112v69.3h32v-69.3h112v-32H144z" />
      <path d="M0 0v15.1l57.4 38.3H80zM256 0v15.1l-57.4 38.3H176z" />
    </g>
    <path fill="#2E52B2" d="M256 22.7v30.7h-46.1z" />
    <g fill="#D80027">
      <path d="M0 0v15.1l57.4 38.3H80zM256 0v15.1l-57.4 38.3H176z" />
    </g>
    <path fill="#2E52B2" d="M256 22.7v30.7h-46.1z" />
    <g fill="#D80027">
      <path d="M0 170.7v-15.1l57.4-38.2H80zM256 170.7v-15.1l-57.4-38.2H176z" />
    </g>
    <path
      fill="#29DBFF"
      d="M448.9 169.5c0 9.6-.3 29.6-1.4 39.2-4.1 34.9-23.5 68.8-62.1 85.9-45.3-17.9-60.8-51-64.9-85.9-1.1-9.6-1.5-19.4-1.5-29l.3-47.1h129.2l.4 36.9z"
    />
    <path
      fill="#FFF"
      d="M447.5 208.7c-.2 1.6-.4 3.3-.6 4.9-4.8 33.1-22.9 65.4-61.5 81-43.2-17-59.4-47.9-64.2-81-.2-1.6-.4-3.2-.6-4.9"
    />
    <path fill="#29DBFF" d="m385.4 251.7-22.9-43h45.8z" />
    <path fill="#FFF" d="m385.4 165.8-22.9 42.9h45.8z" />
    <ellipse fill="#FFBE57" cx="474.8" cy="236.8" rx="16.8" ry="43.3" />
    <ellipse fill="#FFBE57" cx="295.3" cy="236.8" rx="16.8" ry="43.3" />
    <path
      fill="#FFF"
      d="m385.4 31.5-33.4 44h68.5zM315.5 280s33.8 29.5 69.9 29.5 67.1-29.5 67.1-29.5l8.5 14.6S439.2 326 385.4 326 307 294.6 307 294.6l8.5-14.6z"
    />
    <ellipse fill="#A5A5A5" cx="386.3" cy="104.3" rx="34.3" ry="23.3" />
  </svg>
);

export default React.forwardRef(TA);
