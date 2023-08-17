import * as React from 'react';

const TG: React.ForwardRefRenderFunction<SVGSVGElement, React.SVGProps<SVGSVGElement>> = (
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
    <g fill="#496E2D">
      <path d="M0 85.337h512V153.6H0zM0 358.4h512v68.263H0zM0 221.863h512v68.263H0z" />
    </g>
    <path fill="#D80027" d="M0 85.337h204.054v204.054H0z" />
    <path
      fill="#FFF"
      d="m102.026 133.938 13.26 40.812h42.916l-34.718 25.226 13.26 40.814-34.718-25.224-34.719 25.224 13.263-40.814-34.718-25.226h42.913z"
    />
  </svg>
);

export default React.forwardRef(TG);
