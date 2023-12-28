# Автокомплит

## Содержание

- [Описание](#описание)
- [Creatable](#creatable)
- [Fetch](#fetch)
- [Overrides](#overrides)

## Описание

Компонент `<Autocomplete>`

_Пример использования:_

```tsx
import React from 'react';
import Autocomplete, { AutocompleteItem } from '@via-profit/ui-kit/Autocomplete';
import Highlighted from '@via-profit/ui-kit/Highlighted';

type Item = {
  readonly code: string;
  readonly name: string;
};

const items: Item[] = [
  {code: 'RU', name: 'Russian Federation'},
  {code: 'CN', name: 'China'},
  ...
];

const Example: React.FC = () => {
  const [value, setValue] = React.useState<readonly Item | null>(null);
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <Autocomplete
      value={value}
      items={items}
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
        <AutocompleteItem {...itemProps} key={item.code}>
          <Highlighted text={item.name} highlight={inputValue} />
        </AutocompleteItem>
      )}
    </Autocomplete>
  )
}

export default Example;
```

<ExampleAutocompleteOverview />

### Creatable

_Пример использования:_

```tsx
import React from 'react';
import Autocomplete, { AutocompleteItem } from '@via-profit/ui-kit/Autocomplete';
import Highlighted from '@via-profit/ui-kit/Highlighted';

import PlusIcon from './PlusOutline';
import countries from './countries.json';

type Item = {
  readonly code: string;
  readonly name: string;
  readonly isVirtual?: boolean;
};

const Example: React.FC = () => {
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

export default Example;

```


Type the not existed country name

<ExampleAutocompleteCreatable />

### Fetch

<ExampleAutocompleteFetch />

### Multiple

<ExampleAutocompleteMultiple />

### overrides

<ExampleAutocompleteOverrides />
Lorem ipsum

Lorem ipsum

Lorem ipsum

Lorem ipsum

Lorem ipsum

Lorem ipsum

Lorem ipsum

Lorem ipsum

Lorem ipsum

Lorem ipsum
