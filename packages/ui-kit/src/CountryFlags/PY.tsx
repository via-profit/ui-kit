import * as React from 'react';

const PY: React.ForwardRefRenderFunction<SVGSVGElement, React.SVGProps<SVGSVGElement>> = (
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
    <path fill="#D80027" d="M0 85.337h512v113.775H0z" />
    <path fill="#0052B4" d="M0 312.888h512v113.775H0z" />
    <path
      fill="#6DA544"
      d="m289.579 216.738-12.592 12.592c5.37 5.372 8.693 12.792 8.693 20.988 0 16.392-13.289 29.68-29.68 29.68-16.392 0-29.68-13.289-29.68-29.68 0-8.195 3.322-15.616 8.693-20.988l-12.592-12.592c-8.594 8.594-13.91 20.466-13.91 33.579 0 26.228 21.261 47.489 47.489 47.489s47.489-21.261 47.489-47.489c0-13.112-5.316-24.985-13.91-33.579z"
    />
    <path
      fill="#FFDA44"
      d="m256 232.51 4.421 13.605h14.304l-11.573 8.408 4.421 13.604L256 259.719l-11.573 8.408 4.421-13.604-11.573-8.408h14.304z"
    />
  </svg>
);

export default React.forwardRef(PY);
