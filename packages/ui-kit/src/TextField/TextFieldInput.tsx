import * as React from 'react';
import styled from '@emotion/styled';
import { css } from '@emotion/react';

import { CLASSNAME_PREFIX } from '../constants';

export interface TextFieldInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  readonly hasStartIcon: boolean;
  readonly hasEndIcon: boolean;
}

const Input = styled.input<{
  readonly $hasStartIcon: boolean;
  readonly $hasEndIcon: boolean;
}>`
  padding: 1em 1.2em;
  font-size: 1em;
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

const TextFieldInput: React.ForwardRefRenderFunction<HTMLInputElement, TextFieldInputProps> = (
  props,
  ref,
) => {
  const { hasEndIcon, hasStartIcon, ...nativeProps } = props;

  return (
    <Input
      {...nativeProps}
      $hasEndIcon={hasEndIcon}
      $hasStartIcon={hasStartIcon}
      className={`${CLASSNAME_PREFIX} text-field-input ${nativeProps.className || ''}`.trim()}
      ref={ref}
    />
  );
};

export default React.forwardRef(TextFieldInput);
