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

- `<Wrapper>` — Компонент основная обертка для всего переключателя
- `<Container>` — Обёртка переключателя и текста, нативный элемент `label`
- `<TextWrapper>` — Обёртка для текста переключателя
- `<ToggleWrapper>` — Обёртка переключателя
- `<Asterisk>` — Компонент, показывающий что поле обязательно
- `<Dot>` — Элемент переключателя: сдвигающаяся точка
- `<Track>` — Элемент переключателя: путь по которой сдвигается переключатель
- `<ErrorText>` — Обёртка для текста ошибки

Используйте свойство `overrides` чтобы переопределить один или несколько компонентов:

_Пример использования:_

```tsx
import React from 'react';
import Switch from '@via-profit/ui-kit/src/Switch';
import SwitchDot from '@via-profit/ui-kit/src/Switch/SwitchDot';
import styled from '@emotion/styled';

const TextWrapper = styled.span`
  font-weight: 600;
  color: ${({ theme }) => theme.color.success.toString()};
`;

const StyledDot = styled(SwitchDot)`
  & span {
    border-radius: 0;
  }
`;

const ExampleButtonOverrides: React.FC = () => (
  <>
    <Switch
      type="button"
      color="primary"
      overrides={{
        TextWrapper: React.forwardRef(function Wrapper(props, ref) {
          const { children } = props;

          return <TextWrapper ref={ref}>{children}</TextWrapper>;
        }),
        Dot: React.forwardRef(function NewDot(props, ref) {
          const { children, ...otherProps } = props;

          return (
            <StyledDot {...otherProps} ref={ref}>
              {children}
            </StyledDot>
          );
        }),
      }}
    >
      Overrided
    </Switch>
  </>
);

export default ExampleButtonOverrides;
```

<ExampleSwitchOverrides />

## Свойства

Помимо перечисленных свойств, компонент принимает [стандартные аттрибуты](https://developer.mozilla.org/ru/docs/Web/HTML/Element/label) HTML элемента `<label>`

| Свойство                     | Обязателен | Тип                                      | По умолчанию          | Описание                                                                                                    |
| ---------------------------- | :--------: | :--------------------------------------- | :-------------------- | ----------------------------------------------------------------------------------------------------------- |
| **checked**                  |            | `Boolean`                                | `undefined`           | состояние переключателя вкл/выкл                                                                            |
| **onChange**                 |            | `Function`                               | `undefined`           | Функция, которая выполнится при изменении состояния переключателя                                           |
| **color**                    |            | `default` `secondary` `primary` `String` | `default`             | Цвет переключателя. В качестве пользовательского цвета принимается строка в формате **hex** или **rgb(a)**. |
| **disabled**                 |            | `Boolean`                                | `undefined`           | Если `true`, то переключатель станет не активным                                                            |
| **defaultChecked**           |            | `Boolean`                                | `false`               | Если `true`, то переключатель будет включен по умолчанию                                                    |
| **labelPosition**            |            | `start` `end` `top` `bottom`             | `end`                 | Позиция текста, относительно переключателя                                                                  |
| **error**                    |            | `Boolean`                                | `false`               | Если `true`, то переключатель под переключателем будет показано содержимое свойства `errorText`             |
| **errorText**                |            | `String` `<React.Component>`             | `undefined`           | Текст ошибки, будет показан под компонентом переключателя, если `error` в значении `true`                   |
| **requiredAsterisk**         |            | `Boolean` `<React.Component>`            | `undefined`           | Если передан, то поле будет помечено как обязательное                                                       |
| **overrides**                |            | `Object`                                 | `undefined`           | Объект элементов для переопределения составных компонентов переключателя                                    |
| **overrides .Wrapper**       |            | `<React.Component>`                      | `<ButtonIconWrapper>` | Компонент основная обертка для всего переключателя                                                          |
| **overrides .Container**     |            | `<React.Component>`                      | `<ButtonContainer>`   | Обёртка переключателя и текста, нативный элемент `label`                                                    |
| **overrides .TextWrapper**   |            | `<React.Component>`                      | `<ButtonTextWrapper>` | Обёртка для текста переключателя                                                                            |
| **overrides .ToggleWrapper** |            | `<React.Component>`                      | `<ButtonTextWrapper>` | Обёртка переключателя                                                                                       |
| **overrides .Asterisk**      |            | `<React.Component>`                      | `<ButtonTextWrapper>` | Компонент, показывающий что поле обязательно                                                                |
| **overrides .Dot**           |            | `<React.Component>`                      | `<ButtonTextWrapper>` | Элемент переключателя: сдвигающаяся точка                                                                   |
| **overrides .Track**         |            | `<React.Component>`                      | `<ButtonTextWrapper>` | Элемент переключателя: путь по которой сдвигается переключатель                                             |
| **overrides .ErrorText**     |            | `<React.Component>`                      | `<ButtonTextWrapper>` | Обёртка для текста ошибки                                                                                   |
