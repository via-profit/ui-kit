import * as React from 'react';

const KM: React.ForwardRefRenderFunction<SVGSVGElement, React.SVGProps<SVGSVGElement>> = (
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
    <path fill="#0052B4" d="M0 0h513v342H0z" />
    <path fill="#FFDA44" d="M0 0h513v85.5H0z" />
    <path fill="#FFF" d="M0 85.5h513V171H0z" />
    <path fill="#D80027" d="M0 171h513v85.5H0z" />
    <path fill="#6DA544" d="M256.5 171 0 342V0z" />
    <g fill="#FFF">
      <path d="M68.6 170.7c0-24.9 17.5-45.6 40.8-50.7-3.6-.8-7.3-1.2-11.1-1.2-28.7 0-51.9 23.3-51.9 51.9s23.3 51.9 51.9 51.9c3.8 0 7.5-.4 11.1-1.2-23.3-5.1-40.8-25.9-40.8-50.7z" />
      <path d="m108.9 126.1 2.7 8.5h9l-7.3 5.3 2.8 8.5-7.2-5.2-7.3 5.2 2.8-8.5-7.2-5.3h8.9zM108.9 148.4l2.7 8.5h9l-7.3 5.3 2.8 8.5-7.2-5.3-7.3 5.3 2.8-8.5-7.2-5.3h8.9z" />
      <path d="m108.9 170.7 2.7 8.5h9l-7.3 5.2 2.8 8.5-7.2-5.2-7.3 5.2 2.8-8.5-7.2-5.2h8.9zM108.9 192.9l2.7 8.5h9l-7.3 5.3 2.8 8.5-7.2-5.3-7.3 5.3 2.8-8.5-7.2-5.3h8.9z" />
    </g>
  </svg>
);

export default React.forwardRef(KM);
