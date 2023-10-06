
import * as React from 'react';

const DJ: React.ForwardRefRenderFunction<SVGSVGElement, React.SVGProps<SVGSVGElement>> = (
  props,
  ref,
) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 513 342" width="1.5em" height="1em" {...props} ref={ref}><path fill="#12ad2b" d="M0 0h513v342H0z"/><path fill="#6ab2e7" d="M513 0v166.7L0 170.8V0z"/><path fill="#FFF" d="M256 170.7 0 342V0z"/><path fill="#d7141a" d="m89.8 92.5 17 52.4H162l-44.6 32.5 17 52.4-44.6-32.4-44.6 32.4 17-52.4-44.6-32.5h55.2z"/></svg>
);

export default React.forwardRef(DJ);
    
