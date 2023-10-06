
import * as React from 'react';

const SS: React.ForwardRefRenderFunction<SVGSVGElement, React.SVGProps<SVGSVGElement>> = (
  props,
  ref,
) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 85.333 512 341.333" width="1.5em" height="1em" {...props} ref={ref}><path fill="#FFF" d="M0 85.337h512v341.326H0z"/><path fill="#496E2D" d="M0 322.783h512v103.88H0z"/><path d="M0 85.337h512v104.515H0z"/><path fill="#A2001D" d="M0 210.877h512v89.656H0z"/><path fill="#0052B4" d="M256 256.006 0 426.668V85.331z"/><path fill="#FFDA44" d="m73.178 209.188 20.831 29.067 34.084-10.83-21.207 28.795 20.83 29.069-33.939-11.271-21.208 28.794.234-35.762-33.94-11.273 34.083-10.83z"/></svg>
);

export default React.forwardRef(SS);
    
