
import * as React from 'react';

const GL: React.ForwardRefRenderFunction<SVGSVGElement, React.SVGProps<SVGSVGElement>> = (
  props,
  ref,
) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 513 342" width="1.5em" height="1em" {...props} ref={ref}><path fill="#D80027" d="M0 0h513v342H0z"/><path fill="#FFF" d="M513 0v171H0V0z"/><circle fill="#FFF" cx="185.8" cy="171.2" r="117.8"/><path fill="#D80027" d="M68 171c0-65.1 52.8-117.8 117.8-117.8 65.1 0 117.8 52.8 117.8 117.8"/></svg>
);

export default React.forwardRef(GL);
    
