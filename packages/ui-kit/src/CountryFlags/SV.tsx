
import * as React from 'react';

const SV: React.ForwardRefRenderFunction<SVGSVGElement, React.SVGProps<SVGSVGElement>> = (
  props,
  ref,
) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 85.333 512 341.333" width="1.5em" height="1em" {...props} ref={ref}><path fill="#FFF" d="M0 85.337h512v341.326H0z"/><g fill="#0052B4"><path d="M0 85.337h512v113.775H0zM0 312.888h512v113.775H0z"/></g><path fill="#FFDA44" d="M228.582 261.936 256 214.447l27.418 47.489z"/><path fill="#6DA544" d="M291.616 277.616 256 295.425l-35.616-17.809v-23.744h71.232z"/><path fill="#FFDA44" d="m289.579 216.485-12.592 12.592c5.37 5.372 8.693 12.791 8.693 20.988 0 16.392-13.289 29.68-29.68 29.68-16.392 0-29.68-13.289-29.68-29.68 0-8.195 3.322-15.616 8.693-20.988l-12.592-12.592c-8.594 8.594-13.91 20.466-13.91 33.579 0 26.228 21.261 47.489 47.489 47.489s47.489-21.261 47.489-47.489c0-13.114-5.316-24.987-13.91-33.579z"/></svg>
);

export default React.forwardRef(SV);
    
