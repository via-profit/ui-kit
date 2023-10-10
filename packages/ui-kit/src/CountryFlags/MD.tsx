import * as React from 'react';

const MD: React.ForwardRefRenderFunction<SVGSVGElement, React.SVGProps<SVGSVGElement>> = (
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
    <path fill="#FFDA44" d="M0 0h513v342H0z" />
    <path fill="#D80027" d="M342 0h171v342H342z" />
    <path fill="#0052B4" d="M0 0h171v342H0z" />
    <path
      fill="#AF7F59"
      d="M206.2 129.1h33.2L256 79.3l16.6 49.8h33.2v99.6L256 262l-49.8-33.2v-99.7zm33.2 33.3v49.8h33.2v-49.8h-33.2z"
    />
  </svg>
);

export default React.forwardRef(MD);
