
import * as React from 'react';

const SJ: React.ForwardRefRenderFunction<SVGSVGElement, React.SVGProps<SVGSVGElement>> = (
  props,
  ref,
) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 85.333 512 341.333" width="1.5em" height="1em" {...props} ref={ref}><path fill="#D80027" d="M0 85.334h512v341.337H0z"/><path fill="#FFF" d="M512 295.883H202.195v130.783H122.435V295.883H0V216.111h122.435V85.329H202.195v130.782H512V277.329z"/><path fill="#2E52B2" d="M512 234.666v42.663H183.652v149.337h-42.674V277.329H0v-42.663h140.978V85.329h42.674v149.337z"/></svg>
);

export default React.forwardRef(SJ);
    
