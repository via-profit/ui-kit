
import * as React from 'react';

const KY: React.ForwardRefRenderFunction<SVGSVGElement, React.SVGProps<SVGSVGElement>> = (
  props,
  ref,
) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 513 342" width="1.5em" height="1em" {...props} ref={ref}><path fill="#0052B4" d="M0 0h513v342H0z"/><circle fill="#6DA544" cx="384" cy="96.5" r="29.7"/><path fill="#D80027" d="M332.1 89H436v44.5H332.1z"/><path fill="#496E2D" d="M435.9 170.7z"/><path fill="#FFDA44" d="M332.1 200.3V230h15.6c9.4 9.2 22.2 14.8 36.3 14.8 14.1 0 27-5.7 36.3-14.8H435.9v-29.7H332.1z"/><path fill="#338AF3" d="M332.1 126.1v44.5c0 39.8 51.9 51.9 51.9 51.9s51.9-12.2 51.9-51.9v-44.5H332.1z"/><g fill="#F3F3F3"><path d="M384 149.9c-13 0-13 11.9-26 11.9s-13-11.9-26-11.9v20.8c13 0 13 11.9 26 11.9s13-11.9 26-11.9 13 11.9 26 11.9 13-11.9 26-11.9v-20.8c-13 0-13 11.9-26 11.9s-13-11.9-26-11.9zM384 108.3c-13 0-13 11.9-26 11.9s-13-11.9-26-11.9v20.8c13 0 13 11.9 26 11.9s13-11.9 26-11.9 13 11.9 26 11.9 13-11.9 26-11.9v-20.8c-13 0-13 11.9-26 11.9s-13-11.9-26-11.9z"/></g><path fill="#FFF" d="M256 0v22.6l-46.1 30.7H256v64h-46.1L256 148v22.7h-22.6l-73.4-49v49H96v-49l-73.4 49H0V148l46.1-30.7H0v-64h46.1L0 22.6V0h22.6L96 48.9V0h64v48.9L233.4 0z"/><g fill="#D80027"><path d="M144 0h-32v69.3H0v32h112v69.4h32v-69.4h112v-32H144z"/><path d="M0 0v15.1l57.4 38.2H80zM256 0v15.1l-57.4 38.2H176z"/><path d="M0 0v15.1l57.4 38.2H80zM256 0v15.1l-57.4 38.2H176zM0 170.7v-15.1l57.4-38.3H80zM256 170.7v-15.1l-57.4-38.3H176z"/></g></svg>
);

export default React.forwardRef(KY);
    
