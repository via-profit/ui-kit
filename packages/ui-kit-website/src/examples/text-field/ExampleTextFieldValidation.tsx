import React from 'react';
import TextField from '@via-profit/ui-kit/src/TextField';
import { FormattedMessage } from 'react-intl';

const isEmail = (value: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);

const ExampleTextFieldValidation: React.FC = () => {
  const [value, setValue] = React.useState('');
  const [isTouched, setIsTouched] = React.useState(false);
  const error = isTouched && !isEmail(value);

  return (
    <TextField
      type="email"
      label="E-mail"
      requiredAsterisk
      placeholder="name@example.com"
      value={value}
      error={error}
      errorText={
        value === '' ? (
          <FormattedMessage defaultMessage="Укажите адрес электронной почты" />
        ) : (
          <FormattedMessage defaultMessage="Адрес указан неверно" />
        )
      }
      onChange={event => setValue(event.currentTarget.value)}
      onBlur={() => setIsTouched(true)}
    />
  );
};

export default ExampleTextFieldValidation;
