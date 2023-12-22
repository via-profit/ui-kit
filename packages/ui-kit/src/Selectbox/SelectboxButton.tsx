import * as React from 'react';
import styled from '@emotion/styled';
import { css } from '@emotion/react';

import Button, { ButtonProps } from '../Button';
import ButtonTextWrapper from '../Button/ButtonTextWrapper';

export type SelectboxButtonProps = Omit<ButtonProps, 'type'> & {
  readonly fullWidth?: boolean;
  readonly error?: boolean;
};

type StyleProps = {
  readonly $fullWidth?: boolean;
  readonly $focused?: boolean;
  readonly $error?: boolean;
};

const StyledSelectboxButton = styled(Button)<StyleProps>`
  width: 100%;
  flex: 1;
  border: 1px solid;
  outline: 1px solid transparent;
  padding: 1em 1.2em;
  border-color: ${({ theme }) =>
    theme.isDark
      ? theme.color.textPrimary.darken(100).toString()
      : theme.color.textPrimary.lighten(150).toString()};
  width: ${({ $fullWidth }) => ($fullWidth ? '100%' : 'auto')};
  font-size: 1em;
  background-color: ${({ theme }) => theme.color.surface.toString()};
  color: ${({ theme }) => theme.color.textPrimary.toString()};
  transition: all 180ms ease-out 0s;

  ${props =>
    props.$focused &&
    css`
      border-color: ${props.theme.color.accentPrimary.lighten(10).toString()};
      outline-color: ${props.theme.color.accentPrimary.lighten(10).toString()};
    `};
  ${props =>
    props.$error &&
    css`
      border-color: ${props.theme.color.error.toString()};
      color: ${props.theme.color.error.toString()};
      &:focus {
        border-color: ${props.theme.color.error.lighten(0.6).toString()};
      }
    `}
`;

const StyledButtonTextWrapper = styled(ButtonTextWrapper)`
  flex: 1;
`;

const SelectboxButton: React.ForwardRefRenderFunction<HTMLButtonElement, SelectboxButtonProps> = (
  props,
  ref,
) => {
  const { children, fullWidth, error, ...nativeProps } = props;

  return (
    <StyledSelectboxButton
      $fullWidth={fullWidth}
      $error={error}
      {...nativeProps}
      overrides={{
        TextWrapper: React.forwardRef(function SelectboxButtonTextWrapper(p, r) {
          return <StyledButtonTextWrapper {...p} ref={r} />;
        }),
      }}
      ref={ref}
    >
      {children}
    </StyledSelectboxButton>
  );
};

export default React.forwardRef(SelectboxButton);
