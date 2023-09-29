import * as React from 'react';

const BM: React.ForwardRefRenderFunction<SVGSVGElement, React.SVGProps<SVGSVGElement>> = (
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
    <path fill="#c8102e" d="M0 0h513v342H0z" />
    <path fill="#012169" d="M0 .1h256.5v171H0z" />
    <path
      fill="#FFF"
      d="M256 0h-22.6L160 48.9V0H96v48.9L22.6 0H0v22.7l46.1 30.7H0v64h46.1L0 148.1v22.6h22.6L96 121.8v48.9h64v-48.9l73.4 48.9H256v-22.6l-46.1-30.7H256v-64h-46.1L256 22.7z"
    />
    <path fill="#c8102e" d="M144 0h-32v69.4H0v32h112v69.3h32v-69.3h112v-32H144z" />
    <path
      fill="#c8102e"
      d="M0 170.7v-11l62.5-42.3h22.6L7.3 170.7zM7.3.1l77.8 53.2H62.5L0 11.1V.1zM256 .1v11l-62.5 42.3h-22.6L248.7.1zM248.7 170.7l-77.8-53.3h22.6l62.5 42.3v11z"
    />
    <g transform="translate(13 5)">
      <path
        fill="#fff"
        d="M303.9 94.94v99.69c0 59.81 79.75 99.69 79.75 99.69s79.75-39.88 79.75-99.69V94.94H303.9z"
      />
      <path
        fill="#2F8F22"
        d="M436.37 254.44H330.93c23.13 25.08 52.72 39.88 52.72 39.88s29.59-14.8 52.72-39.88z"
      />
      <circle fill="#65B5D2" cx="383.65" cy="214.56" r="39.88" />
      <circle fill="#c8102e" cx="343.77" cy="194.63" r="19.94" />
      <circle fill="#c8102e" cx="423.52" cy="194.63" r="19.94" />
      <circle fill="#c8102e" cx="383.65" cy="154.75" r="19.94" />
    </g>
  </svg>
);

export default React.forwardRef(BM);