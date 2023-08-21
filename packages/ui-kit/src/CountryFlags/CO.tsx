
import * as React from 'react';

const CO: React.ForwardRefRenderFunction<SVGSVGElement, React.SVGProps<SVGSVGElement>> = (
  props,
  ref,
) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 513 342" width="1.5em" height="1em" {...props} ref={ref}><path fill="#FFDA44" d="M0 0h513v342H0z"/><path fill="#D80027" d="M0 256.5h513V342H0z"/><path fill="#0052B4" d="M0 171h513v85.5H0z"/></svg>
);

export default React.forwardRef(CO);
    
