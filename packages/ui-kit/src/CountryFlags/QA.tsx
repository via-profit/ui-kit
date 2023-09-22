import * as React from 'react';

const QA: React.ForwardRefRenderFunction<SVGSVGElement, React.SVGProps<SVGSVGElement>> = (
  props,
  ref,
) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 513 342"
    width="1.5em"
    height="1em"
    {...props}
    ref={ref}
  >
    <path fill="#751A46" d="M0 0h512v342H0z" />
    <path
      fill="#FFF"
      d="M0 0v342h150.3l37.7-19.6-37.7-18.9 37.7-19-37.7-18.9 37.7-19-37.7-19 37.7-18.9-37.7-19 37.7-19-37.7-18.9 37.7-19-37.7-18.9 37.7-19-37.7-19L188 57l-37.7-19L188 19.1 150.3 0z"
    />
  </svg>
);

export default React.forwardRef(QA);
