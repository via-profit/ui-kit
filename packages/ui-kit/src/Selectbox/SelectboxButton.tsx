import * as React from 'react';
import styled from '@emotion/styled';

import Button, { ButtonProps } from '../Button';
import ButtonTextWrapper from '../Button/ButtonTextWrapper';
import { css } from '@emotion/react';
import { AnchorPos } from '../Menu';

export type SelectboxButtonProps = Omit<ButtonProps, 'type'> & {
  readonly fullWidth?: boolean;
  readonly error?: boolean;
  readonly anchorPos?: AnchorPos;
  readonly isOpen?: boolean;
};

type StyleProps = {
  readonly $fullWidth?: boolean;
  readonly $error?: boolean;
  readonly $anchorPos?: AnchorPos;
  readonly $isOpen?: boolean;
};

const StyledSelectboxButton = styled(Button)<StyleProps>`
  flex: 1;
  padding: 1em 1.2em;
  font-size: 1em;
  background: none;
  width: 100%;
  border-width: 1px;
  border-style: solid;
  border-color: ${({ theme }) =>
    theme.isDark
      ? theme.color.textPrimary.darken(100).toString()
      : theme.color.textPrimary.lighten(150).toString()};
  ${props =>
    props.$error &&
    css`
      border-color: ${props.theme.color.error.toString()};
      color: ${props.theme.color.error.toString()};
      &:focus {
        border-color: ${props.theme.color.error.lighten(0.6).toString()};
      }
    `}
  transition: none;
  ${({ theme, $isOpen, $anchorPos }) =>
    $isOpen &&
    $anchorPos &&
    ['bottom-fill', 'top-fill'].includes($anchorPos) &&
    css`
      border-width: 1px;
      border-style: solid;
      border-color: ${theme.isDark
        ? theme.color.textPrimary.darken(100).toString()
        : theme.color.textPrimary.lighten(150).toString()};
    `};

  ${({ $anchorPos, $isOpen }) =>
    $isOpen &&
    $anchorPos === 'bottom-fill' &&
    css`
      border-bottom-left-radius: 0;
      border-bottom-right-radius: 0;
      border-bottom: 0;
    `};

  ${({ $anchorPos, $isOpen }) =>
    $isOpen &&
    $anchorPos === 'top-fill' &&
    css`
      border-top-left-radius: 0;
      border-top-right-radius: 0;
      border-top: 0;
    `};
`;

const StyledButtonTextWrapper = styled(ButtonTextWrapper)`
  flex: 1;
`;

const SelectboxButton: React.ForwardRefRenderFunction<HTMLButtonElement, SelectboxButtonProps> = (
  props,
  ref,
) => {
  const { children, fullWidth, error, anchorPos, isOpen, ...nativeProps } = props;

  return (
    <StyledSelectboxButton
      $fullWidth={fullWidth}
      $error={error}
      {...nativeProps}
      $isOpen={isOpen}
      $anchorPos={anchorPos}
      overrides={{
        TextWrapper: StyledButtonTextWrapper,
      }}
      ref={ref}
    >
      {children}
    </StyledSelectboxButton>
  );
};

export default React.forwardRef(SelectboxButton);
