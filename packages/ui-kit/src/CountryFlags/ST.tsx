import * as React from 'react';

const ST: React.ForwardRefRenderFunction<SVGSVGElement, React.SVGProps<SVGSVGElement>> = (
  props,
  ref,
) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 85.333 512 341.333"
    width="1.5em"
    height="1em"
    {...props}
    ref={ref}
  >
    <path fill="#FFDA44" d="M0 85.337h512v341.326H0z" />
    <g fill="#6DA544">
      <path d="M0 85.337h512v113.775H0zM0 312.888h512v113.775H0z" />
    </g>
    <path fill="#D80027" d="M256 256.006 0 426.668V85.331z" />
    <path d="m302.049 226.318 7.368 22.674h23.842l-19.288 14.016 7.366 22.674-19.288-14.015-19.287 14.015 7.366-22.674-19.288-14.016h23.842zM376.252 226.318l7.367 22.674h23.842l-19.288 14.016 7.367 22.674-19.288-14.015-19.288 14.015 7.367-22.674-19.288-14.016h23.842z" />
  </svg>
);

export default React.forwardRef(ST);