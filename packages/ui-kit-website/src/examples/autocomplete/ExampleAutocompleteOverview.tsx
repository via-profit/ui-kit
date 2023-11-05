import React from 'react';
import Autocomplete from '@via-profit/ui-kit/src/Autocomplete';
import MenuItem from '@via-profit/ui-kit/src/Menu/MenuItem';
import Button from '@via-profit/ui-kit/src/Button';
import Paragraph from '@via-profit/ui-kit/src/Typography/Paragraph';
import Highlighted from '@via-profit/ui-kit/src/Highlighted';

import countries from './countries.json';

type Item = {
  readonly code: string;
  readonly name: string;
};

const ExampleAutocompleteOverview: React.FC = () => {
  const [value, setValue] = React.useState<Item | null>(
    countries.find(c => c.code === 'RU') || null,
  );
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <>
      <Button onClick={() => setValue(countries.find(c => c.code === 'RU') || null)}>set RU</Button>
      <Button onClick={() => setValue(countries.find(c => c.code === 'US') || null)}>set US</Button>
      <Paragraph>{value ? value.name : 'no selected'}</Paragraph>
      <Autocomplete
        value={value}
        items={countries}
        isOpen={isOpen}
        filterItems={(items, { query }) =>
          items.filter(item => item.name.toLocaleLowerCase().indexOf(query) !== -1)
        }
        onRequestClose={() => setIsOpen(false)}
        onRequestOpen={() => setIsOpen(true)}
        onSelectItem={item => setValue(item)}
        selectedItemToString={item => item.name}
      >
        {({ item, inputValue }, itemProps) => (
          <MenuItem {...itemProps} key={item.code}>
            <Highlighted text={item.name} highlight={inputValue} />
          </MenuItem>
        )}
      </Autocomplete>
    </>
  );
};

export default ExampleAutocompleteOverview;
