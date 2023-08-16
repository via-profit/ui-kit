
import * as React from 'react';

const VN: React.ForwardRefRenderFunction<SVGSVGElement, React.SVGProps<SVGSVGElement>> = (
  props,
  ref,
) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 85.333 512 341.333" width="1.5em" height="1em" {...props} ref={ref}><path fill="#D80027" d="M196.641 85.337H0v341.326h512V85.337z"/><path fill="#FFDA44" d="m256 157.279 22.663 69.747H352l-59.332 43.106 22.664 69.749L256 296.774l-59.332 43.107 22.664-69.749L160 227.026h73.337z"/></svg>
);

export default React.forwardRef(VN);
    
