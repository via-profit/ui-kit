# Таблица

## Содержание

- [Описание](#описание)
- [Заголовки строк](#заголовки-строк)
- [Широкие таблицы](#широкие-таблицы)
- [Оформление](#оформление)
- [Компоненты](#компоненты)

## Описание

Таблица собирается из компонентов, которые повторяют элементы HTML-таблицы и добавляют им оформление темы:

| Компонент | Элемент |
| --- | --- |
| `Table` | `<table>` |
| `TableCaption` | `<caption>` |
| `TableHeader` | `<thead>` |
| `TableBody` | `<tbody>` |
| `TableFooter` | `<tfoot>` |
| `TableRow` | `<tr>` |
| `TableHeaderCell` | `<th>` |
| `TableCell` | `<td>` |

Каждый компонент принимает атрибуты своего элемента (`colSpan`, `scope`, `style` и другие), а `ref` указывает на этот элемент. Поскольку это настоящая таблица, программы чтения с экрана озвучивают заголовки колонок вместе с ячейками.

- `TableCaption` — название таблицы, его озвучивают программы чтения с экрана;
- ячейки в `TableHeader` выделены цветом акцента;
- ячейки в `TableFooter` — жирные, над подвалом проведена линия. Туда удобно выносить итоги;
- числа выравнивайте по правому краю (`style={{ textAlign: 'right' }}`), чтобы разряды стояли друг под другом.

_Пример использования:_

```tsx
import React from 'react';
import {
  Table,
  TableCaption,
  TableHeader,
  TableBody,
  TableFooter,
  TableRow,
  TableHeaderCell,
  TableCell,
} from '@via-profit/ui-kit/Table';

const orders = [
  { id: 1042, customer: 'Иван Петров', amount: 4590 },
  { id: 1043, customer: 'Анна Смирнова', amount: 12300 },
];

const numeric = { textAlign: 'right' } as const;

const Example: React.FC = () => (
  <Table fullWidth>
    <TableCaption>Заказы за неделю</TableCaption>
    <TableHeader>
      <TableRow>
        <TableHeaderCell>Номер</TableHeaderCell>
        <TableHeaderCell>Покупатель</TableHeaderCell>
        <TableHeaderCell style={numeric}>Сумма</TableHeaderCell>
      </TableRow>
    </TableHeader>
    <TableBody>
      {orders.map(order => (
        <TableRow key={order.id}>
          <TableCell>{order.id}</TableCell>
          <TableCell>{order.customer}</TableCell>
          <TableCell style={numeric}>{order.amount} ₽</TableCell>
        </TableRow>
      ))}
    </TableBody>
    <TableFooter>
      <TableRow>
        <TableCell colSpan={2}>Итого</TableCell>
        <TableCell style={numeric}>16 890 ₽</TableCell>
      </TableRow>
    </TableFooter>
  </Table>
);

export default Example;
```

<ExampleTableBasic />

## Заголовки строк

Если первая колонка называет строку, сделайте её ячейки заголовками: `TableHeaderCell` с `scope="row"` в `TableBody`. Такая ячейка выделяется жирным, а программы чтения с экрана называют её вместе с каждой ячейкой строки.

```tsx
<TableBody>
  <TableRow>
    <TableHeaderCell scope="row">Пользователи</TableHeaderCell>
    <TableCell>1</TableCell>
    <TableCell>10</TableCell>
  </TableRow>
</TableBody>
```

<ExampleTableRowHeaders />

## Широкие таблицы

Таблица не перестраивается на узких экранах. Если колонок много, поместите её в контейнер с `overflow-x: auto`: прокручиваться будет только таблица, а не вся страница. Чтобы контейнер можно было прокрутить с клавиатуры, дайте ему `tabIndex={0}`, роль `region` и `aria-label`.

```tsx
<div style={{ overflowX: 'auto' }} tabIndex={0} role="region" aria-label="Показатели по месяцам">
  <Table>…</Table>
</div>
```

<ExampleTableScroll />

## Оформление

- `fullWidth` — таблица занимает всю ширину родителя. Без него ширина определяется содержимым;
- любые части таблицы можно расширить с помощью `styled`, например добавить полосатые строки и подсветку строки под указателем.

Линии между строками — это нижние границы ячеек (`border-bottom` у `td` и `th`), а не строк `<tr>`.

```tsx
import styled from '@emotion/styled';
import { TableBody } from '@via-profit/ui-kit/Table';

const StripedBody = styled(TableBody)`
  & > tr:nth-of-type(even) > td {
    background-color: ${({ theme }) => theme.color.textPrimary.alpha(0.05).toString()};
  }

  & > tr:hover > td {
    background-color: ${({ theme }) => theme.color.accentPrimary.alpha(0.12).toString()};
  }
`;
```

<ExampleTableStyled />

## Компоненты

Все компоненты экспортируются из `@via-profit/ui-kit/Table`. `Table` — ещё и экспорт по умолчанию.

### `Table`
Таблица. Принимает атрибуты `<table>`.

#### `fullWidth`
Если `true`, таблица занимает всю ширину родителя.
- Тип: `boolean`
- По умолчанию: `false`
- Обязательное: нет

### `TableCaption`
Название таблицы. Принимает атрибуты `<caption>`. Должно быть первым потомком `Table`.

### `TableHeader`, `TableBody`, `TableFooter`
Группы строк: заголовок, основная часть и подвал. Принимают атрибуты `<thead>`, `<tbody>` и `<tfoot>`.

### `TableRow`
Строка. Принимает атрибуты `<tr>`.

### `TableHeaderCell`
Ячейка-заголовок. Принимает атрибуты `<th>`, например `scope`, `colSpan`, `rowSpan`.

### `TableCell`
Ячейка. Принимает атрибуты `<td>`, например `colSpan`, `rowSpan`.
