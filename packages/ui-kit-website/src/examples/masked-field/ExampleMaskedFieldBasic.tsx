import React from 'react';
import MaskedField from '@via-profit/ui-kit/src/MaskedField';

const letter = /[abekmhopctyXABEKMHOPCTYАВЕКМНОРСТУХавекмнорстух]/;
const digit = /\d/;
const mask = [letter, ' ', digit, digit, digit, ' ', letter, letter, ' ', digit, digit, digit];

const ExampleMaskedFieldBasic: React.FC = () => {
  const [value, setValue] = React.useState('');
  const [validState, setValid] = React.useState(true);

  return (
    <MaskedField
      mask={mask}
      value={value}
      placeholder="в 215 вн 196"
      transform={v => v.toUpperCase()}
      error={!validState}
      errorText="Invalid"
      onChange={({ isValid, text }) => {
        if (isValid) {
          setValue(text);
        }

        if (validState !== isValid) {
          setValid(isValid);
        }
      }}
    />
  );
};

export default ExampleMaskedFieldBasic;
