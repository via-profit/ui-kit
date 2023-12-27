import React from 'react';

const PlusOutline: React.ForwardRefRenderFunction<SVGSVGElement, React.SVGProps<SVGSVGElement>> = (
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
      d="m256 48c-114.65 0-208 93.346-208 208s93.346 208 208 208 208-93.346 208-208-93.346-208-208-208zm0 32c97.346 0 176 78.654 176 176s-78.654 176-176 176-176-78.654-176-176 78.654-176 176-176zm0 80a16 16 0 0 0-16 16v64h-64a16 16 0 0 0-16 16 16 16 0 0 0 16 16h64v64a16 16 0 0 0 16 16 16 16 0 0 0 16-16v-64h64a16 16 0 0 0 16-16 16 16 0 0 0-16-16h-64v-64a16 16 0 0 0-16-16z"
      fill="currentColor"
    />
  </svg>
);

export default React.forwardRef(PlusOutline);
