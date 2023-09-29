import * as React from 'react';

const BI: React.ForwardRefRenderFunction<SVGSVGElement, React.SVGProps<SVGSVGElement>> = (
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
    <g fill="#47a644">
      <path d="M215.9 170.7 0 314.6V26.8zM513 26.8v287.8L297.1 170.7z" />
    </g>
    <path
      fill="#0052B4"
      d="M513 26.8 296.1 170.7 513 314.6V342h-41.1L256 197.4 40.1 342H0v-27.4l215.9-143.9L0 26.8V0h40.1L256 143.9 471.9 0H513z"
    />
    <path
      fill="#FFF"
      d="M513 26.8 297.1 170.7 513 314.6V342h-40L256 197.4 39 342H0v-27.4l215.9-143.9L0 26.8V0h40.1L256 143.9 471.9 0H513z"
    />
    <circle fill="#FFF" cx="251.6" cy="170.7" r="100.2" />
    <g fill="#D80027" stroke="#47a644" strokeWidth="3">
      <path d="m251.4 103.6 7.4 12.9h14.8l-7.4 12.8 7.4 12.8h-14.8l-7.4 12.9-7.4-12.9h-14.8l7.4-12.8-7.4-12.8H244zM290.2 170.3l7.4 12.9h14.8L305 196l7.4 12.8h-14.8l-7.4 12.9-7.4-12.9h-14.9l7.4-12.8-7.4-12.8h14.9zM213 170.3l7.4 12.9h14.9l-7.4 12.8 7.4 12.8h-14.9l-7.4 12.9-7.4-12.9h-14.8l7.4-12.8-7.4-12.8h14.8z" />
    </g>
  </svg>
);

export default React.forwardRef(BI);