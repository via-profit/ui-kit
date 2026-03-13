# Текстовое поле textarea

## Содержание

- [Описание](#описание)
- [Переопределение компонентов](#переопределение-компонентов)
- [Иконки в текстовом поле](#иконки-в-текстовом-поле)
- [Свойства](#свойства)

## Описание

Компонент `<TextArea>` создаёт текстовое поле на основе нативного `<textarea>` элемента.

<ExampleTextAreaOverview>

## Переопределение компонентов

Компонент `<TextArea>` является составным и реализован при помощи следующих компонентов:

- `<Container>` — Контейнер
- `<ErrorText>` — Компонент отображения сообщения об ошибке (свойство `errorText`)
- `<IconWrapper>` — Обёртка иконки, в случае её отображения
- `<Input>` — Компонент нативного элемента `<textarea>`
- `<InputWrapper>` — Обёртка нативного инпута
- `<Label>` — Компонент нативного элемента `<label>`
- `<Asterisk>` — Компонент отображения звёздочки (\*) в случае, если указано свойство `requiredAsterisk`

Используйте свойство `overrides` чтобы переопределить компонетны:

```tsx
import React from 'react';
import TextArea from '@via-profit/ui-kit/TextArea';

const MyPage: React.FC = () => (
  <TextArea
    label="Имя:"
    rows={2}
    placeholder="Алевтина"
    defaultValue="Алевтина"
    overrides={{
      // Перезаписываем InputWrapper.
      // Обратите внимание, что здесь прокидывается ref, однако
      // прокинуть ref можно и при объявлении компонента, главное не забыть
      InputWrapper: React.forwardRef(function InputWrapper(props, ref) {
        const { children } = props;

        return (
          <div
            style={{ backgroundColor: '#c5d4fd', color: '#6305ce', borderRadius: '0.3em' }}
            ref={ref}
          >
            {children}
          </div>
        );
      }),
    }}
  />
);

export default MyPage;
```

Результат:

<ExampleTextAreaOverrides />
&nbsp;
&nbsp;

## Иконки в текстовом поле

Компонент может отображать иконку, переданную в свойстве `startIcon` или `endIcon`.
**Важно:** Передавать следует не React компонент, а JSX выражение:

```tsx
import TextArea from '@via-profit/ui-kit/TextArea';
import MyIcon from './MyIcon';

const Example: React.FC = () => <TextArea startIcon={<MyIcon />} label="Name" />;
```


---

## Свойства

### `error`
Является ли введённое значение ошибочным. Если `true`, будет отображён текст ошибки из свойства `errorText`.
- Тип: `boolean`
- По умолчанию: `false`
- Обязательное: нет

### `errorText`
Сообщение об ошибке, отображаемое под полем ввода.
- Тип: `JSX.Element | string`
- По умолчанию: (не указано)
- Обязательное: нет

### `startIcon`
Элемент иконки, отображаемой слева от поля ввода.
- Тип: `JSX.Element`
- По умолчанию: (не указано)
- Обязательное: нет

### `endIcon`
Элемент иконки, отображаемой справа от поля ввода.
- Тип: `JSX.Element`
- По умолчанию: (не указано)
- Обязательное: нет

### `overrides`
Объект для переопределения составных компонентов текстового поля.
- Тип: `Object`
- По умолчанию: (не указано)
- Обязательное: нет

#### `overrides.IconWrapper`
Компонент-обертка для иконок, отображаемых слева и/или справа от поля ввода.
- Тип: `React.Component`
- По умолчанию: (не указано)

#### `overrides.Container`
Контейнер, объединяющий все части компонента.
- Тип: `React.Component`
- По умолчанию: (не указано)

#### `overrides.ErrorText`
Компонент для отображения сообщения об ошибке (свойство `errorText`).
- Тип: `React.Component`
- По умолчанию: (не указано)

#### `overrides.Input`
Компонент нативного элемента `<textarea>`.
- Тип: `React.Component`
- По умолчанию: (не указано)

#### `overrides.InputWrapper`
Обертка вокруг нативного элемента ввода и иконок.
- Тип: `React.Component`
- По умолчанию: (не указано)

#### `overrides.Label`
Компонент нативного элемента `<label>`.
- Тип: `React.Component`
- По умолчанию: (не указано)

#### `overrides.Asterisk`
Компонент для отображения звездочки (\*), если указано свойство `requiredAsterisk`.
- Тип: `React.Component`
- По умолчанию: (не указано)

---

Помимо перечисленных свойств, компонент принимает [стандартные атрибуты](https://developer.mozilla.org/ru/docs/Web/HTML/Element/input#атрибуты) HTML элемента `<input>`
