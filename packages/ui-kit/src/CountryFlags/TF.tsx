import * as React from 'react';

const TF: React.ForwardRefRenderFunction<SVGSVGElement, React.SVGProps<SVGSVGElement>> = (
  props,
  ref,
) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 22.5 15"
    width="1.5em"
    height="1em"
    {...props}
    ref={ref}
  >
    <path fill="#FFF" d="M0 0h21v15H0V0z" />
    <path fill="#073AB6" d="M0 0h22.5v15H0V0z" />
    <path fill="#FFF" d="M0 0h11.3v7.5H0V0z" />
    <path fill="#F44653" d="M7.1 0h3.6v7H7.1V0z" />
    <path fill="#1035BB" d="M0 0h3.6v7H0V0z" />
    <path
      fill="#FFF"
      d="M3.6 0h3.6v7H3.6V0zM14.5 6h5L19 7h-1.5v.5h1l-.5 1h-.5V10h-1V7H15l-.5-1zm4 2.5 1 1.5h-2l1-1.5zm-3 0 1 1.5h-2l1-1.5zm1.5 3L16 10h2l-1 1.5zM20 8c-.3 0-.5-.2-.5-.5s.2-.5.5-.5.5.2.5.5-.2.5-.5.5zm-6 0c-.3 0-.5-.2-.5-.5s.2-.5.5-.5.5.2.5.5-.2.5-.5.5zm1 4c-.3 0-.5-.2-.5-.5s.2-.5.5-.5.5.2.5.5-.2.5-.5.5zm4 0c-.3 0-.5-.2-.5-.5s.2-.5.5-.5.5.2.5.5-.2.5-.5.5zm-2 1c-.3 0-.5-.2-.5-.5s.2-.5.5-.5.5.2.5.5-.2.5-.5.5z"
    />
  </svg>
);

export default React.forwardRef(TF);
