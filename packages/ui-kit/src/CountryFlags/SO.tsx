
import * as React from 'react';

const SO: React.ForwardRefRenderFunction<SVGSVGElement, React.SVGProps<SVGSVGElement>> = (
  props,
  ref,
) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 85.333 512 341.333" width="1.5em" height="1em" {...props} ref={ref}><path fill="#338AF3" d="M0 85.331h512v341.337H0z"/><path fill="#FFF" d="m256 157.273 22.663 69.748H352l-59.332 43.106 22.664 69.749L256 296.769l-59.332 43.107 22.664-69.749L160 227.021h73.337z"/></svg>
);

export default React.forwardRef(SO);
    
