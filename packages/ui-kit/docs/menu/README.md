# Выпадающее меню

## Содержание

- [Описание](#описание)
- [Мультивыбор](#мультивыбор)
- [Api](#api)
- [Свойства](#свойства)

## Описание

Компонент `<Menu>` создаёт выпадающее меню, используещее React портал.

_Пример использования:_

```tsx
import React from 'react';
import Button from '@via-profit/ui-kit/Button';
import Menu from '@via-profit/ui-kit/Menu';
import MenuItem from '@via-profit/ui-kit/Menu/MenuItem';

type Item = {
  readonly id: number;
  readonly name: string;
};

const Example: React.FC = () => {
  const [anchorElement, setAnchorElement] = React.useState<HTMLButtonElement | null>(null);
  const [value, setValue] = React.useState<readonly Item | null>(null);

  return (
    <>
      <Button
        variant="standard"
        onClick={event => setAnchorElement(!anchorElement ? event.currentTarget : null)}
      >
        {value ? value.name : 'Выберите'}
      </Button>
      <Menu
        anchorElement={anchorElement}
        isOpen={Boolean(anchorElement)}
        value={value}
        items={items}
        getOptionSelected={({ item, value }) => item.id === value.id}
        onRequestClose={() => setAnchorElement(null)}
        onSelectItem={item => setValue(item)}
      >
        {({ item }, itemProps) => (
          <MenuItem {...itemProps} key={item.id}>
            {item.name}
          </MenuItem>
        )}
      </Menu>
    </>
  );
};

export default ExampleMenuOverview;
```

<ExampleMenuOverview />

## Мультивыбор

Компонент может работать в режиме мультивыбора, для чего используется свойство `multiple`. Меню, в котором указано свойство multiple позволяет осуществлять множественный выбор элементов списка. При этом, свойство `value` становится массивом.

_Пример использования:_

```tsx
import React from 'react';
import Button from '@via-profit/ui-kit/Button';
import Menu from '@via-profit/ui-kit/Menu';
import MenuItem from '@via-profit/ui-kit/Menu/MenuItem';
import Badge from '@via-profit/ui-kit/Badge';

type Item = {
  readonly id: number;
  readonly name: string;
};

const items: Item[] = [...new Array(30).keys()].map(i => ({
  id: i,
  name: i % 3 === 0 ? `Item ${i} Eiusmod enim labore reprehenderit` : `Item ${i}`,
}));

const Example: React.FC = () => {
  const [anchorElement, setAnchorElement] = React.useState<HTMLButtonElement | null>(null);
  const [value, setValue] = React.useState<readonly Item[]>([]);

  return (
    <>
      <div>
        {value.length === 0 && <>Ничего не выбрано</>}
        {value.map(item => (
          <Badge
            color="primary"
            variant="outlined"
            key={item.id}
            onDelete={() => setValue(value.filter(v => v.id !== item.id))}
          >
            {item.name}
          </Badge>
        ))}
      </div>
      <Button
        variant="standard"
        onClick={event => setAnchorElement(!anchorElement ? event.currentTarget : null)}
      >
        Выберите
      </Button>
      <Menu
        anchorElement={anchorElement}
        isOpen={Boolean(anchorElement)}
        value={value}
        multiple
        items={items}
        closeOnSelect={false}
        getOptionSelected={({ item, value }) => item.id === value.id}
        onRequestClose={() => setAnchorElement(null)}
        onSelectItem={items => setValue(items)}
      >
        {({ item }, itemProps) => (
          <MenuItem {...itemProps} key={item.id}>
            {item.name}
          </MenuItem>
        )}
      </Menu>
    </>
  );
};

export default Example;
```

<ExampleMenuMultiple />

## Using anchor position

<ExampleMenuAnchorPos />

## Using API

<ExampleMenuAPI />

## Api

Reference (`ref`) компонента `<Menu>` содержит imperative API.

| Метод                      | Аргументы                                | Описание                                                                            |
| -------------------------- | :--------------------------------------- | ----------------------------------------------------------------------------------- |
| **scrollToIndex**          | `idx: number` - Индекс искомого элемента | Прокручивает список до элемента с указанным индексом.                               |
| **highlightIndex**         | `idx: number` - Индекс искомого элемента | Прокручивает список до элемента с указанным индексом и подсвечивает его.            |
| **selectItem**             | `idx: number` - Индекс искомого элемента | Осуществляет выбор элемента c указанным индексом. Будет вызван метод `onSelectItem` |
| **selectHightlightedItem** |                                          | Осуществляет выбор подсвеченного элемента. Будет вызван метод `onSelectItem`        |
| **hightlightPrevItem**     |                                          | Прокручивает список до предыдущего элемента и подсвечивает его.                     |
| **hightlightNextItem**     |                                          | Прокручивает список до следующего элемента и подсвечивает его.                      |
| **hightlightFirstItem**    |                                          | Прокручивает список до первого элемента и подсвечивает его.                         |
| **hightlightLastItem**     |                                          | Прокручивает список до последнего элемента и подсвечивает его.                      |
| **scrollToFirstSelected**  |                                          | Прокручивает список до первого выбранного элемента.                                 |
| **focus**                  |                                          | Устанавливает фокус на список.                                                      |



## Свойства

| Свойство              | Обязателен | Тип                                                                                                                                  | По умолчанию         | Описание                                                                                                                                                                                                                                                                                                                                                             |
| --------------------- | :--------: | :----------------------------------------------------------------------------------------------------------------------------------- | :------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **isOpen**            |     \*     | `boolean`                                                                                                                            |                      | Определяет состояние меню: **открыто**; **закрыто**.                                                                                                                                                                                                                                                                                                                 |
| **items**             |     \*     | `Array<T>`                                                                                                                           |                      | Массив элементов списка.                                                                                                                                                                                                                                                                                                                                             |
| **value**             |     \*     | `T` `null`                                                                                                                           |                      | Выбраное значение.                                                                                                                                                                                                                                                                                                                                                   |
| **children**          |     \*     | `Function({item: T, index: number}, itemProps): ReactNode`                                                                           |                      | Коллбэк функция рендера элементов списка. Функция будет вызвана с двумя аргументами. <br/>**1 аргумент:** — `{"item": T, "index": number}`<br/>**2 аргумент:** — `{"selected": boolean, "hovered": boolean, "onMouseEnter": MouseHandle, "onMouseLeave": MouseHandle, "onClick": Mousehandle}`<br/> Содержимое аргумента 2 следует передать компоненту `<MenuItem>`. |
| **onSelectItem**      |            | `Function (item: T)` `Function (items: Array<T>)`                                                                                    |                      | Коллбэк функция, которая будет вызвана в момент выбора элемента в списке. В качестве аргумента будет передан выбранный элемент. **В случае, если указано свойство `multiple` как `true`, в качестве аргумента будет передан массив со всеми выбранными элементами**.                                                                                                 |
| **anchorElement**     |            | `HTMLElement` `null` `undefined`                                                                                                     |                      | Элемент, к которому будет привязан список. В случае, если **anchorPos** установлен в `static`, то данное свойство игнорируется.                                                                                                                                                                                                                                      |
| **getOptionSelected** |            | `Function({"item": T, "value": T}): boolean`                                                                                         |                      | Функция, определяющая является ли элемент списка выбранным. Функция будет вызвана для каждого элемента списка.                                                                                                                                                                                                                                                       |
| **onRequestClose**    |            | `Function(event: Event)`                                                                                                             |                      | Функция, которая будет вызвана в момент закрытия списка.                                                                                                                                                                                                                                                                                                             |
| **closeOutsideClick** |            | `boolean`                                                                                                                            | `true`               | Будет ли вызван коллбэк `onRequestClose` в случае клика за пределами списка.                                                                                                                                                                                                                                                                                         |
| **closeOnSelect**     |            | `boolean`                                                                                                                            | `true`               | Будет ли вызван коллбэк `onRequestClose` в момент выбора элемента из списка.                                                                                                                                                                                                                                                                                         |
| **multiple**          |            | `boolean`                                                                                                                            | `false`              | Флаг определяющий возможность множественного выбора элементов в списке.                                                                                                                                                                                                                                                                                              |
| **autofocus**         |            | `boolean`                                                                                                                            | `true`               | Флаг определяющий следует ли преводить фокус на список сразу после открытия списка.                                                                                                                                                                                                                                                                                  |
| **anchorPos**         |            | `auto` `auto-start-end` `top-start` `top-end` `top` `bottom` `top-start-end` `bottom-start-end` `bottom-start` `bottom-end` `static` | `auto`               | Определяет расположение выпадающего списка относительно его анкора (`anchorElement`).                                                                                                                                                                                                                                                                                |
| **zIndex**            |            | `number`                                                                                                                             | `theme.zIndex.modal` | Значение `z-index` для списка.                                                                                                                                                                                                                                                                                                                                       |
| **overrides**         |            | `Object`                                                                                                                             | `undefined`          | Объект элементов для переопределения составных компонентов меню.                                                                                                                                                                                                                                                                                                     |
| **overrides .List**   |            | `<React.Component>`                                                                                                                  | `<MenuList>`         | Элемент списка.                                                                                                                                                                                                                                                                                                                                                      |
