import React from 'react';
import Radio from '@via-profit/ui-kit/src/Radio';
import RadioGroup from '@via-profit/ui-kit/src/RadioGroup';
import { FormattedMessage } from 'react-intl';

const sizes = ['XS', 'S', 'M', 'L', 'XL'];

const ExampleRadioHorizontal: React.FC = () => (
  <RadioGroup
    orientation="horizontal"
    defaultValue="M"
    color="#e0435f"
    label={<FormattedMessage defaultMessage="Размер" />}
  >
    {sizes.map(size => (
      <Radio key={size} value={size}>
        {size}
      </Radio>
    ))}
  </RadioGroup>
);

export default ExampleRadioHorizontal;
