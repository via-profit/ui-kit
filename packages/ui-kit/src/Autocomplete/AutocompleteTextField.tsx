import React from 'react';

import TextField, { TextFieldProps } from '../TextField';
import styled from '@emotion/styled';
import TextFieldInputWrapper, {
  TextFieldInputWrapperProps,
} from '../TextField/TextFieldInputWrapper';
import { css } from '@emotion/react';

export interface AutocompleteTextFieldProps extends TextFieldProps {
  /**
   * Text field loading state\
   * If `true` then text field has been contained the loading indicator, otherwise - nop
   */
  readonly isLoading?: boolean;

  /**
   * Native <input> element reference
   */
  readonly inputRef?:
    | React.MutableRefObject<HTMLInputElement | null>
    | React.RefCallback<HTMLInputElement>;
}

const StyledTextFieldInputWrapper = styled(TextFieldInputWrapper)<TextFieldInputWrapperProps>`
  border-width: 1px;
  border-style: solid;
  border-color: ${({ theme }) =>
    theme.isDark
      ? theme.color.textPrimary.darken(100).toString()
      : theme.color.textPrimary.lighten(150).toString()};

  ${({ focused }) =>
    focused &&
    css`
      outline: none;
    `};
`;

const StyledTextField = styled(TextField)<TextFieldProps>`
  &[data-popper-placement='bottom-fill'] {
    ${StyledTextFieldInputWrapper} {
      border-bottom-left-radius: 0;
      border-bottom-right-radius: 0;
      border-bottom: 0;
    }
  }

  &[data-popper-placement='top-fill'] {
    ${StyledTextFieldInputWrapper} {
      border-top-left-radius: 0;
      border-top-right-radius: 0;
      border-top: 0;
    }
  }
`;

const InputWrapper = React.forwardRef(function StyledInputWrapper(
  props: TextFieldInputWrapperProps,
  ref: React.ForwardedRef<HTMLDivElement>,
) {
  return <StyledTextFieldInputWrapper ref={ref} {...props} />;
});

const AutocompleteTextField: React.ForwardRefRenderFunction<
  HTMLDivElement,
  AutocompleteTextFieldProps
> = (props, ref) => <StyledTextField overrides={{ InputWrapper }} {...props} ref={ref} />;

export default React.forwardRef(AutocompleteTextField);
