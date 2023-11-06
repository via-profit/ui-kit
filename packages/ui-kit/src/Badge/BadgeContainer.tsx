import React from 'react';
import styled from '@emotion/styled';

export type BadgeContainerProps = React.HTMLAttributes<HTMLSpanElement> & {
  /**
   * You can pass the primary, default, secondary name of the colors or your specified color value
   */
  readonly color?: 'default' | 'primary' | 'secondary' | string;
};

type StyledProps = {
  readonly color?: BadgeContainerProps['color'];
};

const StyledBadge = styled.span<StyledProps>`
  border-radius: ${({ theme }) => theme.shape.radiusFactor * 2.5}em;
  font-size: 1em;
  border-width: 0;
  outline-style: solid;
  outline-color: transparent;
  outline-width: 0.14em;
  transition: all 180ms ease-out 0s;
  background: none;
  display: inline-flex;
  align-items: center;
  color: ${({ color, theme }) => {
    switch (true) {
      case typeof color === 'undefined':
      default:
        return theme.color.textPrimary.toString();
    }
  }};
`;

const BadgeContainer: React.ForwardRefRenderFunction<HTMLSpanElement, BadgeContainerProps> = (
  props,
  ref,
) => {
  const { children, ...nativeProps } = props;

  return (
    <StyledBadge {...nativeProps} ref={ref}>
      {children}
    </StyledBadge>
  );
};

export default React.forwardRef(BadgeContainer);
