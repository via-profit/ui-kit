# Кнопка

## Содержание

- [Описание](#описание)
- [Варианты](#варианты)
- [Цвета](#цвета)
- [Иконки](#иконки)
- [Состояния](#состояния)
- [Переопределение](#переопределение)
- [Свойства](#свойства)

## Описание

Компонент `<Button>` — кнопка на основе элемента `<button>`. Все атрибуты `<button>` (`onClick`, `disabled`, `name`, `form` и другие) передаются ему.

В отличие от обычного `<button>`, у которого по умолчанию `type="submit"`, у кнопки `type="button"`: нажатие не отправляет форму. Для кнопки отправки формы укажите `type="submit"`.

_Пример использования:_

```tsx
import React from 'react';
import Button from '@via-profit/ui-kit/Button';

const Example: React.FC = () => {
  const [count, setCount] = React.useState(0);

  return <Button onClick={() => setCount(value => value + 1)}>Нажато: {count}</Button>;
};

export default Example;
```

<ExampleButtonBasic />

## Варианты

Свойство `variant` задаёт вид кнопки:

- **`standard`** — с заливкой (по умолчанию)
- **`outlined`** — с рамкой, без заливки
- **`plain`** — без заливки и рамки; фон появляется только при наведении

```tsx
<Button variant="standard">standard</Button>
<Button variant="outlined">outlined</Button>
<Button variant="plain">plain</Button>
```

<ExampleButtonVariants />

## Цвета

Свойство `color` принимает одно из значений `default`, `primary`, `secondary` либо любой цвет CSS: **hex**, **rgb(a)** или название цвета, например `lightpink`.

- **`default`** — нейтральная кнопка цвета поверхности (`theme.color.surface`) (по умолчанию)
- **`primary`** — основной цвет акцента темы
- **`secondary`** — второстепенный цвет акцента темы

У варианта `standard` цвет — это заливка, а текст подбирается автоматически: для `primary` и `secondary` берётся контрастный цвет из темы. У вариантов `outlined` и `plain` цвет — это текст и рамка.

```tsx
<Button color="primary">primary</Button>
<Button variant="outlined" color="#e0435f">
  #e0435f
</Button>
```

<ExampleButtonColors />

## Иконки

`startIcon` и `endIcon` добавляют иконку перед текстом и после него. Передавайте элемент (`<PlusIcon />`), а не компонент (`PlusIcon`).

Со свойством `iconOnly` кнопка становится квадратной кнопкой-иконкой: иконку передайте в `children`, а не в `startIcon`/`endIcon`. У такой кнопки нет текста, поэтому обязательно укажите `aria-label` — подпись для программ чтения с экрана.

```tsx
<Button color="primary" startIcon={<PlusIcon />}>
  Создать
</Button>

<Button iconOnly aria-label="Копировать">
  <CopyIcon />
</Button>
```

<ExampleButtonIcons />

## Состояния

- `disabled` — кнопка недоступна: приглушена и не реагирует на нажатия;
- загрузка — отключите кнопку и покажите [спиннер](../loading-indicator/README.md) в `startIcon`;
- переключатель — меняйте `variant` в зависимости от состояния и передайте `aria-pressed`, чтобы программы чтения с экрана сообщали, нажата ли кнопка. Кнопка при этом не теряет фокус.

```tsx
<Button
  color="primary"
  disabled={isSaving}
  startIcon={isSaving ? <Spinner size="1.2em" fill={false} /> : undefined}
  onClick={save}
>
  {isSaving ? 'Сохранение…' : 'Сохранить'}
</Button>

<Button
  color="primary"
  variant={isSubscribed ? 'standard' : 'outlined'}
  aria-pressed={isSubscribed}
  onClick={() => setIsSubscribed(value => !value)}
>
  {isSubscribed ? 'Вы подписаны' : 'Подписаться'}
</Button>
```

<ExampleButtonStates />

## Переопределение

Компонент `<Button>` является составным и реализован при помощи следующих компонентов:

- `<Container>` — элемент `<button>`; получает все атрибуты, переданные в `<Button>`
- `<IconWrapper>` — обёртка `startIcon` и `endIcon`
- `<TextWrapper>` — обёртка текста

Используйте свойство `overrides`, чтобы переопределить один или несколько компонентов. Проще всего расширить стандартный компонент с помощью `styled`. Создавайте переопределения один раз — вне компонента, а не при рендере.

_Пример использования:_

```tsx
import React from 'react';
import styled from '@emotion/styled';
import Button from '@via-profit/ui-kit/Button';
import ButtonTextWrapper from '@via-profit/ui-kit/Button/ButtonTextWrapper';

const TextWrapper = styled(ButtonTextWrapper)`
  font-weight: 600;
  letter-spacing: 0.05em;
  text-transform: uppercase;
`;

// Created once, outside of the component
const overrides = { TextWrapper };

const Example: React.FC = () => (
  <Button color="primary" overrides={overrides}>
    Купить
  </Button>
);

export default Example;
```

<ExampleButtonOverrides />

## Свойства

Помимо перечисленных ниже, `<Button>` принимает [стандартные атрибуты](https://developer.mozilla.org/ru/docs/Web/HTML/Element/button#атрибуты) элемента `<button>`. `ref` указывает на этот же элемент.

### `variant`
Вид кнопки. Подробнее в разделе [Варианты](#варианты).
- Тип: `'standard' | 'outlined' | 'plain'`
- По умолчанию: `'standard'`
- Обязательное: нет

### `color`
Цвет кнопки. Подробнее в разделе [Цвета](#цвета).
- Тип: `'default' | 'primary' | 'secondary' | string`
- По умолчанию: `'default'`
- Обязательное: нет

### `type`
Тип кнопки.
- Тип: `'button' | 'submit' | 'reset'`
- По умолчанию: `'button'`
- Обязательное: нет

### `startIcon`
Иконка перед текстом.
- Тип: `JSX.Element`
- По умолчанию: `undefined`
- Обязательное: нет

### `endIcon`
Иконка после текста.
- Тип: `JSX.Element`
- По умолчанию: `undefined`
- Обязательное: нет

### `iconOnly`
Если `true`, кнопка отображается как квадратная кнопка-иконка. Не используйте вместе со `startIcon` и `endIcon` и не забудьте `aria-label`.
- Тип: `boolean`
- По умолчанию: `false`
- Обязательное: нет

### `overrides`
Объект для переопределения составных компонентов. Подробнее в разделе [Переопределение](#переопределение).
- Тип: `ButtonBaseOverrides`
- По умолчанию: `undefined`
- Обязательное: нет
