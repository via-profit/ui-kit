
import * as React from 'react';

const HT: React.ForwardRefRenderFunction<SVGSVGElement, React.SVGProps<SVGSVGElement>> = (
  props,
  ref,
) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 513 342" width="1.5em" height="1em" {...props} ref={ref}><path fill="#A2001D" d="M0 0h513v172H0z"/><path fill="#0052B4" d="M0 172h513v172H0z"/><path fill="#FFF" d="m381.4 251.5-110.7-13.8-110.8 13.8V85.4h221.5z"/><circle fill="#0052B4" cx="270.7" cy="182.3" r="55.4"/><circle fill="#A2001D" cx="270.7" cy="182.3" r="27.7"/><path fill="#6DA544" d="M229.1 113.1h83.1l-41.5 41.5z"/><path fill="#FFDA44" d="M256.8 140.8h27.7v83h-27.7z"/><path fill="#6DA544" d="M314.9 215.5h-88.5l-66.5 36h221.5z"/></svg>
);

export default React.forwardRef(HT);
    
