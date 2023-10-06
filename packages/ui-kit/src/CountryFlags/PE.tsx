
import * as React from 'react';

const PE: React.ForwardRefRenderFunction<SVGSVGElement, React.SVGProps<SVGSVGElement>> = (
  props,
  ref,
) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 85.333 512 341.333" width="1.5em" height="1em" {...props} ref={ref}><path fill="#FFF" d="M0 85.331h512v341.326H0z"/><g fill="#D80027"><path d="M0 85.331h170.663v341.337H0zM341.337 85.331H512v341.337H341.337z"/></g></svg>
);

export default React.forwardRef(PE);
    
