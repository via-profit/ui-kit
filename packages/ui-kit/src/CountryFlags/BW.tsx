
import * as React from 'react';

const BW: React.ForwardRefRenderFunction<SVGSVGElement, React.SVGProps<SVGSVGElement>> = (
  props,
  ref,
) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 513 342" width="1.5em" height="1em" {...props} ref={ref}><path fill="#FFF" d="M0 0h513v342H0z"/><g fill="#6da9d2"><path d="M0 238h513v104H0zM0 0h513v104H0z"/></g><path d="M0 125.5h513v89.656H0z"/></svg>
);

export default React.forwardRef(BW);
    
