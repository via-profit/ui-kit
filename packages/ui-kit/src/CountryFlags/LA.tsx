
import * as React from 'react';

const LA: React.ForwardRefRenderFunction<SVGSVGElement, React.SVGProps<SVGSVGElement>> = (
  props,
  ref,
) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 513 342" width="1.5em" height="1em" {...props} ref={ref}><path fill="#0052B4" d="M0 0h513v342H0z"/><g fill="#D80027"><path d="M0 .1h513v90.7H0zM0 251.3h513V342H0z"/></g><circle fill="#FFF" cx="256.5" cy="171" r="65.9"/></svg>
);

export default React.forwardRef(LA);
    
