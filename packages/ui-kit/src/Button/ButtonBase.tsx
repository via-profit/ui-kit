import React from 'react';
import styled from '@emotion/styled';

import ButtonStartIconWrapper from './ButtonStartIconWrapper';
import ButtonEndIconWrapper from './ButtonEndIconWrapper';
import ButtonTextWrapper from './ButtonTextWrapper';

type ButtonNativeProps = React.ButtonHTMLAttributes<HTMLButtonElement>;

export interface ButtonBaseProps extends Omit<ButtonNativeProps, 'color'> {
  /**
   * Icon or another JSX element placed before button label\
   * Example:
   * ```tsx
   * <Button startIcon={<MyIconElement />}>
   *   Label
   * </Button>
   * ```
   */
  readonly startIcon?: JSX.Element;

  /**
   * Icon or another JSX element placed after button label
   * Example:
   * ```tsx
   * <Button endIcon={<MyIconElement />}>
   *   Label
   * </Button>
   * ```
   */
  readonly endIcon?: JSX.Element;

  /**
   * You can pass the primary, default, secondary name of the colors or your specified color value
   */
  readonly color?: 'default' | 'primary' | 'secondary' | string;
}

type StyledProps = {
  readonly color?: ButtonBaseProps['color'];
};

const Button = styled.button<StyledProps>`
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
        return theme.colors.textSecondary.alpha(0.8).toString();
      case !disabled && typeof color === 'undefined':
      default:
        return theme.colors.textPrimary.toString();
    }
  }};
`;

const ButtonBase: React.ForwardRefRenderFunction<HTMLButtonElement, ButtonBaseProps> = (
  props,
  ref,
) => {
  const { children, startIcon, endIcon, color, ...otherProps } = props;

  return (
    <Button {...otherProps} ref={ref}>
      {typeof startIcon !== 'undefined' && startIcon !== null && (
        <ButtonStartIconWrapper>{startIcon}</ButtonStartIconWrapper>
      )}

      <ButtonTextWrapper>{children}</ButtonTextWrapper>
      {typeof endIcon !== 'undefined' && endIcon !== null && (
        <ButtonEndIconWrapper>{endIcon}</ButtonEndIconWrapper>
      )}
    </Button>
  );
};

export default React.forwardRef(ButtonBase);
