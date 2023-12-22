import React from 'react';

export type CalendarIconPrevProps = React.SVGProps<SVGSVGElement>;

const CalendarIconPrev: React.ForwardRefRenderFunction<SVGSVGElement, CalendarIconPrevProps> = (
  props,
  ref,
) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 512 512"
    width="1em"
    height="1em"
    ref={ref}
    {...props}
  >
    <path
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={48}
      d="M328 112 184 256l144 144"
    />
  </svg>
);

export default React.forwardRef(CalendarIconPrev);
