
import * as React from 'react';

const ZM: React.ForwardRefRenderFunction<SVGSVGElement, React.SVGProps<SVGSVGElement>> = (
  props,
  ref,
) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 85.333 512 341.333" width="1.5em" height="1em" {...props} ref={ref}><path fill="#496E2D" d="M0 85.331h512v341.337H0z"/><path fill="#FF9811" d="M490.668 195.476h-48c0-8.836-7.164-16-16-16s-16 7.164-16 16h-48c0 8.836 7.697 16 16.533 16h-.533c0 8.836 7.162 16 16 16 0 8.836 7.162 16 16 16h32c8.836 0 16-7.164 16-16 8.836 0 16-7.164 16-16h-.533c8.837 0 16.533-7.164 16.533-16z"/><path fill="#D80027" d="M341.337 255.994h56.888v170.663h-56.888z"/><path fill="#FF9811" d="M455.112 255.994H512v170.663h-56.888z"/><path d="M398.225 255.994h56.888v170.663h-56.888z"/></svg>
);

export default React.forwardRef(ZM);
    
