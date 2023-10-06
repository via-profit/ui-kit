
import * as React from 'react';

const TO: React.ForwardRefRenderFunction<SVGSVGElement, React.SVGProps<SVGSVGElement>> = (
  props,
  ref,
) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 85.333 512 341.333" width="1.5em" height="1em" {...props} ref={ref}><path fill="#D80027" d="M0 85.331h512v341.337H0z"/><path fill="#FFF" d="M0 85.331h256v170.663H0z"/><path fill="#D80027" d="M141.357 157.303V130.59h-26.714v26.713H87.93v26.713h26.713v26.713h26.714v-26.713h26.713v-26.713z"/></svg>
);

export default React.forwardRef(TO);
    
