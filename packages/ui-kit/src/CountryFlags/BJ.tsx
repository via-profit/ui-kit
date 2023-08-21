
import * as React from 'react';

const BJ: React.ForwardRefRenderFunction<SVGSVGElement, React.SVGProps<SVGSVGElement>> = (
  props,
  ref,
) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 85.333 513 342" width="1.5em" height="1em" {...props} ref={ref}><path fill="#008751" d="M0 85.333h513v342H0z"/><path fill="#fcd116" d="M196.666 85.333H513v171H196.666z"/><path fill="#e8112d" d="M196.666 256H513v171H196.666z"/></svg>
);

export default React.forwardRef(BJ);
    
