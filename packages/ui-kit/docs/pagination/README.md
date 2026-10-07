# Пагинация

## Содержание

- [Описание](#описание)
- [Неконтролируемая пагинация](#неконтролируемая-пагинация)
- [Сколько страниц видно](#сколько-страниц-видно)
- [Кнопки навигации и размер](#кнопки-навигации-и-размер)
- [Оформление](#оформление)
- [Пагинация таблицы](#пагинация-таблицы)
- [Ссылки вместо кнопок](#ссылки-вместо-кнопок)
- [Своя пагинация](#своя-пагинация)
- [Доступность](#доступность)
- [Свойства](#свойства)
- [usePagination](#usepagination)

## Описание

Пагинация переключает страницы длинного списка: таблицы заказов, каталога, результатов поиска. Она показывает первую и последнюю страницы, текущую с соседними, а пропущенные диапазоны заменяет на `…`. Количество кнопок не зависит от текущей страницы, поэтому кнопки не прыгают при переключении.

Страницы нумеруются с 1. Передайте общее количество страниц в `count`, текущую — в `page`, а `onChange(page, event)` вызывается при выборе страницы. Текущую страницу и страницы за пределами `1…count` пагинация не выбирает. Если `page` выходит за эти пределы, показывается ближайшая допустимая страница.

_Пример использования:_

```tsx
import React from 'react';
import Pagination from '@via-profit/ui-kit/Pagination';

const Example: React.FC = () => {
  const [page, setPage] = React.useState(1);

  return <Pagination count={10} page={page} onChange={setPage} aria-label="Страницы заказов" />;
};

export default Example;
```

<ExamplePaginationBasic />

## Неконтролируемая пагинация

Без `page` пагинация хранит текущую страницу сама, начальную задаёт `defaultPage`. `onChange` по-прежнему сообщает о переходе — например, чтобы загрузить данные страницы.

```tsx
<Pagination count={50} defaultPage={25} onChange={page => loadOrders(page)} />
```

## Сколько страниц видно

- `siblings` — сколько страниц показывать с каждой стороны от текущей. По умолчанию `1`;
- `boundaries` — сколько страниц всегда показывать в начале и в конце. По умолчанию `1`, при `0` первая и последняя страницы скрываются в `…`.

Пропуск в одну страницу не заменяется на `…`: вместо него показывается сама страница. Если страниц мало, видны все.

```tsx
<Pagination count={50} defaultPage={25} siblings={0} boundaries={1} />
// 1 … 25 … 50
<Pagination count={50} defaultPage={25} siblings={2} boundaries={2} />
// 1 2 … 23 24 25 26 27 … 49 50
```

<ExamplePaginationRange />

## Кнопки навигации и размер

- `showPrevNext` — кнопки «назад» и «вперёд». По умолчанию `true`;
- `showFirstLast` — кнопки «в начало» и «в конец». По умолчанию `false`;
- `disabled` — отключает все кнопки, например пока загружается страница;
- `size="small"` — компактная пагинация, например под таблицей.

Кнопка навигации недоступна, если ведёт на текущую страницу или за пределы страниц: на первой странице — «назад» и «в начало», на последней — «вперёд» и «в конец».

Высота кнопок равна высоте остальных контролов и зависит от токена темы [`padding.control`](../theming/README.md): в плотной теме пагинация становится ниже вместе с кнопками и полями. `size` меняет только размер шрифта.

<ExamplePaginationNavigation />

## Оформление

- `variant` — вид кнопок невыбранных страниц: `standard`, `outlined` или `plain`. По умолчанию `standard`: на поверхности такие кнопки получают мягкую заливку и остаются видны;
- `color` — цвет кнопки текущей страницы: `default`, `primary`, `secondary` или любой цвет CSS. По умолчанию `primary`;
- `navigationVariant` — вид кнопок навигации. По умолчанию `outlined`;
- `navigationColor` — цвет кнопок навигации. По умолчанию `color` для вида `standard`, иначе `default`.

```tsx
<Pagination count={8} variant="outlined" color="secondary" navigationVariant="standard" />
<Pagination count={8} color="#e0435f" navigationColor="#e0435f" />
```

<ExamplePaginationAppearance />

## Пагинация таблицы

Пагинация не знает о данных: страницу из списка выбираете вы. Количество страниц — `Math.ceil(total / pageSize)`, строки страницы — `rows.slice((page - 1) * pageSize, page * pageSize)`.

```tsx
const PAGE_SIZE = 5;
const [page, setPage] = React.useState(1);
const visible = orders.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

<Table>...</Table>
<Pagination
  count={Math.ceil(orders.length / PAGE_SIZE)}
  page={page}
  onChange={setPage}
  size="small"
/>;
```

<ExamplePaginationTable />

## Ссылки вместо кнопок

Пагинация состоит из частей: `Container` — элемент `<nav>`, `Item` — кнопка страницы или навигации, `Gap` — пропуск `…`. Свойство `overrides` заменяет любые из них.

`Item` получает `kind` — что делает кнопка (`page`, `first`, `previous`, `next`, `last`), и `page` — какую страницу она открывает. Так кнопку можно заменить ссылкой: страницу можно открыть в новой вкладке, а поисковые системы проходят по ссылкам. Для роутера отрисуйте его компонент ссылки, например `Link` из react-router.

Создавайте объект `overrides` один раз — вне компонента, а не при рендере.

```tsx
import Pagination, { PaginationItemProps, PaginationOverrides } from '@via-profit/ui-kit/Pagination';

const LinkItem = React.forwardRef<HTMLButtonElement, PaginationItemProps>((props, ref) => {
  const { page, kind, selected, disabled, onClick, children } = props;

  return (
    <a
      href={`?page=${page}`}
      aria-label={props['aria-label']}
      aria-current={selected ? 'page' : undefined}
      aria-disabled={disabled || undefined}
      ref={ref as unknown as React.Ref<HTMLAnchorElement>}
      onClick={event => {
        // A plain click is handled by the application, Ctrl+click opens a new tab
        if (!event.ctrlKey && !event.metaKey) {
          event.preventDefault();
          onClick?.(event as unknown as React.MouseEvent<HTMLButtonElement>);
        }
      }}
    >
      {children}
    </a>
  );
});

const overrides: PaginationOverrides = { Item: LinkItem };

<Pagination count={12} defaultPage={4} overrides={overrides} />;
```

<ExamplePaginationLinks />

Чтобы изменить вид стандартной кнопки, расширьте её через `styled`:

```tsx
import styled from '@emotion/styled';
import { PaginationItem } from '@via-profit/ui-kit/Pagination';

const RoundItem = styled(PaginationItem)`
  && {
    border-radius: 50%;
  }
`;
```

## Своя пагинация

Если разметка нужна совсем другая, используйте хук `usePagination`: он содержит всю логику `<Pagination>` — текущую страницу, кнопки и пропуски, — а разметку вы рисуете сами. Хук принимает те же параметры, что и компонент: `count`, `page`, `defaultPage`, `onChange`, `siblings`, `boundaries`, `showPrevNext`, `showFirstLast`, `disabled`.

_Пример:_ стрелки, «3 / 7» и точка для каждой страницы.

```tsx
import { usePagination, IconPrevious, IconNext } from '@via-profit/ui-kit/Pagination';

const { page, count, items, setPage } = usePagination({
  count: 7,
  defaultPage: 3,
  siblings: 7,
  showPrevNext: false,
});

<nav aria-label="Слайды">
  <Button iconOnly disabled={page === 1} onClick={event => setPage(page - 1, event)}>
    <IconPrevious />
  </Button>
  {page} / {count}
  {items.map(item =>
    item.type === 'page' ? (
      <Dot key={item.page} aria-current={item.selected ? 'page' : undefined} onClick={item.onClick} />
    ) : null,
  )}
</nav>;
```

<ExamplePaginationCustom />

Только номера страниц с пропусками, без React, возвращает функция `getPaginationItems({ count, page, siblings, boundaries })`.

## Доступность

- пагинация — элемент `<nav>` с `aria-label`, по умолчанию `Pagination`. Если на странице несколько пагинаций, дайте каждой своё название: «Страницы заказов», «Страницы отзывов»;
- кнопка текущей страницы отмечена `aria-current="page"`, пропуски `…` скрыты от программ чтения с экрана;
- подписи кнопок по умолчанию на английском: «Go to page 3», «Go to next page». Передайте `getItemLabel(kind, page, selected)` с подписями на языке интерфейса:

```tsx
<Pagination
  count={10}
  page={page}
  onChange={setPage}
  aria-label="Страницы заказов"
  getItemLabel={(kind, target, selected) => {
    switch (kind) {
      case 'previous':
        return 'Предыдущая страница';
      case 'next':
        return 'Следующая страница';
      case 'first':
        return 'Первая страница';
      case 'last':
        return 'Последняя страница';
      default:
        return selected ? `Страница ${target}` : `Перейти на страницу ${target}`;
    }
  }}
/>
```

## Свойства

Помимо перечисленных ниже, `<Pagination>` принимает атрибуты элемента `<nav>`. `ref` указывает на этот же элемент.

### `count`
Количество страниц. Меньше `1` считается как `1`.
- Тип: `number`
- Обязательное: **да**

### `page`
Текущая страница контролируемой пагинации, начиная с `1`.
- Тип: `number`
- По умолчанию: `undefined`
- Обязательное: нет

### `defaultPage`
Начальная страница неконтролируемой пагинации.
- Тип: `number`
- По умолчанию: `1`
- Обязательное: нет

### `onChange`
Вызывается при выборе страницы.
- Тип: `(page: number, event: React.SyntheticEvent) => void`
- По умолчанию: `undefined`
- Обязательное: нет

### `siblings`
Сколько страниц показывать с каждой стороны от текущей.
- Тип: `number`
- По умолчанию: `1`
- Обязательное: нет

### `boundaries`
Сколько страниц всегда показывать в начале и в конце.
- Тип: `number`
- По умолчанию: `1`
- Обязательное: нет

### `showPrevNext`
Показывать кнопки «назад» и «вперёд».
- Тип: `boolean`
- По умолчанию: `true`
- Обязательное: нет

### `showFirstLast`
Показывать кнопки «в начало» и «в конец».
- Тип: `boolean`
- По умолчанию: `false`
- Обязательное: нет

### `disabled`
Отключает все кнопки.
- Тип: `boolean`
- По умолчанию: `false`
- Обязательное: нет

### `size`
Размер: `small` уменьшает шрифт пагинации.
- Тип: `'medium' | 'small'`
- По умолчанию: `'medium'`
- Обязательное: нет

### `variant`
Вид кнопок невыбранных страниц.
- Тип: `'standard' | 'outlined' | 'plain'`
- По умолчанию: `'standard'`
- Обязательное: нет

### `color`
Цвет кнопки текущей страницы.
- Тип: `'default' | 'primary' | 'secondary' | string`
- По умолчанию: `'primary'`
- Обязательное: нет

### `navigationVariant`
Вид кнопок навигации.
- Тип: `'standard' | 'outlined' | 'plain'`
- По умолчанию: `'outlined'`
- Обязательное: нет

### `navigationColor`
Цвет кнопок навигации.
- Тип: `'default' | 'primary' | 'secondary' | string`
- По умолчанию: `color` для вида `standard`, иначе `'default'`
- Обязательное: нет

### `getItemLabel`
Подпись кнопки для программ чтения с экрана.
- Тип: `(kind: 'page' | 'first' | 'previous' | 'next' | 'last', page: number, selected: boolean) => string`
- По умолчанию: подписи на английском
- Обязательное: нет

### `overrides`
Части пагинации, которые заменяют стандартные.
- Тип: `{ Container?, Item?, Gap? }`
- По умолчанию: `undefined`
- Обязательное: нет

## usePagination

`usePagination(params)` принимает `count`, `page`, `defaultPage`, `onChange`, `siblings`, `boundaries`, `showPrevNext`, `showFirstLast` и `disabled` — так же, как `<Pagination>`, — и возвращает:

- `page` — текущая страница, всегда в пределах `1…count`;
- `count` — количество страниц, не меньше `1`;
- `items` — кнопки и пропуски в порядке отображения:
  - кнопка: `{ type, page, selected, disabled, onClick }`, где `type` — `page`, `first`, `previous`, `next` или `last`;
  - пропуск: `{ type: 'gap', position: 'start' | 'end' }`;
- `setPage(page, event)` — открывает страницу: вызывает `onChange` и меняет страницу неконтролируемой пагинации. Текущая страница, страницы за пределами и любая страница отключённой пагинации игнорируются.
