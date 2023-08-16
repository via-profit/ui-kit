
import * as React from 'react';

const TL: React.ForwardRefRenderFunction<SVGSVGElement, React.SVGProps<SVGSVGElement>> = (
  props,
  ref,
) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 85.333 512 341.333" width="1.5em" height="1em" {...props} ref={ref}><path fill="#D80027" d="M0 85.337h512v341.326H0z"/><path fill="#FFDA44" d="M256 256 0 90.691v44.242L155.826 256 0 377.067v44.242z"/><path d="M0 90.691v330.618L189.217 256z"/><path fill="#FFF" d="m44.184 213.36 24.912 23.577 30.121-16.41-14.723 30.98 24.911 23.575-34.012-4.43L60.67 301.63l-6.296-33.716-34.012-4.43 30.119-16.408z"/></svg>
);

export default React.forwardRef(TL);
    
