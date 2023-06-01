import React from 'react';
import styled from '@emotion/styled';

import ButtonBase from './ButtonBase';

/**
 * Standard
 */
export type ButtonStandardProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  /**
   * Starticon
   */
  readonly startIcon?: JSX.Element;
  readonly endIcon?: JSX.Element;
};

const Button = styled(ButtonBase)`
  color: ${({ theme }) => theme.colors.textPrimary.toString()};
  background-color: ${({ theme }) =>
    theme.isDark
      ? theme.colors.backgroundPrimary.lighten(20).toString()
      : theme.colors.backgroundPrimary.toString()};
  box-shadow: 0 2px 12px
    ${({ theme }) => theme.colors.backgroundPrimary.darken(40).alpha(0.6).toString()};
  &:hover {
    background-color: ${({ theme }) => theme.colors.backgroundPrimary.darken(0.05).toString()};
  }
  &:active {
    background-color: ${({ theme }) => theme.colors.backgroundPrimary.darken(0.1).toString()};
  }
  &:focus-visible {
    outline: 2px solid ${({ theme }) => theme.colors.accentPrimary.toString()};
  }
`;

const StartIconWrapper = styled.span`
  margin-right: 0.8em;
`;

const EndIconWrapper = styled.span`
  margin-left: 0.8em;
`;

const ButtonStandard: React.ForwardRefRenderFunction<HTMLButtonElement, ButtonStandardProps> = (
  props,
  ref,
) => {
  const { children, startIcon, endIcon, ...otherProps } = props;

  return (
    <Button {...otherProps} ref={ref}>
      {typeof startIcon !== 'undefined' && startIcon !== null && (
        <StartIconWrapper>{startIcon}</StartIconWrapper>
      )}
      {children}
      {typeof endIcon !== 'undefined' && endIcon !== null && (
        <EndIconWrapper>{endIcon}</EndIconWrapper>
      )}
    </Button>
  );
};

export default React.forwardRef(ButtonStandard);
