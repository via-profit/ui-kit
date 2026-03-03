import * as React from 'react';
import styled from '@emotion/styled';

import Button, { ButtonProps } from '../Button';
import ButtonTextWrapper from '../Button/ButtonTextWrapper';
import { css } from '@emotion/react';

export type SelectboxButtonProps = Omit<ButtonProps, 'type'> & {
  readonly fullWidth?: boolean;
  readonly error?: boolean;
};

type StyleProps = {
  readonly $fullWidth?: boolean;
  readonly $error?: boolean;
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
  &[data-popper-placement='bottom-fill'] {
    border-bottom-left-radius: 0;
    border-bottom-right-radius: 0;
    border-bottom-width: 0;
  }

  &[data-popper-placement='top-fill'] {
    border-top-left-radius: 0;
    border-top-right-radius: 0;
    border-top-width: 0;
  }
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
        TextWrapper: StyledButtonTextWrapper,
      }}
      ref={ref}
    >
      {children}
    </StyledSelectboxButton>
  );
};

export default React.forwardRef(SelectboxButton);
