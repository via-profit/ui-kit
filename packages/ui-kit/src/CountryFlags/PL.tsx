
import * as React from 'react';

const PL: React.ForwardRefRenderFunction<SVGSVGElement, React.SVGProps<SVGSVGElement>> = (
  props,
  ref,
) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 85.333 512 341.333" width="1.5em" height="1em" {...props} ref={ref}><g fill="#FFF"><path d="M0 85.337h512v341.326H0z"/><path d="M0 85.337h512V256H0z"/></g><path fill="#D80027" d="M0 256h512v170.663H0z"/></svg>
);

export default React.forwardRef(PL);
    
