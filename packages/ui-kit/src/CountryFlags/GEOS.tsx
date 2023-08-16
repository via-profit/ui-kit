
import * as React from 'react';

const GEOS: React.ForwardRefRenderFunction<SVGSVGElement, React.SVGProps<SVGSVGElement>> = (
  props,
  ref,
) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 450 300" width="1.5em" height="1em" {...props} ref={ref}><path fill="#FFF" d="M0 0h450v300H0z"/><path fill="red" d="M0 100h450v200H0z"/><path fill="#FFDF00" d="M0 200h450v100H0z"/></svg>
);

export default React.forwardRef(GEOS);
    
