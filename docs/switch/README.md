# Переключатель

## Содержание

- [Описание](#описание)
- [Положение текста](#положение-текста)
- [Цвета](#цвета)
- [Контролируемый переключатель](#контролируемый-переключатель)
- [Обязательное поле и ошибка](#обязательное-поле-и-ошибка)
- [Переопределение](#переопределение)
- [Свойства](#свойства)

## Описание

Компонент `<Switch>` — переключатель «вкл/выкл». Внутри него скрытый `<input type="checkbox" role="switch">`, поэтому переключатель работает с клавиатуры (Tab, Space), участвует в отправке формы и озвучивается программами чтения с экрана как переключатель. Текст передаётся в `children`; клик по тексту тоже переключает.

Без свойства `checked` переключатель неконтролируемый: он сам хранит состояние, а начальное значение задаёт `defaultChecked`.

_Пример использования:_

```tsx
import React from 'react';
import Switch from '@via-profit/ui-kit/Switch';

const Example: React.FC = () => (
  <>
    <Switch defaultChecked>Уведомления по email</Switch>
    <Switch>Уведомления в браузере</Switch>
    <Switch defaultChecked disabled>
      Системные уведомления
    </Switch>
  </>
);

export default Example;
```

<ExampleSwitchBasic />

## Положение текста

Свойство `labelPosition` задаёт положение текста относительно переключателя:

- **`start`** — слева
- **`end`** — справа (по умолчанию)
- **`top`** — сверху
- **`bottom`** — снизу

```tsx
<Switch labelPosition="start">Слева</Switch>
<Switch labelPosition="top">Сверху</Switch>
```

<ExampleSwitchLabelPlacement />

## Цвета

Свойство `color` задаёт цвет включённого переключателя. Выключенный переключатель всегда нейтрального цвета.

- **`default`** — основной цвет акцента темы, как у `primary` (по умолчанию)
- **`primary`** — основной цвет акцента темы
- **`secondary`** — второстепенный цвет акцента темы
- любой цвет CSS: **hex**, **rgb(a)** или название цвета, например `lightpink`

```tsx
<Switch defaultChecked color="secondary">
  secondary
</Switch>
<Switch defaultChecked color="#308dfc">
  #308dfc
</Switch>
```

<ExampleSwitchColors />

## Контролируемый переключатель

Чтобы управлять состоянием самостоятельно, передайте `checked` и `onChange`. Новое значение — в `event.currentTarget.checked`. Если передать `checked` без `onChange`, переключатель нельзя будет переключить, а в консоль выведется ошибка.

`onChange` можно передать и неконтролируемому переключателю, чтобы узнавать об изменениях: состояние он продолжит хранить сам.

_Пример использования:_

```tsx
import React from 'react';
import Switch from '@via-profit/ui-kit/Switch';

const Example: React.FC = () => {
  const [enabled, setEnabled] = React.useState(true);
  const [news, setNews] = React.useState(true);

  return (
    <>
      <Switch
        checked={enabled}
        onChange={event => setEnabled(event.currentTarget.checked)}
      >
        Получать рассылку
      </Switch>
      <Switch
        checked={enabled && news}
        disabled={!enabled}
        onChange={event => setNews(event.currentTarget.checked)}
      >
        Новости
      </Switch>
    </>
  );
};

export default Example;
```

<ExampleSwitchControlled />

## Обязательное поле и ошибка

- `requiredAsterisk` — показывает звёздочку после текста. Можно передать свой элемент вместо `*`. Звёздочка только визуальная: чтобы браузер проверял поле, добавьте атрибут `required`;
- `error` и `errorText` — показывают текст ошибки под переключателем. При `error` у поля выставляется `aria-invalid`.

```tsx
<Switch
  requiredAsterisk
  checked={accepted}
  onChange={event => setAccepted(event.currentTarget.checked)}
  error={!accepted}
  errorText="Без согласия продолжить нельзя"
>
  Я принимаю условия использования
</Switch>
```

<ExampleSwitchValidation />

## Переопределение

Компонент `<Switch>` является составным и реализован при помощи следующих компонентов:

- `<Wrapper>` — корневой элемент: переключатель с текстом и текст ошибки
- `<Container>` — элемент `<label>` с переключателем и текстом
- `<ToggleWrapper>` — область переключателя с нативным `<input>`; получает атрибуты `<input>`, переданные в `<Switch>`
- `<Track>` — дорожка, по которой движется ползунок
- `<Dot>` — ползунок
- `<TextWrapper>` — обёртка текста
- `<Asterisk>` — звёздочка обязательного поля
- `<ErrorText>` — текст ошибки

Используйте свойство `overrides`, чтобы переопределить один или несколько компонентов. Проще всего расширить стандартный компонент с помощью `styled`. Создавайте переопределения один раз — вне компонента, а не при рендере.

_Пример использования:_

```tsx
import React from 'react';
import styled from '@emotion/styled';
import Switch from '@via-profit/ui-kit/Switch';
import SwitchDot from '@via-profit/ui-kit/Switch/SwitchDot';
import SwitchTrack from '@via-profit/ui-kit/Switch/SwitchTrack';

const Dot = styled(SwitchDot)`
  & [data-switch-dot] {
    border-radius: 0.2rem;
  }
`;

const Track = styled(SwitchTrack)`
  border-radius: 0.2rem;
`;

// Created once, outside of the component
const overrides = { Dot, Track };

const Example: React.FC = () => (
  <Switch defaultChecked color="secondary" overrides={overrides}>
    Квадратный переключатель
  </Switch>
);

export default Example;
```

<ExampleSwitchOverrides />

## Свойства

Помимо перечисленных ниже, `<Switch>` принимает [стандартные атрибуты](https://developer.mozilla.org/ru/docs/Web/HTML/Element/input/checkbox) элемента `<input type="checkbox">` (`name`, `value`, `required`, `onFocus` и другие) и передаёт их в этот элемент. `ref` указывает на этот же элемент.

### `children`
Текст переключателя.
- Тип: `React.ReactNode`
- По умолчанию: `undefined`
- Обязательное: нет

### `checked`
Состояние контролируемого переключателя. Передавайте вместе с `onChange`.
- Тип: `boolean`
- По умолчанию: `undefined`
- Обязательное: нет

### `defaultChecked`
Начальное состояние неконтролируемого переключателя.
- Тип: `boolean`
- По умолчанию: `false`
- Обязательное: нет

### `onChange`
Вызывается при переключении. Новое значение — в `event.currentTarget.checked`.
- Тип: `React.ChangeEventHandler<HTMLInputElement>`
- По умолчанию: `undefined`
- Обязательное: нет

### `disabled`
Если `true`, переключатель недоступен.
- Тип: `boolean`
- По умолчанию: `false`
- Обязательное: нет

### `color`
Цвет включённого переключателя. Подробнее в разделе [Цвета](#цвета).
- Тип: `'default' | 'primary' | 'secondary' | string`
- По умолчанию: `'default'`
- Обязательное: нет

### `labelPosition`
Положение текста относительно переключателя.
- Тип: `'start' | 'end' | 'top' | 'bottom'`
- По умолчанию: `'end'`
- Обязательное: нет

### `requiredAsterisk`
Если `true`, после текста показывается `*`; если элемент — показывается он.
- Тип: `boolean | React.ReactNode`
- По умолчанию: `undefined`
- Обязательное: нет

### `error`
Если `true`, под переключателем показывается `errorText`.
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
- Тип: `SwitchOverrides`
- По умолчанию: `undefined`
- Обязательное: нет
