# Popper

## Содержание

- [Описание](#описание)
- [Позиция](#позиция)
- [Автоматический выбор позиции](#автоматический-выбор-позиции)
- [Закрытие по клику снаружи](#закрытие-по-клику-снаружи)
- [Стратегия позиционирования](#стратегия-позиционирования)
- [Переопределение](#переопределение)
- [Свойства](#свойства)

## Описание

Компонент `<Popper>` отображает всплывающий элемент рядом с другим элементом страницы — анкором. На его основе построены `<Menu>`, `<Selectbox>`, `<Autocomplete>` и `<DatePicker>`. Используйте его для подсказок, всплывающих панелей и собственных выпадающих списков.

Popper только позиционирует содержимое: у него нет фона, тени и отступов, поэтому содержимое обычно оборачивают в `<Surface>`. Popper также не закрывается сам — видимостью управляет свойство `isOpen` (см. [Закрытие по клику снаружи](#закрытие-по-клику-снаружи)).

_Пример использования:_

```tsx
import React from 'react';
import Popper from '@via-profit/ui-kit/Popper';
import Button from '@via-profit/ui-kit/Button';
import Surface from '@via-profit/ui-kit/Surface';

const Example: React.FC = () => {
  const [anchorElement, setAnchorElement] = React.useState<HTMLButtonElement | null>(null);

  return (
    <>
      <Button
        color="primary"
        onClick={event => setAnchorElement(anchorElement ? null : event.currentTarget)}
      >
        {anchorElement ? 'Закрыть Popper' : 'Открыть Popper'}
      </Button>

      <Popper
        anchorElement={anchorElement}
        isOpen={Boolean(anchorElement)}
        anchorPos="bottom-start"
        offset={8}
      >
        <Surface>Содержимое Popper</Surface>
      </Popper>
    </>
  );
};

export default Example;
```

<ExamplePopperOverview />

## Позиция

Свойство `anchorPos` задаёт, с какой стороны от анкора появится Popper и как он выровнен по этой стороне. Значение по умолчанию — `auto` (без `autoFlip` оно работает как `bottom`, подробнее в разделе [Автоматический выбор позиции](#автоматический-выбор-позиции)).

| Сторона | Значения | Выравнивание |
|---------|----------|--------------|
| Сверху | `top`, `top-start`, `top-end`, `top-fill` | по центру, по левому краю, по правому краю, на всю ширину анкора |
| Снизу | `bottom`, `bottom-start`, `bottom-end`, `bottom-fill` | по центру, по левому краю, по правому краю, на всю ширину анкора |
| Слева | `left`, `left-top`, `left-bottom` | по центру, по верхнему краю, по нижнему краю |
| Справа | `right`, `right-top`, `right-bottom` | по центру, по верхнему краю, по нижнему краю |
| Авто | `auto`, `auto-top`, `auto-bottom`, `auto-left`, `auto-right` | см. [Автоматический выбор позиции](#автоматический-выбор-позиции) |

Значения `top-left`, `top-right`, `bottom-left` и `bottom-right` — синонимы `top-start`, `top-end`, `bottom-start` и `bottom-end`. Направление текста (RTL) не учитывается: `start` всегда означает левый край, `end` — правый.

Позиции `top-fill` и `bottom-fill` устанавливают ширину Popper равной ширине анкора. Так устроены выпадающие списки `<Selectbox>`.

Свойство `offset` задаёт расстояние между анкором и Popper в пикселях. Отрицательное значение заставит Popper наехать на анкор.

Выберите позицию, чтобы увидеть, как она работает:

<ExamplePopperAnchorPos />

## Автоматический выбор позиции

По умолчанию Popper всегда остаётся с указанной стороны от анкора, даже если не помещается в окне браузера. Со свойством `autoFlip` Popper перебирает позиции, пока не найдёт ту, в которой он целиком помещается в окне с учётом отступа `viewportMargin`:

- для явной позиции (например, `top-start`) сначала пробуется она сама, затем позиции из `alternativePlacements`, затем остальные позиции с той же стороны, затем с противоположной и, для верха и низа, по бокам;
- для `top-fill` и `bottom-fill` — сначала указанная позиция, затем противоположная `fill`-позиция, затем позиции из `alternativePlacements`;
- для `auto` перебираются все позиции, кроме `fill` (или только `alternativePlacements`, если они заданы). `auto` начинает перебор снизу, а `auto-top`, `auto-bottom`, `auto-left` и `auto-right` — с указанной стороны.

Если ни одна позиция не подошла, используется исходная (для `auto` — `bottom`, для `auto-top` — `top` и т. д.).

При `positionStrategy="fixed"` Popper, который не поместился, дополнительно сдвигается внутрь окна, чтобы не выходить за его края.

Без `autoFlip` значение `auto` работает как `bottom`, а `auto-top`, `auto-left` и т. д. — как `top`, `left` и т. д.

Позиция пересчитывается при прокрутке, изменении размеров окна, анкора и самого Popper. Чтобы узнать, какая позиция выбрана, используйте `onAnchorPosChanged`: он вызывается каждый раз, когда фактическая позиция меняется. Это пригодится, например, чтобы развернуть стрелку подсказки.

_Пример использования:_

```tsx
import React from 'react';
import Popper, { AnchorPos } from '@via-profit/ui-kit/Popper';
import Button from '@via-profit/ui-kit/Button';
import Surface from '@via-profit/ui-kit/Surface';

const Example: React.FC = () => {
  const [anchorElement, setAnchorElement] = React.useState<HTMLButtonElement | null>(null);
  const [placement, setPlacement] = React.useState<AnchorPos>('top');

  return (
    <>
      <Button onClick={event => setAnchorElement(anchorElement ? null : event.currentTarget)}>
        Открыть Popper
      </Button>

      <Popper
        anchorElement={anchorElement}
        isOpen={Boolean(anchorElement)}
        anchorPos="top"
        autoFlip
        offset={8}
        onAnchorPosChanged={setPlacement}
      >
        <Surface>Текущая позиция: {placement}</Surface>
      </Popper>
    </>
  );
};

export default Example;
```

Откройте Popper и прокрутите страницу так, чтобы кнопка оказалась у верхнего края окна — Popper переместится под кнопку:

<ExamplePopperAutoFlip />

## Закрытие по клику снаружи

Popper не отслеживает клики, поэтому закрывать его нужно самостоятельно. Удобнее всего обернуть его в `<ClickOutside>`.

Клик по самому анкору тоже происходит «снаружи» Popper. Если кнопка сама открывает и закрывает Popper, передайте её в свойство `ignoreElements` — иначе нажатие на кнопку сначала закроет Popper, а затем кнопка сразу откроет его снова.

_Пример использования:_

```tsx
import React from 'react';
import Button from '@via-profit/ui-kit/Button';
import Popper from '@via-profit/ui-kit/Popper';
import Surface from '@via-profit/ui-kit/Surface';
import ClickOutside from '@via-profit/ui-kit/ClickOutside';

const Example: React.FC = () => {
  const [anchorElement, setAnchorElement] = React.useState<HTMLButtonElement | null>(null);

  return (
    <>
      <Button onClick={event => setAnchorElement(anchorElement ? null : event.currentTarget)}>
        Что это?
      </Button>

      <ClickOutside ignoreElements={[anchorElement]} onOutsideClick={() => setAnchorElement(null)}>
        <Popper
          anchorElement={anchorElement}
          isOpen={Boolean(anchorElement)}
          anchorPos="right"
          autoFlip
          offset={8}
        >
          <Surface>Подсказка закроется по клику в любом месте страницы</Surface>
        </Popper>
      </ClickOutside>
    </>
  );
};

export default Example;
```

<ExamplePopperOutsideClick />

## Стратегия позиционирования

Свойство `positionStrategy` определяет, где и как отрисовывается Popper.

**`fixed`** (по умолчанию). Popper отрисовывается через портал в элемент `<div id="ui-kit-portal">` в конце `<body>` и позиционируется относительно окна браузера. Поэтому его не обрезают родители с `overflow: hidden` и он оказывается поверх остального содержимого — `z-index` по умолчанию равен `theme.zIndex.modal`. Popper не выходит за края окна: если он не помещается, то прижимается к краю с отступом `viewportMargin`.

**`absolute`**. Popper отрисовывается на месте, внутри родительского элемента, и позиционируется относительно ближайшего родителя с `position: relative` (или `absolute`, `fixed`). Такой Popper прокручивается вместе с родителем, но может быть обрезан родителем с `overflow: hidden`. `z-index` по умолчанию не задаётся, а к краям окна Popper не прижимается. Эта стратегия используется в примере с выбором позиции выше.

## Переопределение

Компонент `<Popper>` является составным и реализован при помощи следующих компонентов:

- `<Container>` — элемент `<div>`, внутри которого отрисовывается содержимое. Он получает стили позиционирования и все нативные свойства, переданные в `<Popper>`

Используйте свойство `overrides`, чтобы переопределить один или несколько компонентов. Переопределённый компонент должен передавать `ref` и `style` в корневой элемент, иначе Popper не сможет его измерить и спозиционировать. Проще всего обернуть стандартный `PopperContainer`: он сам применяет `zIndex` и `positionStrategy`.

_Пример использования:_

```tsx
import React from 'react';
import Button from '@via-profit/ui-kit/Button';
import Popper from '@via-profit/ui-kit/Popper';
import Surface from '@via-profit/ui-kit/Surface';
import PopperContainer, { PopperContainerProps } from '@via-profit/ui-kit/Popper/PopperContainer';

const Container = React.forwardRef<HTMLDivElement, PopperContainerProps>(
  function Container(props, ref) {
    return (
      <PopperContainer
        {...props}
        style={{
          ...props.style,
          filter: 'drop-shadow(0 4px 12px rgba(0, 0, 0, 0.2))',
        }}
        ref={ref}
      />
    );
  },
);

const Example: React.FC = () => {
  const [anchorElement, setAnchorElement] = React.useState<HTMLButtonElement | null>(null);

  return (
    <>
      <Button onClick={event => setAnchorElement(anchorElement ? null : event.currentTarget)}>
        Открыть Popper
      </Button>

      <Popper
        anchorElement={anchorElement}
        isOpen={Boolean(anchorElement)}
        overrides={{ Container }}
      >
        <Surface>Popper с тенью</Surface>
      </Popper>
    </>
  );
};

export default Example;
```

Кроме `style`, `Container` получает свойства `zIndex` и `positionStrategy`, а также атрибуты `data-popper-placement` (фактическая позиция) и `data-popper-strategy`. По атрибуту `data-popper-placement` удобно стилизовать Popper в зависимости от позиции без переопределения компонентов:

```css
[data-popper-placement^='top'] .arrow {
  bottom: -4px;
}
```

## Свойства

Помимо перечисленных ниже, `<Popper>` принимает нативные свойства элемента `<div>` (`className`, `style`, `onMouseEnter` и т. д.) и передаёт их в `<Container>`. `ref` указывает на этот же элемент.

### `isOpen`
Если `true`, Popper отображается. Если `false`, Popper не отрисовывается совсем.
- Тип: `boolean`
- Обязательное: **да**

### `anchorElement`
Элемент, рядом с которым отображается Popper. Пока значение `null`, Popper не отображается, даже если `isOpen` равен `true`.
- Тип: `HTMLElement | null`
- Обязательное: **да**

### `anchorPos`
Позиция относительно анкора. Подробнее в разделе [Позиция](#позиция).
- Тип: `AnchorPos`
- По умолчанию: `'auto'`
- Обязательное: нет

### `autoFlip`
Если `true`, Popper меняет позицию, когда не помещается в окне браузера. Подробнее в разделе [Автоматический выбор позиции](#автоматический-выбор-позиции).
- Тип: `boolean`
- По умолчанию: `false`
- Обязательное: нет

### `alternativePlacements`
Позиции, которые при `autoFlip` пробуются сразу после `anchorPos`, раньше остальных. Для `auto` это полный список перебираемых позиций. Для остальных значений `anchorPos` позиции `auto` и `*-fill` из этого списка игнорируются.
- Тип: `readonly AnchorPos[]`
- По умолчанию: `undefined`
- Обязательное: нет

### `onAnchorPosChanged`
Вызывается, когда меняется фактическая позиция Popper, например после переворота при `autoFlip`. Аргументом передаётся новая позиция.
- Тип: `(anchorPos: AnchorPos) => void`
- По умолчанию: `undefined`
- Обязательное: нет

### `offset`
Расстояние между анкором и Popper в пикселях. Отрицательное значение заставит Popper наехать на анкор.
- Тип: `number`
- По умолчанию: `0`
- Обязательное: нет

### `viewportMargin`
Минимальный отступ от краёв окна браузера в пикселях. Позиция, при которой Popper оказывается ближе к краю, считается неподходящей при `autoFlip`. При `positionStrategy="fixed"` Popper также сдвигается, чтобы соблюсти этот отступ.
- Тип: `number`
- По умолчанию: `30`
- Обязательное: нет

### `positionStrategy`
Стратегия позиционирования. Подробнее в разделе [Стратегия позиционирования](#стратегия-позиционирования).
- Тип: `'fixed' | 'absolute'`
- По умолчанию: `'fixed'`
- Обязательное: нет

### `zIndex`
Значение `z-index` контейнера.
- Тип: `number`
- По умолчанию: `theme.zIndex.modal` при `positionStrategy="fixed"`, иначе не задано
- Обязательное: нет

### `overrides`
Объект для переопределения составных компонентов Popper.
- Тип: `Object`
- По умолчанию: `undefined`
- Обязательное: нет

#### `overrides.Container`
Контейнер содержимого Popper.
- Тип: `React.ComponentType<PopperContainerProps & React.RefAttributes<HTMLDivElement>>`
- По умолчанию: `undefined`
- Обязательное: нет
