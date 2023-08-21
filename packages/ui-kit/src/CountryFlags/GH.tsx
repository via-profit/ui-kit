
import * as React from 'react';

const GH: React.ForwardRefRenderFunction<SVGSVGElement, React.SVGProps<SVGSVGElement>> = (
  props,
  ref,
) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 513 342" width="1.5em" height="1em" {...props} ref={ref}><path fill="#FFDA44" d="M0 0h513v342H0z"/><path fill="#D80027" d="M0 0h513v114H0z"/><path fill="#496E2D" d="M0 228h513v114H0z"/><path d="m255.9 113.8 14.1 43.4 40.4 3.2-37 26.9 19.5 40.3-37-26.9-37 26.9 14.1-43.5-36.9-26.9h45.7z"/></svg>
);

export default React.forwardRef(GH);
    
