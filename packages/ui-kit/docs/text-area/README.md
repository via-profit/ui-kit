# Текстовое поле textarea

## Содержание

- [Описание](#описание)
- [Ошибка и обязательное поле](#ошибка-и-обязательное-поле)
- [Состояния](#состояния)
- [Иконки](#иконки)
- [Переопределение](#переопределение)
- [Свойства](#свойства)

## Описание

Компонент `<TextArea>` — многострочное поле ввода на основе элемента `<textarea>`. Он устроен так же, как [`<TextField>`](../text-field/README.md): те же подпись, иконки, текст ошибки и составные компоненты.

Поле работает как обычный `<textarea>`: его атрибуты (`value`, `onChange`, `rows`, `maxLength`, `placeholder`, `disabled` и другие) передаются элементу `<textarea>`. Исключения — `className` и `style`: они применяются к корневому элементу.

Высота поля задаётся атрибутом `rows` — количеством видимых строк (по умолчанию 2). Пользователь не может менять размер поля; как это включить, показано в разделе [Переопределение](#переопределение).

_Пример использования:_

```tsx
import React from 'react';
import TextArea from '@via-profit/ui-kit/TextArea';

const Example: React.FC = () => {
  const [value, setValue] = React.useState('');

  return (
    <TextArea
      label="Комментарий"
      placeholder="Опишите ваш вопрос"
      rows={4}
      fullWidth
      value={value}
      onChange={event => setValue(event.currentTarget.value)}
    />
  );
};

export default Example;
```

<ExampleTextAreaOverview />

## Ошибка и обязательное поле

`requiredAsterisk` добавляет к подписи звёздочку, а `error` выделяет поле и показывает `errorText` под ним — так же, как в [`<TextField>`](../text-field/README.md#ошибка-и-обязательное-поле).

Например, так можно ограничить длину текста и показать, насколько её превышение:

```tsx
import React from 'react';
import TextArea from '@via-profit/ui-kit/TextArea';

const MAX_LENGTH = 100;

const Example: React.FC = () => {
  const [value, setValue] = React.useState('');

  return (
    <TextArea
      label={`Описание (${value.length} из ${MAX_LENGTH})`}
      requiredAsterisk
      rows={3}
      value={value}
      error={value.length > MAX_LENGTH}
      errorText={`Сократите описание на ${value.length - MAX_LENGTH} симв.`}
      onChange={event => setValue(event.currentTarget.value)}
    />
  );
};

export default Example;
```

Если текст нельзя делать длиннее предела, передайте атрибут `maxLength`: браузер не даст ввести лишнее.

<ExampleTextAreaValidation />

## Состояния

- `disabled` — поле недоступно для ввода и не получает фокус;
- `readOnly` — текст нельзя изменить, но его можно выделить и скопировать;
- `fullWidth` — поле занимает всю ширину родителя. Без него ширина не больше `16em`.

<ExampleTextAreaStates />

## Иконки

`startIcon` и `endIcon` работают так же, как в [`<TextField>`](../text-field/README.md#иконки), но иконки выравниваются по первой строке текста, а не по центру поля. Передавайте элемент (`<Icon />`), а не компонент (`Icon`).

```tsx
<TextArea label="Заметка" rows={3} startIcon={<NoteIcon />} />
```

## Переопределение

Компонент `<TextArea>` является составным и реализован при помощи следующих компонентов:

- `<Container>` — корневой элемент; получает `className` и `style`
- `<Label>` — подпись `<label>`
- `<Asterisk>` — звёздочка обязательного поля
- `<InputWrapper>` — рамка вокруг поля и иконок
- `<IconWrapper>` — обёртка `startIcon` и `endIcon`
- `<Input>` — элемент `<textarea>`
- `<ErrorText>` — текст ошибки

Все, кроме `<Input>` и `<IconWrapper>`, общие с [`<TextField>`](../text-field/README.md#переопределение).

Используйте свойство `overrides`, чтобы переопределить один или несколько компонентов. Создавайте переопределения один раз — вне компонента: компонент, созданный прямо при рендере, React считает новым на каждом рендере, и поле теряет фокус при вводе.

Например, так можно разрешить пользователю менять высоту поля:

```tsx
import React from 'react';
import styled from '@emotion/styled';
import TextArea from '@via-profit/ui-kit/TextArea';
import TextAreaInput from '@via-profit/ui-kit/TextArea/TextAreaInput';

const Input = styled(TextAreaInput)`
  resize: vertical;
  min-height: 4em;
`;

// Created once, outside of the component
const overrides = { Input };

const Example: React.FC = () => <TextArea label="Комментарий" rows={3} overrides={overrides} />;

export default Example;
```

<ExampleTextAreaOverrides />

## Свойства

Помимо перечисленных ниже, `<TextArea>` принимает [атрибуты](https://developer.mozilla.org/ru/docs/Web/HTML/Element/textarea#атрибуты) элемента `<textarea>` и передаёт их полю ввода, кроме `className` и `style` — они применяются к корневому элементу. `ref` указывает на корневой элемент, для доступа к `<textarea>` используйте `inputRef`.

### `label`
Подпись над полем.
- Тип: `React.ReactNode`
- По умолчанию: `undefined`
- Обязательное: нет

### `requiredAsterisk`
Если `true`, к подписи добавляется `*`. Можно передать свой элемент.
- Тип: `boolean | React.ReactNode`
- По умолчанию: `undefined`
- Обязательное: нет

### `error`
Если `true`, поле отображается с ошибкой и показывается `errorText`.
- Тип: `boolean`
- По умолчанию: `undefined`
- Обязательное: нет

### `errorText`
Текст ошибки под полем. Отображается, только когда `error` равно `true`.
- Тип: `React.ReactNode`
- По умолчанию: `undefined`
- Обязательное: нет

### `startIcon`
Элемент перед полем ввода.
- Тип: `React.ReactElement`
- По умолчанию: `undefined`
- Обязательное: нет

### `endIcon`
Элемент после поля ввода.
- Тип: `React.ReactElement`
- По умолчанию: `undefined`
- Обязательное: нет

### `fullWidth`
Если `true`, поле занимает всю ширину родителя.
- Тип: `boolean`
- По умолчанию: `false`
- Обязательное: нет

### `inputRef`
`ref` элемента `<textarea>`.
- Тип: `React.MutableRefObject<HTMLTextAreaElement | null> | React.RefCallback<HTMLTextAreaElement | null>`
- По умолчанию: `undefined`
- Обязательное: нет

### `overrides`
Объект для переопределения составных компонентов. Подробнее в разделе [Переопределение](#переопределение).
- Тип: `TextAreaOverrides`
- По умолчанию: `undefined`
- Обязательное: нет
