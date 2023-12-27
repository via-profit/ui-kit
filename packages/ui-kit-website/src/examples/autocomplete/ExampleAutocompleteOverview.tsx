import React from 'react';
import Autocomplete, { AutocompleteItem } from '@via-profit/ui-kit/src/Autocomplete';
import Highlighted from '@via-profit/ui-kit/src/Highlighted';

import countries from './countries.json';

type Item = {
  readonly code: string;
  readonly name: string;
};

const ExampleAutocompleteOverview: React.FC = () => {
  const [value, setValue] = React.useState<Item | null>(countries[0]);
  const [isOpen, setIsOpen] = React.useState(false);
  const [items] = React.useState<Item[]>(countries);

  return (
    <>
      <Autocomplete
        value={value}
        items={items}
        isOpen={isOpen}
        openOnFocus={false}
        filterItems={(items, { query }) =>
          items.filter(item => item.name.toLocaleLowerCase().indexOf(query) !== -1)
        }
        onRequestClose={() => setIsOpen(false)}
        onRequestOpen={() => setIsOpen(true)}
        onChange={item => setValue(item)}
        selectedItemToString={item => item.name}
      >
        {({ item, inputValue }, itemProps) => (
          <AutocompleteItem {...itemProps} key={item.code}>
            <Highlighted text={item.name} highlight={inputValue} />
          </AutocompleteItem>
        )}
      </Autocomplete>
    </>
  );
};

export default ExampleAutocompleteOverview;
