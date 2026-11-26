# Подсветка подстроки

## Содержание

- [Описание](#описание)
- [Переопределение](#переопределение)
- [Свойства](#свойства)

## Описание

Компонент `<Highlighted>` выводит текст и выделяет в нём найденные подстроки. Он удобен в результатах поиска и в вариантах [автокомплита](../autocomplete/README.md): пользователь видит, почему вариант попал в список.

- `highlight` принимает строку или массив строк. Чтобы подсветить каждое слово запроса отдельно, разбейте запрос: `query.split(/\s+/)`;
- по умолчанию регистр не учитывается: «кофе» найдёт «Кофе». Свойство `caseSensitive` включает учёт регистра;
- спецсимволы регулярных выражений ищутся как обычный текст: «(руб.)» или «1+1» подсвечиваются как есть;
- если подстроки пересекаются, выделяется самая длинная: при `['кофе', 'кофемолка']` слово «Кофемолка» подсветится целиком;
- пустые строки и пробелы в `highlight` игнорируются.

Найденные части оборачиваются в элемент `<mark>`, остальной текст — в `<span>`.

_Пример использования:_

```tsx
import React from 'react';
import TextField from '@via-profit/ui-kit/TextField';
import Highlighted from '@via-profit/ui-kit/Highlighted';

const products = ['Кофе в зёрнах, 1 кг', 'Кофе молотый, 250 г', 'Молоко 3,2%, 1 л'];

const Example: React.FC = () => {
  const [query, setQuery] = React.useState('кофе мол');

  return (
    <>
      <TextField
        label="Поиск по товарам"
        value={query}
        onChange={event => setQuery(event.currentTarget.value)}
      />
      <ul>
        {products.map(product => (
          <li key={product}>
            <Highlighted text={product} highlight={query.split(/\s+/)} />
          </li>
        ))}
      </ul>
    </>
  );
};

export default Example;
```

<ExampleHighlightedOverview />

Функция `escapeRegex`, которой компонент экранирует подстроки, тоже экспортируется. Она пригодится, если строить регулярное выражение из пользовательского ввода самостоятельно:

```ts
import { escapeRegex } from '@via-profit/ui-kit/Highlighted';

const regex = new RegExp(escapeRegex('1+1'), 'i');
```

## Переопределение

Компонент `<Highlighted>` является составным и реализован при помощи следующих компонентов:

- `<Container>` — корневой `<span>`; получает все атрибуты, переданные в `<Highlighted>`
- `<Mark>` — `<mark>` с найденной частью текста
- `<Text>` — `<span>` с остальным текстом

Используйте свойство `overrides`, чтобы переопределить один или несколько компонентов. Проще всего расширить стандартный компонент с помощью `styled`. Создавайте переопределения один раз — вне компонента, а не при рендере.

_Пример использования:_

```tsx
import React from 'react';
import styled from '@emotion/styled';
import Highlighted from '@via-profit/ui-kit/Highlighted';
import HighlightedMark from '@via-profit/ui-kit/Highlighted/HighlightedMark';

const Mark = styled(HighlightedMark)`
  padding: 0 0.15em;
  border-radius: 0.2em;
  font-weight: inherit;
  color: ${({ theme }) => theme.color.accentPrimaryContrast.toString()};
  background-color: ${({ theme }) => theme.color.accentPrimary.toString()};
`;

// Created once, outside of the component
const overrides = { Mark };

const Example: React.FC = () => (
  <Highlighted
    text="Доставка по Москве и Московской области"
    highlight="моск"
    overrides={overrides}
  />
);

export default Example;
```

<ExampleHighlightedOverrides />

## Свойства

Помимо перечисленных ниже, `<Highlighted>` принимает [стандартные атрибуты](https://developer.mozilla.org/ru/docs/Web/HTML/Element/span#атрибуты) элемента `<span>` и передаёт их в `<Container>`. `ref` указывает на этот же элемент.

### `text`
Текст, в котором ищутся подстроки.
- Тип: `string`
- Обязательное: **да**

### `highlight`
Подстрока или массив подстрок, которые нужно выделить.
- Тип: `string | readonly string[]`
- Обязательное: **да**

### `caseSensitive`
Если `true`, поиск учитывает регистр.
- Тип: `boolean`
- По умолчанию: `false`
- Обязательное: нет

### `disabledHighlighting`
Если `true`, текст выводится без выделения.
- Тип: `boolean`
- По умолчанию: `false`
- Обязательное: нет

### `overrides`
Объект для переопределения составных компонентов. Подробнее в разделе [Переопределение](#переопределение).
- Тип: `HighlightedOverrides`
- По умолчанию: `undefined`
- Обязательное: нет
