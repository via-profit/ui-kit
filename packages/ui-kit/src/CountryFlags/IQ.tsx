
import * as React from 'react';

const IQ: React.ForwardRefRenderFunction<SVGSVGElement, React.SVGProps<SVGSVGElement>> = (
  props,
  ref,
) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 513 342" width="1.5em" height="1em" {...props} ref={ref}><path fill="#FFF" d="M0 0h513v342H0z"/><path fill="#CE1126" d="M0 0h513v114H0z"/><path d="M0 228h513v114H0z"/><g fill="#547C31"><path d="M219.2 160.7h-29.3c1.5-5.7 6.6-9.9 12.8-9.9v-19.9c-18.3 0-33.1 14.9-33.1 33.1v16.5h49.6c1.8 0 3.3 1.5 3.3 3.3v6.6h-66.2v19.9h86.1v-26.5c0-12.7-10.4-23.1-23.2-23.1zM268.8 190.5v-59.6H249v79.5h33.1v-19.9zM335 190.5v-59.6h-19.8v59.6h-6.6v-19.8h-19.9v39.7h59.6v-19.9z"/></g></svg>
);

export default React.forwardRef(IQ);
    
