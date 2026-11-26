import * as React from 'react';
import styled from '@emotion/styled';

import Button, { ButtonProps } from '../Button';
import ButtonTextWrapper from '../Button/ButtonTextWrapper';
import { css } from '@emotion/react';
import { AnchorPos } from '../Menu';
import {
  fieldPadding,
  CONTROL_LINE_HEIGHT,
  FIELD_TEXT_SCALE,
  fieldBorder,
} from '../ThemeProvider/tokens';

export type SelectboxButtonProps = Omit<ButtonProps, 'type'> & {
  readonly fullWidth?: boolean;
  readonly error?: boolean;
  readonly anchorPos?: AnchorPos;
  readonly isOpen?: boolean;
};

type StyleProps = {
  readonly $fullWidth?: boolean;
  readonly $error?: boolean;
  readonly $isOpen?: boolean;
};

const StyledSelectboxButton = styled(Button)<StyleProps>`
  flex: 1;
  padding: ${({ theme }) => {
    const { y, x } = fieldPadding(theme, FIELD_TEXT_SCALE);

    return `${y} ${x}`;
  }};
  font-size: 1em;
  /* The line of the control: the selectbox has the height of the button */
  line-height: calc(${CONTROL_LINE_HEIGHT} / ${FIELD_TEXT_SCALE});
  background: none;
  width: 100%;
  border-width: ${fieldBorder(FIELD_TEXT_SCALE)};
  border-style: solid;
  box-shadow: none;
  &:hover {
    box-shadow: none;
  }
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
`;

// The value has the size of the text in the fields, so the selectbox has the height of the TextField
const StyledButtonTextWrapper = styled(ButtonTextWrapper)`
  flex: 1;
  font-size: 1em;
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
