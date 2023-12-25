# Аватар

## Содержание

- [Описание](#описание)
- [Варианты](#варианты)
- [Цвета](#цвета)
- [Размер](#размер)
- [Изображения](#изображения)
- [Онлайн-индикатор](#онлайн)
- [Переопределение](#переопределение)
- [Свойства](#свойства)

## Описание

Компонент `<Avatar>` создаёт элемент, используемый для отображения фотографии/иконки сущности, например фотография профиля. Компонент помогает пользователю ориентироваться в списке.

_Пример использования:_

```tsx
import React from 'react';
import Avatar from '@via-profit/ui-kit/Avatar';

const Example: React.FC = () => (
  <Avatar
    variant="circular"
    src={[{ srcSet: 'https://i.pravatar.cc/300', type: 'image/jpeg', isDefault: true }]}
    isOnline
  >
    S
  </Avatar>
);

export default Example;
```

<ExampleAvatarOverview />

## Варианты

Аватар имеет 3 варианта формы: `circular` и `rounded` и `square`. По умолчанию, используется форма `circular`.

- **circular** — отображает круглый аватар
- **rounded** — отображает аватар со скругленными краями
- **square** — отображает квадратный аватар

_Пример использования:_

```tsx
import React from 'react';
import Avatar from '@via-profit/ui-kit/Avatar';

const Example: React.FC = () => (
  <>
    <Avatar variant="circular">C</Avatar>
    <Avatar variant="Rounded">R</Avatar>
    <Avatar variant="Square">S</Avatar>
  </>
);

export default Example;
```

<ExampleAvatarVariants />

## Цвета

Вы можете указать одно из трёх зарезервированных значений `default` `primary` `secondary`, или **rgb(a)**/**hex** код произвольного цвета. По умолчанию, используется цвет стиля `default`.

В качестве цвета вы можете передать и псевдоним цвета, например, **lightpink** что будет соответствовать коду цвета `#ffb6c1`,

- **default** — Цвет кнопки совпадает с цветом заднего плана
- **primary** — Используется основной цвет акцента
- **secondary** — Используется второстепенный цвет акцента

<ExampleAvatarColors />

## Размер

Вы можете указать размер аватара, с помощью свойства `size`. Свойство принимает строку с размером в **px**,**em**,**rem** По умолчанию, используется размер **2.5em**.

## Изображения

Аватар может отображать изображение,переданое в свойстве `src`. Свойство `src` принимает массив объектов с 3 ключами:

- `srcSet` — Строка с адресом картинки
- `type` — **MimeType** файла, например **image/jpeg**
- `isDefault` — Не обязательное булево значение, если **true**, то компонент будет использовать это изображение **по умолчанию**. Т.е. картинка будет показана браузером, если он не поддерживает современные форматы изображений. Поэтому этот флаг необходимо указывать на изображение в формате **png** или **jpeg**

Так же компоненту можно передать свойство `onClick`. Переданная функция выполнится при нажатии на аватар

Компонент так же принимает потомков `children`. Дети могут быть строкой или JSX компонентом. Зачастую эта функция используется если аватар не задан или необходимо отрендерить иконку

_Пример использования:_

```tsx
import Avatar from '@via-profit/ui-kit/Avatar';
import MyIcon from './MyIcon';

const Example: React.FC = () => (
  <Avatar
    variant="circular"
    onClick={() => setDialogOpen(true)}
    src={[
      {
        srcSet: 'https://i.pravatar.cc/300',
        type: 'image/jpeg',
        isDefault: true,
      },
      {
        srcSet: 'https://i.pravatar.cc/300',
        type: 'image/webp',
      },
    ]}
  />

  <Avatar variant="square" onClick={() => setDialogOpen(true)}>
    H
  </Avatar>
);
```

<ExampleAvatarIcons />

## Онлайн

Аватар может отображать онлайн статус пользователя. Для этого необходимо передать булево значение `isOnline`

_Пример использования:_

```tsx
import Avatar from '@via-profit/ui-kit/Avatar';
import MyIcon from './MyIcon';

const Example: React.FC = () => (
  <Avatar
    variant="circular"
    src={[
      {
        srcSet: 'https://i.pravatar.cc/300',
        type: 'image/jpeg',
        isDefault: true,
      },
      {
        srcSet: 'https://i.pravatar.cc/300',
        type: 'image/webp',
      },
    ]}
    isOnline
  />
);
```

<ExampleAvatarOnline />

## Переопределение

Компонент `<Avatar>` является составным и реализован при помощи следующих компонентов:

- `<Container>` — Компонент обертка аватара
- `<TextWrapper>` — Обёртка для текста
- `<IconWrapper>` — Обёртка изображения в случае его отображения
- `<Picture>` — Компонент изображения

Используйте свойство `overrides` чтобы переопределить один или несколько компонентов:

_Пример использования:_

```tsx
import React from 'react';
import styled from '@emotion/styled';
import Avatar from '@via-profit/ui-kit/Avatar';

import AvatarContainer from '@via-profit/ui-kit/Avatar/AvatarContainer';
import AvatarOnlineBadge from '@via-profit/ui-kit/Avatar/AvatarOnlineBadge';
import AvatarTextWrapper from '@via-profit/ui-kit/Avatar/AvatarTextWrapper';

const StyledContainer = styled(AvatarContainer)`
  background-color: purple !important;
`;

const StyledTextWrapper = styled(AvatarTextWrapper)`
  color: #fff !important;
`;

const Example: React.FC = () => (
  <Avatar
    variant="circular"
    isOnline
    overrides={{
      Container: React.forwardRef(function Override(props, ref) {
        return <StyledContainer {...props} ref={ref} />;
      }),
      TextWrapper: React.forwardRef(function Override(props, ref) {
        return <StyledTextWrapper {...props} ref={ref} />;
      }),
    }}
  >
    S
  </Avatar>
);

export default Example;
```

<ExampleAvatarOverrides />

## Свойства

Помимо перечисленных свойств, компонент принимает [стандартные аттрибуты](https://developer.mozilla.org/ru/docs/Web/HTML/Element/span#атрибуты) HTML элемента `<span>`

| Свойство                    | Обязателен | Тип                                      | По умолчанию           | Описание                                                                                                                               |
| --------------------------- | :--------: | :--------------------------------------- | :--------------------- | -------------------------------------------------------------------------------------------------------------------------------------- |
| **variant**                 |     \*     | `circular` `rounded` `square`            | `circular`             | Вариант отображения                                                                                                                   |
| **color**                   |            | `default` `secondary` `primary` `String` | `default`              | Цвет аватара. В качестве пользовательского цвета принимается строка в формате **hex** или **rgb(a)**                                   |
| **src**                     |            | `{srcSet: string; type: MimeType; isDefault?: boolean;}[]` | `undefined`            | Массив объектов ссылок на изображение                                                                                   |
| **onClick**                |            | `Function`                               | `undefined`            | Функция, которая будет вызвана при нажатии на аватар |
| **isOnline**                |            | `Boolean`                               | `undefined`            | Если передан **true** будет отображен индикатор онлайн |
| **overrides**               |            | `Object`                                 | `undefined`            | Объект элементов для переопределения составных компонентов аватара                                                                      |
| **overrides .Container**    |            | `<React.Component>`                      | `<AvatarContainer>`    | Компонент обертка аватара                                                                                                           |
| **overrides .IconWrapper**  |            | `<React.Component>`                      | `<AvatarIconWrapper>`  | Компонент обёртка для изображения аватара                                                                       |
| **overrides .TextWrapper**  |            | `<React.Component>`                      | `<AvatarTextWrapper>`  | Компонент обёртка текста аватара                                                                                                        |
| **overrides .Picture** |            | `<React.Component>`                      | `<AvatarDeleteButton>` | Компонент изображения                                                                                                              |
