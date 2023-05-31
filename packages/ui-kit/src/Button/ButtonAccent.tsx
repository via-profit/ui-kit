import React from 'react';
import styled from '@emotion/styled';

import ButtonBase from './ButtonBase';

export type ButtonAccentProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  readonly startIcon?: JSX.Element;
  readonly endIcon?: JSX.Element;
};

const Button = styled(ButtonBase)`
  color: ${({ theme }) => theme.colors.accentPrimaryContrast.toString()};
  background-color: ${({ theme }) => theme.colors.accentPrimary.toString()};
  box-shadow: 0 2px 12px
    ${({ theme }) => theme.colors.accentPrimary.darken(0.6).alpha(0.3).toString()};
  &:hover {
    background-color: ${({ theme }) => theme.colors.accentPrimary.darken(0.1).toString()};
  }
  &:active {
    background-color: ${({ theme }) => theme.colors.accentPrimary.darken(0.2).toString()};
  }
  &:focus-visible {
    outline: 2px solid ${({ theme }) => theme.colors.accentPrimary.darken(0.3).toString()};
  }
`;

const StartIconWrapper = styled.span`
  margin-right: 0.8em;
`;

const EndIconWrapper = styled.span`
  margin-left: 0.8em;
`;

const ButtonAccent: React.ForwardRefRenderFunction<HTMLButtonElement, ButtonAccentProps> = (
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

export default React.forwardRef(ButtonAccent);
