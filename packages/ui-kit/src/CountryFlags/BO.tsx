
import * as React from 'react';

const BO: React.ForwardRefRenderFunction<SVGSVGElement, React.SVGProps<SVGSVGElement>> = (
  props,
  ref,
) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 513 342" width="1.5em" height="1em" {...props} ref={ref}><path fill="#d52b1e" d="M0 0h513v114H0z"/><path fill="#f9e300" d="M0 114h513v114H0z"/><path fill="#007934" d="M0 228h513v114H0z"/></svg>
);

export default React.forwardRef(BO);
    
