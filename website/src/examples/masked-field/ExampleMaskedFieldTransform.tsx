import React from 'react';
import MaskedField from '@via-profit/ui-kit/MaskedField';
import { vin } from '@via-profit/ui-kit/MaskedField/templates';

const ExampleMaskedFieldTransform: React.FC = () => {
  const [value, setValue] = React.useState('');

  return (
    <MaskedField
      label="VIN"
      placeholder="XTA-21099043-465234"
      mask={vin}
      value={value}
      transform={text => text.toUpperCase()}
      onChange={({ text }) => setValue(text)}
    />
  );
};

export default ExampleMaskedFieldTransform;
