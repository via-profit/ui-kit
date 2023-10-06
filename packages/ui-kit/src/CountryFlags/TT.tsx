
import * as React from 'react';

const TT: React.ForwardRefRenderFunction<SVGSVGElement, React.SVGProps<SVGSVGElement>> = (
  props,
  ref,
) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 85.333 512 341.333" width="1.5em" height="1em" {...props} ref={ref}><path fill="#D80027" d="M0 85.337h512v341.326H0z"/><path fill="#FFF" d="m6.066 85.337 207.961 212.636 131.584 128.69h160.323L297.973 214.027 166.389 85.337z"/><path d="M43.364 85.337 384.69 426.663h83.946L127.31 85.337z"/></svg>
);

export default React.forwardRef(TT);
    
