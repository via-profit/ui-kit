# Переключатель

## Содержание

- [Описание](#описание)
- [Варианты](#варианты)
- [Цвета](#цвета)
- [Иконки](#иконки)
- [Переопределение](#переопределение)
- [Свойства](#свойства)

## Описание

Компонент `<Switch>` создаёт кликабельный переключатель, который может быть
использован в формах или в любом другом месте интерфейса

_Пример использования:_

```tsx
import React from 'react';
import Switch from '@via-profit/ui-kit/src/Switch';

const ExampleSwitchBasic: React.FC = () => (
  <>
    <Switch defaultChecked />
    <Switch />
    <Switch defaultChecked disabled />
    <Switch disabled />
  </>
);

export default ExampleSwitchBasic;
```

<ExampleSwitchBasic />

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

## Свойства

Помимо перечисленных свойств, компонент принимает [стандартные аттрибуты](https://developer.mozilla.org/ru/docs/Web/HTML/Element/button#атрибуты) HTML элемента `<button>`

| Свойство                   | Обязателен | Тип                                      | По умолчанию          | Описание                                                                                                                                        |
| -------------------------- | :--------: | :--------------------------------------- | :-------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------- |
| **variant**                |     \*     | `standard` `outlined`                    | `standard`            | Вариант отображения.                                                                                                                            |
| **color**                  |            | `default` `secondary` `primary` `String` | `default`             | Цвет кнопки. В качестве пользовательского цвета принимается строка в формате **hex** или **rgb(a)**.                                            |
| **iconOnly**               |            | `boolean`                                | `undefined`           | Если `true`, то кнопка будет представлена как кнопка-иконка. Данное свойство не следует использовать одновременно с `startIcon` и/или `endIcon` |
| **startIcon**              |            | `<JSX.Element>`                          | `undefined`           | Элемент иконки, отображаемой слева от текста кнопки                                                                                             |
| **endIcon**                |            | `<JSX.Element>`                          | `undefined`           | Элемент иконки, отображаемой справа от текста кнопки                                                                                            |
| **overrides**              |            | `Object`                                 | `undefined`           | Объект элементов для переопределения составных компонентов кнопки                                                                               |
| **overrides .Container**   |            | `<React.Component>`                      | `<ButtonContainer>`   | Компонент нативной кнопки                                                                                                                       |
| **overrides .IconWrapper** |            | `<React.Component>`                      | `<ButtonIconWrapper>` | Компонент обёртка для иконки, отображаемой слева и/или справа от текста кнопки                                                                  |
| **overrides .TextWrapper** |            | `<React.Component>`                      | `<ButtonTextWrapper>` | Компонент обёртка текста кнопки                                                                                                                 |
