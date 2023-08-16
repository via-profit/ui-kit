
import * as React from 'react';

const ES: React.ForwardRefRenderFunction<SVGSVGElement, React.SVGProps<SVGSVGElement>> = (
  props,
  ref,
) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 22.5 15" width="1.5em" height="1em" {...props} ref={ref}><path fill="#FFF" d="M0 0h22.5v15H0V0z"/><path fill="#D03433" d="M0 0h22.5v4H0V0zm0 11h22.5v4H0v-4z"/><path fill="#FBCA46" d="M0 4h22.5v7H0V4z"/><path fill="#FFF" d="M7.8 7h1v.5h-1V7z"/><path fill="#A41517" d="M7.2 8.5c0 .3.3.5.6.5s.6-.2.6-.5L8.5 7H7.1l.1 1.5zM6.6 7c0-.3.2-.5.4-.5h1.5c.3 0 .5.2.5.4V7l-.1 1.5c-.1.6-.5 1-1.1 1-.6 0-1-.4-1.1-1L6.6 7z"/><path fill="#A41517" d="M6.8 7.5h2V8h-.5l-.5 1-.5-1h-.5v-.5zM5.3 6h1v3.5h-1V6zm4 0h1v3.5h-1V6zm-2.5-.5c0-.3.2-.5.5-.5h1c.3 0 .5.2.5.5v.2c0 .2-.1.3-.3.3H7c-.1 0-.2-.1-.2-.2v-.3z"/></svg>
);

export default React.forwardRef(ES);
    
