
import * as React from 'react';

const SI: React.ForwardRefRenderFunction<SVGSVGElement, React.SVGProps<SVGSVGElement>> = (
  props,
  ref,
) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 85.333 512 341.333" width="1.5em" height="1em" {...props} ref={ref}><path fill="#FFF" d="M0 85.337h512v341.326H0z"/><path fill="#0052B4" d="M0 199.112h512v113.775H0z"/><path fill="#D80027" d="M0 312.888h512v113.775H0z"/><path fill="#FFF" d="M233.606 196.639v14.837c0 34.081-44.522 44.522-44.522 44.522s-44.522-10.44-44.522-44.522v-14.837l-.145-44.188 89.043-.266.146 44.454z"/><path fill="#0052B4" d="M233.606 196.639v14.837c0 34.081-44.522 44.522-44.522 44.522s-44.522-10.44-44.522-44.522v-14.837l-.145-44.188 89.043-.266.146 44.454z"/><path fill="#FFF" d="M233.606 196.639v14.837c0 34.081-44.522 44.522-44.522 44.522s-44.522-10.44-44.522-44.522v-14.837l14.848 14.837 29.674-22.261 29.685 22.261 14.837-14.837z"/></svg>
);

export default React.forwardRef(SI);
    
