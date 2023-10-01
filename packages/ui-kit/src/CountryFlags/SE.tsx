
import * as React from 'react';

const SE: React.ForwardRefRenderFunction<SVGSVGElement, React.SVGProps<SVGSVGElement>> = (
  props,
  ref,
) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 85.333 512 341.333" width="1.5em" height="1em" {...props} ref={ref}><path fill="#0052B4" d="M0 85.333h512V426.67H0z"/><path fill="#FFDA44" d="M192 85.33h-64v138.666H0v64h128v138.666h64V287.996h320v-64H192z"/></svg>
);

export default React.forwardRef(SE);
    
