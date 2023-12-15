import * as React from 'react';
import styled from '@emotion/styled';
import { css } from '@emotion/react';

export interface TextAreaInputProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  readonly hasStartIcon: boolean;
  readonly hasEndIcon: boolean;
}

const TextareaNative = styled.textarea<{
  readonly $hasStartIcon: boolean;
  readonly $hasEndIcon: boolean;
}>`
  resize: none;
  padding: 1em 1.2em;
  font-size: 1em;
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
