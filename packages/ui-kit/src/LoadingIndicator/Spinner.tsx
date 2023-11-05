import React from 'react';
import styled from '@emotion/styled';
import { keyframes } from '@emotion/react';

export type SpinnerProps = React.SVGAttributes<SVGSVGElement>;

const animationRotate = keyframes`
0% {
  transform: rotate(0deg);
  }
100% {
  transform: rotate(270deg);
}
`;

const animationDash = keyframes`
 0% {
    stroke-dashoffset: 187;
  }
50% {
  stroke-dashoffset: 46.75;
          transform: rotate(135deg);
}
100% {
  stroke-dashoffset: 187;
          transform: rotate(450deg);
}
`;

const Svg = styled.svg`
  animation: ${animationRotate} 1.4s linear infinite;
`;

const Circle = styled.circle`
  stroke-dasharray: 187;
  stroke-dashoffset: 0;
  transform-origin: center;
  animation: ${animationDash} 1.4s ease-in-out infinite;
  stroke: ${({ theme }) => theme.color.accentSecondary.toString()};
`;

const Spinner: React.ForwardRefRenderFunction<SVGSVGElement, SpinnerProps> = (props, ref) => (
  <Svg
    width="1em"
    height="1em"
    viewBox="0 0 66 66"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
    ref={ref}
  >
    <Circle fill="none" strokeWidth="6" strokeLinecap="round" cx="33" cy="33" r="30" />
  </Svg>
);

export default React.forwardRef(Spinner);
