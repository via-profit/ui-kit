
import * as React from 'react';

const IN: React.ForwardRefRenderFunction<SVGSVGElement, React.SVGProps<SVGSVGElement>> = (
  props,
  ref,
) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 513 342" width="1.5em" height="1em" {...props} ref={ref}><path fill="#181A93" d="M17.3 0h478.4v342H17.3V0z"/><path fill="#FFA44A" d="M0 0h513v114H0V0z"/><path fill="#1A9F0B" d="M0 228h513v114H0V228z"/><path fill="#FFF" d="M0 114h513v114H0V114z"/><circle fill="#FFF" cx="256.5" cy="171" r="34.2"/><path fill="#181A93" d="M256.5 216.6c-25.1 0-45.6-20.5-45.6-45.6s20.5-45.6 45.6-45.6 45.6 20.5 45.6 45.6-20.5 45.6-45.6 45.6zm0-11.4c18.2 0 34.2-16 34.2-34.2s-15.9-34.2-34.2-34.2-34.2 16-34.2 34.2 16 34.2 34.2 34.2z"/><circle fill="#181A93" cx="256.5" cy="171" r="22.8"/></svg>
);

export default React.forwardRef(IN);
    
