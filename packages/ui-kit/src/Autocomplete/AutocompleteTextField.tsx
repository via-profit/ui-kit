import React from 'react';

import TextField, { TextFieldProps } from '../TextField';

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

const AutocompletetextField: React.ForwardRefRenderFunction<
  HTMLDivElement,
  AutocompleteTextFieldProps
> = (props, ref) => <TextField {...props} ref={ref} />;

export default React.forwardRef(AutocompletetextField);
