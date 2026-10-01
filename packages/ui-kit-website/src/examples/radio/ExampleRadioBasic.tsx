import React from 'react';
import Radio from '@via-profit/ui-kit/src/Radio';
import RadioGroup from '@via-profit/ui-kit/src/RadioGroup';
import { FormattedMessage } from 'react-intl';

const ExampleRadioBasic: React.FC = () => (
  <RadioGroup
    name="delivery"
    defaultValue="courier"
    label={<FormattedMessage defaultMessage="Способ доставки" />}
  >
    <Radio value="courier">
      <FormattedMessage defaultMessage="Курьером" />
    </Radio>
    <Radio value="pickup">
      <FormattedMessage defaultMessage="Самовывоз из пункта выдачи" />
    </Radio>
    <Radio value="post" disabled>
      <FormattedMessage defaultMessage="Почтой (временно недоступно)" />
    </Radio>
  </RadioGroup>
);

export default ExampleRadioBasic;
