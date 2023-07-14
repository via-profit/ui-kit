import React from 'react';
import PhoneField, { PhonePayload } from '@via-profit/ui-kit/src/PhoneField';

import RU from '@via-profit/ui-kit/src/CountryFlags/RU';

const ExamplePhoneFieldOverview: React.FC = () => {
  const [phoneState, setPhoneState] = React.useState<PhonePayload | null>(null);

  const isInvalid = React.useMemo(
    () =>
      Boolean(phoneState?.value && phoneState.value.length > 0 && phoneState?.isValid === false),
    [phoneState?.isValid, phoneState?.value],
  );

  return (
    <PhoneField
      requiredAsterisk
      templates={[
        ['RU', <RU key="ru-1" />, '7', '+x (xxx) xxx-xx-xx', '+7 (987) 654-32-10', /^\+$/],
      ]}
      label="Enter the phone number"
      error={isInvalid}
      errorText={isInvalid ? 'Invalid phone' : undefined}
      value={phoneState?.value || ''}
      onChange={payload => setPhoneState(payload)}
    />
  );
};

export default ExamplePhoneFieldOverview;
