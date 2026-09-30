import React from 'react';
import PhoneField from '@via-profit/ui-kit/src/PhoneField';
import defaultTemplates, { PhoneTemplate } from '@via-profit/ui-kit/src/PhoneField/templates';
import { FormattedMessage } from 'react-intl';

// Only Russia and Belarus
const templates: PhoneTemplate[] = defaultTemplates.filter(
  ([countryCode]) => countryCode === 'RU' || countryCode === 'BY',
);

const ExamplePhoneFieldTemplates: React.FC = () => {
  const [value, setValue] = React.useState('');

  return (
    <PhoneField
      label={<FormattedMessage defaultMessage="Телефон (Россия или Беларусь)" />}
      templates={templates}
      value={value}
      onChange={(_event, payload) => setValue(payload.value)}
    />
  );
};

export default ExamplePhoneFieldTemplates;
