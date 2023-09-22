import React from 'react';
import PhoneField, { PhonePayload } from '@via-profit/ui-kit/src/PhoneField';
import templates from '@via-profit/ui-kit/src/PhoneField/templates';

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
        // Russian template
        ['RU', <RU key="ru-1" />, '7', '+x (xxx) xxx-xx-xx', '+7 (987) 654-32-10', /^\+$/], // must be at first (Default RU)
        ['RU', <RU key="ru-2" />, '7', '8 (xxx) xxx-xx-xx', '8 (987) 654-32-10', /^8[^1]{0,}/], // 8912...
        [
          'RU',
          <RU key="ru-3" />,
          '7',
          '+7 (xxx) xxx-xx-xx',
          '+7 (987) 654-32-10',
          /^\+{0,1}7([0-5]|[8-9])[0-9][0-9]/,
        ], // +79...
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
