# Текстовое поле

## Содержание

- [Описание](#описание)
- [Варианты](#варианты)
- [Цвета](#цвета)
- [Переопределение](#переопределение)
- [Иконки](#иконки)
- [Свойства](#свойства)


## Описание

Компонент `<TextField>` создаёт текстовое поле на основе нативного `<input>` элемента.

<ExampleTextFieldOverview>

## Переопределение компонентов

Компонент `<TextField>` является составным и реализован при помощи следующих компонентов:

- `<Container>` — Контейнер
- `<ErrorText>` — Компонент отображения сообщения об ошибке (свойство `errorText`)
- `<IconWrapper>` — Обёртка иконки, в случае её отображения
- `<Input>` — Компонент нативного элемента `<input>`
- `<InputWrapper>` — Обёртка нативного инпута
- `<Label>` — Компонент нативного элемента `<label>`
- `<Asterisk>` — Компонент отображения звёздочки (\*) в случае, если указано свойство `requiredAsterisk`

Используйте свойство `overrides` чтобы переопределить компонетны:

```tsx
import React from 'react';
import TextField from '@via-profit/ui-kit/src/TextField';

const MyPage: React.FC = () => (
  <TextField
    label="Имя:"
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

<ExampleTextFieldOverrides />
&nbsp;
&nbsp;

## Иконки

Компонент может отображать иконку, переданную в свойстве `startIcon` или `endIcon`.
**Важно:** Передавать следует не React компонент, а JSX выражение:

```tsx
import TextField from '@via-profit/ui-kit/TextField';
import MyIcon from './MyIcon';

const Example: React.FC = () => (
  <TextField startIcon={<MyIcon />} label="Name" />
)

```
_Результат:_

<ExampleTextFieldIcons />
&nbsp;
&nbsp;

## Свойства

Помимо перечисленных свойств, компонент принимает [стандартные аттрибуты](https://developer.mozilla.org/ru/docs/Web/HTML/Element/input#атрибуты) HTML элемента `<input>`

| Название                    | Тип                     | По умолчанию | Описание                                                                                                                                                     |
| :-------------------------- | :---------------------- | ------------ | :----------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **error**                   | `Boolean`               | `false`      | Является ли введённое значение ошибочным или нет. В случае, если установлено значение `true`, будет отображён текст ошибки переданный в свойстве `errorText` |
| **errorText**               | `<JSX.Element>` `String` |              | Сообщение об ошибке                                                                                                                                          |
| **startIcon**               | `<JSX.Element>`         |              | Элемент иконки, отображаемой слева от поля ввода                                                                                                             |
| **endIcon**                 | `<JSX.Element>`         |              | Элемент иконки, отображаемой справа от поля ввода                                                                                                            |
| **overrides**               | `Object`                |              | Объект элементов для переопределения составных компонентов                                                                                                   |
| **overrides.IconWrapper** | `<React.Component>`     |              | Компонент обёртка для иконки, отображаемой слева и/или справа от текста кнопки                                                                               |
