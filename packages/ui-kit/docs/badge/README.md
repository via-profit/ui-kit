# Бейдж

## Содержание

- [Описание](#описание)
- [Варианты](#варианты)
- [Цвета](#цвета)
- [Иконки](#иконки)
- [Переопределение](#переопределение)
- [Свойства](#свойства)

## Описание

Компонент `<Badge>` создаёт элемент, используемый в качестве индикатора, например когда необходимо отобразить выбранные элементы.

_Пример использования:_

```tsx
import React from 'react';
import Badge from '@via-profit/ui-kit/Badge';

const Example: React.FC = () => (
  <Badge variant="outlined" color="secondary">
    Standard secondary
  </Badge>
);

export default Example;
```

<ExampleBadgeOverview />

## Варианты

Бейджи выполнены в двух вариациях: `standard` и `outlined`. По умолчанию, используется стиль `standard`.

- **standard** — отображает обычный бейдж со сплошной заливкой согласно переданному цвету
- **outlined** — отображает бейдж с окантовкой согласно переданному цвету

_Пример использования:_

```tsx
import React from 'react';
import Badge from '@via-profit/ui-kit/Badge';

const Example: React.FC = () => (
  <>
    <Badge variant="standard">Standard</Badge>
    <Badge variant="outlined">Outlined</Badge>
  </>
);

export default Example;
```

<ExampleBadgeVariants />

## Цвета

Вы можете указать одно из трёх зарезервированных значений `default` `primary` `secondary`, или **rgb(a)**/**hex** код произвольного цвета. По умолчанию, используется цвет стиля `default`.

В качестве цвета вы можете передать и псевдоним цвета, например, **lightpink** что будет соответствовать коду цвета `#ffb6c1`,

- **default** — Цвет кнопки совпадает с цветом заднего плана
- **primary** — Используется основной цвет акцента
- **secondary** — Используется второстепенный цвет акцента

_Пример использования:_

<ExampleBadgeColors />

## Иконки

Бейдж может отображать иконку, переданную в свойстве `startIcon`.
**Важно:** Передавать следует не React компонент, а JSX выражение:

```tsx
import Badge from '@via-profit/ui-kit/Badge';
import MyIcon from './MyIcon';

const Example: React.FC = () => (
  <Badge
    startIcon={<MyIcon />}
    variant="outlined"
    color="secondary"
    >
    Oleg Dolgoperedryagov
  </Badge>
);
```

<ExampleBadgeIcons />