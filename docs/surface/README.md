# Поверхность

## Содержание

- [Описание](#описание)
- [Карточка](#карточка)
- [Варианты](#варианты)
- [Переопределение](#переопределение)
- [Свойства](#свойства)

## Описание

Компонент `<Surface>` — приподнятый блок цвета `theme.color.surface` со скруглёнными углами и тенью. На нём строятся карточки, панели и другие блоки, которые нужно выделить на фоне страницы.

_Пример использования:_

```tsx
import React from 'react';
import Surface from '@via-profit/ui-kit/Surface';

const Example: React.FC = () => <Surface>Содержимое поверхности</Surface>;

export default Example;
```

<ExampleSurfaceBasic />

## Карточка

Свойства `header`, `subheader` и `footer` превращают поверхность в карточку: заголовок, подзаголовок под ним, содержимое и нижняя часть. Элементы в `footer` прижаты вправо — туда удобно ставить кнопки действий.

_Пример использования:_

```tsx
import React from 'react';
import Surface from '@via-profit/ui-kit/Surface';
import Button from '@via-profit/ui-kit/Button';

const Example: React.FC = () => (
  <Surface
    header="Заказ №1042"
    subheader="Оформлен 30 сентября"
    footer={
      <>
        <Button>Отменить</Button>
        <Button color="primary">Оплатить</Button>
      </>
    }
  >
    3 товара на сумму 4 590 ₽. Доставка курьером, 2–3 дня.
  </Surface>
);

export default Example;
```

<ExampleSurfaceCard />

`subheader` показывается только вместе с `header`: без заголовка в консоль выводится предупреждение.

## Варианты

- `inline` — поверхность занимает ширину своего содержимого, как строчный элемент. Без него она растягивается на всю ширину родителя;
- `noPadding` — без внутренних отступов, например для изображения или карты во всю поверхность;
- `rounded` — круглая поверхность (`border-radius: 100%`) с содержимым по центру. Задайте ей одинаковые ширину и высоту.

```tsx
<Surface inline>inline</Surface>

<Surface inline noPadding>
  <img src="cover.jpg" alt="" />
</Surface>

<Surface inline rounded style={{ width: '6em', height: '6em' }}>
  24°
</Surface>
```

<ExampleSurfaceVariants />

## Переопределение

Компонент `<Surface>` является составным и реализован при помощи следующих компонентов:

- `<Container>` — корневой элемент; получает все атрибуты `<div>`, переданные в `<Surface>`
- `<Header>` — заголовок
- `<Subheader>` — подзаголовок
- `<Content>` — содержимое
- `<Footer>` — нижняя часть

Используйте свойство `overrides`, чтобы переопределить один или несколько компонентов. Проще всего расширить стандартный компонент с помощью `styled`. Создавайте переопределения один раз — вне компонента, а не при рендере.

_Пример использования:_

```tsx
import React from 'react';
import styled from '@emotion/styled';
import Surface from '@via-profit/ui-kit/Surface';
import SurfaceHeader from '@via-profit/ui-kit/Surface/SurfaceHeader';

const Header = styled(SurfaceHeader)`
  padding-bottom: 1rem;
  border-bottom: 1px solid ${({ theme }) => theme.color.accentPrimary.alpha(0.4).toString()};
  color: ${({ theme }) => theme.color.accentPrimary.toString()};
`;

// Created once, outside of the component
const overrides = { Header };

const Example: React.FC = () => (
  <Surface header="Уведомления" overrides={overrides}>
    Новых уведомлений нет
  </Surface>
);

export default Example;
```

<ExampleSurfaceOverrides />

## Свойства

Помимо перечисленных ниже, `<Surface>` принимает [стандартные атрибуты](https://developer.mozilla.org/ru/docs/Web/HTML/Element/div#атрибуты) элемента `<div>` и передаёт их в `<Container>`. `ref` указывает на этот же элемент.

### `children`
Содержимое поверхности.
- Тип: `React.ReactNode`
- Обязательное: **да**

### `header`
Заголовок карточки.
- Тип: `JSX.Element | string`
- По умолчанию: `undefined`
- Обязательное: нет

### `subheader`
Подзаголовок карточки. Показывается под `header`.
- Тип: `JSX.Element | string`
- По умолчанию: `undefined`
- Обязательное: нет

### `footer`
Нижняя часть карточки, элементы прижаты вправо.
- Тип: `JSX.Element | string`
- По умолчанию: `undefined`
- Обязательное: нет

### `inline`
Если `true`, поверхность занимает ширину содержимого (`inline-flex`), иначе — всю ширину родителя (`flex`).
- Тип: `boolean`
- По умолчанию: `false`
- Обязательное: нет

### `noPadding`
Если `true`, у заголовка, содержимого и нижней части нет внутренних отступов.
- Тип: `boolean`
- По умолчанию: `false`
- Обязательное: нет

### `rounded`
Если `true`, поверхность круглая, а содержимое выровнено по центру.
- Тип: `boolean`
- По умолчанию: `false`
- Обязательное: нет

### `overrides`
Объект для переопределения составных компонентов. Подробнее в разделе [Переопределение](#переопределение).
- Тип: `SurfaceOverrides`
- По умолчанию: `undefined`
- Обязательное: нет
