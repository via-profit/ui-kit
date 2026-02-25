# Popper

## Содержание

- [Описание](#описание)
- [Позиция](#позиция)
- [Автоматическое позиционирование](#автоматическое-позиционирование)
- [Всплывающая подсказка](#всплывающая-подсказка)
- [Переопределение](#переопределение)
- [Свойства](#свойства)

## Описание

Компонент `<Popper>` позволяет создавать всплывающие (dropdown) элементы меню, которые могут или должны быть привязаны к какому-либо компоненту, например, всплывающая подсказка, которая отображается рядом с кнопкой.

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
        Открыть Popper
      </Button>

      <Popper anchorElement={anchorElement} isOpen={Boolean(anchorElement)}>
        <Surface>Popper контент</Surface>
      </Popper>
    </>
  );
};

export default Example;
```

<ExamplePopperOverview />

## Позиция

Компонент принимает свойство `anchorPos`, которое регулирует позиционирование элемента относительно его анкора. Все позиции можно разделить на несколько категорий:

### Основные направления

- **`top`** — По центру сверху
- **`bottom`** — По центру снизу (значение по умолчанию)
- **`left`** — По центру слева
- **`right`** — По центру справа

### Позиции с привязкой к углам

- **`top-left`**, **`top-right`** — Сверху, прижато к левому/правому краю
- **`bottom-left`**, **`bottom-right`** — Снизу, прижато к левому/правому краю
- **`left-top`**, **`left-bottom`** — Слева, прижато к верхнему/нижнему краю
- **`right-top`**, **`right-bottom`** — Справа, прижато к верхнему/нижнему краю

### Позиции с выравниванием (Popper.js стиль)

- **`top-start`**, **`top-end`** — Сверху, выравнивание по началу/концу (аналогично top-left/top-right)
- **`bottom-start`**, **`bottom-end`** — Снизу, выравнивание по началу/концу (аналогично bottom-left/bottom-right)

### Автоматическое позиционирование

- **`auto`** — Автоматический выбор оптимального направления
- **`auto-top`**, **`auto-bottom`**, **`auto-left`**, **`auto-right`** — Автоматический выбор с приоритетом указанного направления

### Таблица всех доступных позиций

| Категория | Значения |
|-----------|----------|
| **Верх** | `top`, `top-left`, `top-right`, `top-start`, `top-end` |
| **Низ** | `bottom`, `bottom-left`, `bottom-right`, `bottom-start`, `bottom-end` |
| **Лево** | `left`, `left-top`, `left-bottom` |
| **Право** | `right`, `right-top`, `right-bottom` |
| **Авто** | `auto`, `auto-top`, `auto-bottom`, `auto-left`, `auto-right` |

_Пример использования различных позиций:_

```tsx
import React from 'react';
import Popper from '@via-profit/ui-kit/Popper';
import Button from '@via-profit/ui-kit/Button';
import Surface from '@via-profit/ui-kit/Surface';

const Example: React.FC = () => {
  const [anchorElement, setAnchorElement] = React.useState<HTMLButtonElement | null>(null);
  const [placement, setPlacement] = React.useState<AnchorPos>('bottom');

  return (
    <>
      <Button onClick={event => setAnchorElement(event.currentTarget)}>
        Открыть Popper
      </Button>

      <Popper
        anchorPos={placement}
        anchorElement={anchorElement}
        isOpen={Boolean(anchorElement)}
      >
        <Surface>
          Текущая позиция: {placement}
        </Surface>
      </Popper>
    </>
  );
};

export default Example;
```

<ExamplePopperAnchorPos />

## Автоматическое позиционирование

Свойство `autoFlip` позволяет автоматически изменять позицию popover'а, если он не помещается в видимой области экрана. При установке `autoFlip={true}` (значение по умолчанию), компонент будет пробовать различные варианты позиционирования, пока не найдет подходящий.

Порядок перебора позиций зависит от исходной позиции:
- Для `top` сначала пробуются все вариации сверху, затем снизу, затем по бокам
- Для `bottom` сначала пробуются все вариации снизу, затем сверху, затем по бокам
- И так далее для каждой позиции

_Пример с автоматическим переворотом:_

```tsx
import React from 'react';
import Popper from '@via-profit/ui-kit/Popper';
import Button from '@via-profit/ui-kit/Button';
import Surface from '@via-profit/ui-kit/Surface';

const Example: React.FC = () => {
  const [anchorElement, setAnchorElement] = React.useState<HTMLButtonElement | null>(null);

  return (
    <>
      <Button onClick={event => setAnchorElement(event.currentTarget)}>
        Открыть Popper
      </Button>

      <Popper
        anchorPos="top"
        autoFlip={true}
        anchorElement={anchorElement}
        isOpen={Boolean(anchorElement)}
      >
        <Surface>
          Если не помещусь сверху, автоматически перевернусь
        </Surface>
      </Popper>
    </>
  );
};
```

## Всплывающая подсказка

С помощью Popper возможно реализовать функционал всплывающей подсказки, которая появляется, к примеру, по клику на кнопку:

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
        Открыть Popper
      </Button>

      <ClickOutside onOutsideClick={() => setAnchorElement(null)}>
        <Popper
          anchorPos="auto"
          anchorElement={anchorElement}
          isOpen={Boolean(anchorElement)}
        >
          <Surface>Какой-то контент</Surface>
        </Popper>
      </ClickOutside>
    </>
  );
};

export default Example;
```

<ExamplePopperOutsideClick />

## Переопределение

Компонент `<Popper>` является составным и реализован при помощи следующих компонентов:

- `<Container>` — Компонент нативного элемента `<div>`

Используйте свойство `overrides` чтобы переопределить один или несколько компонентов:

_Пример использования:_

```tsx
import React from 'react';
import Button from '@via-profit/ui-kit/Button';
import Popper from '@via-profit/ui-kit/Popper';
import Surface from '@via-profit/ui-kit/Surface';

const Example: React.FC = () => {
  const [anchorElement, setAnchorElement] = React.useState<HTMLButtonElement | null>(null);

  return (
    <>
      <Button onClick={event => setAnchorElement(event.currentTarget)}>
        Открыть Popper
      </Button>

      <Popper
        anchorElement={anchorElement}
        isOpen={Boolean(anchorElement)}
        overrides={{
          Container: React.forwardRef(function Override(props, ref) {
            return (
              <div
                {...props}
                style={{
                  ...props.style,
                  backgroundColor: 'rgba(208, 255, 0, 0.5)',
                  borderRadius: '8px',
                  padding: '4px',
                }}
                ref={ref}
              />
            );
          }),
        }}
      >
        <Surface>
          Кастомный контейнер с фоном
        </Surface>
      </Popper>
    </>
  );
};

export default Example;
```

## Свойства

| Свойство                 | Обязателен | Тип                                                                                                                                                                                          | По умолчанию         | Описание                                                                                                                                                                                      |
| ------------------------ | :--------: | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **isOpen**               |     \*     | `boolean`                                                                                                                                                                                    |                      | Определяет является ли компонент открытым (видимым)                                                                                                                                           |
| **anchorElement**        |            | `HTMLElement` \| `null`                                                                                                                                                                      |                      | Анкор. HTML-элемент или `null`. Позиционирование будет выполняться относительно этого элемента                                                                                                |
| **anchorPos**            |            | `AnchorPos`                                                                                                                                                                                  | `'bottom'`           | Вариант позиционирования относительно анкора. Подробнее в разделе [Позиция](#позиция)                                                                                                        |
| **autoFlip**             |            | `boolean`                                                                                                                                                                                    | `true`               | Автоматически изменять позицию, если элемент не помещается в видимой области                                                                                                                  |
| **offset**               |            | `number`                                                                                                                                                                                     | `0`                  | Дополнительное смещение от анкора в пикселях                                                                                                                                                  |
| **zIndex**               |            | `number`                                                                                                                                                                                     | `theme.zIndex.modal` | Перманентное указание свойства `z-index` для элемента                                                                                                                                         |
| **positionStrategy**     |            | `'absolute'` \| `'fixed'`                                                                                                                                                                    | `'absolute'`         | Стратегия позиционирования: `absolute` - относительно документа, `fixed` - относительно окна                                                                                                  |
| **overrides**            |            | `Object`                                                                                                                                                                                     | `undefined`          | Объект элементов для переопределения составных компонентов Popper                                                                                                                             |
| **overrides.Container**  |            | `React.ComponentType<PopperContainerProps & React.RefAttributes<HTMLDivElement>>`                                                                                                            | `PopperContainer`    | Компонент нативного `<div>`, который является контейнером                                                                                                                                     |

### Тип AnchorPos

```typescript
type AnchorPos =
  | 'top' | 'top-left' | 'top-right' | 'top-start' | 'top-end'
  | 'bottom' | 'bottom-left' | 'bottom-right' | 'bottom-start' | 'bottom-end'
  | 'left' | 'left-top' | 'left-bottom'
  | 'right' | 'right-top' | 'right-bottom'
  | 'auto' | 'auto-top' | 'auto-bottom' | 'auto-left' | 'auto-right';
```

## Особенности работы

**Портал**: Popper рендерится в портале с ID `ui-kit-portal`, что гарантирует правильное наложение поверх других элементов
