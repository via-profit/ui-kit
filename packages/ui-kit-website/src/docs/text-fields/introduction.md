# Текстовое поле

Компонент `<TextField>`

<ExampleOverview>

## Свойства

Помимо перечисленных свойств, компонент принимает [стандартные аттрибуты](https://developer.mozilla.org/ru/docs/Web/HTML/Element/input#атрибуты) HTML элемента `<input>`

- foo
- bar
- bar

## Переопределение компонентов

Компонент `<TextField>` состоит из нескольких компонентов:

| Название компонента | Описание |
| ------------------- | :------: |
| `<Container>`       |    -     |
| `<ErrorText>`       |    -     |
| `<IconWrapper>`     |    -     |
| `<Input>`           |    -     |
| `<InputWrapper>`    |    -     |
| `<Label>`           |    -     |
| `<Asterisk>`        |    -     |

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

<ExampleOverrides />
