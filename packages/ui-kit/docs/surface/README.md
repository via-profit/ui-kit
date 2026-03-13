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
- `footer` — Принимает футер карточки
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
- `<Footer>` — Футер

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

Помимо перечисленных ниже свойств, компонент принимает  
стандартные атрибуты [(developer.mozilla.org in Bing)](https://www.bing.com/search?q="https%3A%2F%2Fdeveloper.mozilla.org%2Fru%2Fdocs%2FWeb%2FHTML%2FElement%2Fdiv%23%25D0%25B0%25D1%2582%25D1%2580%25D0%25B8%25D0%25B1%25D1%2583%25D1%2582%25D1%258B") HTML‑элемента `<div>`.

### `inline: boolean`
Определяет способ отображения поверхности.

Если `true`, компонент рендерится как `inline-flex`.  
Если `false` — как блочный `flex`‑контейнер.

По умолчанию: `false`.



### `header: JSX.Element | string`
Содержимое заголовка карточки.

Если свойство не передано, заголовок не отображается.



### `subheader: JSX.Element | string`
Содержимое подзаголовка карточки.

Если свойство не передано, подзаголовок не отображается.



### `footer: JSX.Element | string`
Содержимое футера карточки.

Если свойство не передано, футер не отображается.


### `children: JSX.Element | string`
Основное содержимое поверхности.

Это единственное обязательное свойство.


### `overrides: object`
Объект, позволяющий переопределить составные части компонента `<Surface>`.

Используется для кастомизации структуры и внешнего вида.

### `overrides.Container: React.Component`
Компонент‑обёртка поверхности.  
По умолчанию используется `<SurfaceContainer>`.


### `overrides.Header: React.Component`
Компонент‑обёртка заголовка.  
По умолчанию используется `<SurfaceHeader>`.


### `overrides.Subheader: React.Component`
Компонент‑обёртка подзаголовка.  
По умолчанию используется `<SurfaceSubheader>`.


### `overrides.Content: React.Component`
Компонент‑обёртка основной контентной части.  
По умолчанию используется `<SurfaceContent>`.


### `overrides.Footer: React.Component`
Компонент‑обёртка футера.  
По умолчанию используется `<SurfaceFooter>`.

