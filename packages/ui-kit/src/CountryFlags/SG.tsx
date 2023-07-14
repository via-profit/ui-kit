import * as React from 'react';

const SG: React.ForwardRefRenderFunction<SVGSVGElement, React.SVGProps<SVGSVGElement>> = (
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
    <path fill="#FFF" d="M0 85.337h512v341.326H0z" />
    <path fill="#D80027" d="M0 85.337h512V256H0z" />
    <g fill="#FFF">
      <path d="M83.478 170.666c0-24.865 17.476-45.637 40.812-50.734a52.059 52.059 0 0 0-11.13-1.208c-28.688 0-51.942 23.254-51.942 51.941s23.255 51.942 51.942 51.942c3.822 0 7.543-.425 11.13-1.208-23.336-5.095-40.812-25.867-40.812-50.733zM150.261 122.435l3.684 11.337h11.921l-9.645 7.007 3.684 11.337-9.644-7.006-9.645 7.006 3.685-11.337-9.645-7.007h11.921z" />
      <path d="m121.344 144.696 3.683 11.337h11.921l-9.645 7.007 3.684 11.337-9.643-7.006-9.645 7.006 3.685-11.337-9.645-7.007h11.921zM179.178 144.696l3.684 11.337h11.921l-9.645 7.007 3.684 11.337-9.644-7.006-9.644 7.006 3.685-11.337-9.645-7.007h11.921zM168.047 178.087l3.684 11.337h11.921l-9.644 7.007 3.684 11.337-9.645-7.006-9.643 7.006 3.684-11.337-9.644-7.007h11.92zM132.474 178.087l3.683 11.337h11.921l-9.644 7.007 3.684 11.337-9.644-7.006-9.644 7.006 3.684-11.337-9.644-7.007h11.92z" />
    </g>
  </svg>
);

export default React.forwardRef(SG);
