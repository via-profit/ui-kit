# Кнопка

## Содержание

- [Описание](#описание)
- [Варианты](#варианты)
- [Цвета](#цвета)
- [Иконки](#иконки)
- [Переопределение](#переопределение)
- [Свойства](#свойства)

## Описание

Компонент `<Button>` создаёт кликабельную кнопку, которая может быть
использована в формах или в любом другом месте документа, который требует простой,
стандартной кнопки.

_Пример использования:_

```tsx
import React from 'react';
import Button from '@via-profit/ui-kit/Button';

const Example: React.FC = () => {
  return <Button type="button">Button</Button>;
};

export default Example;
```

<ExampleButtonBasic />

## Варианты

Кнопки выполнены в трёх вариациях: `standard`, `outlined` и `plain`. По умолчанию, используется стиль `standard`.

- **plain** — отображает кнопку без фона и окантовки
- **standard** — отображает обычную кнопку в привычном для всех виде
- **outlined** — отображает кнопку с окантовкой

_Пример использования:_

```tsx
import React from 'react';
import Button from '@via-profit/ui-kit/Button';

const Example: React.FC = () => (
  <>
    <Button type="button" variant="standard">
      Standard
    </Button>
    <Button type="button" variant="outlined">
      Outlined
    </Button>
    <Button type="button" variant="plain">
      Plain
    </Button>
  </>
);

export default Example;
```

<ExampleButtonVariants />

## Цвета

Вы можете указать одно из трёх зарезервированных значений `default` `primary` `secondary`, или **rgb(a)**/**hex** код произвольного цвета. По умолчанию, используется цвет стиля `default`.

В качестве цвета вы можете передать и псевдоним цвета, например, **lightpink** что будет соответствовать коду цвета `#ffb6c1`,

- **default** — Цвет кнопки совпадает с цветом заднего плана
- **primary** — Используется основной цвет акцента
- **secondary** — Используется второстепенный цвет акцента

_Пример использования:_

```tsx
import React from 'react';
import Button from '@via-profit/ui-kit/Button';

const Example: React.FC = () => (
  <>
    <>
      <Button type="button" variant="standard" color="default">
        Standard default
      </Button>
      <Button type="button" variant="standard" color="primary">
        Standard primary
      </Button>
      <Button type="button" variant="standard" color="secondary">
        Standard secondary
      </Button>
      <Button type="button" variant="standard" color="#308dfc">
        Standard #308dfc
      </Button>
      <Button type="button" variant="standard" color="lightpink">
        Standard lightpink
      </Button>
    </>
  </>
);

export default Example;
```

<ExampleButtonColors />

## Иконки

Кнопка может отображать иконку, переданную в свойстве `startIcon` или `endIcon`. Если передать аргумент `onlyIcon`, то кнопка примет вид кнопки-иконки. Данное свойство не следует использовать одновременно с `startIcon` и/или `endIcon`
**Важно:** Передавать следует не React компонент, а JSX выражение:

```tsx
import Button from '@via-profit/ui-kit/Button';
import MyIcon from './MyIcon';

const Example: React.FC = () => (
  <>
    <Button startIcon={<MyIcon />}>Button with icon</Button>
    <Button iconOnly>
      <MyIcon />
    </Button>
    <Button iconOnly>
      <MyIcon />
    </Button>
  </>
);
```

<ExampleButtonIcons />

## Переопределение

Компонент `<Button>` является составным и реализован при помощи следующих компонентов:

- `<Container>` — Компонент нативного элемента кнопки `<button>`
- `<TextWrapper>` — Обёртка для текста кнопки
- `<IconWrapper>` — Обёртка иконки кнопки в случае её отображения

Используйте свойство `overrides` чтобы переопределить один или несколько компонентов:

_Пример использования:_

```tsx
import React from 'react';
import Button from '@via-profit/ui-kit/Button';

const Example: React.FC = () => (
  <Button
    type="button"
    overrides={{
      // Перезаписываем TextWrapper.
      // Обратите внимание, что здесь прокидывается ref, однако
      // прокинуть ref можно и при объявлении компонента, главное не забыть
      TextWrapper: React.forwardRef(function Wrapper(props, ref) {
        const { children } = props;

        return <span style={{...}} ref={ref}>{children}</span>;
      }),
    }}
  >
    Overrided
  </Button>
);

export default Example;
```

<ExampleButtonOverrides />


---

## Свойства

### `variant`
Вариант отображения кнопки.
- Тип: `'standard' | 'outlined'`
- По умолчанию: `'standard'`
- Обязательное: **да**

### `color`
Цвет кнопки. Может быть предопределенным значением или пользовательским цветом в формате **hex** или **rgb(a)**.
- Тип: `'default' | 'secondary' | 'primary' | string`
- По умолчанию: `'default'`
- Обязательное: нет

### `iconOnly`
Если `true`, кнопка отображается как кнопка-иконка без текста. Не следует использовать одновременно с `startIcon` и/или `endIcon`.
- Тип: `boolean`
- По умолчанию: `undefined`
- Обязательное: нет

### `startIcon`
Элемент иконки, отображаемой слева от текста кнопки.
- Тип: `JSX.Element`
- По умолчанию: `undefined`
- Обязательное: нет

### `endIcon`
Элемент иконки, отображаемой справа от текста кнопки.
- Тип: `JSX.Element`
- По умолчанию: `undefined`
- Обязательное: нет

### `overrides`
Объект для переопределения составных компонентов кнопки.
- Тип: `Object`
- По умолчанию: `undefined`
- Обязательное: нет

#### `overrides.Container`
Компонент нативной кнопки.
- Тип: `React.Component`
- По умолчанию: `<ButtonContainer>`

#### `overrides.IconWrapper`
Компонент-обертка для иконок, отображаемых слева и/или справа от текста кнопки.
- Тип: `React.Component`
- По умолчанию: `<ButtonIconWrapper>`

#### `overrides.TextWrapper`
Компонент-обертка для текста кнопки.
- Тип: `React.Component`
- По умолчанию: `<ButtonTextWrapper>`

---

Помимо перечисленных свойств, компонент принимает [стандартные атрибуты](https://developer.mozilla.org/ru/docs/Web/HTML/Element/button#атрибуты) HTML элемента `<button>`
