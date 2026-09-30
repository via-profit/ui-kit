import React from 'react';
import TextField from '@via-profit/ui-kit/src/TextField';
import { FormattedMessage, useIntl } from 'react-intl';

const ExampleTextFieldOverview: React.FC = () => {
  const intl = useIntl();
  const [value, setValue] = React.useState('');

  return (
    <TextField
      label={<FormattedMessage defaultMessage="Имя" />}
      placeholder={intl.formatMessage({ defaultMessage: 'Иван Петров' })}
      value={value}
      onChange={event => setValue(event.currentTarget.value)}
    />
  );
};

export default ExampleTextFieldOverview;
