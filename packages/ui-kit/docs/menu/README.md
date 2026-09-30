# Выпадающее меню

## Содержание

- [Описание](#описание)
- [Меню действий](#меню-действий)
- [Мультивыбор](#мультивыбор)
- [Управление с клавиатуры](#управление-с-клавиатуры)
- [Закрытие](#закрытие)
- [Позиция](#позиция)
- [API](#api)
- [Переопределение](#переопределение)
- [Свойства](#свойства)
- [Свойства MenuItem](#свойства-menuitem)

## Описание

Компонент `<Menu>` показывает рядом с анкором (`anchorElement`) выпадающий список элементов, из которого можно выбрать один или несколько. Меню отрисовывается через [`<Popper>`](../popper/README.md) и не закрывается само: видимостью управляет свойство `isOpen`, а о том, что меню пора закрыть, сообщает `onRequestClose`.

Элементы задаются массивом `items`, а отрисовывает их функция `children`. Она получает элемент с его индексом и свойства, которые нужно передать в `<MenuItem>`: обработчики мыши и признаки `selected` и `hovered`.

_Пример использования:_

```tsx
import React from 'react';
import Button from '@via-profit/ui-kit/Button';
import Menu from '@via-profit/ui-kit/Menu';
import MenuItem from '@via-profit/ui-kit/Menu/MenuItem';

type Country = {
  readonly code: string;
  readonly name: string;
};

const Example: React.FC = () => {
  const [anchorElement, setAnchorElement] = React.useState<HTMLButtonElement | null>(null);
  const [value, setValue] = React.useState<Country | null>(null);

  return (
    <>
      <Button onClick={event => setAnchorElement(anchorElement ? null : event.currentTarget)}>
        {value ? `Выбрано: ${value.name}` : 'Выберите'}
      </Button>
      <Menu
        anchorElement={anchorElement}
        isOpen={Boolean(anchorElement)}
        anchorPos="bottom-fill"
        autoFlip
        value={value}
        items={countries}
        getOptionSelected={({ item, value }) => item.code === value.code}
        onRequestClose={() => setAnchorElement(null)}
        onSelectItem={item => setValue(item)}
      >
        {({ item }, itemProps) => (
          <MenuItem {...itemProps} key={item.code}>
            {item.name}
          </MenuItem>
        )}
      </Menu>
    </>
  );
};

export default Example;
```

<ExampleMenuOverview />

Выбранный элемент определяется функцией `getOptionSelected`. Если она не передана, элементы сравниваются поверхностно: равны, если совпадают все их собственные поля. Для объектов с идентификатором лучше передавать `getOptionSelected` — это быстрее и надёжнее.

`children` должна вернуть ровно один элемент на каждый элемент `items`: по порядку дочерних элементов списка меню прокручивается к выбранному и подсвеченному элементу.

## Меню действий

Меню не обязано хранить выбранное значение. Передайте `value={null}` и выполняйте действие в `onSelectItem`. Свойство `startIcon` компонента `<MenuItem>` добавляет иконку перед текстом.

_Пример использования:_

```tsx
import React from 'react';
import Button from '@via-profit/ui-kit/Button';
import Menu from '@via-profit/ui-kit/Menu';
import MenuItem from '@via-profit/ui-kit/Menu/MenuItem';

const actions = [
  { id: 'create', label: 'Создать', icon: <PlusIcon /> },
  { id: 'copy', label: 'Копировать', icon: <CopyIcon /> },
  { id: 'open', label: 'Открыть', icon: <OpenIcon /> },
];

const Example: React.FC = () => {
  const [anchorElement, setAnchorElement] = React.useState<HTMLButtonElement | null>(null);

  return (
    <>
      <Button onClick={event => setAnchorElement(anchorElement ? null : event.currentTarget)}>
        Действия
      </Button>
      <Menu
        anchorElement={anchorElement}
        isOpen={Boolean(anchorElement)}
        anchorPos="bottom-start"
        offset={4}
        value={null}
        items={actions}
        onRequestClose={() => setAnchorElement(null)}
        onSelectItem={action => runAction(action.id)}
      >
        {({ item }, itemProps) => (
          <MenuItem {...itemProps} key={item.id} startIcon={item.icon}>
            {item.label}
          </MenuItem>
        )}
      </Menu>
    </>
  );
};

export default Example;
```

<ExampleMenuActions />

## Мультивыбор

Со свойством `multiple` можно выбрать несколько элементов. `value` в этом режиме — массив, а `onSelectItem` получает новый массив целиком: выбор элемента добавляет его в массив, повторный выбор — убирает. По умолчанию в этом режиме меню не закрывается после выбора (`closeOnSelect={false}`).

_Пример использования:_

```tsx
import React from 'react';
import Button from '@via-profit/ui-kit/Button';
import Menu from '@via-profit/ui-kit/Menu';
import MenuItem from '@via-profit/ui-kit/Menu/MenuItem';
import Badge from '@via-profit/ui-kit/Badge';

const Example: React.FC = () => {
  const [anchorElement, setAnchorElement] = React.useState<HTMLButtonElement | null>(null);
  const [value, setValue] = React.useState<readonly Country[]>([]);

  return (
    <>
      <div>
        {value.map(item => (
          <Badge
            key={item.code}
            color="primary"
            variant="outlined"
            onDelete={() => setValue(value.filter(v => v.code !== item.code))}
          >
            {item.name}
          </Badge>
        ))}
      </div>
      <Button onClick={event => setAnchorElement(anchorElement ? null : event.currentTarget)}>
        Выберите
      </Button>
      <Menu
        anchorElement={anchorElement}
        isOpen={Boolean(anchorElement)}
        multiple
        value={value}
        items={countries}
        getOptionSelected={({ item, value }) => item.code === value.code}
        onRequestClose={() => setAnchorElement(null)}
        onSelectItem={items => setValue(items)}
      >
        {({ item }, itemProps) => (
          <MenuItem {...itemProps} key={item.code}>
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

## Управление с клавиатуры

После открытия меню получает фокус (это отключается свойством `autofocus={false}`) и подсвечивает первый выбранный элемент, прокручивая к нему список.

| Клавиша | Действие |
|---------|----------|
| <kbd>↓</kbd> / <kbd>↑</kbd> | подсветить следующий / предыдущий элемент |
| <kbd>Home</kbd> / <kbd>End</kbd> | подсветить первый / последний элемент |
| <kbd>Enter</kbd> | выбрать подсвеченный элемент |
| <kbd>Esc</kbd>, <kbd>Tab</kbd> | закрыть меню (вызвать `onRequestClose`) |

Мышь и клавиатура подсвечивают один и тот же элемент: после наведения курсора стрелки продолжают от элемента под курсором, а <kbd>Enter</kbd> выбирает его.

Если меню закрывается, пока фокус внутри него, фокус возвращается на анкор. Так пользователь клавиатуры не теряет место на странице.

Для программ чтения с экрана список имеет роль `listbox`, а элементы `<MenuItem>` — роль `option` и атрибут `aria-selected`.

## Закрытие

Меню вызывает `onRequestClose`, когда:

- выбран элемент — если `closeOnSelect` не равно `false`. По умолчанию `true`, а в режиме `multiple` — `false`;
- нажата клавиша <kbd>Esc</kbd> или <kbd>Tab</kbd>;
- нажата кнопка мыши за пределами меню — если `closeOutsideClick` не равно `false`.

Нажатие на анкор не считается нажатием за пределами меню: обычно анкор сам открывает и закрывает меню, и без этого нажатие на него сначала закрывало бы меню, а затем сразу открывало снова. Если анкор сам меню не закрывает, например это поле ввода, передайте `closeOnAnchorClick`.

## Позиция

Положение меню относительно анкора задают свойства `anchorPos`, `autoFlip`, `alternativePlacements`, `offset`, `positionStrategy` и `viewportMargin`. Они передаются в `<Popper>` и работают так же, как в нём — подробнее в [документации Popper](../popper/README.md#позиция).

По умолчанию меню открывается под анкором (`anchorPos="bottom"`) и не переворачивается, если не помещается в окне. Чтобы меню открывалось сверху, когда снизу не хватает места, передайте `autoFlip`. Позиция `bottom-fill` делает меню шириной с анкор, а `maxWidth` ограничивает ширину меню.

Список не выше `18em`, дальше он прокручивается.

## API

Через `ref` компонент `<Menu>` предоставляет методы для управления меню извне. Они пригодятся, когда фокус остаётся в другом элементе, — например, в поле ввода автодополнения, которое само обрабатывает клавиши. В таком случае передайте `autofocus={false}`.

_Пример использования:_

```tsx
import React from 'react';
import Menu, { MenuRef } from '@via-profit/ui-kit/Menu';

const Example: React.FC = () => {
  const menuRef = React.useRef<MenuRef | null>(null);

  return (
    <>
      <Button onClick={() => menuRef.current?.highlightNextItem()}>Следующий</Button>
      <Button onClick={() => menuRef.current?.selectHighlightedItem()}>Выбрать</Button>
      <Menu ref={menuRef} autofocus={false} {...menuProps}>
        {renderItem}
      </Menu>
    </>
  );
};
```

<ExampleMenuAPI />

| Метод | Описание |
|-------|----------|
| `highlightIndex(index)` | подсвечивает элемент с индексом `index` и прокручивает к нему список |
| `highlightPrevItem()` | подсвечивает предыдущий элемент |
| `highlightNextItem()` | подсвечивает следующий элемент |
| `highlightFirstItem()` | подсвечивает первый элемент |
| `highlightLastItem()` | подсвечивает последний элемент |
| `selectItem(index)` | выбирает элемент с индексом `index`, как если бы на него нажали |
| `selectHighlightedItem()` | выбирает подсвеченный элемент |
| `scrollToIndex(index)` | прокручивает список к элементу с индексом `index`, если он не виден |
| `scrollToFirstSelected()` | подсвечивает первый выбранный элемент и прокручивает к нему список |
| `focus()` | переводит фокус на список |
| `getListElement()` | возвращает HTML-элемент списка или `null` |

## Переопределение

Компонент `<Menu>` является составным и реализован при помощи следующих компонентов:

- `<Popper>` — позиционирует меню относительно анкора
- `<List>` — контейнер списка. Получает `ref`, обработчики клавиатуры и фокуса и атрибуты `role`, `aria-multiselectable`, которые нужно передать корневому элементу

Используйте свойство `overrides`, чтобы переопределить один или несколько компонентов. Проще всего расширить стандартный компонент:

```tsx
import React from 'react';
import styled from '@emotion/styled';
import Menu from '@via-profit/ui-kit/Menu';
import MenuList, { MenuListProps } from '@via-profit/ui-kit/Menu/MenuList';

const StyledList = styled(MenuList)`
  max-height: 30em;
`;

const List = React.forwardRef<HTMLDivElement, MenuListProps>(function List(props, ref) {
  return <StyledList {...props} ref={ref} />;
});

<Menu overrides={{ List }} {...menuProps} />;
```

Элементы списка переопределять не нужно: их отрисовывает `children`, и вместо `<MenuItem>` можно использовать свой компонент, передав ему `itemProps`.

## Свойства

### `isOpen`
Если `true`, меню отображается.
- Тип: `boolean`
- Обязательное: **да**

### `anchorElement`
Элемент, рядом с которым отображается меню. Пока значение `null`, меню не отображается.
- Тип: `HTMLElement | null`
- Обязательное: **да**

### `items`
Элементы списка.
- Тип: `readonly T[]`
- Обязательное: **да**

### `value`
Выбранный элемент (`T | null`) или, при `multiple`, массив выбранных элементов (`readonly T[]`).
- Тип: `T | null | readonly T[]`
- Обязательное: **да**

### `children`
Функция отрисовки элемента. Получает `{ item, index }` и `itemProps` — свойства для `<MenuItem>`: `key`, `selected`, `hovered`, `onClick`, `onMouseEnter`, `onMouseMove`, `onMouseLeave`.
- Тип: `(data: { item: T; index: number }, itemProps: MenuItemProps) => React.ReactNode`
- Обязательное: **да**

### `onSelectItem`
Вызывается при выборе элемента. Получает выбранный элемент или, при `multiple`, новый массив выбранных элементов.
- Тип: `(value: T) => void` или `(value: readonly T[]) => void`
- По умолчанию: `undefined`
- Обязательное: нет

### `onRequestClose`
Вызывается, когда меню нужно закрыть. Подробнее в разделе [Закрытие](#закрытие).
- Тип: `(event?: KeyboardEvent | MouseEvent) => void`
- По умолчанию: `undefined`
- Обязательное: нет

### `getOptionSelected`
Определяет, выбран ли элемент. Подробнее в разделе [Описание](#описание).
- Тип: `(payload: { item: T; value: T }) => boolean`
- По умолчанию: поверхностное сравнение полей
- Обязательное: нет

### `multiple`
Разрешает выбор нескольких элементов.
- Тип: `boolean`
- По умолчанию: `false`
- Обязательное: нет

### `closeOnSelect`
Если `true`, после выбора элемента вызывается `onRequestClose`.
- Тип: `boolean`
- По умолчанию: `true`, а при `multiple` — `false`
- Обязательное: нет

### `closeOutsideClick`
Если `true`, нажатие кнопки мыши за пределами меню и анкора вызывает `onRequestClose`.
- Тип: `boolean`
- По умолчанию: `true`
- Обязательное: нет

### `closeOnAnchorClick`
Если `true`, нажатие на анкор тоже вызывает `onRequestClose`. Подробнее в разделе [Закрытие](#закрытие).
- Тип: `boolean`
- По умолчанию: `false`
- Обязательное: нет

### `autofocus`
Если `true`, после открытия фокус переходит на список.
- Тип: `boolean`
- По умолчанию: `true`
- Обязательное: нет

### `anchorPos`
Позиция меню относительно анкора. Подробнее в [документации Popper](../popper/README.md#позиция).
- Тип: `AnchorPos`
- По умолчанию: `'bottom'`
- Обязательное: нет

### `autoFlip`
Если `true`, меню меняет позицию, когда не помещается в окне.
- Тип: `boolean`
- По умолчанию: `false`
- Обязательное: нет

### `alternativePlacements`
Позиции, которые пробуются при `autoFlip`. Подробнее в [документации Popper](../popper/README.md#автоматический-выбор-позиции).
- Тип: `readonly AnchorPos[]`
- По умолчанию: `['bottom', 'top']`
- Обязательное: нет

### `onAnchorPosChanged`
Вызывается, когда меняется фактическая позиция меню.
- Тип: `(anchorPos: AnchorPos) => void`
- По умолчанию: `undefined`
- Обязательное: нет

### `offset`
Расстояние между анкором и меню в пикселях.
- Тип: `number`
- По умолчанию: `0`
- Обязательное: нет

### `positionStrategy`
Стратегия позиционирования. Подробнее в [документации Popper](../popper/README.md#стратегия-позиционирования).
- Тип: `'fixed' | 'absolute'`
- По умолчанию: `'fixed'`
- Обязательное: нет

### `viewportMargin`
Минимальный отступ меню от краёв окна в пикселях.
- Тип: `number`
- По умолчанию: `30`
- Обязательное: нет

### `maxWidth`
Максимальная ширина меню. Число — в пикселях, строка — в любых единицах CSS.
- Тип: `number | string`
- По умолчанию: `undefined`
- Обязательное: нет

### `zIndex`
Значение `z-index` меню.
- Тип: `number`
- По умолчанию: `theme.zIndex.modal`
- Обязательное: нет

### `overrides`
Объект для переопределения составных компонентов меню. Подробнее в разделе [Переопределение](#переопределение).
- Тип: `{ List?: React.ComponentType<MenuListProps>; Popper?: React.ComponentType<PopperProps> }`
- По умолчанию: `undefined`
- Обязательное: нет

## Свойства MenuItem

Помимо перечисленных ниже, `<MenuItem>` принимает стандартные атрибуты элемента `<div>`.

### `selected`
Если `true`, элемент отображается выбранным.
- Тип: `boolean`
- Обязательное: **да** (передаётся в `itemProps`)

### `hovered`
Если `true`, элемент отображается подсвеченным.
- Тип: `boolean`
- Обязательное: **да** (передаётся в `itemProps`)

### `startIcon`
Иконка или другой элемент перед текстом.
- Тип: `React.ReactNode`
- По умолчанию: `undefined`
- Обязательное: нет
