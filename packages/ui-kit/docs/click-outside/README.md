## Клик вне элемента

## Содержание

- [Описание](#описание)
- [Свойства](#свойства)

## Описание

Компонент `<ClickOutside>` позволяет отслеживать событие клика мыши за пределами вашего компонента. Применяется в [`<Menu>`](../menu/README.md) и [`<Autocomplete>`](../autocomplete/README.md) позволяя реагировать на клик мыши за пределами списков в тот момент, когда они открыты и закрывать их.

_Пример использования:_

```tsx
import React from 'react';
import ClickOutside from '@via-profit/ui-kit/ClickOutside';
import Paragraph from '@via-profit/ui-kit/Typography/Paragraph';

const Example: React.FC = () => {
  const [counter, setCounter] = React.useState(0);

  return (
    <ClickOutside onOutsideClick={() => setCounter(c => c + 1)}>
      <Paragraph>Clicked: {counter}</Paragraph>
    </ClickOutside>
  );
};
export default Example;
```

<ExampleClickOutsideOverview />

## Свойства

| Свойство           | Обязателен | Тип                                 | По умолчанию  | Описание                                                                         |
| ------------------ | :--------: | :---------------------------------- | :------------ | -------------------------------------------------------------------------------- |
| **children**       |     \*     | `React.ReactElement`                |               | Реакт элемент. **Важно: Не используйте фрагмент в качестве дочернего элемента.** |
| **onOutsideClick** |     \*     | `Function`                          |               | Коллбек функция, которая будет вызвана по наступлению события.                   |
| **onOutsideClick** |            | `onClick` `onMouseDown` `onMouseUp` | `onMouseDown` | Тип события, на которое будет реагировать компонент                              |
