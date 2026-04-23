import React from 'react';
import Autocomplete, { AutocompleteItem, FilterItems } from '@via-profit/ui-kit/src/Autocomplete';
import Highlighted from '@via-profit/ui-kit/src/Highlighted';

import countries from './countries.json';

type Item = (typeof countries)[0];

const ExampleAutocompleteOverview: React.FC = () => {
  const [value, setValue] = React.useState<Item | null>(countries[0]);
  const [isOpen, setIsOpen] = React.useState(false);

  const handleRequestClose = React.useCallback(() => setIsOpen(false), []);
  const handleRequestOpen = React.useCallback(() => setIsOpen(true), []);
  const handleChange = React.useCallback((item: Item | null) => setValue(item), []);
  const selectedItemToString = React.useCallback((item: Item) => item.name, []);
  const filterItems: FilterItems<Item> = React.useCallback(
    (items, { query }) => items.filter(item =>
      item.name.toLocaleLowerCase().indexOf(query) !== -1,
    ),
    [],
  );

  return (
    <>
      <Autocomplete
        value={value}
        items={countries}
        openOnFocus={false}
        isOpen={isOpen}
        onRequestClose={handleRequestClose}
        onRequestOpen={handleRequestOpen}
        onChange={handleChange}
        selectedItemToString={selectedItemToString}
        filterItems={filterItems}
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
