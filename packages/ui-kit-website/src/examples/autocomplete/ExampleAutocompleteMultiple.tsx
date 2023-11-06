import React from 'react';
import Autocomplete from '@via-profit/ui-kit/src/Autocomplete';
import MenuItem from '@via-profit/ui-kit/src/Menu/MenuItem';
import Highlighted from '@via-profit/ui-kit/src/Highlighted';
import Badge from '@via-profit/ui-kit/src/Badge';

import countries from './countries.json';

type Item = {
  readonly code: string;
  readonly name: string;
};

const ExampleAutocompleteMultiple: React.FC = () => {
  const [value, setValue] = React.useState<readonly Item[]>([]);
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <>
      <div>
        {value.map(item => (
          <Badge
            onClick={() => setValue(values => values.filter(v => v.code !== item.code))}
            key={item.code}
          >
            {item.name}
          </Badge>
        ))}
      </div>
      <Autocomplete
        multiple
        value={value}
        items={countries}
        isOpen={isOpen}
        filterItems={(items, { query }) =>
          items.filter(item => item.name.toLocaleLowerCase().indexOf(query) !== -1)
        }
        onRequestClose={() => setIsOpen(false)}
        onRequestOpen={() => setIsOpen(true)}
        onChange={items => setValue(items)}
        selectedItemToString={items => items.map(({ name }) => name).join(', ')}
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

export default ExampleAutocompleteMultiple;
