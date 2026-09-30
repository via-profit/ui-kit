import React from 'react';
import PhoneField from '@via-profit/ui-kit/src/PhoneField';
import templates from '@via-profit/ui-kit/src/PhoneField/templates';
import { FormattedMessage } from 'react-intl';

const ExamplePhoneFieldValidation: React.FC = () => {
  const [value, setValue] = React.useState('');
  const [isValid, setIsValid] = React.useState(false);
  const [isTouched, setIsTouched] = React.useState(false);

  return (
    <PhoneField
      label={<FormattedMessage defaultMessage="Телефон для связи" />}
      requiredAsterisk
      templates={templates}
      value={value}
      error={isTouched && !isValid}
      errorText={<FormattedMessage defaultMessage="Введите номер полностью" />}
      onBlur={() => setIsTouched(true)}
      onChange={(_event, payload) => {
        setValue(payload.value);
        setIsValid(payload.isValid);
      }}
    />
  );
};

export default ExamplePhoneFieldValidation;
