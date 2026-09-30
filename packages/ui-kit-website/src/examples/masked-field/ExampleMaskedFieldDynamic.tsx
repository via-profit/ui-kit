import React from 'react';
import MaskedField, { GetMask, Mask } from '@via-profit/ui-kit/src/MaskedField';
import { FormattedMessage } from 'react-intl';

const d = /\d/;

// 4-4-4-4, e.g. 4276 1234 5678 9012
const cardMask: Mask = [d, d, d, d, ' ', d, d, d, d, ' ', d, d, d, d, ' ', d, d, d, d];

// American Express: 4-6-5, e.g. 3782 822463 10005
const amexMask: Mask = [d, d, d, d, ' ', d, d, d, d, d, d, ' ', d, d, d, d, d];

const getMask: GetMask = input => (/^3[47]/.test(input) ? amexMask : cardMask);

const ExampleMaskedFieldDynamic: React.FC = () => {
  const [value, setValue] = React.useState('');

  return (
    <MaskedField
      label={<FormattedMessage defaultMessage="Номер карты" />}
      placeholder="0000 0000 0000 0000"
      mask={getMask}
      value={value}
      onChange={({ text }) => setValue(text)}
    />
  );
};

export default ExampleMaskedFieldDynamic;
