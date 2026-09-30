import React from 'react';
import MaskedField, { Mask } from '@via-profit/ui-kit/src/MaskedField';
import { FormattedMessage } from 'react-intl';

const dateMask: Mask = [/\d/, /\d/, '.', /\d/, /\d/, '.', /\d/, /\d/, /\d/, /\d/];

const ExampleMaskedFieldValidation: React.FC = () => {
  const [value, setValue] = React.useState('');
  const [isValid, setIsValid] = React.useState(false);
  const [isTouched, setIsTouched] = React.useState(false);

  return (
    <MaskedField
      label={<FormattedMessage defaultMessage="Дата рождения" />}
      placeholder="ДД.ММ.ГГГГ"
      mask={dateMask}
      value={value}
      error={isTouched && value !== '' && !isValid}
      errorText={<FormattedMessage defaultMessage="Введите дату полностью" />}
      onBlur={() => setIsTouched(true)}
      onChange={payload => {
        setValue(payload.text);
        setIsValid(payload.isValid);
      }}
    />
  );
};

export default ExampleMaskedFieldValidation;
