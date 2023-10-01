
import * as React from 'react';

const GF: React.ForwardRefRenderFunction<SVGSVGElement, React.SVGProps<SVGSVGElement>> = (
  props,
  ref,
) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 90 60" width="1.5em" height="1em" {...props} ref={ref}><path fill="#FDEB01" d="m0 0 90 60H0z"/><path fill="#58A846" d="M90 0v60L0 0z"/><path fill="#ED3D24" d="m50.7 33.3 9.3-6.7H48.5L45 15.7l-3.5 10.9H30l9.3 6.7-3.6 11 9.3-6.7 9.3 6.7z"/></svg>
);

export default React.forwardRef(GF);
    
