import * as React from 'react';

const MG: React.ForwardRefRenderFunction<SVGSVGElement, React.SVGProps<SVGSVGElement>> = (
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
    <path fill="#6DA544" d="M512 426.666V85.329H0v341.337h512z" />
    <path fill="#D80027" d="M512 85.331H0v170.666h512V85.331z" />
    <path fill="#FFF" d="M0 85.334h181.793v341.337H0z" />
  </svg>
);

export default React.forwardRef(MG);
