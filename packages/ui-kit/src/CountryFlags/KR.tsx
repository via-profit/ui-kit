import * as React from 'react';

const KR: React.ForwardRefRenderFunction<SVGSVGElement, React.SVGProps<SVGSVGElement>> = (
  props,
  ref,
) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 900 600"
    width="1.5em"
    height="1em"
    {...props}
    ref={ref}
  >
    <path fill="#FFF" d="M0 0h900v600H0z" />
    <g transform="rotate(-56.31)">
      <g stroke="#000" strokeWidth="25">
        <path d="M-75 228.3H75m-150 37.5H75m-150 37.5H75M-75 778.3H75m-150 37.5H75m-150 37.5H75" />
      </g>
      <path stroke="#FFF" strokeWidth="12.5" d="M0 753.3v125" />
      <circle fill="#ca163a" cy="540.8" r="150" />
      <path
        fill="#0e4896"
        d="M0 390.8c-41.4 0-75 33.6-75 75s33.6 75 75 75 75 33.6 75 75-33.6 75-75 75c-82.8 0-150-67.2-150-150s67.2-150 150-150z"
      />
    </g>
    <g stroke="#000" strokeWidth="25">
      <path d="m231.56 535.73-83.205-124.808M262.76 514.928l-83.205-124.807m114.407 104.006-83.205-124.808M689.187 230.644l-83.205-124.807M720.39 209.843 637.184 85.036m114.407 104.006L668.386 64.234" />
    </g>
    <path
      stroke="#FFF"
      strokeWidth="12.5"
      d="m205.6 462.897 31.202-20.8m389.981-259.989 36.444-24.296m31.202-20.801 31.202-20.801"
    />
  </svg>
);

export default React.forwardRef(KR);
