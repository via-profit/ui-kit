
import * as React from 'react';

const WF: React.ForwardRefRenderFunction<SVGSVGElement, React.SVGProps<SVGSVGElement>> = (
  props,
  ref,
) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 150 100" width="1.5em" height="1em" {...props} ref={ref}><path fill="#ED2939" d="M0 0h150v100H0z"/><path fill="#002395" d="M0 0h20v44.33H0z"/><path fill="#FFF" d="M20 0h20v44.33H20z"/><path fill="none" stroke="#FFF" strokeWidth="3" d="M0 44.33h62.75V0"/><path fill="#FFF" d="M108.08 43.29 87.96 23.17h40.25l-20.13 20.12zm-6.7 6.71L81.25 29.88v40.25L101.38 50zm6.7 6.71L87.96 76.83h40.25l-20.13-20.12zm6.71-6.71 20.13-20.13v40.25L114.79 50z"/></svg>
);

export default React.forwardRef(WF);
    
