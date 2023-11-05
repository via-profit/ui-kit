# Highlighted

## Содержание

- [Описание](#описание)
- [Свойства](#свойства)
- [Переопределение](#переопределение)

## Описание

Компонент `<Highlighted>` позволяет отобразить строку с подсвечиванием подстроки. Применяется в компоненте [Autocomplete](../autocomplete/README.md)

_Пример использования:_

```tsx
import React from 'react';
import Highlighted from '@via-profit/ui-kit/Highlighted';

const Example: React.FC = () => (
  <Highlighted
    text="Chocolate Starfish and the Hot Dog Flavored Water"
    highlight={['hot', 'starfish']}
  />
);

export default Example;
```

<ExampleHighlightedOverview />

## Переопределение

Компонент `<Highlighted>` является составным и реализован при помощи следующих компонентов:

- `<Container>` — Компонент контейнер `<span>`
- `<Text>` — `<span>` компонент, отображающий простой текст (не подсвеченный)
- `<Mark>` — `<span>` компонент, отображающий подсвеченную часть текста

Используйте свойство `overrides` чтобы переопределить один или несколько компонентов:

_Пример использования:_

```tsx
import React from 'react';
import Highlighted from '@via-profit/ui-kit/Highlighted';

const Example: React.FC = () => (
  <Highlighted
    text="Gold Cobra"
    highlight={['cob']}
    overrides={{
      Mark: React.forwardRef(function MyMark(props, ref) {
        return (
          <mark
            {...props}
            ref={ref}
            style={{
              backgroundColor: 'green',
              color: 'white',
              outline: '1px solid green',
              borderRadius: '4px',
            }}
          />
        );
      }),
    }}
  />
);
```

<ExampleHighlightedOverrides />

## Свойства

Помимо перечисленных свойств, компонент принимает [стандартные аттрибуты](https://developer.mozilla.org/ru/docs/Web/HTML/Element/span#атрибуты) HTML элемента `<span>`

| Свойство                 | Обязателен | Тип                      | По умолчанию             | Описание                                                                 |
| ------------------------ | :--------: | :----------------------- | :----------------------- | ------------------------------------------------------------------------ |
| **text**                 |     \*     | `string`                 |                          | Исходный текст                                                           |
| **highlight**            |     \*     | `string` `Array<string>` |                          | Строка или массив строк, которые необходимо подсветить в исходном тексте |
| **overrides**            |            | `Object`                 | `undefined`              | Объект элементов для переопределения составных компонентов кнопки        |
| **overrides .Container** |            | `<React.Component>`      | `<HighlightedContainer>` | Компонент контейнер `<span>`                                             |
| **overrides .Text**      |            | `<React.Component>`      | `<HighlightedText>`      | компонент, отображающий простой текст                                    |
| **overrides .Mark**      |            | `<React.Component>`      | `<HighlightedMark>`      | компонент, отображающий подсвеченную часть текста                        |
