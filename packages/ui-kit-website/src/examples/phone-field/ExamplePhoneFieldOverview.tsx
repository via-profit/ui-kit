import React from 'react';
import PhoneField, { PhonePayload, usePhoneUtils } from '@via-profit/ui-kit/src/PhoneField';
import templates from '@via-profit/ui-kit/src/PhoneField/templates';

const ExamplePhoneFieldOverview: React.FC = () => {
  const [phoneState, setPhoneState] = React.useState<PhonePayload | null>(null);

  const { parseAndFormat } = usePhoneUtils({
    templates,
  });

  const phones = React.useMemo(
    () => [
      ['RU', '+7 (912) 212-99-84'],
      ['RU', '8 (912) 212-99-84'],
      ['RU', '8912 212-99-84'],
      ['RU', '7 912 212-99-84'],
      ['KZ', '+7 7172 555-555'],
      ['KZ', '+7 (7172) 74-61-60'],
      ['BY', '+375 24 123 55 26'],
      ['BY', '+375 25 110 45 94'],
      ['BY', '+375 29 985 45 88'],
      ['JP', '+81 (156) 878-255'],
      ['JP', '+81599 352 110'],
      ['IL', '+97232345678'],
    ],
    [],
  );

  return (
    <>
      {phones.map(([country, phone], index) => {
        const { text, CountryFlag, countryCode } = parseAndFormat(phone);

        return (
          // eslint-disable-next-line react/no-array-index-key
          <div key={index}>
            <span style={{ marginRight: '0.3em' }}>{CountryFlag}</span>
            {text}
            {countryCode !== country && <b style={{ color: 'red', marginLeft: '0.5em' }}>WRONG</b>}
          </div>
        );
      })}

      <PhoneField
        requiredAsterisk
        placeholder="+7 (987) 654-32-10"
        templates={templates}
        label="Enter the phone number"
        value={phoneState?.value || ''}
        onChange={(_event, payload) => setPhoneState(payload)}
      />
    </>
  );
};

export default ExamplePhoneFieldOverview;
