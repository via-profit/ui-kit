
import * as React from 'react';

const KH: React.ForwardRefRenderFunction<SVGSVGElement, React.SVGProps<SVGSVGElement>> = (
  props,
  ref,
) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 513 342" width="1.5em" height="1em" {...props} ref={ref}><path fill="#D80027" d="M0 0h513v342H0z"/><g fill="#0052B4"><path d="M0 0h513v114H0zM0 228h513v114H0z"/></g><path fill="#FFF" d="M303.5 196.6v-17.8h-11.9v-23.7l-11.9-11.9-11.8 11.9v-23.8L256 119.5l-11.9 11.8v23.8l-11.8-11.9-11.9 11.9v23.7h-11.9v17.8h-11.9v17.8h118.8v-17.8z"/></svg>
);

export default React.forwardRef(KH);
    
