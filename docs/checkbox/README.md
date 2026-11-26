# Чекбокс

## Содержание

- [Описание](#описание)
- [Контролируемый чекбокс](#контролируемый-чекбокс)
- [Промежуточное состояние](#промежуточное-состояние)
- [Цвета](#цвета)
- [Положение текста](#положение-текста)
- [Обязательное поле и ошибка](#обязательное-поле-и-ошибка)
- [Переопределение](#переопределение)
- [Свойства](#свойства)

## Описание

Компонент `<Checkbox>` — флажок для выбора «да/нет» или нескольких вариантов из списка. Внутри него нативный `<input type="checkbox">`, поэтому чекбокс работает с клавиатуры (Tab, пробел), участвует в отправке формы и озвучивается программами чтения с экрана. Текст передаётся в `children`; клик по тексту тоже переключает.

Для настроек, которые применяются сразу, лучше подходит [переключатель](../switch/README.md). Чекбокс уместен в формах, где выбор подтверждают кнопкой, и в списках.

Без свойства `checked` чекбокс неконтролируемый: он сам хранит состояние, а начальное значение задаёт `defaultChecked`.

_Пример использования:_

```tsx
import React from 'react';
import Checkbox from '@via-profit/ui-kit/Checkbox';

const Example: React.FC = () => (
  <>
    <Checkbox name="remember" defaultChecked>
      Запомнить меня
    </Checkbox>
    <Checkbox name="news">Подписаться на новости</Checkbox>
    <Checkbox defaultChecked disabled>
      Основные cookie (обязательно)
    </Checkbox>
  </>
);

export default Example;
```

<ExampleCheckboxBasic />

## Контролируемый чекбокс

Чтобы управлять состоянием самостоятельно, передайте `checked` и `onChange`. Новое значение — в `event.currentTarget.checked`. Если передать `checked` без `onChange`, чекбокс нельзя будет переключить, а в консоль выведется ошибка.

`onChange` можно передать и неконтролируемому чекбоксу, чтобы узнавать об изменениях: состояние он продолжит хранить сам.

```tsx
const [accepted, setAccepted] = React.useState(false);

<Checkbox checked={accepted} onChange={event => setAccepted(event.currentTarget.checked)}>
  Согласен
</Checkbox>;
```

## Промежуточное состояние

Свойство `indeterminate` показывает прочерк вместо галочки. Обычно так выглядит чекбокс «Выбрать все», когда выбрана только часть списка. Меняется только вид: значение `checked` остаётся прежним, а программы чтения с экрана сообщают «частично отмечен».

Браузер сбрасывает промежуточное состояние при клике, но компонент восстанавливает его по свойству `indeterminate`. Поэтому управляйте им сами, как в примере ниже.

_Пример использования:_

```tsx
import React from 'react';
import Checkbox from '@via-profit/ui-kit/Checkbox';

const toppings = ['Сыр', 'Грибы', 'Оливки'];

const Example: React.FC = () => {
  const [selected, setSelected] = React.useState<readonly string[]>(['Сыр']);
  const isAllSelected = selected.length === toppings.length;

  return (
    <>
      <Checkbox
        checked={isAllSelected}
        indeterminate={selected.length > 0 && !isAllSelected}
        onChange={() => setSelected(isAllSelected ? [] : toppings)}
      >
        Все добавки
      </Checkbox>
      {toppings.map(topping => (
        <Checkbox
          key={topping}
          checked={selected.includes(topping)}
          onChange={event => {
            // Read the value right away: currentTarget is null inside the state updater
            const { checked } = event.currentTarget;
            setSelected(current =>
              checked ? [...current, topping] : current.filter(item => item !== topping),
            );
          }}
        >
          {topping}
        </Checkbox>
      ))}
    </>
  );
};

export default Example;
```

<ExampleCheckboxIndeterminate />

## Цвета

Свойство `color` задаёт цвет галочки и рамки отмеченного чекбокса.

- **`default`** — основной цвет акцента темы, как у `primary` (по умолчанию)
- **`primary`** — основной цвет акцента темы
- **`secondary`** — второстепенный цвет акцента темы
- любой цвет CSS: **hex**, **rgb(a)** или название цвета, например `lightpink`

```tsx
<Checkbox defaultChecked color="secondary">
  secondary
</Checkbox>
<Checkbox defaultChecked color="#308dfc">
  #308dfc
</Checkbox>
```

<ExampleCheckboxColors />

## Положение текста

Свойство `labelPosition` задаёт положение текста относительно чекбокса:

- **`start`** — слева
- **`end`** — справа (по умолчанию)
- **`top`** — сверху
- **`bottom`** — снизу

```tsx
<Checkbox labelPosition="start">Слева</Checkbox>
<Checkbox labelPosition="top">Сверху</Checkbox>
```

<ExampleCheckboxLabelPlacement />

## Обязательное поле и ошибка

- `requiredAsterisk` — показывает звёздочку после текста. Можно передать свой элемент вместо `*`. Звёздочка только визуальная: чтобы браузер проверял поле, добавьте атрибут `required`;
- `error` и `errorText` — рамка окрашивается в цвет ошибки, а под чекбоксом показывается текст ошибки. При `error` у поля выставляется `aria-invalid`.

```tsx
<Checkbox
  requiredAsterisk
  checked={accepted}
  onChange={event => setAccepted(event.currentTarget.checked)}
  error={!accepted}
  errorText="Без согласия продолжить нельзя"
>
  Я принимаю условия использования
</Checkbox>
```

<ExampleCheckboxValidation />

## Переопределение

Компонент `<Checkbox>` является составным и реализован при помощи следующих компонентов:

- `<Wrapper>` — корневой элемент: чекбокс с текстом и текст ошибки. Получает `className` и `style`, переданные в `<Checkbox>`
- `<Container>` — элемент `<label>` с чекбоксом и текстом
- `<Box>` — квадрат с нативным `<input>`. Атрибуты `<input>`, переданные в `<Checkbox>`, и `ref` попадают в `<input>`, а `className` и `style` компонента `<Box>` — в сам квадрат. Квадрат отмечен атрибутом `data-checkbox-square`
- `<Icon>` — галочка и прочерк промежуточного состояния; цвет берётся из `currentColor`
- `<TextWrapper>` — обёртка текста
- `<Asterisk>` — звёздочка обязательного поля
- `<ErrorText>` — текст ошибки; показывается, только если передан `errorText`

Используйте свойство `overrides`, чтобы переопределить один или несколько компонентов. Проще всего расширить стандартный компонент с помощью `styled`. Создавайте переопределения один раз — вне компонента, а не при рендере.

_Пример использования:_

```tsx
import React from 'react';
import styled from '@emotion/styled';
import Checkbox from '@via-profit/ui-kit/Checkbox';
import CheckboxBox from '@via-profit/ui-kit/Checkbox/CheckboxBox';

const Box = styled(CheckboxBox)`
  & [data-checkbox-square] {
    border-radius: 50%;
  }
`;

// Created once, outside of the component
const overrides = { Box };

const Example: React.FC = () => (
  <Checkbox defaultChecked color="secondary" overrides={overrides}>
    Круглый чекбокс
  </Checkbox>
);

export default Example;
```

<ExampleCheckboxOverrides />

## Свойства

Помимо перечисленных ниже, `<Checkbox>` принимает [стандартные атрибуты](https://developer.mozilla.org/ru/docs/Web/HTML/Element/input/checkbox) элемента `<input type="checkbox">` (`name`, `value`, `required`, `onFocus` и другие) и передаёт их в этот элемент. `ref` указывает на этот же элемент. Исключение — `className` и `style`: они попадают в корневой элемент.

### `children`
Текст чекбокса.
- Тип: `React.ReactNode`
- По умолчанию: `undefined`
- Обязательное: нет

### `checked`
Состояние контролируемого чекбокса. Передавайте вместе с `onChange`.
- Тип: `boolean`
- По умолчанию: `undefined`
- Обязательное: нет

### `defaultChecked`
Начальное состояние неконтролируемого чекбокса.
- Тип: `boolean`
- По умолчанию: `false`
- Обязательное: нет

### `onChange`
Вызывается при переключении. Новое значение — в `event.currentTarget.checked`.
- Тип: `React.ChangeEventHandler<HTMLInputElement>`
- По умолчанию: `undefined`
- Обязательное: нет

### `indeterminate`
Если `true`, вместо галочки показывается прочерк. Подробнее в разделе [Промежуточное состояние](#промежуточное-состояние).
- Тип: `boolean`
- По умолчанию: `false`
- Обязательное: нет

### `disabled`
Если `true`, чекбокс недоступен.
- Тип: `boolean`
- По умолчанию: `false`
- Обязательное: нет

### `color`
Цвет отмеченного чекбокса. Подробнее в разделе [Цвета](#цвета).
- Тип: `'default' | 'primary' | 'secondary' | string`
- По умолчанию: `'default'`
- Обязательное: нет

### `labelPosition`
Положение текста относительно чекбокса.
- Тип: `'start' | 'end' | 'top' | 'bottom'`
- По умолчанию: `'end'`
- Обязательное: нет

### `requiredAsterisk`
Если `true`, после текста показывается `*`; если элемент — показывается он.
- Тип: `boolean | React.ReactNode`
- По умолчанию: `undefined`
- Обязательное: нет

### `error`
Если `true`, рамка окрашивается в цвет ошибки, а под чекбоксом показывается `errorText`.
- Тип: `boolean`
- По умолчанию: `false`
- Обязательное: нет

### `errorText`
Текст ошибки.
- Тип: `React.ReactNode`
- По умолчанию: `undefined`
- Обязательное: нет

### `overrides`
Объект для переопределения составных компонентов. Подробнее в разделе [Переопределение](#переопределение).
- Тип: `CheckboxOverrides`
- По умолчанию: `undefined`
- Обязательное: нет
