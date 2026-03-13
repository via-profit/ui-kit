# Бейдж

## Содержание

- [Описание](#описание)
- [Варианты](#варианты)
- [Цвета](#цвета)
- [Иконки](#иконки)
- [Переопределение](#переопределение)
- [Свойства](#свойства)

## Описание

Компонент `<Badge>` создаёт элемент, используемый в качестве индикатора, например когда необходимо отобразить выбранные элементы.

_Пример использования:_

```tsx
import React from 'react';
import Badge from '@via-profit/ui-kit/Badge';

const Example: React.FC = () => (
  <Badge variant="outlined" color="secondary">
    Standard secondary
  </Badge>
);

export default Example;
```

<ExampleBadgeOverview />

## Варианты

Бейджи выполнены в двух вариациях: `standard` и `outlined`. По умолчанию, используется стиль `standard`.

- **standard** — отображает обычный бейдж со сплошной заливкой согласно переданному цвету
- **outlined** — отображает бейдж с окантовкой согласно переданному цвету

_Пример использования:_

```tsx
import React from 'react';
import Badge from '@via-profit/ui-kit/Badge';

const Example: React.FC = () => (
  <>
    <Badge variant="standard">Standard</Badge>
    <Badge variant="outlined">Outlined</Badge>
  </>
);

export default Example;
```

<ExampleBadgeVariants />

## Цвета

Вы можете указать одно из трёх зарезервированных значений `default` `primary` `secondary`, или **rgb(a)**/**hex** код произвольного цвета. По умолчанию, используется цвет стиля `default`.

В качестве цвета вы можете передать и псевдоним цвета, например, **lightpink** что будет соответствовать коду цвета `#ffb6c1`,

- **default** — Цвет кнопки совпадает с цветом заднего плана
- **primary** — Используется основной цвет акцента
- **secondary** — Используется второстепенный цвет акцента

_Пример использования:_

<ExampleBadgeColors />

## Иконки

Бейдж может отображать иконку, переданную в свойстве `startIcon`. Помимо иконки можно передать функцию в качестве свойства `onDelete` и в этом случае бейдж отобразит кнопку удаления.
**Важно:** Передавать следует не React компонент, а JSX выражение:

```tsx
import Badge from '@via-profit/ui-kit/Badge';
import MyIcon from './MyIcon';

const Example: React.FC = () => (
  <Badge
    startIcon={<MyIcon />}
    variant="outlined"
    color="secondary"
    onDelete={event => someDeleteFunction()}
  >
    Oleg Dolgoperedryagov
  </Badge>
);
```

<ExampleBadgeIcons />

## Переопределение

Компонент `<Button>` является составным и реализован при помощи следующих компонентов:

- `<Container>` — Компонент нативного элемента бейджа `<span>`
- `<TextWrapper>` — Обёртка для текста
- `<IconWrapper>` — Обёртка иконки в случае её отображения
- `<ButtonDelete>` — Кнопка удаления в случае её отображения

Используйте свойство `overrides` чтобы переопределить один или несколько компонентов:

_Пример использования:_

```tsx
import React from 'react';
import styled from '@emotion/styled';
import Badge from '@via-profit/ui-kit/Badge';

import BadgeContainer from '@via-profit/ui-kit/Badge/BadgeContainer';
import BadgeTextWrapper from '@via-profit/ui-kit/Badge/BadgeTextWrapper';

const StyledContainer = styled(BadgeContainer)`
  background-color: red !important;
`;

const StyledTextWrapper = styled(BadgeTextWrapper)`
  color: #fff !important;
`;

const Example: React.FC = () => (
  <Badge
    variant="standard"
    overrides={{
      Container: React.forwardRef(function Override(props, ref) {
        return <StyledContainer {...props} ref={ref} />;
      }),
      TextWrapper: React.forwardRef(function Override(props, ref) {
        return <StyledTextWrapper {...props} ref={ref} />;
      }),
    }}
  >
    Standard
  </Badge>
);

export default Example;
```

<ExampleBadgeOverrides />

---

## Свойства

### `variant`
Вариант отображения бейджа.
- Тип: `'standard' | 'outlined'`
- По умолчанию: `'standard'`
- Обязательное: **да**

### `color`
Цвет бейджа. Может быть предопределенным значением или пользовательским цветом в формате **hex** или **rgb(a)**.
- Тип: `'default' | 'secondary' | 'primary' | string`
- По умолчанию: `'default'`
- Обязательное: нет

### `startIcon`
Элемент иконки, отображаемой слева от текста бейджа.
- Тип: `JSX.Element`
- По умолчанию: `undefined`
- Обязательное: нет

### `onDelete`
Функция, вызываемая при нажатии на кнопку удаления. Кнопка удаления отображается только при передаче этого свойства.
- Тип: `function`
- По умолчанию: `undefined`
- Обязательное: нет

### `overrides`
Объект для переопределения составных компонентов бейджа.
- Тип: `Object`
- По умолчанию: `undefined`
- Обязательное: нет

#### `overrides.Container`
Компонент нативного элемента `<span>`.
- Тип: `React.Component`
- По умолчанию: `<BadgeContainer>`

#### `overrides.IconWrapper`
Компонент-обертка для иконки, отображаемой слева от текста бейджа.
- Тип: `React.Component`
- По умолчанию: `<BadgeIconWrapper>`

#### `overrides.TextWrapper`
Компонент-обертка для текста бейджа.
- Тип: `React.Component`
- По умолчанию: `<BadgeTextWrapper>`

#### `overrides.ButtonDelete`
Компонент кнопки удаления бейджа.
- Тип: `React.Component`
- По умолчанию: `<BadgeDeleteButton>`

---

Помимо перечисленных свойств, компонент принимает [стандартные атрибуты](https://developer.mozilla.org/ru/docs/Web/HTML/Element/span#атрибуты) HTML элемента `<span>`
