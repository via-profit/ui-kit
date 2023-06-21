import React from 'react';
import styled from '@emotion/styled';
import TextField from '@via-profit/ui-kit/src/TextField';
import type { TextFieldInputWrapperProps } from '@via-profit/ui-kit/src/TextField/TextFieldInputWrapper';

const StyledInputWrapper = styled.div`
  background-color: #c5d4fd;
  color: #6305ce;
  border-radius: 0.3em;
`;

const InputWrapper: React.ForwardRefRenderFunction<HTMLDivElement, TextFieldInputWrapperProps> = (
  props,
  ref,
) => {
  const { focused, fullWidth, readOnly, children, error, ...nativeProps } = props;

  return (
    <StyledInputWrapper {...nativeProps} ref={ref}>
      {children}
    </StyledInputWrapper>
  );
};

const TextFieldsOverrides: React.FC = () => (
  <TextField
    label="Имя:"
    components={{
      InputWrapper: React.forwardRef(InputWrapper),
    }}
  />
);

export default TextFieldsOverrides;
