# Заглушка загрузки

## Содержание

- [Описание](#описание)
- [Варианты](#варианты)
- [Заглушка строки списка](#заглушка-строки-списка)
- [Доступность](#доступность)
- [Свойства](#свойства)

## Описание

Заглушка загрузки — серая фигура, которая плавно мерцает на месте содержимого, пока оно загружается. В отличие от [индикатора загрузки](../loading-indicator/README.md), она сразу показывает, как будет выглядеть экран: где строки текста, где фото, где кнопки. Когда данные приходят, страница не прыгает.

Собирайте из заглушек грубую форму содержимого, без лишних деталей: строка заголовка, пара строк текста, аватар.

_Пример использования:_

```tsx
import React from 'react';
import Skeleton from '@via-profit/ui-kit/Skeleton';
import Stack from '@via-profit/ui-kit/Stack';

const Example: React.FC = () => (
  <Stack gap="sm">
    <Skeleton width="60%" height={1.2} />
    <Skeleton />
    <Skeleton width="80%" />
  </Stack>
);

export default Example;
```

<ExampleSkeletonBasic />

## Варианты

- `text` — строка текста (по умолчанию): высота `0.8em`, ширина `100%`;
- `rect` — блок: картинка, карточка, поле;
- `circle` — круг: аватар, иконка. Ширина равна высоте;
- `pill` — «таблетка»: бейдж, статус, кнопка.

Размеры задаются `width` и `height`: число — в `em`, строка — любая длина CSS.

```tsx
<Stack direction="row" gap="md" align="center">
  <Skeleton variant="circle" />
  <Skeleton variant="rect" width={6} />
  <Skeleton variant="pill" width={5} />
  <Skeleton width={8} />
</Stack>
```

<ExampleSkeletonVariants />

## Заглушка строки списка

Пока список загружается, покажите несколько строк-заглушек той же раскладки, что и настоящие строки: колонки останутся на своих местах.

```tsx
const RowSkeleton: React.FC = () => (
  <Stack direction="row" gap="md">
    <Skeleton variant="circle" />
    <Stack gap="xs" style={{ flex: 1 }}>
      <Skeleton width="40%" />
      <Skeleton width="70%" />
    </Stack>
    <Skeleton variant="pill" width={6} />
  </Stack>
);

<Stack gap="lg">
  <RowSkeleton />
  <RowSkeleton />
  <RowSkeleton />
</Stack>;
```

<ExampleSkeletonList />

## Доступность

- заглушка скрыта от программ чтения с экрана (`aria-hidden`): читать в ней нечего. Сообщите о загрузке на контейнере, например `aria-busy="true"`;
- мерцание выключается, если в системе включено уменьшение движения (`prefers-reduced-motion`).

## Свойства

Помимо перечисленных ниже, `<Skeleton>` принимает атрибуты элемента `<span>`. `ref` указывает на этот же элемент.

#### `variant`
Форма заглушки.
- Тип: `'text' | 'rect' | 'circle' | 'pill'`
- По умолчанию: `'text'`
- Обязательное: нет

#### `width`
Ширина: число — в `em`, строка — длина CSS. У `circle` ширина равна высоте.
- Тип: `number | string`
- По умолчанию: `'100%'`
- Обязательное: нет

#### `height`
Высота: число — в `em`, строка — длина CSS.
- Тип: `number | string`
- По умолчанию: по варианту — `0.8em`, `3em`, `2.5em`, `1.6em`
- Обязательное: нет
