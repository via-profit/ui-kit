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

---

## API

Reference (`ref`) компонента `<Menu>` содержит imperative API.

### `scrollToIndex`
Прокручивает список до элемента с указанным индексом.
- **Аргументы:** `idx: number` — Индекс искомого элемента

### `highlightIndex`
Прокручивает список до элемента с указанным индексом и подсвечивает его.
- **Аргументы:** `idx: number` — Индекс искомого элемента

### `selectItem`
Осуществляет выбор элемента с указанным индексом. Будет вызван метод `onSelectItem`.
- **Аргументы:** `idx: number` — Индекс искомого элемента

### `selectHighlightedItem`
Осуществляет выбор подсвеченного элемента. Будет вызван метод `onSelectItem`.

### `highlightPrevItem`
Прокручивает список до предыдущего элемента и подсвечивает его.

### `highlightNextItem`
Прокручивает список до следующего элемента и подсвечивает его.

### `highlightFirstItem`
Прокручивает список до первого элемента и подсвечивает его.

### `highlightLastItem`
Прокручивает список до последнего элемента и подсвечивает его.

### `scrollToFirstSelected`
Прокручивает список до первого выбранного элемента.

### `focus`
Устанавливает фокус на список.

### `getListElement`
Получает ссылку на HTML элемент списка (контейнер).

---

## Свойства

### `isOpen`
Определяет состояние меню: открыто или закрыто.
- Тип: `boolean`
- По умолчанию: (обязательный параметр)
- Обязательное: **да**

### `items`
Массив элементов списка.
- Тип: `Array<T>`
- По умолчанию: (обязательный параметр)
- Обязательное: **да**

### `value`
Выбранное значение.
- Тип: `T | null`
- По умолчанию: (обязательный параметр)
- Обязательное: **да**

### `children`
Коллбэк функция рендера элементов списка. Функция будет вызвана с двумя аргументами:
- **1 аргумент:** `{ item: T, index: number }`
- **2 аргумент:** `{ selected: boolean, hovered: boolean, onMouseEnter: MouseHandle, onMouseLeave: MouseHandle, onClick: MouseHandle }` — следует передать компоненту `<MenuItem>`.
- Тип: `function({item: T, index: number}, itemProps): ReactNode`
- По умолчанию: (обязательный параметр)
- Обязательное: **да**

### `onSelectItem`
Коллбэк функция, вызываемая при выборе элемента в списке. В качестве аргумента передается выбранный элемент. Если `multiple={true}`, в качестве аргумента передается массив со всеми выбранными элементами.
- Тип: `function(item: T) | function(items: Array<T>)`
- По умолчанию: (не указано)
- Обязательное: нет

### `anchorElement`
Элемент, к которому будет привязан список. Игнорируется, если `anchorPos="static"`.
- Тип: `HTMLElement | null | undefined`
- По умолчанию: (не указано)
- Обязательное: нет

### `getOptionSelected`
Функция, определяющая, является ли элемент списка выбранным. Вызывается для каждого элемента списка.
- Тип: `function({ item: T, value: T }): boolean`
- По умолчанию: (не указано)
- Обязательное: нет

### `onRequestClose`
Функция, вызываемая при закрытии списка.
- Тип: `function(event: Event)`
- По умолчанию: (не указано)
- Обязательное: нет

### `closeOutsideClick`
Определяет, будет ли вызван `onRequestClose` при клике вне списка.
- Тип: `boolean`
- По умолчанию: `true`
- Обязательное: нет

### `closeOnSelect`
Определяет, будет ли вызван `onRequestClose` при выборе элемента из списка.
- Тип: `boolean`
- По умолчанию: `true`
- Обязательное: нет

### `multiple`
Флаг, определяющий возможность множественного выбора элементов.
- Тип: `boolean`
- По умолчанию: `false`
- Обязательное: нет

### `autofocus`
Определяет, следует ли устанавливать фокус на список сразу после открытия.
- Тип: `boolean`
- По умолчанию: `true`
- Обязательное: нет

### `anchorPos`
Определяет расположение выпадающего списка относительно анкора (`anchorElement`).
- Тип: `'auto' | 'auto-start-end' | 'top-start' | 'top-end' | 'top' | 'bottom' | 'top-start-end' | 'bottom-start-end' | 'bottom-start' | 'bottom-end' | 'static'`
- По умолчанию: `'auto'`
- Обязательное: нет

### `zIndex`
Значение `z-index` для списка.
- Тип: `number`
- По умолчанию: `theme.zIndex.modal`
- Обязательное: нет

### `overrides`
Объект для переопределения составных компонентов меню.
- Тип: `Object`
- По умолчанию: `undefined`
- Обязательное: нет

#### `overrides.List`
Элемент списка.
- Тип: `React.Component`
- По умолчанию: `<MenuList>`

---

Помимо перечисленных свойств, компонент принимает [стандартные атрибуты](https://developer.mozilla.org/ru/docs/Web/HTML/Element/div#атрибуты) HTML элемента `<div>`
