import React from 'react';
import Autocomplete from '@via-profit/ui-kit/src/Autocomplete';
import MenuItem from '@via-profit/ui-kit/src/Menu/MenuItem';
// import Button from '@via-profit/ui-kit/src/Button';
import Highlighted from '@via-profit/ui-kit/src/Highlighted';

import countries from './countries.json';

type Item = {
  readonly code: string;
  readonly name: string;
};

const ExampleAutocompleteFetch: React.FC = () => {
  const [value, setValue] = React.useState<Item | null>(null);
  const [items, setItems] = React.useState<Item[]>([]);
  const [isOpen, setIsOpen] = React.useState(false);
  const timeoutRef = React.useRef<NodeJS.Timeout | null>(null);

  const fetchQuery = React.useCallback(
    (query: string) =>
      new Promise<Item[]>(resolve => {
        setTimeout(() => {
          if (query.trim() === '') {
            resolve([]);

            return;
          }

          const list = countries
            .filter(item => item.name.toLocaleLowerCase().indexOf(query) !== -1)
            .splice(0, 10);
          resolve(list);
        }, 600);
      }),
    [],
  );

  return (
    <>
      {/* <Button onClick={() => setValue(countries.find(c => c.code === 'RU') || null)}>set RU</Button>
      <Button onClick={() => setValue(countries.find(c => c.code === 'US') || null)}>set US</Button> */}

      <Autocomplete
        value={value}
        items={items}
        isOpen={isOpen}
        onRequestClose={() => setIsOpen(false)}
        onRequestOpen={() => setIsOpen(true)}
        onSelectItem={item => setValue(item)}
        selecteditemToString={item => item.name}
        onInputChange={event => {
          const v = event.currentTarget.value.trim();
          if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
          }

          timeoutRef.current = setTimeout(() => {
            fetchQuery(v)
              .then(setItems)
              .catch(err => console.error(err));
          }, 300);
        }}
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

export default ExampleAutocompleteFetch;
