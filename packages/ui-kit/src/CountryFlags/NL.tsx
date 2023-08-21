
import * as React from 'react';

const NL: React.ForwardRefRenderFunction<SVGSVGElement, React.SVGProps<SVGSVGElement>> = (
  props,
  ref,
) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 85.5 513 342" width="1.5em" height="1em" {...props} ref={ref}><path fill="#FFF" d="M0 85.5h513v342H0z"/><path fill="#cd1f2a" d="M0 85.5h513v114H0z"/><path fill="#1d4185" d="M0 312h513v114H0z"/></svg>
);

export default React.forwardRef(NL);
    
