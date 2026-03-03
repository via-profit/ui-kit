import React from 'react';
import styled from '@emotion/styled';
import { css } from '@emotion/react';

import TextField, { TextFieldProps } from '../TextField';
import TextFieldInputWrapper, {
  TextFieldInputWrapperProps,
} from '../TextField/TextFieldInputWrapper';
import { AnchorPos } from '../Menu';

export interface AutocompleteTextFieldProps extends TextFieldProps {
  /**
   * Text field loading state\
   * If `true` then text field has been contained the loading indicator, otherwise - nop
   */
  readonly isLoading?: boolean;

  readonly anchorPos?: AnchorPos;

  readonly isOpen?: boolean;

  /**
   * Native <input> element reference
   */
  readonly inputRef?:
    | React.MutableRefObject<HTMLInputElement | null>
    | React.RefCallback<HTMLInputElement>;
}

const StyledTextFieldInputWrapper = styled(TextFieldInputWrapper)<{
  $anchorPos?: AnchorPos;
  $isOpen?: boolean;
}>`
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

  ${({ focused, $anchorPos, $isOpen }) =>
    $isOpen &&
    $anchorPos &&
    ['bottom-fill', 'top-fill'].includes($anchorPos) &&
    focused &&
    css`
      outline: none;
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

type InputWrapperProps = TextFieldInputWrapperProps;

type ContextState = {
  readonly anchorPos?: AnchorPos;
  readonly isOpen?: boolean;
};
const WrapperContext = React.createContext<ContextState>({ anchorPos: undefined, isOpen: false });

const InputWrapper = React.forwardRef(function StyledInputWrapper(
  props: InputWrapperProps,
  ref: React.ForwardedRef<HTMLDivElement>,
) {
  const ctx = React.useContext(WrapperContext);
  const { anchorPos, isOpen } = ctx;

  return (
    <StyledTextFieldInputWrapper $anchorPos={anchorPos} $isOpen={isOpen} ref={ref} {...props} />
  );
});

const AutocompleteTextField: React.ForwardRefRenderFunction<
  HTMLDivElement,
  AutocompleteTextFieldProps
> = (props, ref) => {
  const { anchorPos, isOpen, ...restProps } = props;

  return (
    <WrapperContext.Provider value={{ anchorPos, isOpen }}>
      <TextField
        overrides={{
          InputWrapper,
        }}
        {...restProps}
        ref={ref}
      />
    </WrapperContext.Provider>
  );
};

export default React.forwardRef(AutocompleteTextField);
