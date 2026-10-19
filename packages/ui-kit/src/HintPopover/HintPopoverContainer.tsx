import React from 'react';
import styled from '@emotion/styled';
import { keyframes } from '@emotion/react';

import { elevation } from '../ThemeProvider/tokens';

export type HintPopoverContainerProps = React.HTMLAttributes<HTMLDivElement>;

const appear = keyframes`
  from {
    opacity: 0;
    transform: scale(0.96);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
`;

const StyledContainer = styled.div`
  box-sizing: border-box;
  max-width: 22em;
  padding: 0.7em 0.9em;
  font-size: 0.875rem;
  font-weight: normal;
  line-height: 1.45;
  text-align: left;
  white-space: normal;
  overflow-wrap: break-word;
  color: ${({ theme }) => theme.color.textPrimary.toString()};
  background-color: ${({ theme }) => theme.color.surface.toString()};
  border-radius: ${({ theme }) => theme.shape.radiusFactor * 1.6}em;
  box-shadow: ${({ theme }) => elevation(theme, 'popup')};
  animation: ${appear} 120ms ease-out;

  & p {
    margin: 0 0 0.5em;
  }

  & p:last-child {
    margin-bottom: 0;
  }

  @media (prefers-reduced-motion: reduce) {
    animation: none;
  }
`;

/**
 * The bubble with the content of the hint
 */
const HintPopoverContainer: React.ForwardRefRenderFunction<
  HTMLDivElement,
  HintPopoverContainerProps
> = (props, ref) => <StyledContainer {...props} ref={ref} />;

export default React.forwardRef(HintPopoverContainer);
