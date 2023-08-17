import * as React from 'react';

const GD: React.ForwardRefRenderFunction<SVGSVGElement, React.SVGProps<SVGSVGElement>> = (
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
    <path fill="#c60a0a" d="M0 0h513v342H0z" />
    <path fill="#3E8446" d="m256.5 170.7-212 126.1V44.5z" />
    <g fill="#FFDA44">
      <path d="m256.5 170.7 211 126.1h-423zM467.5 44.5l-211 126.2-212-126.2z" />
    </g>
    <path fill="#3E8446" d="M467.5 44.5v252.3l-211-126.1z" />
    <g fill="#FFDA44">
      <path d="m256.5 10.4 2.8 10.2H270l-8.6 6.3 3.3 10.2-8.2-6.3-9.2 6.3 3.3-10.2-8.6-6.3h10.7zM170.1 10.4l3.3 10.2h10.7l-8.6 6.3 3.3 10.2-8.7-6.3-8.7 6.3 3.3-10.2-8.6-6.3h10.7zM341.9 10.4l3.3 10.2H356l-8.7 6.3 3.3 10.2-8.7-6.3-8.7 6.3 3.3-10.2-8.6-6.3h10.7zM256.5 304.2l2.8 10.2H270l-8.6 6.3 3.3 10.2-8.2-6.3-9.2 6.3 3.3-10.2-8.6-6.3h10.7zM170.1 304.2l3.3 10.2h10.7l-8.6 6.3 3.3 10.2-8.7-6.3-8.7 6.3 3.3-10.2-8.6-6.3h10.7zM341.9 304.2l3.3 10.2H356l-8.7 6.3 3.3 10.2-8.7-6.3-8.7 6.3 3.3-10.2-8.6-6.3h10.7z" />
    </g>
    <circle fill="#c60a0a" cx="244.5" cy="170.7" r="76.2" />
    <path
      fill="#FFDA44"
      d="m244.5 110.1 13.6 41.8h44l-35.6 25.8 13.6 41.8-35.6-25.8-35.5 25.8 13.6-41.8-35.6-25.8h44zM107.7 167.8c4.4 6.9 2.3 16.1-4.6 20.5s-16.1 2.3-20.5-4.6c-7.9-12.5-3.3-33-3.3-33s20.4 4.6 28.4 17.1z"
    />
    <circle fill="#A2001D" cx="99.1" cy="182.1" r="7.4" />
  </svg>
);

export default React.forwardRef(GD);
