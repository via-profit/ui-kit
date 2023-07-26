import React from 'react';
import styled from '@emotion/styled';

export type ButtonContainerProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  /**
   * You can pass the primary, default, secondary name of the colors or your specified color value
   */
  readonly color?: 'default' | 'primary' | 'secondary' | string;
};

type StyledProps = {
  readonly color?: ButtonContainerProps['color'];
};

const StyledButton = styled.button<StyledProps>`
  border-radius: ${({ theme }) => theme.shape.radiusFactor * 2}em;
  padding: 0.8em 1em;
  font-size: 0.8rem;
  cursor: ${({ disabled }) => (disabled ? 'default' : 'pointer')};
  font-size: 1em;
  border-width: 0;
  outline-style: solid;
  outline-color: transparent;
  outline-width: 0.14em;
  transition: all 180ms ease-out 0s;
  background: none;
  display: inline-flex;
  align-items: center;
  color: ${({ color, disabled, theme }) => {
    switch (true) {
      case disabled:
        return theme.color.textSecondary.alpha(0.8).toString();
      case !disabled && typeof color === 'undefined':
      default:
        return theme.color.textPrimary.toString();
    }
  }};
`;

const ButtonContainer: React.ForwardRefRenderFunction<HTMLButtonElement, ButtonContainerProps> = (
  props,
  ref,
) => {
  const { children, ...nativeProps } = props;

  return (
    <StyledButton {...nativeProps} ref={ref}>
      {children}
    </StyledButton>
  );
};

export default React.forwardRef(ButtonContainer);
