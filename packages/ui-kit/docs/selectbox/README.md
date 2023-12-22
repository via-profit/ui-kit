# Автокомплит

## Содержание

- [Описание](#описание)

## Описание

Компонент `<Selectbox>`

_Пример использования:_

```tsx
import React from 'react';
import Selectbox, { SelectboxItem } from '@via-profit/ui-kit/Selectbox';
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
    <Selectbox
      value={value}
      items={items}
      isOpen={isOpen}
      onRequestClose={() => setIsOpen(false)}
      onRequestOpen={() => setIsOpen(true)}
      onSelectItem={item => setValue(item)}
      selectedItemToString={item => item.name}
    >
      {({ item, inputValue }, itemProps) => (
        <SelectboxItem {...itemProps} key={item.code}>
          <Highlighted text={item.name} highlight={inputValue} />
        </SelectboxItem>
      )}
    </Selectbox>
  )
}

export default Example;
```

<ExampleSelectboxOverview />


### Multiple

<ExampleSelectboxMultiple />

### overrides

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
