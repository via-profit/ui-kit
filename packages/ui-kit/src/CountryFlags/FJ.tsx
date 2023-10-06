
import * as React from 'react';

const FJ: React.ForwardRefRenderFunction<SVGSVGElement, React.SVGProps<SVGSVGElement>> = (
  props,
  ref,
) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 513 342" width="1.5em" height="1em" {...props} ref={ref}><path fill="#2E52B2" d="M0 0h513v342H0z"/><path fill="#FFF" d="M256 0v22.6l-46.1 30.7H256v64h-46.1L256 148v22.7h-22.6l-73.4-49v49H96v-49l-73.4 49H0V148l46.1-30.7H0v-64h46.1L0 22.6V0h22.6L96 48.9V0h64v48.9L233.4 0z"/><g fill="#D80027"><path d="M144 0h-32v69.3H0v32h112v69.4h32v-69.4h112v-32H144z"/><path d="M0 0v15.1l57.4 38.2H80zM256 0v15.1l-57.4 38.2H176z"/><path d="M0 0v15.1l57.4 38.2H80zM256 0v15.1l-57.4 38.2H176zM0 170.7v-15.1l57.4-38.3H80zM256 170.7v-15.1l-57.4-38.3H176z"/></g><path fill="#F3F3F3" d="M307.1 127.1v92c0 61.6 80.5 80.5 80.5 80.5s80.4-19 80.4-80.6v-92l-80.5-23-80.4 23.1z"/><path fill="#D80027" d="M468 132.8V98.3H307.1v34.5h69v69h-69v23h69V296c6.9 2.5 11.5 3.5 11.5 3.5s4.6-1.1 11.5-3.5v-71.2h69v-23h-69v-69H468z"/></svg>
);

export default React.forwardRef(FJ);
    
