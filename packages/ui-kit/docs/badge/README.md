# Бейдж

## Содержание

- [Описание](#описание)
- [Варианты](#варианты)
- [Цвета](#цвета)
- [Статус: точка](#статус-точка)
- [Иконка и удаление](#иконка-и-удаление)
- [Нажатие](#нажатие)
- [Переопределение](#переопределение)
- [Свойства](#свойства)

## Описание

Компонент `<Badge>` — небольшая метка: статус, категория, выбранный элемент или тег. Бейдж может показывать иконку, кнопку удаления и работать как кнопка.

_Пример использования:_

```tsx
import React from 'react';
import Badge from '@via-profit/ui-kit/Badge';

const Example: React.FC = () => (
  <>
    <Badge>Черновик</Badge>
    <Badge color="primary">Новый</Badge>
    <Badge variant="outlined" color="secondary">
      На проверке
    </Badge>
  </>
);

export default Example;
```

<ExampleBadgeOverview />

## Варианты

Свойство `variant` задаёт вид бейджа:

- **`standard`** — сплошная заливка цветом `color` (по умолчанию)
- **`outlined`** — рамка и текст цвета `color` без заливки
- **`soft`** — бледная подложка цвета `color` и текст того же оттенка: тёмный в светлой теме, светлый в тёмной. Спокойнее заливки — подходит для статусов в списках, где бейджей много

<ExampleBadgeVariants />

## Цвета

Свойство `color` принимает одно из значений `default`, `primary`, `secondary` либо любой цвет CSS: **hex**, **rgb(a)** или название цвета, например `lightpink`.

- **`default`** — нейтральный цвет: немного темнее фона `Surface` у `standard`, светлая рамка у `outlined` (по умолчанию)
- **`primary`** — основной цвет акцента темы
- **`secondary`** — второстепенный цвет акцента темы

Цвет текста в варианте `standard` подбирается автоматически: для `primary` и `secondary` берётся контрастный цвет из темы, для произвольного цвета — основной цвет текста темы, если он достаточно контрастен с фоном, иначе цвет фона `Surface`.

```tsx
<Badge color="primary">primary</Badge>
<Badge variant="outlined" color="#529d29">
  #529d29
</Badge>
```

<ExampleBadgeColors />

## Статус: точка

Свойство `dot` ставит перед текстом цветную точку цвета бейджа. Вместе с вариантом `soft` получается метка статуса: точку замечают быстрее, чем читают текст, а цвет у статусов одинаковый во всём приложении.

```tsx
<Badge variant="soft" dot color="#2e9d4f">Оплачен</Badge>
<Badge variant="soft" dot color="#e0a100">Частично оплачен</Badge>
<Badge variant="soft" dot color="#d64545">Не оплачен</Badge>
<Badge variant="outlined" dot color="primary">В работе</Badge>
```

<ExampleBadgeStatus />

Точка — только украшение: она скрыта от программ чтения с экрана, статус передаёт текст. Не делайте бейдж из одной точки без текста.

## Иконка и удаление

`startIcon` добавляет иконку перед текстом. Передавайте элемент (`<UserIcon />`), а не компонент (`UserIcon`).

Если передан `onDelete`, в бейдже появляется кнопка удаления. Она содержит только иконку, поэтому для программ чтения с экрана у неё есть подпись `deleteButtonLabel` (по умолчанию `'Delete'`) — лучше указать, что именно удаляется. Нажатие на кнопку удаления не вызывает `onClick` самого бейджа.

_Пример использования:_

```tsx
import React from 'react';
import Badge from '@via-profit/ui-kit/Badge';

const Example: React.FC = () => {
  const [users, setUsers] = React.useState(['Анна Смирнова', 'Иван Петров', 'Мария Иванова']);

  return (
    <>
      {users.map(user => (
        <Badge
          key={user}
          variant="outlined"
          color="primary"
          startIcon={<UserIcon />}
          deleteButtonLabel={`Удалить «${user}»`}
          onDelete={() => setUsers(current => current.filter(u => u !== user))}
        >
          {user}
        </Badge>
      ))}
    </>
  );
};

export default Example;
```

<ExampleBadgeIcons />

## Нажатие

Если передан `onClick`, бейдж работает как кнопка: получает фокус клавишей Tab, нажимается клавишами Enter и пробел, а при наведении меняет цвет и курсор. Для программ чтения с экрана он получает роль `button`. Бейдж без `onClick` на наведение не реагирует.

Так можно сделать, например, фильтр по категориям. Атрибут `aria-pressed` сообщает программам чтения с экрана, выбран ли бейдж:

```tsx
import React from 'react';
import Badge from '@via-profit/ui-kit/Badge';

const categories = ['Книги', 'Музыка', 'Фильмы', 'Игры'];

const Example: React.FC = () => {
  const [selected, setSelected] = React.useState<readonly string[]>(['Книги']);

  const toggle = (category: string) =>
    setSelected(current =>
      current.includes(category) ? current.filter(c => c !== category) : [...current, category],
    );

  return (
    <>
      {categories.map(category => (
        <Badge
          key={category}
          color="primary"
          variant={selected.includes(category) ? 'standard' : 'outlined'}
          aria-pressed={selected.includes(category)}
          onClick={() => toggle(category)}
        >
          {category}
        </Badge>
      ))}
    </>
  );
};

export default Example;
```

<ExampleBadgeClickable />

## Переопределение

Компонент `<Badge>` является составным и реализован при помощи следующих компонентов:

- `<Container>` — корневой элемент `<span>`
- `<IconWrapper>` — обёртка `startIcon`
- `<TextWrapper>` — обёртка текста
- `<ButtonDelete>` — кнопка удаления
- `<Dot>` — точка; выводится только с `dot`

Используйте свойство `overrides`, чтобы переопределить один или несколько компонентов. Проще всего расширить стандартный компонент с помощью `styled`. Создавайте переопределения один раз — вне компонента, а не при рендере.

_Пример использования:_

```tsx
import React from 'react';
import styled from '@emotion/styled';
import Badge from '@via-profit/ui-kit/Badge';
import BadgeTextWrapper from '@via-profit/ui-kit/Badge/BadgeTextWrapper';

const TextWrapper = styled(BadgeTextWrapper)`
  font-weight: 600;
  letter-spacing: 0.05em;
  text-transform: uppercase;
`;

// Created once, outside of the component
const overrides = { TextWrapper };

const Example: React.FC = () => (
  <Badge color="primary" overrides={overrides}>
    Скидка 20%
  </Badge>
);

export default Example;
```

<ExampleBadgeOverrides />

## Свойства

Помимо перечисленных ниже, `<Badge>` принимает [стандартные атрибуты](https://developer.mozilla.org/ru/docs/Web/HTML/Element/span#атрибуты) элемента `<span>`. `ref` указывает на корневой элемент.

### `variant`
Вид бейджа. Подробнее в разделе [Варианты](#варианты).
- Тип: `'standard' | 'outlined' | 'soft'`
- По умолчанию: `'standard'`
- Обязательное: нет

### `color`
Цвет бейджа. Подробнее в разделе [Цвета](#цвета).
- Тип: `'default' | 'primary' | 'secondary' | string`
- По умолчанию: `'default'`
- Обязательное: нет

### `dot`
Если `true`, перед текстом выводится точка цвета бейджа. Подробнее в разделе [Статус: точка](#статус-точка).
- Тип: `boolean`
- По умолчанию: `false`
- Обязательное: нет

### `startIcon`
Иконка перед текстом.
- Тип: `JSX.Element`
- По умолчанию: `undefined`
- Обязательное: нет

### `onClick`
Если передан, бейдж работает как кнопка. Подробнее в разделе [Нажатие](#нажатие).
- Тип: `React.MouseEventHandler<HTMLSpanElement>`
- По умолчанию: `undefined`
- Обязательное: нет

### `onDelete`
Если передан, отображается кнопка удаления, и функция вызывается при нажатии на неё.
- Тип: `React.MouseEventHandler<HTMLButtonElement>`
- По умолчанию: `undefined`
- Обязательное: нет

### `deleteButtonLabel`
Подпись кнопки удаления для программ чтения с экрана.
- Тип: `string`
- По умолчанию: `'Delete'`
- Обязательное: нет

### `overrides`
Объект для переопределения составных компонентов. Подробнее в разделе [Переопределение](#переопределение).
- Тип: `BadgeBaseOverrides`
- По умолчанию: `undefined`
- Обязательное: нет
