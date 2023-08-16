
import * as React from 'react';

const IS: React.ForwardRefRenderFunction<SVGSVGElement, React.SVGProps<SVGSVGElement>> = (
  props,
  ref,
) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 513 342" width="1.5em" height="1em" {...props} ref={ref}><path fill="#0052B4" d="M0 0h513v342H0z"/><path fill="#FFF" d="M513 210.6H202.2v130.7H122.4V210.6H0V130.8h122.4V0H202.2v130.8H513v18.5l-1 42.7z"/><path fill="#D80027" d="M513 149.3V192H183.7v149.3H141V192H0v-42.7h141V0h42.7v149.3z"/></svg>
);

export default React.forwardRef(IS);
    
