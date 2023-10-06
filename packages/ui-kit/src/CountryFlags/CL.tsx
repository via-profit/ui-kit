
import * as React from 'react';

const CL: React.ForwardRefRenderFunction<SVGSVGElement, React.SVGProps<SVGSVGElement>> = (
  props,
  ref,
) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 513 342" width="1.5em" height="1em" {...props} ref={ref}><path fill="#D80027" d="M0 0h513v342H0z"/><path fill="#FFF" d="M196 0h317v171H196z"/><path fill="#0037A1" d="M0 0h196v171H0z"/><path fill="#FFF" d="M98 24.5 113.1 71H162l-39.6 28.7 15.2 46.5L98 117.5l-39.6 28.7 15.2-46.5L34 71h48.9z"/></svg>
);

export default React.forwardRef(CL);
    
