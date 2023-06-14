import React from 'react';
import styled from '@emotion/styled';
import { css } from '@emotion/react';

import ButtonBase from './ButtonBase';
import type { ButtonStandardProps } from '@via-profit/ui-kit/Button/ButtonStandard';

/**
 * Standard
 */

const StyledButtonBase = styled(ButtonBase)`
  color: ${({ theme, disabled }) =>
    disabled
      ? theme.colors.textPrimary.alpha(0.4).toString()
      : theme.colors.textPrimary.toString()};
  background-color: ${({ theme, disabled }) =>
    disabled
      ? theme.colors.surface.darken(10).toString()
      : theme.isDark
      ? theme.colors.surface.toString()
      : theme.colors.surface.toString()};

  ${({ disabled, theme }) =>
    !disabled &&
    css`
      box-shadow: 0 2px 12px ${theme.colors.surface.darken(40).alpha(0.6).toString()};
      &:hover {
        background-color: ${theme.colors.surface.darken(20).toString()};
      }
      &:active {
        background-color: ${theme.colors.surface.darken(40).toString()};
      }
      &:focus-visible {
        outline: 2px solid ${theme.colors.accentPrimary.toString()};
      }
    `}
`;

const ButtonStandard: React.ForwardRefRenderFunction<HTMLButtonElement, ButtonStandardProps> = (
  props,
  ref,
) => {
  const { children, disabled, ...restProps } = props;

  return (
    <StyledButtonBase disabled={disabled} {...restProps} ref={ref}>
      {children}
    </StyledButtonBase>
  );
};

export default React.forwardRef(ButtonStandard);
