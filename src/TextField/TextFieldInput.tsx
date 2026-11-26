import * as React from 'react';
import styled from '@emotion/styled';
import { css } from '@emotion/react';

import { fieldPadding, FIELD_TEXT_SCALE } from '../ThemeProvider/tokens';

export interface TextFieldInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  readonly hasStartIcon: boolean;
  readonly hasEndIcon: boolean;
}

const Input = styled.input<{
  readonly $hasStartIcon: boolean;
  readonly $hasEndIcon: boolean;
}>`
  padding: ${({ theme }) => {
    const { y, x } = fieldPadding(theme, FIELD_TEXT_SCALE);

    return `${y} ${x}`;
  }};
  font-size: 1em;
  line-height: inherit;
  /* Form controls do not inherit the font by default (textarea is monospace) */
  font-family: inherit;
  background: none;
  border-radius: inherit;
  margin: 0;
  border: 0;
  width: 100%;
  color: currentColor;
  ${({ $hasStartIcon }) =>
    $hasStartIcon &&
    css`
      padding-left: 0;
    `};
  ${({ $hasEndIcon }) =>
    $hasEndIcon &&
    css`
      padding-right: 0;
    `};
  &:focus {
    outline: none;
  }
  &::placeholder {
    font-style: italic;
  }
`;

export const TextFieldInput = React.forwardRef(
  (props: TextFieldInputProps, ref: React.ForwardedRef<HTMLInputElement>) => {
    const { hasEndIcon, hasStartIcon, ...nativeProps } = props;

    return (
      <Input {...nativeProps} $hasEndIcon={hasEndIcon} $hasStartIcon={hasStartIcon} ref={ref} />
    );
  },
);

TextFieldInput.displayName = 'TextFieldInput';

export default TextFieldInput;
