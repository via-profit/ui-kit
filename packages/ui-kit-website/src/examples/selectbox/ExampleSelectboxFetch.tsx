import React from 'react';
import Selectbox, { SelectboxItem } from '@via-profit/ui-kit/src/Selectbox';
import Button from '@via-profit/ui-kit/src/Button';
import Highlighted from '@via-profit/ui-kit/src/Highlighted';

import countries from './countries.json';

type Item = {
  readonly code: string;
  readonly name: string;
};

const randomInteger = (min: number, max: number) =>
  Math.floor(Math.random() * (max - min + 1)) + min;

const ExampleSelectboxFetch: React.FC = () => {
  const [value, setValue] = React.useState<Item | null>(null);
  const [items, setItems] = React.useState<Item[]>([]);
  const [isLoading, setIsLoading] = React.useState(false);
  const [isOpen, setIsOpen] = React.useState(false);
  const timeoutRef = React.useRef<NodeJS.Timeout | null>(null);

  const fetchQuery = React.useCallback(
    (query: string) =>
      new Promise<Item[]>(resolve => {
        setIsLoading(true);
        setTimeout(
          () => {
            setIsLoading(false);
            if (query.trim() === '') {
              resolve([]);

              return;
            }

            const list = countries
              .filter(item => item.name.toLocaleLowerCase().indexOf(query) !== -1)
              .splice(0, 10);
            resolve(list);
          },
          randomInteger(600, 2000),
        );
      }),
    [],
  );

  const onInputChange: React.ChangeEventHandler<HTMLInputElement> = React.useCallback(
    event => {
      const v = event.currentTarget.value.trim();
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }

      timeoutRef.current = setTimeout(() => {
        fetchQuery(v)
          .then(setItems)
          .catch(err => console.error(err));
      }, 300);
    },
    [fetchQuery],
  );

  return (
    <>
      <Button onClick={() => setValue(countries.find(c => c.code === 'RU') || null)}>set RU</Button>
      <Button onClick={() => setValue(countries.find(c => c.code === 'US') || null)}>set US</Button>

      <Selectbox
        value={value}
        items={items}
        isLoading={isLoading}
        isOpen={isOpen}
        onRequestClose={() => setIsOpen(false)}
        onRequestOpen={() => setIsOpen(true)}
        onChange={item => setValue(item)}
        selectedItemToString={item => item.name}
        onInputChange={onInputChange}
        filterItems={items => items}
      >
        {({ item, inputValue }, itemProps) => (
          <SelectboxItem {...itemProps} key={item.code}>
            <Highlighted text={item.name} highlight={inputValue} />
          </SelectboxItem>
        )}
      </Selectbox>
    </>
  );
};

export default ExampleSelectboxFetch;
