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

_Результат:_

<ExampleSurfaceBasic />

&nbsp;
&nbsp;


Компонент принимает свойства, позволяющие отображать его в виде карточки:


_Пример использования:_

```tsx
import React from 'react';
import Surface from '@via-profit/ui-kit/Surface';

const Example: React.FC = () => {
  return (
    <Surface
      header="Surface header"
      subheader="Simple subheader"
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

_Результат:_

<ExampleSurfaceCard />

&nbsp;
&nbsp;


## Переопределение

Компонент `<Surface>` является составным и реализован при помощи следующих компонентов:

- `<Container>` — Обёртка
- `<Header>` — Обёртка заголовка в случае её отображения
- `<Subheader>` — Обёртка подзаголовка в случае её отображения
- `<Content>` — Обёртка конентной части

Используйте свойство `overrides` чтобы переопределить один или несколько компонентов:

_Пример использования:_

```tsx
import React from 'react';
import Surface from '@via-profit/ui-kit/Surface';

const Example: React.FC = () => (
  <Surface
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

_Результат:_

<ExampleSurfaceOverrides />
&nbsp;
&nbsp;

## Свойства
<!-- 
Помимо перечисленных свойств, компонент принимает [стандартные аттрибуты](https://developer.mozilla.org/ru/docs/Web/HTML/Element/button#атрибуты) HTML элемента `<button>`

| Свойство                   | Тип                                      | По умолчанию          | Описание                                                                                                                                        |
| -------------------------- | :--------------------------------------- | :-------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------- |
| **variant**                | `standard` `outlined`                    | `standard`            | Вариант отображения.                                                                                                                            |
| **color**                  | `default` `secondary` `primary` `String` | `default`             | Цвет кнопки. В качестве пользовательского цвета принимается строка в формате **hex** или **rgb(a)**.                                            |
| **iconOnly**               | `boolean`                                | `undefined`           | Если `true`, то кнопка будет представлена как кнопка-иконка. Данное свойство не следует использовать одновременно с `startIcon` и/или `endIcon` |
| **startIcon**              | `<JSX.Element>`                          | `undefined`           | Элемент иконки, отображаемой слева от текста кнопки                                                                                             |
| **endIcon**                | `<JSX.Element>`                          | `undefined`           | Элемент иконки, отображаемой справа от текста кнопки                                                                                            |
| **overrides**              | `Object`                                 | `undefined`           | Объект элементов для переопределения составных компонентов кнопки                                                                               |
| **overrides .IconWrapper** | `<React.Component>`                      | `<ButtonIconWrapper>` | Компонент обёртка для иконки, отображаемой слева и/или справа от текста кнопки                                                                  |
| **overrides .TextWrapper** | `<React.Component>`                      | `<ButtonTextWrapper>` | Компонент обёртка текста кнопки                                                                                                                 | -->
