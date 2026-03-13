import React from 'react';
import MaskedField, { Mask } from '@via-profit/ui-kit/src/MaskedField';

const phoneMaskMisc: Mask = [
  /[+78]/,
  /[+78]/,
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

const phoneMaskStartSeven: Mask = [
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

const phoneMaskStartEight: Mask = [
  '8',
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

const ExampleMaskedFieldPhone: React.FC = () => {
  const [value, setValue] = React.useState('');
  const [mask, setMask] = React.useState<Mask>(phoneMaskMisc);
  const [validState, setValid] = React.useState(true);

  return (
    <MaskedField
      mask={mask}
      value={value}
      placeholder="+7 (999) 999-99-99"
      transform={v => v.toUpperCase()}
      error={!validState}
      errorText="Invalid"
      onChange={({ isValid, text }) => {
        if (isValid) {
          setValue(text);
          setValid(true);

          return;
        }
        const cleanText = text.replace(/[^0-9+]/g, '');

        if (cleanText === '8') {
          setMask(phoneMaskStartEight);
        }

        if (cleanText === '87') {
          setValue('+7');
          setMask(phoneMaskStartSeven);
        }

        if (cleanText === '+79') {
          setMask(phoneMaskStartSeven);
        }

        if (validState !== isValid) {
          setValid(isValid);
        }
      }}
    />
  );
};

export default ExampleMaskedFieldPhone;
