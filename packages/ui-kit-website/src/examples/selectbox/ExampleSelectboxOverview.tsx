import React from 'react';
import Selectbox, { SelectboxItem } from '@via-profit/ui-kit/src/Selectbox';
import Highlighted from '@via-profit/ui-kit/src/Highlighted';

import countries from './countries.json';

type Item = {
  readonly code: string;
  readonly name: string;
};

const ExampleSelectboxOverview: React.FC = () => {
  const [value, setValue] = React.useState<Item | null>(null);
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <Selectbox
      value={value}
      items={countries}
      isOpen={isOpen}
      filterItems={(items, { query }) =>
        items.filter(item => item.name.toLocaleLowerCase().indexOf(query) !== -1)
      }
      onRequestClose={() => setIsOpen(false)}
      onRequestOpen={() => setIsOpen(true)}
      onChange={item => setValue(item)}
      selectedItemToString={item => item.name}
    >
      {({ item, inputValue }, itemProps) => (
        <SelectboxItem {...itemProps} key={item.code}>
          <Highlighted text={item.name} highlight={inputValue} />
        </SelectboxItem>
      )}
    </Selectbox>
  );
};

export default ExampleSelectboxOverview;
