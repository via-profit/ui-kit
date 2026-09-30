# Автокомплит

## Содержание

- [Описание](#описание)
- [Фильтрация](#фильтрация)
- [Поведение поля](#поведение-поля)
- [Загрузка с сервера](#загрузка-с-сервера)
- [Создание нового значения](#создание-нового-значения)
- [Мультивыбор](#мультивыбор)
- [Переопределение](#переопределение)
- [API](#api)
- [Свойства](#свойства)

## Описание

Компонент `<Autocomplete>` — текстовое поле [`<TextField>`](../text-field/README.md) с выпадающим списком [`<Menu>`](../menu/README.md). По мере ввода список фильтруется, а выбранный элемент подставляется в поле.

Открытием списка управляет родитель: передайте `isOpen` и меняйте его в `onRequestOpen` и `onRequestClose`. Без этого список не откроется.

Функция `selectedItemToString` превращает выбранный элемент в текст поля, а `children` отрисовывает элементы списка. `children` получает также `inputValue` — введённый текст, его удобно подсвечивать компонентом [`<Highlighted>`](../highlighted/README.md).

_Пример использования:_

```tsx
import React from 'react';
import Autocomplete, { AutocompleteItem } from '@via-profit/ui-kit/Autocomplete';
import Highlighted from '@via-profit/ui-kit/Highlighted';

type Country = {
  readonly code: string;
  readonly name: string;
};

const Example: React.FC = () => {
  const [value, setValue] = React.useState<Country | null>(null);
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <Autocomplete
      label="Страна"
      value={value}
      items={countries}
      isOpen={isOpen}
      openOnFocus={false}
      onRequestOpen={() => setIsOpen(true)}
      onRequestClose={() => setIsOpen(false)}
      onChange={item => setValue(item)}
      selectedItemToString={item => item.name}
      filterItems={(items, { query }) =>
        items.filter(item => item.name.toLocaleLowerCase().includes(query))
      }
    >
      {({ item, inputValue }, itemProps) => (
        <AutocompleteItem {...itemProps} key={item.code}>
          <Highlighted text={item.name} highlight={inputValue} />
        </AutocompleteItem>
      )}
    </Autocomplete>
  );
};

export default Example;
```

<ExampleAutocompleteOverview />

## Фильтрация

Функция `filterItems(items, { query, inputValue })` получает все элементы и возвращает те, что подходят под введённый текст:

- `query` — введённый текст в нижнем регистре и без пробелов по краям. Удобен для сравнения;
- `inputValue` — введённый текст как есть. Нужен, если текст используется дальше, например при [создании нового значения](#создание-нового-значения).

Пока поле пустое, `filterItems` не вызывается и показываются все элементы. Если `filterItems` не передана, показываются все элементы всегда.

Список открывается, когда есть что показать, и закрывается, когда отфильтрованный список пуст. Если после фильтрации остался один элемент, он подсвечивается, и <kbd>Enter</kbd> сразу выбирает его.

## Поведение поля

| Действие | Результат |
|----------|-----------|
| фокус на поле | список открывается, если `openOnFocus` не равно `false` |
| ввод текста | список фильтруется и открывается |
| <kbd>↓</kbd> / <kbd>↑</kbd>, <kbd>Home</kbd> / <kbd>End</kbd> | подсветка элементов списка; <kbd>↓</kbd> открывает закрытый список |
| <kbd>Enter</kbd> | выбор подсвеченного элемента |
| <kbd>Esc</kbd> | список закрывается, текст остаётся |
| уход из поля (<kbd>Tab</kbd> или клик мимо) | список закрывается; если `clearOnBlur` не равно `false`, в поле возвращается текст выбранного значения |
| кнопка очистки | `onChange(null)` (или `[]` при `multiple`), поле очищается и получает фокус |

При работе с клавиатуры фокус остаётся в поле: список управляется через [API меню](../menu/README.md#api), поэтому пользователь может продолжать печатать.

`clearOnBlur` защищает от ситуации, когда в поле остался недописанный текст, а выбрано другое значение. Если нужно сохранить произвольный текст, отключите его и обрабатывайте ввод через `onInputChange`.

## Загрузка с сервера

Чтобы искать на сервере, загружайте элементы в `onInputChange` и передавайте результат в `items`. Фильтровать их ещё раз не нужно, поэтому `filterItems` возвращает элементы как есть. `isLoading` показывает индикатор загрузки вместо кнопки очистки.

_Пример использования:_

```tsx
import React from 'react';
import Autocomplete, { AutocompleteItem } from '@via-profit/ui-kit/Autocomplete';

const Example: React.FC = () => {
  const [value, setValue] = React.useState<Country | null>(null);
  const [items, setItems] = React.useState<Country[]>([]);
  const [isLoading, setIsLoading] = React.useState(false);
  const [isOpen, setIsOpen] = React.useState(false);
  const timeoutRef = React.useRef<ReturnType<typeof setTimeout>>();

  const handleInputChange: React.ChangeEventHandler<HTMLInputElement> = event => {
    const query = event.currentTarget.value.trim();

    // Wait until the user stops typing
    clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(async () => {
      setIsLoading(true);
      const list = await fetchCountries(query);
      setIsLoading(false);
      setItems(list);
      setIsOpen(list.length > 0);
    }, 300);
  };

  return (
    <Autocomplete
      label="Страна"
      value={value}
      items={items}
      isLoading={isLoading}
      isOpen={isOpen}
      onRequestOpen={() => setIsOpen(true)}
      onRequestClose={() => setIsOpen(false)}
      onChange={item => setValue(item)}
      onInputChange={handleInputChange}
      selectedItemToString={item => item.name}
      filterItems={items => items}
    >
      {({ item }, itemProps) => (
        <AutocompleteItem {...itemProps} key={item.code}>
          {item.name}
        </AutocompleteItem>
      )}
    </Autocomplete>
  );
};

export default Example;
```

<ExampleAutocompleteFetch />

## Создание нового значения

Чтобы пользователь мог выбрать значение, которого нет в списке, добавьте его в результат `filterItems`. Используйте `inputValue`, а не `query`, чтобы сохранить регистр введённого текста. Вариант `virtual` компонента `<AutocompleteItem>` выделяет такой элемент.

_Пример использования:_

```tsx
<Autocomplete
  filterItems={(items, { query, inputValue }) => {
    const filtered = items.filter(item => item.name.toLocaleLowerCase().includes(query));
    const name = inputValue.trim();
    const exists = filtered.some(item => item.name.toLocaleLowerCase() === query);

    if (name.length > 0 && !exists) {
      filtered.push({ code: `new:${name}`, name, isVirtual: true });
    }

    return filtered;
  }}
  {...otherProps}
>
  {({ item, inputValue }, itemProps) => (
    <AutocompleteItem
      {...itemProps}
      key={item.code}
      startIcon={item.isVirtual ? <PlusIcon /> : undefined}
      variant={item.isVirtual ? 'virtual' : 'standard'}
    >
      <Highlighted disabledHighlighting={item.isVirtual} text={item.name} highlight={inputValue} />
    </AutocompleteItem>
  )}
</Autocomplete>
```

Введите название страны, которой нет в списке:

<ExampleAutocompleteCreatable />

## Мультивыбор

Со свойством `multiple` можно выбрать несколько элементов: `value` становится массивом, а `onChange` получает новый массив целиком.

Выбранные элементы отображаются внутри поля в виде меток, а поле служит только для поиска. Подпись метки возвращает `selectedItemToString` — в этом режиме она вызывается для каждого выбранного элемента.

- выбор элемента из списка добавляет метку, очищает поиск и оставляет список открытым для следующего выбора. Повторный выбор отмеченного элемента убирает его;
- <kbd>Backspace</kbd> в пустом поле удаляет последнюю метку;
- кнопка на метке удаляет её;
- кнопка очистки удаляет все метки;
- при уходе из поля недописанный текст поиска очищается (если `clearOnBlur` не равно `false`).

Мультивыбор можно совместить с [созданием нового значения](#создание-нового-значения): выбранный вариант «Добавить…» превращается в обычный элемент — добавляется в `items` и в `value`.

_Пример использования:_

```tsx
import React from 'react';
import Autocomplete, { AutocompleteItem, FilterItems } from '@via-profit/ui-kit/Autocomplete';
import Highlighted from '@via-profit/ui-kit/Highlighted';

type Item = {
  readonly code: string;
  readonly name: string;
  readonly isVirtual?: boolean;
};

const filterItems: FilterItems<Item> = (items, { query, inputValue }) => {
  const filtered = items.filter(item => item.name.toLocaleLowerCase().includes(query));
  const name = inputValue.trim();
  const exists = items.some(item => item.name.toLocaleLowerCase() === query);

  if (name.length > 0 && !exists) {
    return [...filtered, { code: `new:${name}`, name, isVirtual: true }];
  }

  return filtered;
};

const Example: React.FC = () => {
  const [items, setItems] = React.useState<readonly Item[]>(countries);
  const [value, setValue] = React.useState<readonly Item[]>([]);
  const [isOpen, setIsOpen] = React.useState(false);

  const handleChange = (newValue: readonly Item[]) => {
    // The chosen virtual item becomes a real one
    const created = newValue.filter(item => item.isVirtual).map(({ code, name }) => ({ code, name }));

    if (created.length > 0) {
      setItems(current => [...current, ...created]);
    }

    setValue(newValue.map(item => (item.isVirtual ? { code: item.code, name: item.name } : item)));
  };

  return (
    <Autocomplete
      multiple
      label="Страны"
      value={value}
      items={items}
      isOpen={isOpen}
      onRequestOpen={() => setIsOpen(true)}
      onRequestClose={() => setIsOpen(false)}
      onChange={handleChange}
      getOptionSelected={({ item, value }) => item.code === value.code}
      selectedItemToString={item => item.name}
      filterItems={filterItems}
    >
      {({ item, inputValue }, itemProps) => (
        <AutocompleteItem
          {...itemProps}
          key={item.code}
          startIcon={item.isVirtual ? <PlusIcon /> : undefined}
          variant={item.isVirtual ? 'virtual' : 'standard'}
        >
          {item.isVirtual ? (
            `Добавить «${item.name}»`
          ) : (
            <Highlighted text={item.name} highlight={inputValue} />
          )}
        </AutocompleteItem>
      )}
    </Autocomplete>
  );
};

export default Example;
```

Выберите несколько стран, затем введите название, которого нет в списке, и нажмите <kbd>Enter</kbd>:

<ExampleAutocompleteMultiple />

## Переопределение

Компонент `<Autocomplete>` использует следующие компоненты:

- `<TextField>` — поле ввода

Свойство `overrides.TextField` заменяет поле ввода. Компонент получает все свойства `<TextField>` и должен передавать `ref` корневому элементу (к нему привязан список), а `inputRef` — полю ввода. При `multiple` метки отображаются через `overrides.Input` компонента `<TextField>`: передайте свойство `overrides` дальше в `<TextField>`, иначе меток не будет видно.

Например, так можно искать в справочнике телефонов, вводя номер в [`<PhoneField>`](../phone-field/README.md):

```tsx
import React from 'react';
import Autocomplete from '@via-profit/ui-kit/Autocomplete';
import PhoneField from '@via-profit/ui-kit/PhoneField';
import templates from '@via-profit/ui-kit/PhoneField/templates';
import type { TextFieldProps } from '@via-profit/ui-kit/TextField';

const PhoneTextField = React.forwardRef<HTMLDivElement, TextFieldProps>(
  function PhoneTextField(props, ref) {
    const { value, onChange, ...restProps } = props;

    return (
      <PhoneField
        {...restProps}
        ref={ref}
        templates={templates}
        value={String(value)}
        onChange={event => onChange?.(event)}
      />
    );
  },
);

<Autocomplete overrides={{ TextField: PhoneTextField }} {...otherProps} />;
```

<ExampleAutocompleteOverrides />

Элементы списка переопределять не нужно: их отрисовывает `children`. Вместо `<AutocompleteItem>` можно использовать `<MenuItem>` или свой компонент, передав ему `itemProps`.

## API

Через `ref` компонент `<Autocomplete>` предоставляет метод `clear()`. Он делает то же, что кнопка очистки: вызывает `onChange(null)` (или `[]` при `multiple`), очищает поле и переводит на него фокус.

```tsx
const autocompleteRef = React.useRef<AutocompleteRef | null>(null);

<Autocomplete ref={autocompleteRef} {...props} />;

autocompleteRef.current?.clear();
```

## Свойства

Помимо перечисленных ниже, `<Autocomplete>` принимает свойства [`<TextField>`](../text-field/README.md#свойства) (`label`, `placeholder`, `error`, `errorText`, `startIcon` и другие), кроме `value`, `onChange`, `children` и `overrides`.

Подсказки браузера в поле отключены (`autoComplete="off"`), чтобы они не отображались поверх списка. Чтобы включить их, передайте своё значение `autoComplete`.

### `items`
Все элементы списка.
- Тип: `readonly T[]`
- Обязательное: **да**

### `value`
Выбранный элемент (`T | null`) или, при `multiple`, массив выбранных элементов.
- Тип: `T | null | readonly T[]`
- Обязательное: **да**

### `selectedItemToString`
Превращает выбранный элемент в текст поля. При `multiple` вызывается для каждого выбранного элемента и возвращает подпись его метки.
- Тип: `(item: T) => string`
- Обязательное: **да**

### `children`
Функция отрисовки элемента списка. Получает `{ item, index, inputValue }` и `itemProps` для `<AutocompleteItem>` или `<MenuItem>`.
- Тип: `(data: { item: T; index: number; inputValue: string }, itemProps: MenuItemProps) => React.ReactNode`
- Обязательное: **да**

### `isOpen`
Если `true`, список открыт. Подробнее в разделе [Описание](#описание).
- Тип: `boolean`
- По умолчанию: `false`
- Обязательное: нет, но без него список не откроется

### `onRequestOpen`
Вызывается, когда список нужно открыть.
- Тип: `(event: React.SyntheticEvent) => void`
- По умолчанию: `undefined`
- Обязательное: нет

### `onRequestClose`
Вызывается, когда список нужно закрыть.
- Тип: `(event?: KeyboardEvent | MouseEvent) => void`
- По умолчанию: `undefined`
- Обязательное: нет

### `onChange`
Вызывается при выборе элемента и при очистке. Получает элемент, `null` или, при `multiple`, массив.
- Тип: `(value: T | null) => void` или `(value: readonly T[]) => void`
- По умолчанию: `undefined`
- Обязательное: нет

### `filterItems`
Возвращает элементы, подходящие под введённый текст. Подробнее в разделе [Фильтрация](#фильтрация).
- Тип: `(items: readonly T[], data: { query: string; inputValue: string }) => readonly T[]`
- По умолчанию: `undefined` — показываются все элементы
- Обязательное: нет

### `onInputChange`
Вызывается при каждом изменении текста в поле.
- Тип: `React.ChangeEventHandler<HTMLInputElement>`
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

### `openOnFocus`
Если `true`, список открывается при фокусе на поле.
- Тип: `boolean`
- По умолчанию: `true`
- Обязательное: нет

### `clearOnBlur`
Если `true`, при уходе из поля в нём восстанавливается текст выбранного значения.
- Тип: `boolean`
- По умолчанию: `true`
- Обязательное: нет

### `clearable`
Если `true`, в поле отображается кнопка очистки.
- Тип: `boolean`
- По умолчанию: `true`
- Обязательное: нет

### `isLoading`
Если `true`, вместо кнопки очистки отображается индикатор загрузки.
- Тип: `boolean`
- По умолчанию: `false`
- Обязательное: нет

### `anchorPos`
Позиция списка относительно поля. Подробнее в [документации Popper](../popper/README.md#позиция).
- Тип: `AnchorPos`
- По умолчанию: `'bottom-fill'`
- Обязательное: нет

### `autoFlip`
Если `true`, список открывается сверху, когда снизу не хватает места.
- Тип: `boolean`
- По умолчанию: `true`
- Обязательное: нет

### `alternativePlacements`
Позиции, которые пробуются при `autoFlip`.
- Тип: `readonly AnchorPos[]`
- По умолчанию: `['bottom-fill', 'top-fill']`
- Обязательное: нет

### `positionStrategy`
Стратегия позиционирования. Подробнее в [документации Popper](../popper/README.md#стратегия-позиционирования).
- Тип: `'fixed' | 'absolute'`
- По умолчанию: `'fixed'`
- Обязательное: нет

### `viewportMargin`
Минимальный отступ списка от краёв окна в пикселях.
- Тип: `number`
- По умолчанию: `30`
- Обязательное: нет

### `overrides`
Объект для переопределения составных компонентов. Подробнее в разделе [Переопределение](#переопределение).
- Тип: `{ TextField?: React.ComponentType<TextFieldProps> }`
- По умолчанию: `undefined`
- Обязательное: нет

## Свойства AutocompleteItem

`<AutocompleteItem>` принимает все свойства [`<MenuItem>`](../menu/README.md#свойства-menuitem) и дополнительно:

### `variant`
Вариант отображения: `virtual` выделяет элемент, которого нет в списке, например [созданное значение](#создание-нового-значения).
- Тип: `'standard' | 'virtual'`
- По умолчанию: `'standard'`
- Обязательное: нет
