
import * as React from 'react';

const MP: React.ForwardRefRenderFunction<SVGSVGElement, React.SVGProps<SVGSVGElement>> = (
  props,
  ref,
) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 750 500" width="1.5em" height="1em" {...props} ref={ref}><path fill="#0071BC" d="M0 0h750v500H0V0z"/><g fill="#FFF" stroke="#000" strokeWidth="1.9"><circle cx="375" cy="245" r="225" fill="#fff"/><circle cx="375" cy="245" r="165" fill="#0071BC"/></g><g stroke="#000"><path fill="#8C8A8C" strokeWidth="1.9" d="M444.7 450c.7 11-7.8 20-18.8 20H323.6c-11 0-19.5-9-19-20l16.7-325c.6-11 10-20 21-20h61.4c11 0 20.5 9 21.2 20l19.8 325z"/><path fill="#FFF" strokeWidth="2" strokeLinejoin="round" d="m373 114 30 93h97l-78 56 29 92-78-56-78 57 30-93-79-57h97l30-92z"/></g></svg>
);

export default React.forwardRef(MP);
    
