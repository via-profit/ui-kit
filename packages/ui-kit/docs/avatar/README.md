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

---

## Свойства

### `variant`
Вариант отображения формы аватара.
- Тип: `'circular' | 'rounded' | 'square'`
- По умолчанию: `'circular'`
- Обязательное: **да**

### `color`
Цвет аватара. Может быть предопределенным значением или пользовательским цветом в формате **hex** или **rgb(a)**.
- Тип: `'default' | 'secondary' | 'primary' | string`
- По умолчанию: `'default'`
- Обязательное: нет

### `src`
Массив объектов ссылок на изображения с поддержкой различных форматов и srcSet.
- Тип: `Array<{ srcSet: string; type: MimeType; isDefault?: boolean; }>`
- По умолчанию: `undefined`
- Обязательное: нет

### `onClick`
Функция, вызываемая при нажатии на аватар.
- Тип: `function`
- По умолчанию: `undefined`
- Обязательное: нет

### `isOnline`
Если передан `true`, отображается индикатор онлайн-статуса.
- Тип: `boolean`
- По умолчанию: `undefined`
- Обязательное: нет

### `overrides`
Объект для переопределения составных компонентов аватара.
- Тип: `Object`
- По умолчанию: `undefined`
- Обязательное: нет

#### `overrides.Container`
Компонент-обертка для всего аватара.
- Тип: `React.Component`
- По умолчанию: `<AvatarContainer>`

#### `overrides.IconWrapper`
Компонент-обертка для изображения аватара.
- Тип: `React.Component`
- По умолчанию: `<AvatarIconWrapper>`

#### `overrides.TextWrapper`
Компонент-обертка для текста аватара (инициалы или текстовая метка).
- Тип: `React.Component`
- По умолчанию: `<AvatarTextWrapper>`

#### `overrides.Picture`
Компонент самого изображения аватара.
- Тип: `React.Component`
- По умолчанию: `<AvatarDeleteButton>`

---

Помимо перечисленных свойств, компонент принимает [стандартные атрибуты](https://developer.mozilla.org/ru/docs/Web/HTML/Element/span#атрибуты) HTML элемента `<span>`
