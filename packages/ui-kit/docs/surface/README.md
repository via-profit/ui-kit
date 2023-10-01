# Поверхность

## Содержание

- [Описание](#описание)
- [Переопределение](#переопределение)
- [Свойства](#свойства)

## Описание

Компонент `<Surface>` создаёт поверхность для размещения каких-либо элементов.

_Пример использования:_

```tsx
import React from 'react';
import Surface from '@via-profit/ui-kit/Surface';

const Example: React.FC = () => {
  return <Surface>Some content</Surface>;
};

export default Example;
```

<ExampleSurfaceBasic />

Компонент принимает свойства, позволяющие отображать его в виде карточки:

- `header` — Принимает заголовок карточки
- `subheader` — Принимает подзаголовок карточки
- `inline` — Отображает карточку инлайново

_Пример использования:_

```tsx
import React from 'react';
import Surface from '@via-profit/ui-kit/Surface';

const Example: React.FC = () => {
  return (
    <Surface
      inline
      subheader="Yekaterinburg"
      header={
        <>
          <Flag /> Russian Federation
        </>
      }
    >
      <Typography>
        Nostrud sunt qui esse aute cupidatat ullamco.
        <br /> Pariatur et commodo aute commodo cupidatat amet aliqua non cillum commodo ad eu nulla
        aliqua.
        <br />
        Consequat duis ipsum duis sit ea.
      </Typography>
    </Surface>
  );
};

export default Example;
```

<ExampleSurfaceCard />

## Переопределение

Компонент `<Surface>` является составным и реализован при помощи следующих компонентов:

- `<Container>` — Обёртка
- `<Header>` — Обёртка заголовка в случае её отображения
- `<Subheader>` — Обёртка подзаголовка в случае её отображения
- `<Content>` — Обёртка контентной части

Используйте свойство `overrides` чтобы переопределить один или несколько компонентов:

_Пример использования:_

```tsx
import React from 'react';
import Surface from '@via-profit/ui-kit/Surface';

const Example: React.FC = () => (
  <Surface
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
  </Surface>
);

export default Example;
```

<ExampleSurfaceOverrides />

## Свойства

Помимо перечисленных свойств, компонент принимает [стандартные аттрибуты](https://developer.mozilla.org/ru/docs/Web/HTML/Element/div#атрибуты) HTML элемента `<div>`

| Свойство                 | Тип                        | По умолчанию         | Описание                                                                                 |
| ------------------------ | :------------------------- | :------------------- | ---------------------------------------------------------------------------------------- |
| **inline**               | `boolean`                  | `false`              | Если `true`, то элемент примет вид `inline-flex` контейнера и `flex` в противном случае. |
| **header**               | `<JSX.Element>` `<String>` | `undefined`          | Элемент заголовка                                                                        |
| **subheader**            | `<JSX.Element>` `<String>` | `undefined`          | Элемент подзаголовка                                                                     |
| **children**             | `<JSX.Element>` `<String>` |                      | Содержимое                                                                               |
| **overrides**            | `Object`                   | `undefined`          | Объект элементов для переопределения составных компонентов поверхности                   |
| **overrides .Container** | `<React.Component>`        | `<SurfaceContainer>` | Компонент обёртка                                                                        |
| **overrides .Header**    | `<React.Component>`        | `<SurfaceHeader>`    | Компонент обёртка заголовка в случае её отображения                                      |
| **overrides .Subheader** | `<React.Component>`        | `<SurfaceSubheader>` | Компонент обёртка подзаголовка в случае её отображения                                   |
| **overrides .Content**   | `<React.Component>`        | `<SurfaceContent>`   | Компонент обёртка контентной части                                                       |
