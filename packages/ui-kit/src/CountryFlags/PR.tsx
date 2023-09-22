import * as React from 'react';

const PR: React.ForwardRefRenderFunction<SVGSVGElement, React.SVGProps<SVGSVGElement>> = (
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
    <path fill="#FFF" d="M0 85.337h512v341.326H0z" />
    <g fill="#D80027">
      <path d="M0 85.337h512V153.6H0zM0 221.863h512v68.263H0zM0 358.4h512v68.263H0z" />
    </g>
    <path fill="#0052B4" d="M256 256.006 0 426.668V85.331z" />
    <path
      fill="#FFF"
      d="m83.477 195.132 15.107 46.498h48.894l-39.554 28.739 15.107 46.499-39.554-28.738-39.555 28.738 15.11-46.499-39.554-28.739H68.37z"
    />
  </svg>
);

export default React.forwardRef(PR);
