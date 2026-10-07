import * as React from 'react';
import styled from '@emotion/styled';
import { css } from '@emotion/react';

import { CONTROL_LINE_HEIGHT, FIELD_TEXT_SCALE, fieldBorder } from '../ThemeProvider/tokens';

export type TextFieldInputWrapperProps = React.HTMLAttributes<HTMLDivElement> & {
  readonly error?: boolean;
  readonly fullWidth?: boolean;
  readonly readOnly?: boolean;
  readonly focused?: boolean;
  readonly disabled?: boolean;
};

const Wrapper = styled.div<{
  $error?: boolean;
  $readOnly?: boolean;
  $fullWidth?: boolean;
  $focused?: boolean;
  $disabled?: boolean;
}>`
  display: flex;
  align-items: stretch;
  border-radius: ${({ theme }) => theme.shape.radiusFactor * 2}em;
  border: ${fieldBorder(FIELD_TEXT_SCALE)} solid;
  outline: 1px solid transparent;
  border-color: ${({ theme }) =>
    theme.isDark
      ? theme.color.textPrimary.darken(100).toString()
      : theme.color.textPrimary.lighten(150).toString()};
  width: ${({ $fullWidth }) => ($fullWidth ? '100%' : 'auto')};
  font-size: ${FIELD_TEXT_SCALE}em;
  /* The line of the control: the field has the height of the button */
  line-height: calc(${CONTROL_LINE_HEIGHT} / ${FIELD_TEXT_SCALE});
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
  ${props =>
    props.$disabled &&
    css`
      color: ${props.theme.color.textPrimary.alpha(0.4).toString()};
      cursor: not-allowed;

      & input,
      & textarea {
        cursor: not-allowed;
      }
    `}
`;

export const TextFieldInputWrapper = React.forwardRef(
  (props: TextFieldInputWrapperProps, ref: React.ForwardedRef<HTMLDivElement>) => {
    const { focused, error, readOnly, fullWidth, disabled, children, ...nativeProps } = props;

    return (
      <Wrapper
        {...nativeProps}
        $error={error}
        $focused={focused}
        $readOnly={readOnly}
        $fullWidth={Boolean(fullWidth)}
        $disabled={disabled}
        ref={ref}
      >
        {children}
      </Wrapper>
    );
  },
);

TextFieldInputWrapper.displayName = 'TextFieldInputWrapper';

export default TextFieldInputWrapper;
