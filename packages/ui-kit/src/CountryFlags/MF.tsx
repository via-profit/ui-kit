
import * as React from 'react';

const MF: React.ForwardRefRenderFunction<SVGSVGElement, React.SVGProps<SVGSVGElement>> = (
  props,
  ref,
) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 108 72" width="1.5em" height="1em" {...props} ref={ref}><path d="M0 0h108v72H0z" fill="#003787"/><path d="M0 0h108L60 48v24H48V48z" fill="#fff"/><circle cx="54" cy="30" r="8" fill="#f9d90f"/><path d="M44 30h20L54 48z" fill="#fff"/><path d="M54 48 38 33h32z" fill="#cf142b"/></svg>
);

export default React.forwardRef(MF);
    
