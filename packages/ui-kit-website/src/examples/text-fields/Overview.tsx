import React from 'react';
import TextField from '@via-profit/ui-kit/src/TextField';

const TextFieldsOverview: React.FC = () => {
  const validate = React.useCallback(
    (value: string): boolean => value.toLowerCase() === 'potato',
    [],
  );
  const [value, setValue] = React.useState('potato');
  const [isValid, setValidate] = React.useState(validate(value));

  return (
    <TextField
      label="label"
      errorText="Error text"
      error={!isValid}
      value={value}
      onChange={event => {
        const newValue = event.currentTarget.value;
        setValue(newValue);
        setValidate(validate(newValue));
      }}
    />
  );
};

export default TextFieldsOverview;
