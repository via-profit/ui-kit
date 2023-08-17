import * as React from 'react';

const AW: React.ForwardRefRenderFunction<SVGSVGElement, React.SVGProps<SVGSVGElement>> = (
  props,
  ref,
) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 363 242"
    width="1.5em"
    height="1em"
    {...props}
    ref={ref}
  >
    <path fill="#338AF3" d="M0 0h363v242H0z" />
    <path
      fill="#FFF"
      d="M57 96.9 14.7 78.2 57 59.6l18.6-42.2 18.6 42.2 42.3 18.6-42.3 18.7-18.6 42.2z"
    />
    <path
      fill="#f30028"
      d="m75.6 40.6 11.5 26.1 26.1 11.5-26.1 11.5-11.5 26.1-11.5-26.1L38 78.2l26.1-11.5z"
    />
    <g fill="#FFDA44">
      <path d="M0 152.2h363v15.7H0zM0 183.6h363v15.7H0z" />
    </g>
  </svg>
);

export default React.forwardRef(AW);
