import React from 'react';
import MaskedField, { FormatParsedPayload, Mask } from '@via-profit/ui-kit/src/MaskedField';
import Paragraph from '@via-profit/ui-kit/src/Typography/Paragraph';
import { FormattedMessage } from 'react-intl';

const phoneMask: Mask = [
  '+',
  '7',
  ' ',
  '(',
  /\d/,
  /\d/,
  /\d/,
  ')',
  ' ',
  /\d/,
  /\d/,
  /\d/,
  '-',
  /\d/,
  /\d/,
  '-',
  /\d/,
  /\d/,
];

const ExampleMaskedFieldOverview: React.FC = () => {
  const [payload, setPayload] = React.useState<FormatParsedPayload | null>(null);

  return (
    <>
      <MaskedField
        label={<FormattedMessage defaultMessage="Телефон" />}
        placeholder="+7 (999) 123-45-67"
        mask={phoneMask}
        value={payload?.text ?? ''}
        onChange={setPayload}
      />
      <Paragraph>
        <FormattedMessage
          defaultMessage="text: «{text}», isValid: {isValid}"
          values={{ text: payload?.text ?? '', isValid: String(payload?.isValid ?? false) }}
        />
      </Paragraph>
    </>
  );
};

export default ExampleMaskedFieldOverview;
