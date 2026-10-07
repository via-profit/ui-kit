import React from 'react';
import styled from '@emotion/styled';
import MaskedField, { FormatParsedPayload, Mask } from '@via-profit/ui-kit/src/MaskedField';
import TextFieldInput from '@via-profit/ui-kit/src/TextField/TextFieldInput';
import { FormattedMessage } from 'react-intl';

const cardMask: Mask = [
  ...[/\d/, /\d/, /\d/, /\d/, ' '],
  ...[/\d/, /\d/, /\d/, /\d/, ' '],
  ...[/\d/, /\d/, /\d/, /\d/, ' '],
  ...[/\d/, /\d/, /\d/, /\d/],
];

// The digits of the same width: the groups of the card number stay under each other
const Input = styled(TextFieldInput)`
  font-family: ui-monospace, 'SFMono-Regular', Menlo, monospace;
  letter-spacing: 0.08em;
`;

// Created once, outside of the component
const overrides = { Input };

const ExampleMaskedFieldOverrides: React.FC = () => {
  const [payload, setPayload] = React.useState<FormatParsedPayload | null>(null);

  return (
    <MaskedField
      label={<FormattedMessage defaultMessage="Номер карты" />}
      placeholder="0000 0000 0000 0000"
      mask={cardMask}
      value={payload?.text ?? ''}
      overrides={overrides}
      onChange={setPayload}
    />
  );
};

export default ExampleMaskedFieldOverrides;
