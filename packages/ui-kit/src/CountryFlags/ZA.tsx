import * as React from 'react';

const ZA: React.ForwardRefRenderFunction<SVGSVGElement, React.SVGProps<SVGSVGElement>> = (
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
    <path d="M114.024 256.001 0 141.926v228.17z" />
    <path fill="#ffb915" d="M161.192 256 0 94.7v47.226l114.024 114.075L0 370.096v47.138z" />
    <path
      fill="#007847"
      d="M509.833 289.391c.058-.44.804-.878 2.167-1.318v-65.464H222.602L85.33 85.337H0V94.7L161.192 256 0 417.234v9.429h85.33l137.272-137.272h287.231z"
    />
    <path fill="#000c8a" d="M503.181 322.783H236.433l-103.881 103.88H512v-103.88z" />
    <path fill="#e1392d" d="M503.181 189.217H512V85.337H132.552l103.881 103.88z" />
  </svg>
);

export default React.forwardRef(ZA);
