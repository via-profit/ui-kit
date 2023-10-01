
import * as React from 'react';

const JO: React.ForwardRefRenderFunction<SVGSVGElement, React.SVGProps<SVGSVGElement>> = (
  props,
  ref,
) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 513 342" width="1.5em" height="1em" {...props} ref={ref}><path fill="#FFF" d="M0 0h513v342H0z"/><path d="M0 0h513v114H0z"/><path fill="#6DA544" d="M0 228h513v114H0z"/><path fill="#D80027" d="M256.5 170.7 0 341.3V0z"/><path fill="#FFF" d="m77.9 139.5 7.9 16.4 17.8-4.1-8 16.5 14.3 11.3-17.8 4 .1 18.3-14.3-11.5-14.2 11.5v-18.3l-17.8-4 14.3-11.3-7.9-16.5 17.7 4.1z"/></svg>
);

export default React.forwardRef(JO);
    
