import * as React from 'react';

const AL: React.ForwardRefRenderFunction<SVGSVGElement, React.SVGProps<SVGSVGElement>> = (
  props,
  ref,
) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 90 60"
    width="1.5em"
    height="1em"
    {...props}
    ref={ref}
  >
    <path fill="#ED2024" d="M0 0h90v60H0z" />
    <path
      fill="#212121"
      d="M32.5 12.2v16l7.1 2.5-5 4.9 2.4 3 5.3-5.5 1.2 2.3-3 4.9 3.6 5.6-1.8 2.6 2.8 3.6 2.7-3.7-1.5-2.6 3-5.8-2.7-4.6 1.2-2.3 5.2 5.5 2.5-2.9-5.2-5.1 7.2-2.6V12.2l-5.2 1.9-.1 3.8-3.3.3v-2.6l1.7-2.3 5.6-2.2-2.3-.4 1.4-1.2.9.4-.8-1.4L54 9l-1-1.1L47.5 9l1.4 1.1-3.8 4.9-3.8-4.8 1.3-1.1-5-1.2L36.2 9l-1.5-.4-.8 1.4.9-.6 1.6 1.1-2.3.5 5.5 2 1.6 2.3v2.9l-3.3-.3v-3.6z"
    />
    <g fill="#212121">
      <path d="M26.2 25h6.4v2.5h-6.4zM26.2 20.9h6.4v2.7h-6.4zM26.2 16.7h6.4v2.6h-6.4zM26.2 12.7h6.4v2.5h-6.4z" />
    </g>
    <g fill="#212121">
      <path d="M57.4 25h6.4v2.5h-6.4zM57.4 20.9h6.4v2.7h-6.4zM57.4 16.7h6.4v2.6h-6.4zM57.4 12.7h6.4v2.5h-6.4z" />
    </g>
    <path fill="#212121" d="M53.4 36.1h6.4V38h-6.4zM30.2 36.1h6.4V38h-6.4z" />
  </svg>
);

export default React.forwardRef(AL);
