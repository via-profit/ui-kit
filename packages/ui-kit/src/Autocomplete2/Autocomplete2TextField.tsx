import * as React from 'react';
import TextField from '../TextField';

export type Autocomplete2TextFieldProps = {
  readonly value: string;
  readonly onChange: (value: string) => void;
};

const Autocomplete2TextField = React.forwardRef(
  (props: Autocomplete2TextFieldProps, ref: React.ForwardedRef<HTMLDivElement>) => {
    const { value, onChange } = props;

    const handleChange: React.ChangeEventHandler<HTMLInputElement> = React.useCallback(
      event => {
        onChange(event.target.value);
      },
      [onChange],
    );

    return <TextField value={value} onChange={handleChange} ref={ref} />;
  },
);

Autocomplete2TextField.displayName = 'Autocomplete2TextField';

export default Autocomplete2TextField;
