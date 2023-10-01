
import * as React from 'react';

const MM: React.ForwardRefRenderFunction<SVGSVGElement, React.SVGProps<SVGSVGElement>> = (
  props,
  ref,
) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 85.333 512 341.333" width="1.5em" height="1em" {...props} ref={ref}><path fill="#6DA544" d="M0 85.337h512v341.326H0z"/><path fill="#FFDA44" d="M0 85.337h512v113.775H0z"/><path fill="#D80027" d="M0 312.888h512v113.775H0z"/><path fill="#FFF" d="M384 227.261h-97.783L256 134.265l-30.217 92.997H128l79.108 57.475-30.217 92.998L256 320.925l79.108 56.81-30.217-92.998L384 227.261z"/></svg>
);

export default React.forwardRef(MM);
    
