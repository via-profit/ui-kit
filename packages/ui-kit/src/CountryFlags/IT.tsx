import * as React from 'react';

const IT: React.ForwardRefRenderFunction<SVGSVGElement, React.SVGProps<SVGSVGElement>> = (
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
    <path fill="#FFF" d="M342 0H0v341.3h512V0z" />
    <path fill="#6DA544" d="M0 0h171v342H0z" />
    <path fill="#D80027" d="M342 0h171v342H342z" />
  </svg>
);

export default React.forwardRef(IT);
