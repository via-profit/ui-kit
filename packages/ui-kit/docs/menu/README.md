# Выпадающее меню

## Содержание

- [Описание](#описание)
- [Свойства](#свойства)

## Описание

Компонент `<Menu>` создаёт выпадающее меню, используещее React портал.

_Пример использования:_

```tsx
import React from 'react';
import Button from '@via-profit/ui-kit/Button';
import Menu from '@via-profit/ui-kit/Menu';

type Item = {
  readonly id: number;
  readonly name: string;
};

const Example: React.FC = () => {
  const [anchorElement, setAnchorElement] = React.useState<HTMLButtonElement | null>(null);
  const [value, setValue] = React.useState<Item | null>(null);

  return (
    <>
      <Button
        variant="standard"
        onClick={event => setAnchorElement(!anchorElement ? event.currentTarget : null)}
      >
        {value ? value.name : 'Please select'}
      </Button>
      <Menu
        anchorElement={anchorElement}
        isOpen={Boolean(anchorElement)}
        value={value}
        items={items}
        keyExtractor={item => item.id}
        itemToString={item => item.name}
        getOptionSelected={({ item, value }) => item.id === value.id}
        onRequestClose={() => setAnchorElement(null)}
        onSelectItem={item => setValue(item)}
      />
    </>
  );
};

export default ExampleMenuOverview;
```

<ExampleMenuOverview>

## Using API

<ExampleMenuAPI />

## Свойства

| Свойство          | Обязателен | Тип                              | По умолчанию | Описание                                                                                                                        |
| ----------------- | :--------: | :------------------------------- | :----------- | ------------------------------------------------------------------------------------------------------------------------------- |
| **isOpen**        |     \*     | `boolean`                        |              | Определяет состояние меню: **открыто**; **закрыто**.                                                                            |
| **items**         |     \*     | `Array<T>`                       |              | Массив элементов списка.                                                                                                        |
| **value**         |     \*     | `T` `null`                       |              | Выбраное значение.                                                                                                              |
| **anchorElement** |            | `HTMLElement` `null` `undefined` |              | Элемент, к которому будет привязан список. В случае, если **anchorPos** установлен в `static`, то данное свойство игнорируется. |
