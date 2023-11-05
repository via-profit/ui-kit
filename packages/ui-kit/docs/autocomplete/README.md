# Автокомплит

## Содержание

- [Описание](#описание)

## Описание

Компонент `<Button>` 

_Пример использования:_

```tsx
import React from 'react';
import Autocomplete from '@via-profit/ui-kit/Autocomplete';
import MenuItem from '@via-profit/ui-kit/Menu/MenuItem';
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
  const [value, setValue] = React.useState<Item | null>(null);
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
        <MenuItem {...itemProps} key={item.code}>
          <Highlighted text={item.name} highlight={inputValue} />
        </MenuItem>
      )}
    </Autocomplete>
  )
}

export default Example;
```

<ExampleAutocompleteOverview>

<ExampleAutocompleteFetch>