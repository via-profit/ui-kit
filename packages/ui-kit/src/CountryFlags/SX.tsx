
import * as React from 'react';

const SX: React.ForwardRefRenderFunction<SVGSVGElement, React.SVGProps<SVGSVGElement>> = (
  props,
  ref,
) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 85.333 512 341.333" width="1.5em" height="1em" {...props} ref={ref}><path fill="#0052B4" d="M0 85.337h512v341.326H0z"/><path fill="#D80027" d="M512 85.331v166.69L0 256.173V85.331z"/><path fill="#FFF" d="M256 256.006 0 426.668V85.331z"/><g fill="#FFDA44"><path d="M59.621 256a59.546 59.546 0 0 0-.193 4.57c0 32.821 26.607 59.429 59.429 59.429s59.429-26.607 59.429-59.429c0-1.539-.078-3.061-.193-4.57H59.621z"/><circle cx="118.862" cy="210.287" r="18.286"/></g><path fill="#D80027" d="M77.715 205.714v59.429c0 31.494 41.144 41.143 41.144 41.143s41.144-9.649 41.144-41.143v-59.429H77.715z"/><path fill="#338AF3" d="M118.877 287.148c-7.632-2.746-22.876-9.767-22.876-22.006v-41.144h45.715v41.144c-.001 12.28-15.244 19.283-22.839 22.006z"/><path fill="#F3F3F3" d="M128.001 246.856v-9.142l-9.144-4.571-9.142 4.571v9.142l-4.571 4.573v18.285h27.428v-18.285z"/></svg>
);

export default React.forwardRef(SX);
    
