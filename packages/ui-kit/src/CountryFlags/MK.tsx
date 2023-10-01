
import * as React from 'react';

const MK: React.ForwardRefRenderFunction<SVGSVGElement, React.SVGProps<SVGSVGElement>> = (
  props,
  ref,
) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 85.333 512 341.333" width="1.5em" height="1em" {...props} ref={ref}><path fill="#FFDA44" d="M0 85.333h512V426.67H0z"/><g fill="#D80027"><path d="M383.875 426.662 256 252.286l26.827 174.376zM133.565 85.33 256 252.286 230.314 85.33zM229.171 426.662 256 252.286 128.124 426.662zM0 85.33V212.9l256 39.386L28.333 85.33zM0 426.662h18.212L256 252.286 0 291.67zM256 252.286 512 212.9V85.33h-28.331zM281.686 85.33 256 252.286 378.434 85.33zM512 426.662V291.671l-256-39.385 237.787 174.376z"/><circle cx="256" cy="252.29" r="59.359"/></g><circle fill="#FFDA44" cx="256" cy="252.29" r="44.522"/></svg>
);

export default React.forwardRef(MK);
    
