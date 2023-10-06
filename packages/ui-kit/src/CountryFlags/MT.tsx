
import * as React from 'react';

const MT: React.ForwardRefRenderFunction<SVGSVGElement, React.SVGProps<SVGSVGElement>> = (
  props,
  ref,
) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 513 342" width="1.5em" height="1em" {...props} ref={ref}><path fill="#FFF" d="M0 0h513v342H0z"/><path fill="#C31B28" d="M256 0h256.5v342H256z"/><path fill="#ACABB1" stroke="#C31B28" strokeWidth="2" d="M101.2 68.2V33H66v35.2H30.8v35.2H66v35.2h35.2v-35.2h35.2V68.2z"/></svg>
);

export default React.forwardRef(MT);
    
