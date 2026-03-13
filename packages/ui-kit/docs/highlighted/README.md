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
Вот обновленный раздел "Свойства" с заменой таблицы на описание в формате кода:

## Свойства

### `text`
Исходный текст, в котором будет производиться подсветка.
- Тип: `string`
- По умолчанию: (обязательный параметр)
- Обязательное: **да**

### `highlight`
Строка или массив строк, которые необходимо подсветить в исходном тексте.
- Тип: `string | Array<string>`
- По умолчанию: (обязательный параметр)
- Обязательное: **да**

### `caseSensitive`
Определяет, будет ли поиск чувствителен к регистру.
- Тип: `boolean`
- По умолчанию: `false`
- Обязательное: нет

### `disabledHighlighting`
Если `true`, отключает подсветку и отображает исходный текст без изменений.
- Тип: `boolean`
- По умолчанию: `false`
- Обязательное: нет

### `overrides`
Объект для переопределения составных компонентов подсветки текста.
- Тип: `Object`
- По умолчанию: `undefined`
- Обязательное: нет

#### `overrides.Container`
Компонент-контейнер `<span>`, объединяющий все части текста.
- Тип: `React.Component`
- По умолчанию: `<HighlightedContainer>`

#### `overrides.Text`
Компонент, отображающий обычный (неподсвеченный) текст.
- Тип: `React.Component`
- По умолчанию: `<HighlightedText>`

#### `overrides.Mark`
Компонент, отображающий подсвеченную часть текста.
- Тип: `React.Component`
- По умолчанию: `<HighlightedMark>`

---

Помимо перечисленных свойств, компонент принимает [стандартные атрибуты](https://developer.mozilla.org/ru/docs/Web/HTML/Element/span#атрибуты) HTML элемента `<span>`
