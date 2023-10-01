
import * as React from 'react';

const MR: React.ForwardRefRenderFunction<SVGSVGElement, React.SVGProps<SVGSVGElement>> = (
  props,
  ref,
) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 100 513 342" width="1.5em" height="1em" {...props} ref={ref}><path fill="#006233" d="M0 100h513v342H0z"/><path fill="#cd2a3e" d="M0 100h513v46H0zM0 396h513v46H0z"/><path fill="#ffc400" d="M256 298.851c-45.956 0-84.348-32.298-93.767-75.429A96.288 96.288 0 0 0 160 243.994c0 53.02 42.979 96 96 96s96-42.98 96-96c0-7.066-.785-13.942-2.233-20.572-9.419 43.131-47.811 75.429-93.767 75.429z"/><path fill="#ffc400" d="m255.999 171.994 8.935 27.502h28.918l-23.394 16.996 8.936 27.503-23.395-16.998-23.394 16.998 8.937-27.503-23.394-16.996h28.915z"/></svg>
);

export default React.forwardRef(MR);
    
