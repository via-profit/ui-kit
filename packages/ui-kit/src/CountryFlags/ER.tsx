
import * as React from 'react';

const ER: React.ForwardRefRenderFunction<SVGSVGElement, React.SVGProps<SVGSVGElement>> = (
  props,
  ref,
) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 513 342" width="1.5em" height="1em" {...props} ref={ref}><path fill="#338AF3" d="M0 0h513v342H0z"/><path fill="#56AF35" d="M0 0h513v171H0z"/><path fill="#D80027" d="m0 342 513-171L0 0v342z"/><g fill="#ffc945"><path d="M134.7 231.5c33.6 0 60.8-27.2 60.8-60.8s-27.2-60.8-60.8-60.8-60.8 27.2-60.8 60.8 27.2 60.8 60.8 60.8zm0 24.3c-47 0-85.2-38.1-85.2-85.2s38.1-85.2 85.2-85.2 85.2 38.1 85.2 85.2-38.2 85.2-85.2 85.2z"/><circle cx="119.5" cy="148.3" r="17.5"/><circle cx="148.9" cy="158.5" r="17.5"/><circle cx="134.7" cy="135.2" r="17.5"/><circle cx="119.5" cy="172.7" r="17.5"/><circle cx="149.9" cy="182.8" r="17.5"/><circle cx="122.5" cy="198" r="17.5"/><circle cx="145.9" cy="205.2" r="17.5"/></g></svg>
);

export default React.forwardRef(ER);
    
