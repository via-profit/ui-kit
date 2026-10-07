import React from 'react';
import styled from '@emotion/styled';
import { css, keyframes } from '@emotion/react';

import type { ToastPosition, ToastType } from './store';
import { themeFocusRing, elevation, themePadding } from '../ThemeProvider/tokens';

export type ToastCardProps = React.HTMLAttributes<HTMLDivElement> & {
  readonly type: ToastType;
  readonly position: ToastPosition;

  /**
   * The toast plays the exit animation
   */
  readonly isClosing: boolean;
};

export const TOAST_ANIMATION_MS = 200;

/**
 * The toasts slide from the edge of the screen they are attached to
 */
const getOffset = (position: ToastPosition) => {
  if (position.endsWith('right')) {
    return 'translateX(110%)';
  }
  if (position.endsWith('left')) {
    return 'translateX(-110%)';
  }

  return position.startsWith('top') ? 'translateY(-100%)' : 'translateY(100%)';
};

const StyledCard = styled.div<{ $position: ToastPosition; $isClosing: boolean }>`
  position: relative;
  display: flex;
  align-items: flex-start;
  gap: 0.75em;
  box-sizing: border-box;
  width: max-content;
  max-width: 100%;
  min-width: 14em;
  padding: ${({ theme }) => {
    const { y, x } = themePadding(theme, 'container');

    return `calc(${y} * 0.75) ${x}`;
  }};
  border-radius: ${({ theme }) => theme.shape.radiusFactor * 1.5}em;
  border: 1px solid ${({ theme }) => theme.color.textPrimary.alpha(0.08).toString()};
  background-color: ${({ theme }) => theme.color.surface.toString()};
  color: ${({ theme }) => theme.color.textPrimary.toString()};
  box-shadow: ${({ theme }) => elevation(theme, 'popup')};
  font-size: 0.875em;
  line-height: 1.4;
  pointer-events: auto;
  overflow-wrap: anywhere;
  ${({ $position, $isClosing }) => {
    const hidden = css`
      opacity: 0;
      transform: ${getOffset($position)};
    `;
    const shown = css`
      opacity: 1;
      transform: none;
    `;
    const enter = keyframes`from { ${hidden.styles} } to { ${shown.styles} }`;
    const exit = keyframes`from { ${shown.styles} } to { ${hidden.styles} }`;

    return css`
      animation: ${$isClosing ? exit : enter} ${TOAST_ANIMATION_MS}ms cubic-bezier(0.2, 0, 0, 1)
        forwards;
    `;
  }}

  &:focus-visible {
    outline: 2px solid ${({ theme }) => theme.color.accentPrimary.toString()};
    outline-offset: 2px;
  }

  @media (prefers-reduced-motion: reduce) {
    animation-name: none;
    opacity: ${({ $isClosing }) => ($isClosing ? 0 : 1)};
  }
  ${({ theme }) => themeFocusRing(theme)}
`;

const ToastCard: React.ForwardRefRenderFunction<HTMLDivElement, ToastCardProps> = (props, ref) => {
  const { children, type, position, isClosing, ...nativeProps } = props;

  return (
    <StyledCard
      data-toast-type={type}
      {...nativeProps}
      $position={position}
      $isClosing={isClosing}
      ref={ref}
    >
      {children}
    </StyledCard>
  );
};

export default React.forwardRef(ToastCard);
