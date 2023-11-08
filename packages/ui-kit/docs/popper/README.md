# Popper

## Содержание

- [Описание](#описание)
- [Позиция](#позиция)
- [Всплывающая подсказка](#всплывающая-подсказка)
- [Переопределение](#переопределение)
- [Свойства](#свойства)

## Описание

Компонент `<Popper>` позволяет создавать всплывающие (dropdown) элементы меню, которые могут или должны быть привязаны к какому-либо компоненту, например, всплывающая подсказка, которая тображается рядом с кнопкой.

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
        Toggle popper
      </Button>

      <Popper anchorElement={anchorElement} isOpen={Boolean(anchorElement)}>
        <Surface>Popper Content</Surface>
      </Popper>
    </>
  );
};

export default Example;
```

<ExamplePopperOverview />

## Позиция

Компонент принимает свойство `anchorPos`, которое регулирует позиционирование элемента отностительно его анкора и может принимать следующие значения:

- **auto** — Автоматическое позиционирование. Автоматически меняет позицию при прокрутке окна и/или прокрутке страницы.
- **auto-start-end** — Автоматическое позиционирование, но растягивая элемент на всю ширину анкора. Автоматически меняет позицию при прокрутке окна и/или прокрутке страницы.
- **top-start** — Помещает элемент относительно левого верхнего угла своего анкора
- **top-end** — Помещает элемент относительно правого верхнего угла своего анкора
- **top** — Помещает элемент по верхней грани относительно своего анкора
- **bottom** — Помещает элемент по нижней грани относительно своего анкора
- **top-start-end** — Помещает элемент по верхней грани своего анкора растягивая его на всю ширину
- **bottom-start-end** — Помещает элемент по нижней грани своего анкора растягивая его на всю ширину
- **bottom-start** — Помещает элемент относительно левого нижнего угла своего анкора
- **bottom-end** — Помещает элемент относительно правого нижнего угла своего анкора
- **static** — Размещает элемент следом за анкором используя `position: static;`

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
      <Popper anchorPos="auto" anchorElement={anchorElement} isOpen={Boolean(anchorElement)}>
        <Surface>Popper Content</Surface>
      </Popper>
    </>
  );
};

export default Example;
```

<ExamplePopperAnchorPos />

## Всплывающая подсказка

С помощью Popper возможно реализовать функционал всплывающей подсказки, которая появляется, к примеру, по клику на кнопку:

_Пример использования:_

```tsx
import React from 'react';
import Button from '@via-profit/ui-kit/Button';
import Popper from '@via-profit/ui-kit/Popper';
import Surface from '@via-profit/ui-kit/Surface';
import ClickOutside from '@via-profit/ui-kit/ClickOutside';
import { FormattedMessage } from 'react-intl';

const Example: React.FC = () => {
  const [anchorElement, setAnchorElement] = React.useState<HTMLButtonElement | null>(null);

  return (
    <StyledAnchorContainer>
      <ClickOutside onOutsideClick={() => setAnchorElement(null)}>
        <div>
          <Button onClick={event => setAnchorElement(anchorElement ? null : event.currentTarget)}>
            Открыть/Закрыть Popper
          </Button>

          <Popper
            anchorPos="auto"
            anchorElement={anchorElement}
            isOpen={Boolean(anchorElement)}
          >
            <Surface>Какой-то контент</Surface>
          </Popper>
        </div>
      </ClickOutside>
    </StyledAnchorContainer>
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

const ExamplePopperOverrides: React.FC = () => {
  const [anchorElement, setAnchorElement] = React.useState<HTMLButtonElement | null>(null);

  return (
    <>
      <StyledAnchorContainer>
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
                  }}
                  ref={ref}
                />
              );
            }),
          }}
        >
          <Surface>
            <FormattedMessage defaultMessage="Какой-либо контент" />
          </Surface>
        </Popper>
      </StyledAnchorContainer>
    </>
  );
};

export default ExamplePopperOverrides;
```

## Свойства

| Свойство                 | Обязателен | Тип                                                                                                                                                                                          | По умолчанию         | Описание                                                                                                                                                                                      |
| ------------------------ | :--------: | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **isOpen**               |     \*     | `boolean`                                                                                                                                                                                    |                      | Определяет является ли компонент открытым (видимым)                                                                                                                                           |
| **anchorElement**        |            | `HTMLElement` `null`                                                                                                                                                                         |                      | Анкор. HTML-эелмент или `null`. Позиционирование будет выполняться относительно этого элемента. В случае, если свойство `anchorPos` установлено в `static`, данный пропс будет проигнорирован |
| **anchorPos**            |            | <br />`auto`<br />`auto-start-end`<br />`top-start`<br />`top-end`<br />`top`<br />`bottom`<br />`top-start-end`<br />`bottom-start-end`<br />`bottom-start`<br />`bottom-end`<br />`static` | `auto`               | Вариант позиционирования относитльено анкора.                                                                                                                                                 |
| **zIndex**               |            | `number`                                                                                                                                                                                     | `theme.zIndex.modal` | Перманентное указание свойства `z-index` для элемента.                                                          |
| **overrides**            |            | `Object`                                                                                                                                                                                     | `undefined`          | Объект элементов для переопределения составных компонентов Popper                                                                                                                             |
| **overrides .Container** |            | `<React.Component>`                                                                                                                                                                          | `<ButtonContainer>`  | Компонент нативного `<div>`, который является контейнером                                                                                                                                     |
