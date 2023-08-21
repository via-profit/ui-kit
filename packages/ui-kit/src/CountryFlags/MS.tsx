
import * as React from 'react';

const MS: React.ForwardRefRenderFunction<SVGSVGElement, React.SVGProps<SVGSVGElement>> = (
  props,
  ref,
) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 513 342" width="1.5em" height="1em" {...props} ref={ref}><path fill="#1B4991" d="M0 0h513v342H0z"/><path fill="#00A2B8" stroke="#FFF" strokeWidth="3" d="M318.2 106.7v106.5c0 51.9 67.8 67.8 67.8 67.8s67.8-15.9 67.8-67.8V106.7H318.2z"/><path fill="#A35023" d="M319.7 212.7c0 50.8 66.3 66.3 66.3 66.3s66.3-15.6 66.3-66.3H319.7z"/><path d="M415.1 155.1h-19.4v-19.4h-19.4v19.4H357v19.4h19.3v58.1h19.4v-58.1h19.4z"/><path fill="#FFF" d="M256 0v30.6l-45.2 25.1H256V115h-59.1l59.1 32.8v22.9h-26.7l-73.5-40.9v40.9h-55.6v-48.6l-87.5 48.6H0v-30.6L45.2 115H0V55.7h59.1L0 22.8V0h26.7l73.5 40.8V0h55.6v48.6L243.3 0z"/><path fill="#D80027" d="M144 0h-32v69.3H0v32h112v69.4h32v-69.4h112v-32H144z"/><path fill="#0052B4" d="M155.8 115 256 170.7v-15.8L184.2 115z"/><path fill="#FFF" d="M155.8 115 256 170.7v-15.8L184.2 115z"/><path fill="#D80027" d="M155.8 115 256 170.7v-15.8L184.2 115zM71.8 115 0 154.9v15.8L100.2 115z"/><path fill="#0052B4" d="M100.2 55.6 0 0v15.7l71.8 39.9z"/><path fill="#FFF" d="M100.2 55.6 0 0v15.7l71.8 39.9z"/><path fill="#D80027" d="M100.2 55.6 0 0v15.7l71.8 39.9zM184.2 55.6 256 15.7V0L155.8 55.6z"/></svg>
);

export default React.forwardRef(MS);
    
