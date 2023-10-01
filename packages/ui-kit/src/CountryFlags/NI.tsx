
import * as React from 'react';

const NI: React.ForwardRefRenderFunction<SVGSVGElement, React.SVGProps<SVGSVGElement>> = (
  props,
  ref,
) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 85.333 512 341.333" width="1.5em" height="1em" {...props} ref={ref}><path fill="#FFF" d="M0 85.337h512v341.326H0z"/><g fill="#338AF3"><path d="M0 85.337h512v113.775H0zM0 312.888h512v113.775H0z"/></g><path fill="#FFDA44" d="M256 214.447c-22.949 0-41.553 18.603-41.553 41.553S233.05 297.553 256 297.553c22.949 0 41.553-18.603 41.553-41.553S278.949 214.447 256 214.447zm0 65.298c-13.114 0-23.745-10.631-23.745-23.745s10.631-23.745 23.745-23.745 23.745 10.631 23.745 23.745-10.631 23.745-23.745 23.745z"/><path fill="#0052B4" d="M276.563 261.936 256 256l-20.563 5.936-6.855 11.873h54.836z"/><path fill="#338AF3" d="m256 226.32-13.709 23.744L256 256l13.709-5.936z"/><path fill="#6DA544" d="M235.437 261.936h41.126l-6.854-11.872h-27.418z"/></svg>
);

export default React.forwardRef(NI);
    
