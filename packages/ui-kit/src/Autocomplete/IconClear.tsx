import React from 'react';

const IconClear: React.ForwardRefRenderFunction<SVGSVGElement, React.SVGProps<SVGSVGElement>> = (
  props,
  ref,
) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    version="1.1"
    width="1em"
    height="1em"
    viewBox="0 0 512 512"
    {...props}
    ref={ref}
  >
    <path
      d="m139.86 128.54a16 16 0 0 0-7.1738 4.1406 16 16 0 0 0 0 22.629l100.69 100.69-100.69 100.69a16 16 0 0 0 0 22.629 16 16 0 0 0 22.629 0l100.69-100.69 100.69 100.69a16 16 0 0 0 22.629 0 16 16 0 0 0 0-22.629l-100.69-100.69 100.69-100.69a16 16 0 0 0 0-22.629 16 16 0 0 0-22.629 0l-100.69 100.69-100.69-100.69a16 16 0 0 0-15.455-4.1406z"
      fill="currentColor"
    />
  </svg>
);

export default React.forwardRef(IconClear);
