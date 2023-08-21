
import * as React from 'react';

const CU: React.ForwardRefRenderFunction<SVGSVGElement, React.SVGProps<SVGSVGElement>> = (
  props,
  ref,
) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 513 342" width="1.5em" height="1em" {...props} ref={ref}><path fill="#FF9811" d="M0-40.8v422.9-211.4z"/><path fill="#FFF" d="M0 0h513v342H0z"/><g fill="#0052B4"><path d="M0 0h513v68.3H0zM0 136.5h513v68.3H0zM0 273.1h513v68.3H0z"/></g><path fill="#D80027" d="M256 170.7 0 342V0z"/><path fill="#FFF" d="m86.5 111.4 12.7 39.2h41.3l-33.4 24.2 12.8 39.3-33.4-24.2-33.4 24.2 12.8-39.3-33.4-24.2h41.2z"/></svg>
);

export default React.forwardRef(CU);
    
