# Сетка

## Содержание

- [Описание](#описание)
- [Колонки](#колонки)
- [Особые раскладки](#особые-раскладки)
- [Свойства](#свойства)

## Описание

Компонент `<Grid>` раскладывает элементы по колонкам с одинаковым отступом. Дети — это ячейки сетки, оборачивать каждый не нужно.

Главный режим — `minColumnWidth`: колонок столько, сколько помещается, а каждая не уже заданной ширины. Когда места меньше, колонки сами перестраиваются, вплоть до одной на узком экране. Брейкпоинты для этого не нужны. Измените ширину окна, чтобы увидеть это в примере.

`gap` задаёт отступ между ячейками, `rowGap` — отдельно между строками. Оба принимают шаг [шкалы отступов](../stack/README.md#шкала-отступов) темы или любую длину CSS.

_Пример использования:_

```tsx
import React from 'react';
import Grid from '@via-profit/ui-kit/Grid';
import TextField from '@via-profit/ui-kit/TextField';

const Example: React.FC = () => (
  <Grid minColumnWidth="14em" gap="lg" rowGap="sm">
    <TextField fullWidth label="Фамилия" />
    <TextField fullWidth label="Имя" />
    <TextField fullWidth label="Отчество" />
    <TextField fullWidth label="Город" />
    <TextField fullWidth label="Улица" />
    <TextField fullWidth label="Дом" />
  </Grid>
);

export default Example;
```

<ExampleGridAuto />

## Колонки

Свойство `columns` задаёт колонки явно:

- число — столько колонок одинаковой ширины: `columns={3}`;
- строка — значение `grid-template-columns`: `columns="2fr 1fr"` — основная колонка вдвое шире боковой, `columns="auto 1fr"` — первая по содержимому.

Свойство `align` выравнивает ячейки строки по вертикали. По умолчанию ячейки растягиваются на высоту строки (`stretch`), `align="start"` оставляет им высоту содержимого.

```tsx
<Grid columns={3}>
  <Surface header="Заказы">128</Surface>
  <Surface header="Выручка">412 тыс. ₽</Surface>
  <Surface header="Возвраты">3</Surface>
</Grid>

<Grid columns="2fr 1fr" align="start">
  <Surface header="Основная часть">…</Surface>
  <Surface header="Боковая колонка">…</Surface>
</Grid>
```

<ExampleGridColumns />

## Особые раскладки

У явных колонок нет брейкпоинтов. Если раскладка из двух неравных колонок должна на узком экране превратиться в одну, расширьте `Grid` с помощью `styled`:

```tsx
import styled from '@emotion/styled';
import Grid from '@via-profit/ui-kit/Grid';

const Layout = styled(Grid)`
  @media (max-width: 900px) {
    grid-template-columns: minmax(0, 1fr);
  }
`;

<Layout columns="minmax(0, 2fr) minmax(16em, 1fr)" gap="lg" align="start">
  <OrderForm />
  <OrderSummary />
</Layout>;
```

Так сделаны примеры [оформления заказа и бронирования](/docs/showcase).

## Свойства

Помимо перечисленных ниже, `<Grid>` принимает атрибуты элемента `<div>`. `ref` указывает на этот же элемент.

### `minColumnWidth`
Минимальная ширина колонки: колонок столько, сколько помещается. Важнее, чем `columns`.
- Тип: `string`
- По умолчанию: `undefined`
- Обязательное: нет

### `columns`
Число одинаковых колонок или значение `grid-template-columns`.
- Тип: `number | string`
- По умолчанию: `1`
- Обязательное: нет

### `gap`
Отступ между ячейками: шаг шкалы темы, длина CSS или число пикселей.
- Тип: `'xs' | 'sm' | 'md' | 'lg' | 'xl' | string | number`
- По умолчанию: `'md'`
- Обязательное: нет

### `rowGap`
Отступ между строками, если он отличается от `gap`.
- Тип: `'xs' | 'sm' | 'md' | 'lg' | 'xl' | string | number`
- По умолчанию: равен `gap`
- Обязательное: нет

### `align`
Выравнивание ячеек строки по вертикали (`align-items`).
- Тип: `string`
- По умолчанию: `'stretch'`
- Обязательное: нет
