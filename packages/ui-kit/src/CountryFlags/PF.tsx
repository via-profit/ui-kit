
import * as React from 'react';

const PF: React.ForwardRefRenderFunction<SVGSVGElement, React.SVGProps<SVGSVGElement>> = (
  props,
  ref,
) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 85.333 512 341.333" width="1.5em" height="1em" {...props} ref={ref}><path fill="#FFF" d="M0 85.337h512v341.326H0z"/><g fill="#D80027"><path d="M0 85.337h512v113.775H0zM0 312.888h512v113.775H0z"/></g><path fill="#FFDA44" d="M293.991 256c0 20.982-17.01 33.243-37.992 33.243S218.008 276.982 218.008 256s17.01-37.992 37.992-37.992 37.991 17.01 37.991 37.992z"/><path fill="#0052B4" d="M293.991 256c0 20.982-17.01 37.992-37.992 37.992s-37.992-17.01-37.992-37.992"/><g fill="#D80027"><path d="M232.259 246.506h9.498v19h-9.498zM270.247 246.506h9.498v19h-9.498zM251.247 232.259h9.498v33.243h-9.498z"/></g></svg>
);

export default React.forwardRef(PF);
    
