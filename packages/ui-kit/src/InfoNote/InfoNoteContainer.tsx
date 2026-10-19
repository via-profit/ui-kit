import React from 'react';
import styled from '@emotion/styled';
import type { Theme } from '@emotion/react';

import type { InfoNoteVariant } from './index';

export type InfoNoteContainerProps = React.HTMLAttributes<HTMLDivElement> & {
  readonly variant: InfoNoteVariant;
};

/**
 * The color of the variant: the border, the icon and the tint of the background
 */
export const variantColor = (theme: Theme, variant: InfoNoteVariant) => {
  switch (variant) {
    case 'success':
      return theme.color.success;
    case 'warning':
      return theme.color.warning;
    case 'error':
      return theme.color.error;
    default:
      return theme.color.accentPrimary;
  }
};

const StyledContainer = styled.div<{ readonly $variant: InfoNoteVariant }>`
  box-sizing: border-box;
  display: flex;
  gap: 0.6em;
  align-items: flex-start;
  padding: 0.6em 0.8em;
  font-size: 0.875em;
  line-height: 1.4;
  overflow-wrap: break-word;
  color: ${({ theme }) => theme.color.textPrimary.toString()};
  border-radius: ${({ theme }) => theme.shape.radiusFactor * 1.6}em;
  border-left: 3px solid ${({ theme, $variant }) => variantColor(theme, $variant).toString()};
  background-color: ${({ theme, $variant }) =>
    variantColor(theme, $variant)
      .alpha($variant === 'warning' ? 0.14 : 0.1)
      .toString()};
`;

const InfoNoteContainer: React.ForwardRefRenderFunction<HTMLDivElement, InfoNoteContainerProps> = (
  props,
  ref,
) => {
  const { variant, children, ...nativeProps } = props;

  return (
    <StyledContainer {...nativeProps} $variant={variant} ref={ref}>
      {children}
    </StyledContainer>
  );
};

export default React.forwardRef(InfoNoteContainer);
