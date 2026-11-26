import * as React from 'react';
import styled from '@emotion/styled';
import { css } from '@emotion/react';

import { fieldPadding, FIELD_TEXT_SCALE } from '../ThemeProvider/tokens';

export interface TextAreaInputProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  readonly hasStartIcon: boolean;
  readonly hasEndIcon: boolean;
}

const TextareaNative = styled.textarea<{
  readonly $hasStartIcon: boolean;
  readonly $hasEndIcon: boolean;
}>`
  resize: none;
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
  width: ${({ cols }) => (typeof cols !== 'undefined' ? 'auto' : '100%')};
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

const TextAreaInput: React.ForwardRefRenderFunction<HTMLTextAreaElement, TextAreaInputProps> = (
  props,
  ref,
) => {
  const { hasEndIcon, hasStartIcon, ...nativeProps } = props;

  return (
    <TextareaNative
      {...nativeProps}
      $hasEndIcon={hasEndIcon}
      $hasStartIcon={hasStartIcon}
      ref={ref}
    />
  );
};

export default React.forwardRef(TextAreaInput);
