import React from 'react';

const DizzyFace: React.ForwardRefRenderFunction<SVGSVGElement, React.SVGProps<SVGSVGElement>> = (
  props,
  ref,
) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    version="1.1"
    width="1em"
    height="1em"
    viewBox="0 0 60 60"
    {...props}
    ref={ref}
  >
    <path
      d="m62 32a30 30 0 0 1-30 30 30 30 0 0 1-30-30 30 30 0 0 1 30-30 30 30 0 0 1 30 30z"
      fill="#ffdd67"
    />
    <path
      d="m16.117 16.858c-1.0609 0.010937-3.1172 2.2422-2.4172 2.9422l4.6806 4.7194-4.6806 4.6806c-0.8 0.8 2 3.6 2.8 2.8l4.65-4.6884 4.65 4.6884c0.8 0.8 3.6-2 2.9-2.8l-4.7309-4.7309 4.6309-4.6691c0.8-0.7-2-3.5-2.7-2.8l-4.7 4.7-4.7-4.7c-0.1-0.1-0.23125-0.14375-0.38281-0.14219zm21.7 0c-1.0609 0.010937-3.1172 2.2422-2.4172 2.9422l4.6806 4.7194-4.6806 4.6806c-0.8 0.8 2 3.6 2.8 2.8l4.65-4.6884 4.65 4.6884c0.8 0.8 3.6-2 2.9-2.8l-4.7309-4.7309 4.6309-4.6691c0.8-0.7-2-3.5-2.7-2.8l-4.7 4.7-4.7-4.7c-0.1-0.1-0.23125-0.14375-0.38281-0.14219zm-5.8172 21.142a9 9 0 0 0-9 9 9 9 0 0 0 9 9 9 9 0 0 0 9-9 9 9 0 0 0-9-9z"
      fill="#664e27"
    />
    <path d="M26 44c1.2-2.4 3.4-4 6-4s4.8 1.6 6 4H26" fill="currentColor" />
  </svg>
);

export default React.forwardRef(DizzyFace);
