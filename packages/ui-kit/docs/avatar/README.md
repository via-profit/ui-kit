# Аватар

## Содержание

- [Описание](#описание)
- [Форма](#форма)
- [Цвета](#цвета)
- [Размер](#размер)
- [Изображение](#изображение)
- [Онлайн-статус](#онлайн-статус)
- [Нажатие](#нажатие)
- [Переопределение](#переопределение)
- [Свойства](#свойства)

## Описание

Компонент `<Avatar>` отображает фотографию, инициалы или иконку пользователя либо другой сущности.

Если передано свойство `src`, аватар показывает изображение. Иначе он показывает `children` — обычно инициалы или иконку.

_Пример использования:_

```tsx
import React from 'react';
import Avatar from '@via-profit/ui-kit/Avatar';
import BellIcon from './BellIcon';

const Example: React.FC = () => (
  <>
    <Avatar
      src={[{ srcSet: 'https://example.com/anna.jpg', type: 'image/jpeg' }]}
      alt="Анна Смирнова"
    />
    <Avatar color="primary">АС</Avatar>
    <Avatar color="secondary">
      <BellIcon />
    </Avatar>
  </>
);

export default Example;
```

<ExampleAvatarOverview />

## Форма

Свойство `variant` задаёт форму аватара:

- **`circular`** — круг (по умолчанию)
- **`rounded`** — квадрат со скруглёнными углами
- **`square`** — квадрат

_Пример использования:_

```tsx
import React from 'react';
import Avatar from '@via-profit/ui-kit/Avatar';

const Example: React.FC = () => (
  <>
    <Avatar variant="circular">C</Avatar>
    <Avatar variant="rounded">R</Avatar>
    <Avatar variant="square">S</Avatar>
  </>
);

export default Example;
```

<ExampleAvatarVariants />

## Цвета

Свойство `color` задаёт цвет фона аватара. Оно принимает одно из значений `default`, `primary`, `secondary` либо любой цвет CSS: **hex**, **rgb(a)** или название цвета, например `lightpink`.

- **`default`** — немного темнее фона `Surface` (по умолчанию)
- **`primary`** — основной цвет акцента темы
- **`secondary`** — второстепенный цвет акцента темы

Цвет текста подбирается автоматически. Для `primary` и `secondary` берётся контрастный цвет из темы. Для произвольного цвета — основной цвет текста темы, если он достаточно контрастен с фоном, иначе цвет фона `Surface`.

Цвет фона виден, только когда аватар показывает `children`: изображение закрывает его полностью.

_Пример использования:_

```tsx
import React from 'react';
import Avatar from '@via-profit/ui-kit/Avatar';

const Example: React.FC = () => (
  <>
    <Avatar>D</Avatar>
    <Avatar color="primary">P</Avatar>
    <Avatar color="secondary">S</Avatar>
    <Avatar color="lightpink">LP</Avatar>
    <Avatar color="#529d29">G</Avatar>
    <Avatar color="rgb(40, 40, 90)">R</Avatar>
  </>
);

export default Example;
```

<ExampleAvatarColors />

## Размер

Все размеры аватара заданы в `em`, поэтому проще всего менять его размер через `font-size`: вместе с аватаром пропорционально изменятся инициалы и индикатор онлайн-статуса. По умолчанию аватар имеет размер `2.5em`.

_Пример использования:_

```tsx
import React from 'react';
import Avatar from '@via-profit/ui-kit/Avatar';

const Example: React.FC = () => (
  <>
    <Avatar style={{ fontSize: '0.75em' }} isOnline>S</Avatar>
    <Avatar isOnline>M</Avatar>
    <Avatar style={{ fontSize: '1.5em' }} isOnline>L</Avatar>
    <Avatar style={{ fontSize: '2em' }} isOnline>XL</Avatar>
  </>
);

export default Example;
```

<ExampleAvatarSize />

Свойство `size` задаёт ширину и высоту аватара в любых единицах CSS (`'48px'`, `'3rem'`). Размер инициалов и индикатора онлайн-статуса при этом не меняется. Используйте `size`, когда нужен точный размер аватара с изображением.

## Изображение

Свойство `src` принимает массив вариантов изображения. Аватар отрисовывает их в элементе `<picture>`, и браузер выбирает первый поддерживаемый формат. Каждый вариант — объект с полями:

- `srcSet` — адрес изображения, можно с дескрипторами, как в атрибуте `srcset`
- `type` — MIME-тип изображения, например `image/webp` или `image/jpeg`
- `isDefault` — если `true`, это изображение используется браузерами, которые не поддерживают `<picture>` и другие форматы из списка

Если ни один вариант не отмечен `isDefault`, по умолчанию используется изображение в формате PNG, затем JPEG, затем первое в списке. Поэтому, если вы добавляете современный формат вроде WebP, добавьте и PNG или JPEG.

Обязательно передавайте `alt` — описание изображения для программ чтения с экрана. Обычно это имя пользователя.

_Пример использования:_

```tsx
import React from 'react';
import Avatar from '@via-profit/ui-kit/Avatar';

const Example: React.FC = () => (
  <Avatar
    alt="Анна Смирнова"
    src={[
      { srcSet: 'https://example.com/anna.webp', type: 'image/webp' },
      { srcSet: 'https://example.com/anna.jpg', type: 'image/jpeg', isDefault: true },
    ]}
  />
);

export default Example;
```

Если передан `src`, `children` не отображаются — в том числе когда изображение не удалось загрузить.

## Онлайн-статус

Свойство `isOnline` показывает в правом нижнем углу зелёный индикатор онлайн-статуса.

_Пример использования:_

```tsx
import React from 'react';
import Avatar from '@via-profit/ui-kit/Avatar';

const Example: React.FC = () => (
  <>
    <Avatar
      src={[{ srcSet: 'https://example.com/maria.jpg', type: 'image/jpeg' }]}
      alt="Мария Иванова"
      isOnline
    />
    <Avatar variant="rounded" color="primary" isOnline>
      ИП
    </Avatar>
  </>
);

export default Example;
```

<ExampleAvatarOnline />

## Нажатие

Если передан `onClick`, аватар работает как кнопка: получает фокус клавишей Tab, нажимается клавишами Enter и пробел, а при наведении меняет цвет фона и курсор. Для программ чтения с экрана он получает роль `button`.

_Пример использования:_

```tsx
import React from 'react';
import Avatar from '@via-profit/ui-kit/Avatar';

const Example: React.FC = () => {
  const [isOnline, setIsOnline] = React.useState(true);

  return (
    <Avatar
      src={[{ srcSet: 'https://example.com/elena.jpg', type: 'image/jpeg' }]}
      alt="Елена Козлова"
      isOnline={isOnline}
      onClick={() => setIsOnline(value => !value)}
    />
  );
};

export default Example;
```

Нажмите на аватар, чтобы переключить онлайн-статус:

<ExampleAvatarClickable />

## Переопределение

Компонент `<Avatar>` является составным и реализован при помощи следующих компонентов:

- `<Container>` — корневой элемент `<span>`
- `<TextWrapper>` — обёртка для `children`, когда изображение не передано
- `<IconWrapper>` — обёртка для изображения
- `<Picture>` — элемент `<picture>` с изображением

Используйте свойство `overrides`, чтобы переопределить один или несколько компонентов. Переопределённый компонент должен передавать `ref` в корневой элемент. Проще всего расширить стандартный компонент с помощью `styled`:

_Пример использования:_

```tsx
import React from 'react';
import styled from '@emotion/styled';
import Avatar from '@via-profit/ui-kit/Avatar';
import AvatarTextWrapper, { AvatarTextWrapperProps } from '@via-profit/ui-kit/Avatar/AvatarTextWrapper';

const StyledTextWrapper = styled(AvatarTextWrapper)`
  font-size: 1em;
  font-weight: 600;
  letter-spacing: 0.05em;
  text-transform: uppercase;
`;

const TextWrapper = React.forwardRef<HTMLSpanElement, AvatarTextWrapperProps>(
  function TextWrapper(props, ref) {
    return <StyledTextWrapper {...props} ref={ref} />;
  },
);

const Example: React.FC = () => (
  <Avatar color="primary" overrides={{ TextWrapper }}>
    ап
  </Avatar>
);

export default Example;
```

<ExampleAvatarOverrides />

## Свойства

Помимо перечисленных ниже, `<Avatar>` принимает [стандартные атрибуты](https://developer.mozilla.org/ru/docs/Web/HTML/Element/span#атрибуты) элемента `<span>` и передаёт их в `<Container>`. `ref` указывает на этот же элемент.

### `children`
Содержимое аватара без изображения: инициалы, иконка или любой другой элемент. Не отображается, если передан `src`.
- Тип: `React.ReactNode`
- По умолчанию: `undefined`
- Обязательное: нет

### `variant`
Форма аватара. Подробнее в разделе [Форма](#форма).
- Тип: `'circular' | 'rounded' | 'square'`
- По умолчанию: `'circular'`
- Обязательное: нет

### `color`
Цвет фона. Подробнее в разделе [Цвета](#цвета).
- Тип: `'default' | 'primary' | 'secondary' | string`
- По умолчанию: `'default'`
- Обязательное: нет

### `size`
Ширина и высота аватара. Не влияет на размер инициалов и индикатора онлайн-статуса, подробнее в разделе [Размер](#размер).
- Тип: `string`
- По умолчанию: `'2.5em'`
- Обязательное: нет

### `src`
Варианты изображения. Подробнее в разделе [Изображение](#изображение).
- Тип: `Array<{ srcSet: string; type: MimeType; isDefault?: boolean }>`
- По умолчанию: `undefined`
- Обязательное: нет

### `alt`
Описание изображения — атрибут `alt` элемента `<img>`.
- Тип: `string`
- По умолчанию: `undefined`
- Обязательное: нет

### `isOnline`
Если `true`, отображается индикатор онлайн-статуса.
- Тип: `boolean`
- По умолчанию: `false`
- Обязательное: нет

### `onClick`
Функция, вызываемая при нажатии на аватар мышью или клавишами Enter и пробел. Если передана, аватар работает как кнопка, подробнее в разделе [Нажатие](#нажатие).
- Тип: `React.MouseEventHandler<HTMLSpanElement>`
- По умолчанию: `undefined`
- Обязательное: нет

### `overrides`
Объект для переопределения составных компонентов аватара.
- Тип: `Object`
- По умолчанию: `undefined`
- Обязательное: нет

#### `overrides.Container`
Корневой элемент.
- Тип: `React.ComponentType<AvatarContainerProps & React.RefAttributes<HTMLSpanElement>>`
- По умолчанию: `AvatarContainer`

#### `overrides.TextWrapper`
Обёртка для `children`.
- Тип: `React.ComponentType<AvatarTextWrapperProps & React.RefAttributes<HTMLSpanElement>>`
- По умолчанию: `AvatarTextWrapper`

#### `overrides.IconWrapper`
Обёртка для изображения.
- Тип: `React.ComponentType<AvatarIconWrapperProps & React.RefAttributes<HTMLSpanElement>>`
- По умолчанию: `AvatarIconWrapper`

#### `overrides.Picture`
Элемент `<picture>` с изображением.
- Тип: `React.ComponentType<AvatarPictureProps & React.RefAttributes<HTMLPictureElement>>`
- По умолчанию: `AvatarPicture`
