import * as React from 'react';

const BZ: React.ForwardRefRenderFunction<SVGSVGElement, React.SVGProps<SVGSVGElement>> = (
  props,
  ref,
) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 513 342"
    width="1.5em"
    height="1em"
    {...props}
    ref={ref}
  >
    <path fill="#003e87" d="M0 0h513v342H0z" />
    <circle fill="#FFF" cx="260.9" cy="170.9" r="118.9" />
    <circle
      fill="none"
      stroke="#6DA544"
      strokeWidth="18"
      strokeMiterlimit="10"
      cx="261.9"
      cy="173.1"
      r="94.5"
    />
    <g stroke="#000">
      <path
        fill="#003e87"
        d="m261.9 151.5-50.6 23.4v20c0 11.8 6.1 22.8 16.2 28.9L262 239l34.5-15.2c10-6.2 16.2-17.1 16.2-28.9v-20l-50.8-23.4z"
      />
      <path fill="#FFDA44" d="M211.3 128.1h101.3v46.7H211.3z" />
    </g>
    <g fill="#ce1127">
      <path d="M0 0h513v35H0zM0 306h513v35H0z" />
    </g>
  </svg>
);

export default React.forwardRef(BZ);
