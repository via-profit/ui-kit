import * as React from 'react';

const MA: React.ForwardRefRenderFunction<SVGSVGElement, React.SVGProps<SVGSVGElement>> = (
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
    <path fill="#D80027" d="M0 85.337v341.326h512V85.337z" />
    <path
      fill="#20661b"
      d="M352 226.484h-73.337L256 156.738l-22.663 69.748H160l59.331 43.107-22.663 69.749L256 296.232l59.332 43.107-22.663-69.749L352 226.484zm-116.063 37.711 7.663-23.585h24.8l7.663 23.585v.001L256 278.772l-20.063-14.577zm27.873-37.711h-15.619L256 202.447l7.81 24.037zm24.269 28.982-4.827-14.856h25.274l-20.447 14.856zm-59.331-14.856-4.827 14.856-20.447-14.856h25.274zm-5.211 61.748 7.81-24.036 12.636 9.181-20.446 14.855zm44.479-14.856 12.636-9.181 7.81 24.036-20.446-14.855z"
    />
  </svg>
);

export default React.forwardRef(MA);
