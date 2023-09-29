import * as React from 'react';

const JM: React.ForwardRefRenderFunction<SVGSVGElement, React.SVGProps<SVGSVGElement>> = (
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
    <path fill="#6DA544" d="M0 0h513v342H0z" />
    <path d="M215.9 171 0 314.6V26.8zM513 26.8v287.8L296.1 171z" />
    <path
      fill="#0052B4"
      d="M513 26.8 296.1 171 513 314.6V342h-41.1L256 197.4 40.1 342H0v-27.4L215.9 171 0 26.8V0h40.1L256 143.9 471.9 0H513z"
    />
    <path
      fill="#FFDA44"
      d="M513 26.8 296.1 171 513 314.6V342h-41.1L256 197.4 40.1 342H0v-27.4L215.9 171 0 26.8V0h40.1L256 143.9 471.9 0H513z"
    />
  </svg>
);

export default React.forwardRef(JM);