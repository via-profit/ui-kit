import * as React from 'react';

const MO: React.ForwardRefRenderFunction<SVGSVGElement, React.SVGProps<SVGSVGElement>> = (
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
    <path fill="#00745a" d="M0 85.331h512v341.337H0z" />
    <path
      fill="#FFF"
      d="M285.682 248.878c-4.19 0-8.166.836-11.861 2.164 2.023-4.509 3.379-9.527 3.379-14.885 0-21.201-21.201-37.101-21.201-37.101s-21.201 15.901-21.201 37.101c0 5.357 1.356 10.375 3.379 14.885-3.693-1.328-7.671-2.164-11.861-2.164-21.201 0-37.101 21.201-37.101 21.201s15.901 21.201 37.101 21.201c12.429 0 23.031-7.286 29.682-13.315 6.65 6.03 17.251 13.315 29.682 13.315 21.201 0 37.101-21.201 37.101-21.201s-15.899-21.201-37.099-21.201z"
    />
    <g fill="#FFDA44">
      <path d="m256 152.111 4.38 13.476h14.171l-11.464 8.332 4.376 13.476-11.463-8.33-11.463 8.33 4.376-13.476-11.464-8.332h14.171zM202.112 175.683l8.425 7.585 9.818-5.667-4.61 10.355 8.423 7.588-11.274-1.185-4.611 10.355-2.358-11.088-11.275-1.185 9.818-5.669zM162.662 215.132l11.09 2.358 5.668-9.818 1.186 11.274 11.089 2.358-10.357 4.61 1.186 11.274-7.587-8.423-10.357 4.61 5.669-9.818zM309.889 175.683l-8.425 7.585-9.818-5.667 4.611 10.355-8.425 7.588 11.275-1.185 4.61 10.355 2.359-11.088 11.275-1.185-9.818-5.669zM349.338 215.132l-11.089 2.358-5.669-9.818-1.186 11.274-11.088 2.358 10.357 4.61-1.185 11.274 7.586-8.423 10.357 4.61-5.669-9.818z" />
    </g>
    <g fill="#FFF">
      <path d="M256 350.642c16.84 0 32.363-5.619 44.816-15.073h-89.63c12.451 9.454 27.974 15.073 44.814 15.073zM187.977 306.12a74.138 74.138 0 0 0 8.85 15.073h118.345a74.13 74.13 0 0 0 8.85-15.073H187.977z" />
    </g>
  </svg>
);

export default React.forwardRef(MO);
