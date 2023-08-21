
import * as React from 'react';

const RW: React.ForwardRefRenderFunction<SVGSVGElement, React.SVGProps<SVGSVGElement>> = (
  props,
  ref,
) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 85.333 512 341.333" width="1.5em" height="1em" {...props} ref={ref}><path fill="#338AF3" d="M0 85.331h512v341.337H0z"/><path fill="#FFDA44" d="M0 255.994h512v81.619H0z"/><path fill="#496E2D" d="M0 337.614h512v89.043H0z"/><path fill="#FFDA44" d="m278.261 185.209 20.844 9.804-11.099 20.186 22.632-4.33 2.868 22.865 15.765-16.816 15.766 16.816 2.867-22.865 22.633 4.33-11.099-20.186 20.843-9.804-20.844-9.805 11.1-20.185-22.633 4.329-2.868-22.864-15.765 16.816-15.766-16.816-2.867 22.864-22.634-4.329 11.1 20.187z"/></svg>
);

export default React.forwardRef(RW);
    
