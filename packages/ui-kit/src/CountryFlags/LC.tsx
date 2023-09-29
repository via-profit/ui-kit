import * as React from 'react';

const LC: React.ForwardRefRenderFunction<SVGSVGElement, React.SVGProps<SVGSVGElement>> = (
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
    <path fill="#55B2FF" d="M0 0h513v342H0z" />
    <path fill="#F3F3F3" d="M148.5 298.1h216l-108-254.2z" />
    <path fill="#333" d="m186 272.7 70.5-160.3L327 272.7z" />
    <path fill="#FFDA44" d="M148.5 298.1h216l-108-101.7z" />
  </svg>
);

export default React.forwardRef(LC);