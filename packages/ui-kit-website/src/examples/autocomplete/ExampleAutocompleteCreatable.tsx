import React from 'react';
import Autocomplete, { AutocompleteItem } from '@via-profit/ui-kit/src/Autocomplete';
import Highlighted from '@via-profit/ui-kit/src/Highlighted';

import PlusIcon from '../../components/Icons/PlusOutline';
import countries from './countries.json';

type Item = {
  readonly code: string;
  readonly name: string;
  readonly isVirtual?: boolean;
};

const ExampleAutocompleteCreatable: React.FC = () => {
  const [value, setValue] = React.useState<Item | null>(countries[0]);
  const [isOpen, setIsOpen] = React.useState(false);
  const [items] = React.useState<Item[]>(countries);

  return (
    <>
      <Autocomplete
        label="Creatable"
        value={value}
        items={items}
        isOpen={isOpen}
        onRequestClose={() => setIsOpen(false)}
        onRequestOpen={() => setIsOpen(true)}
        onChange={item => setValue(item)}
        selectedItemToString={item => item.name}
        filterItems={(items, { query }) => {
          const filtered = items.filter(
            item => item.name.toLocaleLowerCase().indexOf(query) !== -1,
          );

          if (query.length > 0) {
            filtered.push({
              code: window.crypto.randomUUID(),
              name: query,
              isVirtual: true,
            });
          }

          return filtered;
        }}
      >
        {({ item, inputValue }, itemProps) => (
          <AutocompleteItem
            {...itemProps}
            key={item.code}
            startIcon={item.isVirtual ? <PlusIcon /> : undefined}
            variant={item.isVirtual ? 'virtual' : 'standard'}
          >
            <Highlighted
              disabledHighlighting={item.isVirtual}
              text={item.name}
              highlight={inputValue}
            />
          </AutocompleteItem>
        )}
      </Autocomplete>
    </>
  );
};

export default ExampleAutocompleteCreatable;
