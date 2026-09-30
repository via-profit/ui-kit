# Индикатор загрузки

## Содержание

- [Описание](#описание)
- [Spinner](#spinner)
- [Спиннер в кнопке](#спиннер-в-кнопке)
- [LoadingOverlay](#loadingoverlay)
- [Доступность](#доступность)
- [Переход с прежних имён](#переход-с-прежних-имён)
- [Свойства](#свойства)

## Описание

Индикатор загрузки — вращающийся круг цвета акцента темы. Модуль `@via-profit/ui-kit/LoadingIndicator` содержит два компонента:

- **`Spinner`** (экспорт по умолчанию) — спиннер, который занимает место в разметке, как обычный элемент. Используйте его в большинстве случаев: в кнопках, полях, списках, на месте ещё не загруженного содержимого. Его показывают [`<Selectbox>`](../selectbox/README.md) и [`<Autocomplete>`](../autocomplete/README.md) при `isLoading`;
- **`LoadingOverlay`** — слой поверх блока: растягивается на ближайшего родителя с `position: relative` (или `absolute`, `fixed`) и ставит спиннер в его центр.

```tsx
import Spinner, { LoadingOverlay } from '@via-profit/ui-kit/LoadingIndicator';
```

## Spinner

Свойство `size` задаёт диаметр спиннера: число — в пикселях, строка — в любых единицах CSS (`'1em'`, `'3rem'`). По умолчанию `'2.4em'`, то есть размер зависит от размера шрифта родителя. Толщина кольца меняется вместе с размером.

По умолчанию спиннер растягивается на всю свободную высоту и ширину родителя-флексбокса и встаёт в центр — например, чтобы занять место пустого списка. Если спиннер стоит в строке рядом с другими элементами, передайте `fill={false}`: тогда он займёт ровно свой размер.

_Пример использования:_

```tsx
import React from 'react';
import Spinner from '@via-profit/ui-kit/LoadingIndicator';

const Example: React.FC = () => (
  <>
    <Spinner size={16} fill={false} />
    <Spinner size="1.5em" fill={false} />
    <Spinner fill={false} />
    <Spinner size="4em" fill={false} />
  </>
);

export default Example;
```

<ExampleLoadingIndicatorStatic />

## Спиннер в кнопке

Спиннер можно передать в `startIcon` или `endIcon` кнопки. Размер `1.2em` соответствует размеру иконки, а `fill={false}` не даёт спиннеру растягиваться. Пока идёт загрузка, отключите кнопку, чтобы её не нажали повторно.

_Пример использования:_

```tsx
import React from 'react';
import Button from '@via-profit/ui-kit/Button';
import Spinner from '@via-profit/ui-kit/LoadingIndicator';

const Example: React.FC = () => {
  const [isSaving, setIsSaving] = React.useState(false);

  return (
    <Button
      color="primary"
      disabled={isSaving}
      startIcon={isSaving ? <Spinner size="1.2em" fill={false} /> : undefined}
      onClick={() => save().finally(() => setIsSaving(false))}
    >
      {isSaving ? 'Сохранение…' : 'Сохранить'}
    </Button>
  );
};

export default Example;
```

<ExampleLoadingIndicatorButton />

## LoadingOverlay

`LoadingOverlay` закрывает блок, пока его содержимое обновляется. У родителя должно быть `position: relative`, иначе слой растянется на весь ближайший позиционированный элемент — вплоть до всей страницы.

Сам слой прозрачный: содержимое под ним остаётся видно, но нажать на него нельзя — слой перехватывает клики. Чтобы приглушить содержимое, задайте слою фон.

_Пример использования:_

```tsx
import React from 'react';
import styled from '@emotion/styled';
import { LoadingOverlay } from '@via-profit/ui-kit/LoadingIndicator';
import Surface from '@via-profit/ui-kit/Surface';

const Block = styled.div`
  position: relative;
`;

const Overlay = styled(LoadingOverlay)`
  border-radius: inherit;
  background-color: ${({ theme }) => theme.color.surface.alpha(0.7).toString()};
`;

const Example: React.FC<{ readonly isLoading: boolean }> = ({ isLoading }) => (
  <Block>
    <Surface header="Отчёт за месяц">Выручка выросла на 12%, количество заказов — на 8%.</Surface>
    {isLoading && <Overlay />}
  </Block>
);

export default Example;
```

<ExampleLoadingIndicatorOverlay />

## Доступность

Оба компонента имеют роль `status` и подпись `aria-label="Loading"`, поэтому программы чтения с экрана сообщают о загрузке. Чтобы заменить подпись, передайте свою: `<Spinner aria-label="Загрузка списка" />`.

## Переход с прежних имён

Раньше компоненты назывались иначе, а экспортом по умолчанию был слой поверх блока:

| Было | Стало |
|------|-------|
| `import LoadingIndicator from '@via-profit/ui-kit/LoadingIndicator'` | `import { LoadingOverlay } from '@via-profit/ui-kit/LoadingIndicator'` |
| `import { LoadingIndicator } from '@via-profit/ui-kit/LoadingIndicator'` | `import { LoadingOverlay } from '@via-profit/ui-kit/LoadingIndicator'` |
| `import { StaticLoadingIndicator } from '@via-profit/ui-kit/LoadingIndicator'` | `import Spinner from '@via-profit/ui-kit/LoadingIndicator'` |
| `import LoadingIndicator from '@via-profit/ui-kit/LoadingIndicator/Spinner'` | `import LoadingOverlay from '@via-profit/ui-kit/LoadingIndicator/LoadingOverlay'` |

**Экспорт по умолчанию изменился:** теперь это `Spinner`. Если в коде есть `import LoadingIndicator from '@via-profit/ui-kit/LoadingIndicator'` (или из `…/LoadingIndicator/Spinner`), он без ошибок компиляции начнёт показывать строчный спиннер вместо слоя — замените такие импорты на `LoadingOverlay`.

Именованные `LoadingIndicator` и `StaticLoadingIndicator` (а также типы `LoadingIndicatorProps` и `StaticLoadingIndicatorProps`) пока работают как раньше, но помечены устаревшими и будут удалены в одной из следующих версий.

## Свойства

Оба компонента принимают [стандартные атрибуты](https://developer.mozilla.org/ru/docs/Web/HTML/Global_attributes) HTML-элемента (`className`, `style`, `aria-label` и другие) и передают их корневому элементу: `<span>` у `Spinner` и `<div>` у `LoadingOverlay`. `ref` указывает на этот же элемент.

Цвета берутся из темы: `theme.color.accentPrimary` для вращающейся части и `theme.color.surface` для кольца.

### `size`
Диаметр спиннера. Число — в пикселях, строка — в любых единицах CSS. Есть у обоих компонентов.
- Тип: `number | string`
- По умолчанию: `'2.4em'`
- Обязательное: нет

### `fill`
Только у `Spinner`. Если `true`, спиннер занимает всё свободное место родителя-флексбокса и встаёт в центр. Если `false`, занимает только свой размер и выравнивается по строке.
- Тип: `boolean`
- По умолчанию: `true`
- Обязательное: нет
