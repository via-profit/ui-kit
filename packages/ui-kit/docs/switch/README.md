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
import Switch from '@via-profit/ui-kit/Switch';

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
import Switch from '@via-profit/ui-kit/Switch';

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
import Switch from '@via-profit/ui-kit/Switch';
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
import Switch from '@via-profit/ui-kit/Switch';

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
import Switch from '@via-profit/ui-kit/Switch';

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
import Switch from '@via-profit/ui-kit/Switch';
import SwitchDot from '@via-profit/ui-kit/Switch/SwitchDot';
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

---

## Свойства

### `checked`
Управляющее состояние переключателя (вкл/выкл).
- Тип: `boolean`
- По умолчанию: `undefined`
- Обязательное: нет

### `onChange`
Функция обратного вызова, вызываемая при изменении состояния переключателя.
- Тип: `function`
- По умолчанию: `undefined`
- Обязательное: нет

### `color`
Цвет переключателя. Может быть предопределенным значением или пользовательским цветом в формате **hex** или **rgb(a)**.
- Тип: `'default' | 'secondary' | 'primary' | string`
- По умолчанию: `'default'`
- Обязательное: нет

### `disabled`
Если `true`, переключатель становится неактивным.
- Тип: `boolean`
- По умолчанию: `undefined`
- Обязательное: нет

### `defaultChecked`
Если `true`, переключатель будет включен по умолчанию (неконтролируемый режим).
- Тип: `boolean`
- По умолчанию: `false`
- Обязательное: нет

### `labelPosition`
Позиция текста относительно переключателя.
- Тип: `'start' | 'end' | 'top' | 'bottom'`
- По умолчанию: `'end'`
- Обязательное: нет

### `error`
Если `true`, под переключателем будет показано содержимое свойства `errorText`.
- Тип: `boolean`
- По умолчанию: `false`
- Обязательное: нет

### `errorText`
Текст ошибки, отображаемый под компонентом переключателя при значении `error={true}`.
- Тип: `string | React.Component`
- По умолчанию: `undefined`
- Обязательное: нет

### `requiredAsterisk`
Если передан, поле помечается как обязательное (отображается звездочка).
- Тип: `boolean | React.Component`
- По умолчанию: `undefined`
- Обязательное: нет

### `overrides`
Объект для переопределения составных компонентов переключателя.
- Тип: `Object`
- По умолчанию: `undefined`
- Обязательное: нет

#### `overrides.Wrapper`
Основная обертка для всего переключателя.
- Тип: `React.Component`
- По умолчанию: `<ButtonIconWrapper>`

#### `overrides.Container`
Обертка переключателя и текста, нативный элемент `label`.
- Тип: `React.Component`
- По умолчанию: `<ButtonContainer>`

#### `overrides.TextWrapper`
Обертка для текста переключателя.
- Тип: `React.Component`
- По умолчанию: `<ButtonTextWrapper>`

#### `overrides.ToggleWrapper`
Обертка для самого переключателя.
- Тип: `React.Component`
- По умолчанию: `<ButtonTextWrapper>`

#### `overrides.Asterisk`
Компонент, отображающий обязательность поля (звездочка).
- Тип: `React.Component`
- По умолчанию: `<ButtonTextWrapper>`

#### `overrides.Dot`
Элемент переключателя: сдвигающаяся точка.
- Тип: `React.Component`
- По умолчанию: `<ButtonTextWrapper>`

#### `overrides.Track`
Элемент переключателя: путь (трек), по которому движется точка.
- Тип: `React.Component`
- По умолчанию: `<ButtonTextWrapper>`

#### `overrides.ErrorText`
Обертка для текста ошибки.
- Тип: `React.Component`
- По умолчанию: `<ButtonTextWrapper>`

---

Помимо перечисленных свойств, компонент принимает [стандартные атрибуты](https://developer.mozilla.org/ru/docs/Web/HTML/Element/label) HTML элемента `<label>`
