import * as React from 'react';

const PA: React.ForwardRefRenderFunction<SVGSVGElement, React.SVGProps<SVGSVGElement>> = (
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
    <path fill="#0052B4" d="M256 256v170.663H0V256h256z" />
    <path fill="#D80027" d="M512 85.337V256H256V85.337h256z" />
    <path
      fill="#0052B4"
      d="m128 123.034 11.824 36.389h38.263l-30.955 22.491 11.823 36.389L128 195.813l-30.955 22.49 11.823-36.389-30.955-22.491h38.263z"
    />
    <path
      fill="#D80027"
      d="m384 293.697 11.824 36.389h38.263l-30.955 22.491 11.823 36.389L384 366.476l-30.955 22.49 11.823-36.389-30.955-22.491h38.263z"
    />
  </svg>
);

export default React.forwardRef(PA);
