import * as React from 'react';

const PT: React.ForwardRefRenderFunction<SVGSVGElement, React.SVGProps<SVGSVGElement>> = (
  props,
  ref,
) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 85.333 512 341.333"
    width="1.5em"
    height="1em"
    {...props}
    ref={ref}
  >
    <path fill="#D80027" d="M0 85.337h512v341.326H0z" />
    <path fill="#6DA544" d="M196.641 85.337v341.326H0V85.337z" />
    <circle fill="#FFDA44" cx="196.641" cy="256" r="64" />
    <path
      fill="#D80027"
      d="M160.638 224v40.001c0 19.882 16.118 36 36 36s36-16.118 36-36V224h-72z"
    />
    <path
      fill="#FFF"
      d="M196.638 276c-6.617 0-12-5.383-12-12v-16h24.001v16c-.001 6.616-5.385 12-12.001 12z"
    />
  </svg>
);

export default React.forwardRef(PT);
