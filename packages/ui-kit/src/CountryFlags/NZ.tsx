import * as React from 'react';

const NZ: React.ForwardRefRenderFunction<SVGSVGElement, React.SVGProps<SVGSVGElement>> = (
  props,
  ref,
) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 85.333 512 341.333"
    width="1.5em"
    height="1em"
    {...props}
    ref={ref}
  >
    <path fill="#0052B4" d="M0 85.334h512v341.337H0z" />
    <g fill="#D80027">
      <path d="m425.301 233.745 3.388 10.428h10.963l-8.87 6.444 3.388 10.427-8.869-6.444-8.871 6.444 3.388-10.427-8.87-6.444h10.963zM386.107 308.817l5.083 15.642h16.445l-13.305 9.667 5.082 15.64-13.305-9.667-13.305 9.667 5.083-15.64-13.305-9.667h16.445zM387.588 185.971l4.236 13.036h13.704l-11.088 8.054 4.235 13.034-11.087-8.056-11.088 8.056 4.235-13.034-11.087-8.054h13.704zM349.876 233.291l5.082 15.641h16.446l-13.306 9.666 5.084 15.641-13.306-9.666-13.305 9.666 5.082-15.641-13.305-9.666h16.445z" />
    </g>
    <path
      fill="#FFF"
      d="M256.003 85.329v30.564l-45.178 25.088h45.178v59.359H196.89l59.113 32.846v22.806h-26.69l-73.484-40.826v40.826h-55.652v-48.573l-87.429 48.573H.003v-30.553l45.168-25.099H.003v-59.359h59.103L.003 108.147V85.329h26.68l73.494 40.838V85.329h55.652v48.573l87.43-48.573z"
    />
    <path fill="#D80027" d="M144 85.33h-32v69.334H0v32h112v69.334h32v-69.334h112v-32H144z" />
    <path fill="#0052B4" d="M155.826 200.344 256 255.998v-15.739l-71.847-39.915z" />
    <path fill="#FFF" d="M155.826 200.344 256 255.998v-15.739l-71.847-39.915z" />
    <g fill="#D80027">
      <path d="M155.826 200.344 256 255.998v-15.739l-71.847-39.915zM71.846 200.344 0 240.259v15.739l100.174-55.654z" />
    </g>
    <path fill="#0052B4" d="M100.174 140.983 0 85.33v15.738l71.847 39.915z" />
    <path fill="#FFF" d="M100.174 140.983 0 85.33v15.738l71.847 39.915z" />
    <g fill="#D80027">
      <path d="M100.174 140.983 0 85.33v15.738l71.847 39.915zM184.154 140.983 256 101.068V85.33l-100.174 55.653z" />
    </g>
  </svg>
);

export default React.forwardRef(NZ);
