import * as React from 'react';
import { SVGProps, Ref, forwardRef } from 'react';

const IconChevronDown = (props: SVGProps<SVGSVGElement>, ref: Ref<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="1em"
    height="1em"
    viewBox="0 0 512 512"
    ref={ref}
    {...props}
  >
    <path
      d="m105.79 160.82a24 24 0 0 0-10.76 6.2109 24 24 0 0 0 0 33.941l144 144a24.002 24.002 0 0 0 33.941 0l144-144a24 24 0 0 0 0-33.941 24 24 0 0 0-33.941 0l-127.03 127.03-127.03-127.03a24 24 0 0 0-23.182-6.2109z"
      fill="currentColor"
    />
  </svg>
);

const ForwardRef = forwardRef(IconChevronDown);
export default ForwardRef;