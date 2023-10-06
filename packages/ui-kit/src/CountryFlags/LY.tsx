
import * as React from 'react';

const LY: React.ForwardRefRenderFunction<SVGSVGElement, React.SVGProps<SVGSVGElement>> = (
  props,
  ref,
) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 513 342" width="1.5em" height="1em" {...props} ref={ref}><path d="M0 0h513v342H0z"/><path fill="#D80027" d="M0 0h513v114H0z"/><path fill="#496E2D" d="M0 228h513v114H0z"/><g fill="#FFF"><path d="m281.4 150.7 9 12.3 14.5-4.7-9 12.4 9 12.3-14.5-4.7-9 12.3v-15.2l-14.5-4.7 14.5-4.7z"/><path d="M257 201.5c-17 0-30.9-13.8-30.9-30.9s13.8-30.9 30.9-30.9c5.3 0 10.3 1.3 14.7 3.7-6.9-6.7-16.2-10.8-26.6-10.8-21 0-38 17-38 38s17 38 38 38c10.3 0 19.7-4.1 26.6-10.8-4.4 2.4-9.4 3.7-14.7 3.7z"/></g></svg>
);

export default React.forwardRef(LY);
    
