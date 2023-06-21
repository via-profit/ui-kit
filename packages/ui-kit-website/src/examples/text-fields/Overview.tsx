import React from 'react';
import TextField from '@via-profit/ui-kit/src/TextField';
import TextFieldIconWrapper from '@via-profit/ui-kit/src/TextField/TextFieldIconWrapper';
import TextFieldInputWrapper from '@via-profit/ui-kit/src/TextField/TextFieldInputWrapper';
import styled from '@emotion/styled';

const IconWrapper = styled(TextFieldIconWrapper)`
  padding: 0 0.4em;
  margin: 0;
  user-select: none;
  cursor: default;
`;

const InputWrapper = styled(TextFieldInputWrapper)<{ focused?: boolean }>`
  border-radius: ${({ theme }) => theme.shape.radiusFactor * 3}em;
  background-color: ${({ theme }) => theme.colors.surface.darken(10).toString()};
  & .text-field-input {
    box-shadow: inset 0.2em 0.2em 0.2em
      ${({ theme }) => theme.colors.surface.darken(300).alpha(0.15).toString()};
    border: 0.2em solid
      ${({ theme, focused }) => (focused ? theme.colors.accentSecondary.toString() : 'transparent')};
    background-color: ${({ theme }) => theme.colors.surface.toString()};
    padding: 1em 1.2em;
  }
`;

const TextFieldsOverview: React.FC = () => {
  const validate = React.useCallback(
    (value: string): boolean => value.toLowerCase() === 'potato',
    [],
  );
  const [value, setValue] = React.useState('potato');
  const [isValid, setValidate] = React.useState(validate(value));
  const inputRef = React.useRef<HTMLInputElement | null>(null);

  return (
    <>
      <TextField
        label="label"
        placeholder="Potato"
        errorText="Error text"
        error={!isValid}
        value={value}
        onChange={event => {
          const newValue = event.currentTarget.value;
          setValue(newValue);
          setValidate(validate(newValue));
        }}
      />

      <TextField
        label="Адрес сайта"
        defaultValue="Some text"
        startIcon={<>www.</>}
        inputRef={inputRef}
        components={{
          IconWrapper: React.forwardRef(function Wrapper(props, ref) {
            const { children, position, focused, error, ...restProps } = props;

            return (
              <IconWrapper
                onClick={() => inputRef?.current?.focus()}
                position={position}
                ref={ref}
                {...restProps}
              >
                {children}
              </IconWrapper>
            );
          }),
          InputWrapper: React.forwardRef(function Wrapper(props, ref) {
            const { children, focused, error, ...restProps } = props;

            return (
              <InputWrapper focused={focused} ref={ref} {...restProps}>
                {children}
              </InputWrapper>
            );
          }),
        }}
      />
    </>
  );
};

export default TextFieldsOverview;
