import React from 'react';
import styled from '@emotion/styled';
import { css } from '@emotion/react';

import ButtonBase from './ButtonBase';
import type { ButtonAccentProps } from '@via-profit/ui-kit/Button/ButtonAccent';

const Button = styled(ButtonBase)`
  color: ${({ theme, disabled }) =>
    disabled
      ? theme.colors.textPrimary.alpha(0.4).toString()
      : theme.colors.accentPrimaryContrast.toString()};
  background-color: ${({ theme, disabled }) =>
    disabled ? theme.colors.surface.darken(30).toString() : theme.colors.accentPrimary.toString()};

  ${({ disabled, theme }) =>
    !disabled &&
    css`
      box-shadow: 0 2px 12px ${theme.colors.accentPrimary.darken(60).alpha(0.3).toString()};
      &:hover {
        background-color: ${theme.colors.accentPrimary.darken(20).toString()};
      }
      &:active {
        background-color: ${theme.colors.accentPrimary.darken(30).toString()};
      }
      &:focus-visible {
        outline: 2px solid ${theme.colors.accentPrimary.darken(20).toString()};
      }
    `};
`;

const ButtonAccent: React.ForwardRefRenderFunction<HTMLButtonElement, ButtonAccentProps> = (
  props,
  ref,
) => {
  const { children, ...restProps } = props;

  return (
    <Button {...restProps} ref={ref}>
      {children}
    </Button>
  );
};

export default React.forwardRef(ButtonAccent);
