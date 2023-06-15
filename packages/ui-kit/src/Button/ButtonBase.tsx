import React from 'react';
import styled from '@emotion/styled';

import ButtonStartIconWrapper from './ButtonStartIconWrapper';
import ButtonEndIconWrapper from './ButtonEndIconWrapper';
import ButtonTextWrapper from './ButtonTextWrapper';

import type { ButtonBaseProps } from '@via-profit/ui-kit/Button/ButtonBase';

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
