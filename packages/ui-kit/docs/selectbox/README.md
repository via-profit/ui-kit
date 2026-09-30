# Селектбокс

## Содержание

- [Описание](#описание)
- [Мультивыбор](#мультивыбор)
- [Состояния](#состояния)
- [Управление с клавиатуры](#управление-с-клавиатуры)
- [Переопределение](#переопределение)
- [Свойства](#свойства)

## Описание

Компонент `<Selectbox>` — кнопка, по нажатию на которую открывается список вариантов [`<Menu>`](../menu/README.md). В отличие от [`<Autocomplete>`](../autocomplete/README.md) в нём нельзя вводить текст: пользователь только выбирает из списка.

Открытием списка управляет родитель: передайте `isOpen` и меняйте его в `onRequestOpen` и `onRequestClose`. На кнопке отображается результат `selectedItemToString`, а если ничего не выбрано — `notSetLabel`.

_Пример использования:_

```tsx
import React from 'react';
import Selectbox, { SelectboxItem } from '@via-profit/ui-kit/Selectbox';

type Country = {
  readonly code: string;
  readonly name: string;
};

const Example: React.FC = () => {
  const [value, setValue] = React.useState<Country | null>(null);
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <Selectbox
      label="Страна"
      notSetLabel="Не выбрано"
      value={value}
      items={countries}
      isOpen={isOpen}
      onRequestOpen={() => setIsOpen(true)}
      onRequestClose={() => setIsOpen(false)}
      onChange={item => setValue(item)}
      getOptionSelected={({ item, value }) => item.code === value.code}
      selectedItemToString={item => item.name}
    >
      {({ item }, itemProps) => (
        <SelectboxItem {...itemProps} key={item.code}>
          {item.name}
        </SelectboxItem>
      )}
    </Selectbox>
  );
};

export default Example;
```

<ExampleSelectboxOverview />

Список открывается под кнопкой и шириной с неё (`anchorPos="bottom-fill"`), а если снизу не хватает места — над ней (`autoFlip`). Если `items` пуст, список не открывается.

## Мультивыбор

Со свойством `multiple` можно выбрать несколько элементов: `value` становится массивом, а `onChange` получает новый массив целиком. Выбор элемента добавляет его, повторный выбор — убирает. Список не закрывается после выбора.

`selectedItemToString` в этом режиме получает массив выбранных элементов — верните текст для кнопки, например названия через запятую или их количество.

Чтобы показать на кнопке не текст, а, например, бейджи, передайте `renderValue`. Функция получает выбранное значение (при `multiple` — массив) и возвращает содержимое кнопки. Если ничего не выбрано, показывается `notSetLabel`. Содержимое находится внутри `<button>`, поэтому в нём не должно быть других кнопок и ссылок: выбор снимается в списке.

_Пример использования:_

```tsx
import Badge from '@via-profit/ui-kit/Badge';

<Selectbox
  multiple
  fullWidth
  label="Страны"
  notSetLabel="Не выбрано"
  value={value}
  items={countries}
  isOpen={isOpen}
  onRequestOpen={() => setIsOpen(true)}
  onRequestClose={() => setIsOpen(false)}
  onChange={items => setValue(items)}
  getOptionSelected={({ item, value }) => item.code === value.code}
  selectedItemToString={items => items.map(item => item.name).join(', ')}
  renderValue={items => (
    <span style={{ display: 'flex', flexWrap: 'wrap', gap: '0.3em' }}>
      {items.map(item => (
        <Badge key={item.code} variant="outlined" color="primary">
          {item.name}
        </Badge>
      ))}
    </span>
  )}
>
  {({ item }, itemProps) => (
    <SelectboxItem {...itemProps} key={item.code}>
      {item.name}
    </SelectboxItem>
  )}
</Selectbox>
```

<ExampleSelectboxMultiple />

## Состояния

Селектбокс поддерживает те же состояния, что и [`<TextField>`](../text-field/README.md):

- `label` и `requiredAsterisk` — подпись и звёздочка обязательного поля;
- `error` и `errorText` — ошибка и её текст под кнопкой;
- `startIcon` — иконка перед значением; `endIcon` заменяет стрелку;
- `isLoading` — индикатор загрузки вместо стрелки;
- `disabled` — кнопка недоступна;
- `fullWidth` — кнопка на всю ширину родителя. Без него ширина от `16em`.

<ExampleSelectboxStates />

## Управление с клавиатуры

| Клавиша | Действие |
|---------|----------|
| <kbd>Enter</kbd>, пробел, <kbd>↓</kbd>, <kbd>↑</kbd> на кнопке | открыть список |
| <kbd>↓</kbd> / <kbd>↑</kbd>, <kbd>Home</kbd> / <kbd>End</kbd> | подсветить элемент списка |
| <kbd>Enter</kbd> | выбрать подсвеченный элемент |
| <kbd>Esc</kbd>, <kbd>Tab</kbd> | закрыть список |

После открытия фокус переходит в список, а после закрытия возвращается на кнопку. Подробнее в [документации Menu](../menu/README.md#управление-с-клавиатуры).

## Переопределение

Компонент `<Selectbox>` является составным и реализован при помощи следующих компонентов:

- `<Container>` — корневой элемент
- `<Label>` — подпись
- `<Asterisk>` — звёздочка обязательного поля
- `<ButtonWrapper>` — обёртка кнопки
- `<Button>` — кнопка
- `<Icon>` — стрелка в кнопке
- `<ErrorText>` — текст ошибки

Используйте свойство `overrides`, чтобы переопределить один или несколько компонентов. Переопределённые компоненты создавайте один раз — вне компонента или в `React.useMemo`. Компонент, созданный прямо при рендере, React считает новым на каждом рендере: кнопка пересоздаётся и теряет фокус.

_Пример использования:_

```tsx
import React from 'react';
import Selectbox, { SelectboxOverrides } from '@via-profit/ui-kit/Selectbox';

const Icon: NonNullable<SelectboxOverrides['Icon']> = ({ isOpen }) => (
  <span style={{ transform: `rotate(${isOpen ? 180 : 0}deg)` }}>▼</span>
);

// Created once, outside of the component
const overrides = { Icon };

const Example: React.FC = () => <Selectbox overrides={overrides} {...props} />;
```

<ExampleSelectboxOverrides />

## Свойства

Помимо перечисленных ниже, `<Selectbox>` принимает стандартные атрибуты элемента `<button>` (`disabled`, `name` и другие) и передаёт их кнопке. `ref` указывает на кнопку.

### `items`
Элементы списка.
- Тип: `readonly T[]`
- Обязательное: **да**

### `value`
Выбранный элемент (`T | null`) или, при `multiple`, массив выбранных элементов.
- Тип: `T | null | readonly T[]`
- Обязательное: **да**

### `selectedItemToString`
Возвращает текст кнопки для выбранного значения. При `multiple` получает массив. Не вызывается, если ничего не выбрано.
- Тип: `(value: T) => string` или `(value: readonly T[]) => string`
- Обязательное: **да**

### `renderValue`
Отрисовывает содержимое кнопки для выбранного значения вместо текста `selectedItemToString`. При `multiple` получает массив. Не вызывается, если ничего не выбрано. Не размещайте в нём кнопки и ссылки: содержимое находится внутри `<button>`.
- Тип: `(value: T) => React.ReactNode` или `(value: readonly T[]) => React.ReactNode`
- По умолчанию: `undefined`
- Обязательное: нет

### `children`
Функция отрисовки элемента списка. Получает `{ item, index }` и `itemProps` для `<SelectboxItem>`.
- Тип: `(data: { item: T; index: number }, itemProps: MenuItemProps) => React.ReactNode`
- Обязательное: **да**

### `isOpen`
Если `true`, список открыт.
- Тип: `boolean`
- По умолчанию: `false`
- Обязательное: нет, но без него список не откроется

### `onRequestOpen`
Вызывается, когда список нужно открыть: при нажатии на кнопку или клавиш-стрелок.
- Тип: `(event: React.SyntheticEvent) => void`
- По умолчанию: `undefined`
- Обязательное: нет

### `onRequestClose`
Вызывается, когда список нужно закрыть: при повторном нажатии на кнопку, клике мимо, выборе элемента (без `multiple`), клавишах <kbd>Esc</kbd> и <kbd>Tab</kbd>.
- Тип: `(event?: KeyboardEvent | MouseEvent) => void`
- По умолчанию: `undefined`
- Обязательное: нет

### `onChange`
Вызывается при выборе элемента. Получает элемент или, при `multiple`, новый массив.
- Тип: `(value: T) => void` или `(value: readonly T[]) => void`
- По умолчанию: `undefined`
- Обязательное: нет

### `getOptionSelected`
Определяет, выбран ли элемент. Подробнее в [документации Menu](../menu/README.md#описание).
- Тип: `(payload: { item: T; value: T }) => boolean`
- По умолчанию: поверхностное сравнение полей
- Обязательное: нет

### `multiple`
Разрешает выбор нескольких элементов.
- Тип: `boolean`
- По умолчанию: `false`
- Обязательное: нет

### `notSetLabel`
Текст кнопки, когда ничего не выбрано.
- Тип: `string`
- По умолчанию: `'Not set'`
- Обязательное: нет

### `label`
Подпись над кнопкой.
- Тип: `React.ReactNode`
- По умолчанию: `undefined`
- Обязательное: нет

### `requiredAsterisk`
Если `true`, к подписи добавляется `*`. Можно передать свой элемент.
- Тип: `boolean | React.ReactNode`
- По умолчанию: `undefined`
- Обязательное: нет

### `error`
Если `true`, кнопка отображается с ошибкой и показывается `errorText`.
- Тип: `boolean`
- По умолчанию: `undefined`
- Обязательное: нет

### `errorText`
Текст ошибки под кнопкой.
- Тип: `React.ReactNode`
- По умолчанию: `undefined`
- Обязательное: нет

### `startIcon`
Иконка перед значением.
- Тип: `React.ReactElement`
- По умолчанию: `undefined`
- Обязательное: нет

### `endIcon`
Элемент вместо стрелки.
- Тип: `React.ReactElement`
- По умолчанию: стрелка `<Icon>`
- Обязательное: нет

### `isLoading`
Если `true`, вместо стрелки отображается индикатор загрузки.
- Тип: `boolean`
- По умолчанию: `false`
- Обязательное: нет

### `fullWidth`
Если `true`, селектбокс занимает всю ширину родителя.
- Тип: `boolean`
- По умолчанию: `false`
- Обязательное: нет

### `anchorPos`
Позиция списка относительно кнопки. Подробнее в [документации Popper](../popper/README.md#позиция).
- Тип: `AnchorPos`
- По умолчанию: `'bottom-fill'`
- Обязательное: нет

### `autoFlip`
Если `true`, список открывается сверху, когда снизу не хватает места.
- Тип: `boolean`
- По умолчанию: `true`
- Обязательное: нет

### `positionStrategy`
Стратегия позиционирования. Подробнее в [документации Popper](../popper/README.md#стратегия-позиционирования).
- Тип: `'fixed' | 'absolute'`
- По умолчанию: `'fixed'`
- Обязательное: нет

### `overrides`
Объект для переопределения составных компонентов. Подробнее в разделе [Переопределение](#переопределение).
- Тип: `SelectboxOverrides`
- По умолчанию: `undefined`
- Обязательное: нет
