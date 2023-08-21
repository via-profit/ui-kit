
import * as React from 'react';

const TZ: React.ForwardRefRenderFunction<SVGSVGElement, React.SVGProps<SVGSVGElement>> = (
  props,
  ref,
) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 85.333 512 341.333" width="1.5em" height="1em" {...props} ref={ref}><path fill="#338AF3" d="M0 85.337h512v341.326H0z"/><path fill="#6DA544" d="M0 426.663V85.337h512"/><path fill="#FFDA44" d="M512 152.222V85.337H411.67L0 359.778v66.885h100.33z"/><path d="M512 85.337v40.125L60.193 426.663H0v-40.125L451.807 85.337z"/></svg>
);

export default React.forwardRef(TZ);
    
