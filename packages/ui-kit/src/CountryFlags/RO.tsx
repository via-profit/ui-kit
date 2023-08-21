
import * as React from 'react';

const RO: React.ForwardRefRenderFunction<SVGSVGElement, React.SVGProps<SVGSVGElement>> = (
  props,
  ref,
) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 85.333 512 341.333" width="1.5em" height="1em" {...props} ref={ref}><path fill="#FFDA44" d="M0 85.331h512v341.326H0z"/><path fill="#0052B4" d="M0 85.331h170.663v341.337H0z"/><path fill="#D80027" d="M341.337 85.331H512v341.337H341.337z"/></svg>
);

export default React.forwardRef(RO);
    
