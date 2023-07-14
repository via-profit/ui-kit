import * as React from 'react';

const AQ: React.ForwardRefRenderFunction<SVGSVGElement, React.SVGProps<SVGSVGElement>> = (
  props,
  ref,
) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 744 496"
    width="1.5em"
    height="1em"
    {...props}
    ref={ref}
  >
    <path fill="#3A7DCE" d="M0 0h744v496H0V0z" />
    <path
      fill="#fff"
      d="m120 125 90 63 54-14 23-81 61-36 92 14 105 55 6 90 34 12v92l-65 115-78 24-72-17 18-30-8-32-10 9-162-25-49-85 20-46-49-62z"
    />
  </svg>
);

export default React.forwardRef(AQ);
