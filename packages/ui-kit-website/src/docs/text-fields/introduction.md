# Текстовое поле

Компонент `<TextField>`

<ExampleOverview>

## Свойства

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
import styled from '@emotion/styled';
import TextField from '@via-profit/ui-kit/src/TextField';
import type { TextFieldInputWrapperProps } from '@via-profit/ui-kit/src/TextField/TextFieldInputWrapper';

// Стиллизованный DIV, которым мы
// хотим заместить стандартный
const StyledInputWrapper = styled.div`
  background-color: #c5d4fd;
  color: #6305ce;
  border-radius: 0.3em;
`;

// Ваш компонент-обертка
const InputWrapper: React.ForwardRefRenderFunction<HTMLDivElement, TextFieldInputWrapperProps> = (
  props,
  ref,
) => {
  // Не забудьте извлечь перечисленные ниже компоненты прежде чем спредить `nativeProps` в свой DIV.
  // Если вы будете спредить все пропсы безоговорочно, что получите ошибку типа:
  // «If you want to write it to the DOM, pass a string instead: fullWidth="true" or fullWidth={value.toString()}»
  const { focused, fullWidth, readOnly, children, error, ...nativeProps } = props;

  return (
    <StyledInputWrapper {...nativeProps} ref={ref}>
      {children}
    </StyledInputWrapper>
  );
};

// Рендерим TextField
const MyPage: React.FC = () => (
  <TextField
    label="Имя:"
    components={{
      // Перезаписываем InputWrapper.
      // Обратите внимание, что здесь прокидывается ref, однако
      // прокинуть ref можно и при объявлении компонента, главное не забыть  
      InputWrapper: React.forwardRef(InputWrapper),
    }}
  />
);
```

Результат:

<ExampleOverrides />
