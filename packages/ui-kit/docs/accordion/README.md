# Поверхность

## Содержание

- [Описание](#описание)
- [Группа](#группа)
- [Контролируемый](#контролируемый)
- [Переопределение](#переопределение)
- [Свойства](#свойства)

## Описание

Компонент `<Accordion>` создаёт панель для размещения контента, которую можно свернуть и развернуть.

_Пример использования:_

```tsx
import React from 'react';
import Accordion from '@via-profit/ui-kit/src/Accordion';
import Flag from '@via-profit/ui-kit/src/CountryFlags/RU';
import Button from '@via-profit/ui-kit/src/Button';

const ExampleAccordionBasic: React.FC = () => (
  <Accordion
    header={
      <>
        <Flag /> Russian Federation
      </>
    }
    actions={
      <Button type="button" variant="outlined" color="primary">
        Action button
      </Button>
    }
  >
    Some content
  </Accordion>
);

export default ExampleAccordionBasic;
```

<ExampleAccordionBasic />

<br/>

Компонент принимает свойства:

- `header` — Принимает заголовок аккордеона
- `actions` — Принимает компонент подвала, как правило используется для передачи кнопок дейсвтий
- `children` — Контент аккордеона
- `noPadding` — Если передан, то компонент отменяет отступы по умолчанию для контента
- `isOpen` — Если передан `true`, то состояние аккордеона становится развернутым
- `onOpen` — Функция, которая позволяет контролировать состояние компонента. Если функция передана, то она выполнится вместо функции разворачивания аккордеона по умолчанию

## Группа

Компоненты `<Accordion>`, следуюшие друг за другом, автоматически объединяются в группу

_Пример использования:_

```tsx
import React from 'react';
import Accordion from '@via-profit/ui-kit/src/Accordion';
import Typography from '@via-profit/ui-kit/src/Typography';
import Flag from '@via-profit/ui-kit/src/CountryFlags/RU';
import BYFlag from '@via-profit/ui-kit/src/CountryFlags/BY';
import UZFlag from '@via-profit/ui-kit/src/CountryFlags/UZ';
import Button from '@via-profit/ui-kit/src/Button';

const Example: React.FC = () => (
  <>
    <Accordion
      header={
        <>
          <Flag /> Russian Federation
        </>
      }
      actions={
        <Button type="button" variant="outlined" color="primary">
          Action button
        </Button>
      }
    >
      <Typography>The Russian Federation</Typography>
    </Accordion>

    <Accordion
      header={
        <>
          <UZFlag /> Uzbekistan
        </>
      }
      isOpen
      actions={
        <Button type="button" variant="outlined" color="primary">
          Action button
        </Button>
      }
    >
      <Typography>The Uzbekistan</Typography>
    </Accordion>

    <Accordion
      header={
        <>
          <BYFlag /> Belarus
        </>
      }
    >
      <Typography>The Belarus</Typography>
    </Accordion>
  </>
);

export default Example;
```

<ExampleAccordionMultiple />

## Контролируемый

Вы можете контролировать компоненты `<Accordion>`, с помощью состояния `isOpen` и функции `onOpen`

_Пример использования:_

```tsx
import React from 'react';
import Accordion from '@via-profit/ui-kit/src/Accordion';
import Typography from '@via-profit/ui-kit/src/Typography';
import Flag from '@via-profit/ui-kit/src/CountryFlags/RU';
import BYFlag from '@via-profit/ui-kit/src/CountryFlags/BY';
import UZFlag from '@via-profit/ui-kit/src/CountryFlags/UZ';
import Button from '@via-profit/ui-kit/src/Button';

const ExampleAccordionControlled: React.FC = () => {
  const [open, setOpen] = React.useState<string | null>(null);

  const items = ['one', 'two', 'three'];

  return (
    <>
      <Button
        variant="outlined"
        onClick={() => {
          setOpen(items[Math.floor(Math.random() * items.length)]);
        }}
      >
        Open Random
      </Button>
      <Accordion
        header={
          <>
            <Flag /> Russian Federation
          </>
        }
        isOpen={open === 'one'}
        onOpen={() => setOpen(open !== 'one' ? 'one' : null)}
      >
        <Typography>The Russian Federation</Typography>
      </Accordion>

      <Accordion
        header={
          <>
            <UZFlag /> Uzbekistan
          </>
        }
        isOpen={open === 'two'}
        onOpen={() => setOpen(open !== 'two' ? 'two' : null)}
      >
        <Typography>The Uzbekistan</Typography>
      </Accordion>

      <Accordion
        header={
          <>
            <BYFlag /> Belarus
          </>
        }
        isOpen={open === 'three'}
        onOpen={() => setOpen(open !== 'three' ? 'three' : null)}
      >
        <Typography>The Belarus</Typography>
      </Accordion>
    </>
  );
};

export default ExampleAccordionControlled;
```

<ExampleAccordionControlled />

## Переопределение

Компонент `<Accordion>` является составным и реализован при помощи следующих компонентов:

- `<Container>` — Обёртка
- `<Header>` — Обёртка заголовка в случае её отображения
- `<Content>` — Обёртка контентной части
- `<Actions>` — Обертка кнопок действия аккордеона

Используйте свойство `overrides` чтобы переопределить один или несколько компонентов:

_Пример использования:_

```tsx
import React from 'react';
import Accordion from '@via-profit/ui-kit/src/Accordion';
import AccordionContent from '@via-profit/ui-kit/src/Accordion/AccordionContent';
import AccordionHeader from '@via-profit/ui-kit/src/Accordion/AccordionHeader';
import styled from '@emotion/styled';

const StyledContent = styled(AccordionContent)`
  font-weight: 600;
  border-radius: 0.4em;
  background-color: ${({ theme }) => theme.color.accentPrimary.toString()};
  color: ${({ theme }) => theme.color.accentPrimaryContrast.toString()};
`;

const StyledHeader = styled(AccordionHeader)`
  font-weight: 600;
  border-radius: 0.4em;
  padding: 1em;
  background-color: ${({ theme }) => theme.color.accentSecondary.toString()};
  color: ${({ theme }) => theme.color.accentSecondaryContrast.toString()};
`;

const ExampleAccordionOverrides: React.FC = () => (
  <>
    <Accordion
      header={<>Overrided</>}
      overrides={{
        Content: React.forwardRef(function Content(props, ref) {
          const { children } = props;

          return (
            <StyledContent ref={ref} {...props}>
              {children}
            </StyledContent>
          );
        }),
        Header: React.forwardRef(function Header(props, ref) {
          const { children } = props;

          return (
            <StyledHeader ref={ref} {...props}>
              {children}
            </StyledHeader>
          );
        }),
      }}
    >
      Overrided
    </Accordion>
  </>
);

export default ExampleAccordionOverrides;
```

<ExampleAccordionOverrides />

## Свойства

Помимо перечисленных свойств, компонент принимает [стандартные аттрибуты](https://developer.mozilla.org/ru/docs/Web/HTML/Element/div#атрибуты) HTML элемента `<div>`

| Свойство                 | Тип                        | По умолчанию           | Описание                                                               |
| ------------------------ | :------------------------- | :--------------------- | ---------------------------------------------------------------------- |
| **header**               | `<JSX.Element>` `<String>` | `undefined`            | Элемент заголовка                                                      |
| **actions**              | `<JSX.Element>` `<String>` | `undefined`            | Элемент кнпок действия                                                 |
| **noPadding**       | `boolean`                  | `undefined`            | Отключение отсутпов контента от краев блока по умочланию               |
| **defaultOpened**        | `boolean`                  | `undefined`            | Состояние аккордеона по умолчанию                                      |
| **isOpen**               | `boolean`                  | `undefined`            | Состояние аккордеона. открыт или нет                                   |
| **onOpen**               | `function`                 | `undefined`            | Функция контроля состояния аккордеона                                  |
| **children**             | `<JSX.Element>` `<String>` |                        | Содержимое                                                             |
| **overrides**            | `Object`                   | `undefined`            | Объект элементов для переопределения составных компонентов поверхности |
| **overrides .Container** | `<React.Component>`        | `<AccordionContainer>` | Компонент обёртка                                                      |
| **overrides .Header**    | `<React.Component>`        | `<AccordionHeader>`    | Компонент обёртка заголовка в случае её отображения                    |
| **overrides .Content**   | `<React.Component>`        | `<AccordionContent>`   | Компонент обёртка контентной части                                     |
| **overrides .Actions**   | `<React.Component>`        | `<AccordionFooter>`    | Компонент обертка кнопок действия                                      |
