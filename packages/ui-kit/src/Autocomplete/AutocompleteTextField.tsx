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

const InputWrapper = React.forwardRef(function StyledInputWrapper(
  props: TextFieldInputWrapperProps & {
    readonly anchorPos?: AnchorPos;
    readonly isOpen?: boolean;
  },
  ref: React.ForwardedRef<HTMLDivElement>,
) {
  const { anchorPos, isOpen, ...restProps } = props;

  return (
    <StyledTextFieldInputWrapper $anchorPos={anchorPos} $isOpen={isOpen} ref={ref} {...restProps} />
  );
});

const AutocompleteTextField: React.ForwardRefRenderFunction<
  HTMLDivElement,
  AutocompleteTextFieldProps
> = (props, ref) => {
  const { anchorPos, isOpen, ...restProps } = props;

  return (
    <TextField
      overrides={{
        InputWrapper: p => <InputWrapper anchorPos={anchorPos} isOpen={isOpen} {...p} />,
      }}
      {...restProps}
      ref={ref}
    />
  );
};

export default React.forwardRef(AutocompleteTextField);
