import * as React from 'react';

const IL: React.ForwardRefRenderFunction<SVGSVGElement, React.SVGProps<SVGSVGElement>> = (
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
    <g fill="#2E52B2">
      <path d="M340.6 122.4h-56.1l-28-48.6-28 48.6h-56.1l28 48.6-28 48.6h56.1l28 48.6 28-48.6h56.1l-28-48.6 28-48.6zM293.2 171 276 204.2h-38.9L219.8 171l17.2-33.2h38.9l17.3 33.2zm-36.7-71.8 11.9 23.3h-23.9l12-23.3zm-58.3 38.6h23.9l-10.8 21-13.1-21zm0 66.4 13-22.1 11.9 22.1h-24.9zm58.3 37.5-11.9-22.1h23.9l-12 22.1zm59.4-37.5h-25l11.9-22.1 13.1 22.1zm-26.1-66.4h26.1l-13 22.1-13.1-22.1zM0 21.3h512V64H0zM0 277.3h512V320H0z" />
    </g>
  </svg>
);

export default React.forwardRef(IL);
