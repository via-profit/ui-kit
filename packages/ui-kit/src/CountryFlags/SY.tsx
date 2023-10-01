import * as React from 'react';

const SY: React.ForwardRefRenderFunction<SVGSVGElement, React.SVGProps<SVGSVGElement>> = (
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
    <path fill="#FFF" d="M0 85.331h512v341.337H0z" />
    <path fill="#D80027" d="M0 85.331h512v113.775H0z" />
    <path d="M0 312.882h512v113.775H0z" />
    <g fill="#6DA544">
      <path d="m187.31 215.184 9.208 28.341h29.802l-24.11 17.518 9.209 28.342-24.109-17.516-24.11 17.516 9.209-28.342-24.109-17.518h29.801zM324.69 215.184l9.209 28.341H363.7l-24.109 17.518 9.209 28.342-24.11-17.516-24.109 17.516 9.209-28.342-24.11-17.518h29.802z" />
    </g>
  </svg>
);

export default React.forwardRef(SY);
