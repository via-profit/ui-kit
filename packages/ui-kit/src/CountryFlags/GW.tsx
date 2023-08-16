
import * as React from 'react';

const GW: React.ForwardRefRenderFunction<SVGSVGElement, React.SVGProps<SVGSVGElement>> = (
  props,
  ref,
) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 513 342" width="1.5em" height="1em" {...props} ref={ref}><path fill="#6DA544" d="M0 0h512v342H0z"/><path fill="#FFDA44" d="M0 0h512v171H0z"/><path fill="#D80027" d="M0 0h182v342H0z"/><path d="m98.3 109.8 15.1 46.5h48.9L122.8 185l15.1 46.5-39.6-28.7-39.5 28.7L73.9 185l-39.6-28.7h48.9z"/></svg>
);

export default React.forwardRef(GW);
    
