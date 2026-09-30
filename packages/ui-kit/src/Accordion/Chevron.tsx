import React from 'react';
import styled from '@emotion/styled';

export type ChevronProps = React.SVGAttributes<SVGSVGElement>;

const Path = styled.path`
  fill: currentColor;
`;

const Chevron: React.ForwardRefRenderFunction<SVGSVGElement, ChevronProps> = (props, ref) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="1em"
    height="1em"
    viewBox="0 0 24 24"
    aria-hidden
    {...props}
    ref={ref}
  >
    <Path d="M7.41,15.41L12,10.83L16.59,15.41L18,14L12,8L6,14L7.41,15.41Z" />
  </svg>
);

export default React.forwardRef(Chevron);
