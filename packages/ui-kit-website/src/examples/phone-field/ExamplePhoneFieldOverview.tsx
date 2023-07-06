import React from 'react';
import PhoneField, { PhonePayload } from '@via-profit/ui-kit/src/PhoneField';

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
      label="Enter the phone number"
      error={isInvalid}
      errorText={isInvalid ? 'Invalid phone' : undefined}
      value={phoneState?.value || ''}
      onChange={payload => setPhoneState(payload)}
    />
  );
};

export default ExamplePhoneFieldOverview;
