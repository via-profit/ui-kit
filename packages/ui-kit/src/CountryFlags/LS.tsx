import * as React from 'react';

const LS: React.ForwardRefRenderFunction<SVGSVGElement, React.SVGProps<SVGSVGElement>> = (
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
    <path fill="#0052B4" d="M0 0h513v114H0z" />
    <path fill="#6DA544" d="M0 227.6h513v114H0z" />
    <path d="m245.2 171 7.7-23.1c2-5.9 5.1-6 7.1 0l7.7 23.1 19.4 29.1c1.7 2.6 1.3 6.3-1.2 8 0 0-6.9 8-29.5 8s-29.5-8-29.5-8c-2.4-2-2.9-5.4-1.2-8l19.5-29.1z" />
    <path d="M256.5 171c-12.5 0-22.6-10.1-22.6-22.6 0-12.5 10.1-22.6 22.6-22.6s22.6 10.1 22.6 22.6c0 12.5-10.2 22.6-22.6 22.6zm0 0c6.2 0 11.3-16.3 11.3-22.6 0-6.2-5.1-11.3-11.3-11.3-6.2 0-11.3 5.1-11.3 11.3 0 6.3 5 22.6 11.3 22.6z" />
  </svg>
);

export default React.forwardRef(LS);
