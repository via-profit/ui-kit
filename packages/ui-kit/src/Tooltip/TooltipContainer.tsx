import React from 'react';
import styled from '@emotion/styled';
import { keyframes } from '@emotion/react';
import { elevation } from '../ThemeProvider/tokens';

export type TooltipContainerProps = React.HTMLAttributes<HTMLDivElement>;

const appear = keyframes`
  from {
    opacity: 0;
    transform: scale(0.94);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
`;

const StyledContainer = styled.div`
  position: relative;
  box-sizing: border-box;
  max-width: 20em;
  padding: 0.4em 0.65em;
  border-radius: ${({ theme }) => theme.shape.radiusFactor}em;
  font-size: 0.8em;
  line-height: 1.4;
  overflow-wrap: break-word;
  /* Inverted colors: dark on the light theme, light on the dark one */
  background-color: ${({ theme }) => theme.color.textPrimary.toString()};
  box-shadow: ${({ theme }) => elevation(theme, 'popup')};
  color: ${({ theme }) => theme.color.surface.toString()};
  animation: ${appear} 120ms ease-out;

  @media (prefers-reduced-motion: reduce) {
    animation: none;
  }
`;

const TooltipContainer: React.ForwardRefRenderFunction<HTMLDivElement, TooltipContainerProps> = (
  props,
  ref,
) => {
  const { children, ...nativeProps } = props;

  return (
    <StyledContainer {...nativeProps} ref={ref}>
      {children}
    </StyledContainer>
  );
};

export default React.forwardRef(TooltipContainer);
