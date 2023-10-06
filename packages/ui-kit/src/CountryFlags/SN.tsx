
import * as React from 'react';

const SN: React.ForwardRefRenderFunction<SVGSVGElement, React.SVGProps<SVGSVGElement>> = (
  props,
  ref,
) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 85.333 512 341.333" width="1.5em" height="1em" {...props} ref={ref}><path fill="#FFDA44" d="M0 85.331h512v341.326H0z"/><path fill="#D80027" d="M330.207 85.331H512v341.337H330.207z"/><g fill="#496E2D"><path d="M0 85.331h181.793v341.337H0zM255.999 196.632l14.733 45.347h47.685l-38.576 28.029 14.734 45.348-38.576-28.026-38.577 28.026 14.737-45.348-38.576-28.029h47.681z"/></g></svg>
);

export default React.forwardRef(SN);
    
