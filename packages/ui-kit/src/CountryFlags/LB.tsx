import * as React from 'react';

const LB: React.ForwardRefRenderFunction<SVGSVGElement, React.SVGProps<SVGSVGElement>> = (
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
    <path fill="#FFF" d="M0 0h513v342H0z" />
    <g fill="#D80027">
      <path d="M0 .2h513v90.7H0zM.5 251.3H513V342H.5z" />
    </g>
    <path fill="#6DA544" d="M290.3 193.5 256 130.7l-34.3 62.8h25.7v17.2h17.2v-17.2z" />
    <path
      fill="#14AF5A"
      d="M241.3 213.1c4.4-4.4 4.4-11.6-.1-16l4.7 4.7c-5.2-4.7-12.2-6.6-19.1-5.3l-23.5 5.9c-6.1 1.5-6.8-.4-1.8-4.2l27.1-20.3c5.1-3.8 4.2-6.9-2.3-6.9h-11c-6.4 0-7-2.3-1.5-5.1l25.3-12.7c5.6-2.8 5.1-5.1-1.5-5.1h-11c-6.4 0-7.4-3.1-2.3-6.9l27.1-20.3c5.6-3.8 12.9-3.8 18.5 0l27.1 20.3c5.1 3.8 4.2 6.9-2.3 6.9h-11c-6.4 0-7 2.3-1.5 5.1l25.3 12.7c5.6 2.8 5.1 5.1-1.5 5.1h-11c-6.4 0-7.4 3.1-2.3 6.9l27.1 20.3c5.1 3.8 4.4 5.7-1.8 4.2l-23.5-5.9c-6.8-1.3-13.9.6-19.1 5.3l4.7-4.7c-4.4 4.4-4.5 11.5-.1 16l6.8 6.8c4.4 4.4 3.1 8-3.3 8h-45.8c-6.2 0-7.7-3.6-3.3-8 .1.1 6.9-6.8 6.9-6.8z"
    />
  </svg>
);

export default React.forwardRef(LB);
