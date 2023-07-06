import React from 'react';
import MaskedField from '@via-profit/ui-kit/src/MaskedField';
import {ogrn} from '@via-profit/ui-kit/src/MaskedField/templates';

const letters = /[АВЕКМНОРСТУХавекмнорстух]/;

const ExampleMaskedFieldBasic: React.FC = () => {
  const [value, setValue] = React.useState('');
  const [validState, setValid] = React.useState(true);

  return (
    <MaskedField
      value={value}
      // placeholder="в215вн|196"
      // transform={v => v.toUpperCase()}
      error={validState !== true}
      errorText="Invalid"
      onChange={({ isValid, text }) => {
        if (isValid) {
          console.log(text);
          setValue(text);
        }

        if (validState !== isValid) {
          setValid(isValid);
        }
      }}
      mask={ogrn}
    />
  );
};

export default ExampleMaskedFieldBasic;
