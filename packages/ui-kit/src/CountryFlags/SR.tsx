
import * as React from 'react';

const SR: React.ForwardRefRenderFunction<SVGSVGElement, React.SVGProps<SVGSVGElement>> = (
  props,
  ref,
) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 85.333 512 341.333" width="1.5em" height="1em" {...props} ref={ref}><path fill="#FFF" d="M0 85.331h512v341.337H0z"/><path fill="#A2001D" d="M0 196.636h512v118.728H0z"/><g fill="#6DA544"><path d="M0 352.462h512v74.207H0zM0 85.331h512v74.207H0z"/></g><path fill="#FFDA44" d="m256.742 218.003 9.43 29.021h30.518L272 264.963l9.431 29.023-24.689-17.937-24.689 17.937 9.431-29.023-24.69-17.939h30.518z"/></svg>
);

export default React.forwardRef(SR);
    
