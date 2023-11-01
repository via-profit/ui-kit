import React from 'react';

const ChevronRightOutline: React.ForwardRefRenderFunction<
  SVGSVGElement,
  React.SVGProps<SVGSVGElement>
> = (props, ref) => (
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
      d="m177.79 88.818a24 24 0 0 0-10.76 6.2109 24 24 0 0 0 0 33.941l127.03 127.03-127.03 127.03a24 24 0 0 0 0 33.941 24 24 0 0 0 33.941 0l144-144a24.002 24.002 0 0 0 0-33.941l-144-144a24 24 0 0 0-23.182-6.2109z"
      fill="currentColor"
    />
  </svg>
);

export default React.forwardRef(ChevronRightOutline);
