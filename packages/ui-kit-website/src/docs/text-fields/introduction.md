# Текстовое поле

Компонент `<TextField>`

<ExampleOverview>

## Свойства

Помимо перечисленных свойств, компонент принимает [стандартные аттрибуты](https://developer.mozilla.org/ru/docs/Web/HTML/Element/input#атрибуты) HTML элемента `<input>`

- foo
- bar
- bar

## CSS классы

- `.text-field-container`
- `.text-field-error-text`
- `.text-field-icon-wrapper`
- `.text-field-input`
- `.text-field-input-wrapper`
- `.text-field-label`
- `.text-field-asterisk`

CSS классы можно использовать для стиллизации компонента, например, при помощи [styled components](https://emotion.sh/docs/styled)

```ts
import React from 'react';
import styled from '@emotion/styled';
import TextField from '@via-profit/ui-kit/src/TextField';

const StyledTextField = styled(TextField)`
  & .text-field-input {
    color: green;
  }
  & .text-field-label {
    font-weight: 800;
  }
  & .text-field-input-wrapper {
    background-color: transparent;
  }
`;

const CSSClasses: React.FC = () => (
  <StyledTextField label="Имя:" placeholder="Севастьян" defaultValue="Севастьян" />
);

export default CSSClasses;
```

Результат:

<ExampleCSSClasses>

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

Используйте свойство `components` чтобы переопределить компонетны:

```tsx
import React from 'react';
import TextField from '@via-profit/ui-kit/src/TextField';

const MyPage: React.FC = () => (
  <TextField
    label="Имя:"
    placeholder="Алевтина"
    defaultValue="Алевтина"
    components={{
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
