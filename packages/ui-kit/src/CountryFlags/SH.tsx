import * as React from 'react';

const SH: React.ForwardRefRenderFunction<SVGSVGElement, React.SVGProps<SVGSVGElement>> = (
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
      d="M449 139.7c-.1 44.4-7.2 92.1-65 114.9-57.8-22.8-64.9-70.5-65-114.9h130z"
    />
    <path
      fill="#ffda44"
      d="M449 139.7c0-16.7-.9-32.9-.5-47.1C426.9 83 398.4 81 383.9 81s-42.9 2-64.6 11.6c.4 14.2-.5 30.4-.5 47.1H449z"
    />
    <path
      fill="#BF521B"
      d="m369.5 204.5.3 10.3-12.8.2 4.9 13.2h-17.3c-18-20.2-23.4-42.4-24.9-68.1l9.1-9.7 8.3 14.3 10.8-12.8 7 7.8.8 15.7 13.8 29.1z"
    />
    <path
      fill="#474747"
      d="m436.6 192.5-8.6 18.3h-47l-29.2-19.5 25.7 10.5h25.1l3.7-6.5 7.2.2 2-3z"
    />
  </svg>
);

export default React.forwardRef(SH);