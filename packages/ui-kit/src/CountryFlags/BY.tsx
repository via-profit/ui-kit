import * as React from 'react';

const BY: React.ForwardRefRenderFunction<SVGSVGElement, React.SVGProps<SVGSVGElement>> = (
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
    <path fill="#007C30" d="M0 0h513v342H0z" />
    <path fill="#CE1720" d="M0 230h513V0H0" />
    <path fill="#FFF" d="M100 230V0H0v342h513-413z" />
    <g fill="#CE1720">
      <path d="M28 159.6 8.6 128.2 28 97.4l19.3 30.8zM72.6 159.6l-19.3-31.4 19.3-30.8L92 128.2zM28 241.2 8.6 209.8 28 179l19.3 30.8zM72.6 241.2l-19.3-31.4L72.6 179 92 209.8z" />
    </g>
    <g fill="none" stroke="#CE1720" strokeWidth="7">
      <path d="m28 73.8-16.1-26L28 22.2l16 25.6zM72.6 73.8l-16-26 16-25.6 16.1 25.6zM28 318l-16.1-26.1L28 266.3l16 25.6zM72.6 318l-16-26.1 16-25.6 16.1 25.6z" />
    </g>
  </svg>
);

export default React.forwardRef(BY);
