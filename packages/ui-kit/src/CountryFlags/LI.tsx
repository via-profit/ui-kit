import * as React from 'react';

const LI: React.ForwardRefRenderFunction<SVGSVGElement, React.SVGProps<SVGSVGElement>> = (
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
    <path fill="#D80027" d="M0 0h513v342H0z" />
    <path fill="#0052B4" d="M0 0h513v171H0z" />
    <path
      fill="#FFDA44"
      d="M149.3 98.1c0-14-11.3-25.3-25.3-25.3-6.5 0-12.4 2.4-16.9 6.4V64.4h8.4V47.5h-8.4v-8.4H90.3v8.4h-8.4v16.9h8.4v14.9c-4.5-4-10.4-6.4-16.9-6.4-14 0-25.3 11.3-25.3 25.3 0 7.5 3.3 14.2 8.4 18.8v14.9h84.3V117c5.3-4.7 8.5-11.5 8.5-18.9z"
    />
  </svg>
);

export default React.forwardRef(LI);
