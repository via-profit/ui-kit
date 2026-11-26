import React from 'react';
import Selectbox, { SelectboxItem } from '@via-profit/ui-kit/Selectbox';
import { FormattedMessage, useIntl } from 'react-intl';

import countries from './countries.json';

type Item = {
  readonly code: string;
  readonly name: string;
};

const ExampleSelectboxOverview: React.FC = () => {
  const intl = useIntl();
  const [value, setValue] = React.useState<Item | null>(null);
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <Selectbox
      label={<FormattedMessage defaultMessage="Страна" />}
      notSetLabel={intl.formatMessage({ defaultMessage: 'Не выбрано' })}
      value={value}
      items={countries}
      isOpen={isOpen}
      onRequestOpen={() => setIsOpen(true)}
      onRequestClose={() => setIsOpen(false)}
      onChange={item => setValue(item)}
      getOptionSelected={({ item, value }) => item.code === value.code}
      selectedItemToString={item => item.name}
    >
      {({ item }, itemProps) => (
        <SelectboxItem {...itemProps} key={item.code}>
          {item.name}
        </SelectboxItem>
      )}
    </Selectbox>
  );
};

export default ExampleSelectboxOverview;
