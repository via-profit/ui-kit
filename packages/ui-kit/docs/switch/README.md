# Переключатель

## Содержание

- [Описание](#описание)
- [Текст](#текст)
- [Положение](#положение)
- [Цвета](#цвета)
- [Контролируемый](#контролируемый)
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

## Текст

Вы можете передать текст переключателя в качестве свойства `children`. Он может быть выполнен в виде строки или компонена JSX

_Пример использования:_

```tsx
import React from 'react';
import Switch from '@via-profit/ui-kit/src/Switch';

const ExampleSwitchLabel: React.FC = () => (
  <>
    <Switch defaultChecked>Label</Switch>
    <Switch requiredAsterisk>Required</Switch>
    <Switch>Disabled</Switch>
  </>
);

export default ExampleSwitchLabel;
```

<ExampleSwitchLabel />

## Положение

Вы можете указать положение текста относительно переключателя. Это реализуется с помощью свойства `labelPosition`. Оно принимает одно из следующих значений

- **start** — Текст расположен перед переключателем
- **end** — Текст расположен за переключателем
- **top** — Текст расположен над переключателем
- **bottom** — Текст расположен под переключателем

По умолчанию: `end`

_Пример использования:_

```tsx
import React from 'react';
import Switch from '@via-profit/ui-kit/src/Switch';
import styled from '@emotion/styled';

const Wrapper = styled.div`
  display: flex;
`;

const ExampleSwitchLabelPlacement: React.FC = () => (
  <Wrapper>
    <Switch defaultChecked labelPosition="start">
      Start
    </Switch>
    <Switch defaultChecked labelPosition="end">
      End
    </Switch>
    <Switch defaultChecked labelPosition="top">
      Top
    </Switch>
    <Switch defaultChecked labelPosition="bottom">
      Bottom
    </Switch>
  </Wrapper>
);

export default ExampleSwitchLabelPlacement;
```

<ExampleSwitchLabelPlacement />

## Цвета

Вы можете указать одно из трёх зарезервированных значений `default` `primary` `secondary`, или **rgb(a)**/**hex** код произвольного цвета. По умолчанию, используется цвет стиля `default`.

**Важно:** Цвет будет применен только ко включенному переключателю

В качестве цвета вы можете передать и псевдоним цвета, например, **lightpink** что будет соответствовать коду цвета `#ffb6c1`,

- **default** — Цвет переключателя совпадает с цветом `primary`
- **primary** — Используется основной цвет акцента
- **secondary** — Используется второстепенный цвет акцента

_Пример использования:_

```tsx
import React from 'react';
import Switch from '@via-profit/ui-kit/src/Switch';

const ExampleSwitchColors: React.FC = () => (
  <>
    <Switch defaultChecked color="default">
      Standard default
    </Switch>
    <Switch defaultChecked color="primary">
      Standard primary
    </Switch>
    <Switch defaultChecked color="secondary">
      Standard secondary
    </Switch>
    <Switch defaultChecked color="#308dfc">
      Standard #308dfc
    </Switch>
    <Switch defaultChecked color="lightpink">
      Standard lightpink
    </Switch>
  </>
);

export default ExampleSwitchColors;
```

<ExampleSwitchColors />

## Контролируемый

Переключатель может быть контролируемый. Для чтобы сделать переключатель контролируемым необходимо передать 2 свойства: `checked` и `onChange`.

- **checked** — булево состояние компонента. По умолчанию `undefined`
- **onChange** — Функция, которая сработает при переключении. По умолчанию `undefined`

```tsx
import React from 'react';
import Switch from '@via-profit/ui-kit/src/Switch';

const ExampleButtonColors: React.FC = () => {
  const [switchState, setSwitchState] = React.useState<number | null>(null);

  return (
    <>
      <Switch checked={switchState === 1} onChange={() => setSwitchState(1)}>
        One
      </Switch>
      <Switch checked={switchState === 2} onChange={() => setSwitchState(2)}>
        Two
      </Switch>
      <Switch checked={switchState === 3} onChange={() => setSwitchState(3)}>
        Three
      </Switch>
    </>
  );
};

export default ExampleButtonColors;
```

<ExampleSwitchControlled />

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

<ExampleSwitchOverrides />

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
