import * as React from 'react';

const NA: React.ForwardRefRenderFunction<SVGSVGElement, React.SVGProps<SVGSVGElement>> = (
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
    <path fill="#496E2D" d="M0 85.337h512v341.326H0z" />
    <path fill="#0052B4" d="M0 426.663V85.337h512" />
    <path fill="#FFF" d="M512 152.222V85.337H411.67L0 359.778v66.885h100.33z" />
    <path fill="#A2001D" d="M512 85.337v40.125L60.193 426.663H0v-40.125L451.807 85.337z" />
    <path
      fill="#FFDA44"
      d="m187.737 189.212-22.741 10.696 12.11 22.024-24.693-4.724-3.129 24.945-17.199-18.347-17.2 18.347-3.129-24.945-24.693 4.723 12.109-22.023-22.739-10.696 22.74-10.697-12.11-22.022 24.693 4.722 3.13-24.944 17.199 18.347 17.2-18.347 3.128 24.944 24.693-4.722-12.108 22.024z"
    />
  </svg>
);

export default React.forwardRef(NA);