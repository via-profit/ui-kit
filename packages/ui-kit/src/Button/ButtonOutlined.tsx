import React from 'react';
import styled from '@emotion/styled';
import { css } from '@emotion/react';

import ButtonBase from './ButtonBase';
import type { ButtonOutlinedProps } from '@via-profit/ui-kit/Button/ButtonOutlined';

/**
 * Outlined
 */

const StyledOutlinedButton = styled(ButtonBase)`
  color: ${({ theme, disabled }) =>
    disabled
      ? theme.colors.textPrimary.alpha(0.4).toString()
      : theme.colors.textPrimary.toString()};
  border-color: ${({ theme, disabled }) =>
    disabled
      ? theme.colors.surface.darken(80).alpha(0.4).toString()
      : theme.colors.accentPrimary.toString()};
  background-color: none;
  border-style: solid;
  border-width: 0.14em;
  ${({ disabled, theme }) =>
    !disabled &&
    css`
      &:hover {
        background-color: ${theme.colors.accentPrimary.lighten(20).alpha(0.1).toString()};
      }
      &:active {
        background-color: ${theme.colors.accentPrimary.lighten(20).alpha(0.5).toString()};
      }
      &:focus-visible {
        outline-color: ${theme.colors.accentSecondary.toString()};
      }
    `}
`;

const ButtonOutlined: React.ForwardRefRenderFunction<HTMLButtonElement, ButtonOutlinedProps> = (
  props,
  ref,
) => {
  const { children, disabled, ...restProps } = props;

  return (
    <StyledOutlinedButton disabled={disabled} {...restProps} ref={ref}>
      {children}
    </StyledOutlinedButton>
  );
};

export default React.forwardRef(ButtonOutlined);
