import * as React from 'react';

const KE: React.ForwardRefRenderFunction<SVGSVGElement, React.SVGProps<SVGSVGElement>> = (
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
    <path d="M0 0h512v90.579H0z" />
    <path fill="#496E2D" d="M0 251h513v91H0z" />
    <path fill="#A2001D" d="M0 114h513v114H0z" />
    <g fill="#FFF">
      <path d="m323.3 54.5-25.6-11.8L256 137l-41.7-94.3-25.6 11.8 51.8 116.2-51.8 116.2 25.6 11.8 41.7-94.4 41.7 94.4 25.6-11.8-51.8-116.2z" />
      <path d="M273.4 65.6c-9.9-10.8-17.4-17-17.4-17s-7.5 6.2-17.4 17v210.1c9.9 10.8 17.4 17 17.4 17s7.5-6.2 17.4-17V65.6z" />
    </g>
    <g fill="#A2001D">
      <path d="M209 105.9v129.5c10.5 18.5 23.3 33.7 32.9 43.8V62.1c-9.6 10.1-22.4 25.3-32.9 43.8zM303 105.9c-10.5-18.5-23.3-33.7-32.9-43.8v217.2c9.6-10.1 22.4-25.3 32.9-43.8V105.9z" />
    </g>
    <path d="M303 105.9v129.5c10.6-18.8 18.8-41 18.8-64.8s-8.2-45.9-18.8-64.7zM209 105.9v129.5c-10.6-18.8-18.8-41-18.8-64.8s8.2-45.9 18.8-64.7z" />
  </svg>
);

export default React.forwardRef(KE);
