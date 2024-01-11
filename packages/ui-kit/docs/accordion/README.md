# Поверхность

## Содержание

- [Описание](#описание)
- [Переопределение](#переопределение)
- [Свойства](#свойства)

## Описание

Компонент `<Accordion>` создаёт поверхность для размещения каких-либо элементов.

_Пример использования:_

```tsx
import React from 'react';
import Accordion from '@via-profit/ui-kit/Accordion';

const Example: React.FC = () => {
  return <Accordion>Some content</Accordion>;
};

export default Example;
```

<ExampleAccordionBasic />

Компонент принимает свойства, позволяющие отображать его в виде карточки:

- `header` — Принимает заголовок карточки
- `subheader` — Принимает подзаголовок карточки
- `footer` — Принимает футер карточки
- `inline` — Отображает карточку инлайново

_Пример использования:_

```tsx
import React from 'react';
import Accordion from '@via-profit/ui-kit/Accordion';

const Example: React.FC = () => {
  return (
    <Accordion
      inline
      subheader="Yekaterinburg"
      header={
        <>
          <Flag /> Russian Federation
        </>
      }
      footer={
        <Button type="button" variant="outlined" color="primary">
          Action button
        </Button>
      }
    >
      <Typography>
        Russia, or the Russian Federation, is a country spanning Eastern Europe and Northern Asia.
        It is the largest country in the world by area, extends across eleven time zones, and shares
        land boundaries with fourteen countries. It is the world's ninth-most populous country and
        Europe's most populous country. The country's capital and largest city is Moscow. Saint
        Petersburg is Russia's second-largest city and "cultural capital". Other major urban areas
        in the country include Novosibirsk, Yekaterinburg, Nizhny Novgorod, Chelyabinsk,
        Krasnoyarsk, and Kazan.
      </Typography>
    </Accordion>
  );
};

export default Example;
```

<ExampleAccordionCard />

## Переопределение

Компонент `<Accordion>` является составным и реализован при помощи следующих компонентов:

- `<Container>` — Обёртка
- `<Header>` — Обёртка заголовка в случае её отображения
- `<Subheader>` — Обёртка подзаголовка в случае её отображения
- `<Content>` — Обёртка контентной части
- `<Footer>` — Футер

Используйте свойство `overrides` чтобы переопределить один или несколько компонентов:

_Пример использования:_

```tsx
import React from 'react';
import Accordion from '@via-profit/ui-kit/Accordion';

const Example: React.FC = () => (
  <Accordion
    inline
    overrides={{
      // Перезаписываем Content.
      // Обратите внимание, что здесь прокидывается ref, однако
      // прокинуть ref можно и при объявлении компонента, главное не забыть
      Content: React.forwardRef(function Content(props, ref) {
        const { children } = props;

        return <div style={{...}} ref={ref}>{children}</span>;
      }),
    }}
  >
    Overrided
  </Accordion>
);

export default Example;
```

<ExampleAccordionOverrides />

## Свойства

Помимо перечисленных свойств, компонент принимает [стандартные аттрибуты](https://developer.mozilla.org/ru/docs/Web/HTML/Element/div#атрибуты) HTML элемента `<div>`

| Свойство                 | Тип                        | По умолчанию         | Описание                                                                                 |
| ------------------------ | :------------------------- | :------------------- | ---------------------------------------------------------------------------------------- |
| **inline**               | `boolean`                  | `false`              | Если `true`, то элемент примет вид `inline-flex` контейнера и `flex` в противном случае. |
| **header**               | `<JSX.Element>` `<String>` | `undefined`          | Элемент заголовка                                                                        |
| **subheader**            | `<JSX.Element>` `<String>` | `undefined`          | Элемент подзаголовка                                                                     |
| **children**             | `<JSX.Element>` `<String>` |                      | Содержимое                                                                               |
| **overrides**            | `Object`                   | `undefined`          | Объект элементов для переопределения составных компонентов поверхности                   |
| **overrides .Container** | `<React.Component>`        | `<AccordionContainer>` | Компонент обёртка                                                                        |
| **overrides .Header**    | `<React.Component>`        | `<AccordionHeader>`    | Компонент обёртка заголовка в случае её отображения                                      |
| **overrides .Subheader** | `<React.Component>`        | `<AccordionSubheader>` | Компонент обёртка подзаголовка в случае её отображения                                   |
| **overrides .Content**   | `<React.Component>`        | `<AccordionContent>`   | Компонент обёртка контентной части                                                       |
| **overrides .Footer**    | `<React.Component>`        | `<AccordionFooter>`    | Компонент футер                                                                          |
