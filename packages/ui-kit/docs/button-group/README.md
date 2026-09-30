# Группа кнопок

## Содержание

- [Описание](#описание)
- [Выбор одного варианта](#выбор-одного-варианта)
- [Множественный выбор](#множественный-выбор)
- [Расположение и ширина](#расположение-и-ширина)
- [Свойства](#свойства)

## Описание

Компонент `<ButtonGroup>` объединяет [кнопки](../button/README.md) в один блок: внутренние углы становятся прямыми, а границы соседних кнопок совмещаются. Группа задаёт кнопкам общие `variant`, `color` и `disabled`. Свойства самой кнопки важнее свойств группы.

Группа — это элемент с ролью `group`. Передайте `aria-label`, чтобы программы чтения с экрана назвали её.

_Пример использования:_

```tsx
import React from 'react';
import ButtonGroup from '@via-profit/ui-kit/ButtonGroup';
import Button from '@via-profit/ui-kit/Button';

const Example: React.FC = () => (
  <>
    <ButtonGroup aria-label="Действия с файлом">
      <Button>Открыть</Button>
      <Button>Скачать</Button>
      <Button>Удалить</Button>
    </ButtonGroup>

    <ButtonGroup variant="standard" color="primary">
      <Button>Сохранить</Button>
      <Button>Сохранить как…</Button>
    </ButtonGroup>

    <ButtonGroup disabled>
      <Button>Назад</Button>
      <Button>Вперёд</Button>
    </ButtonGroup>
  </>
);

export default Example;
```

<ExampleButtonGroupBasic />

## Выбор одного варианта

Группа становится переключателем, если передать ей `value`, `defaultValue` или `onChange`, а кнопкам — атрибут `value`. Нажатие на кнопку выбирает её значение.

- выбранная кнопка — вариант `standard` цвета `selectedColor` (по умолчанию `primary`), остальные — вариант и цвет группы;
- у кнопок выставляется `aria-pressed`, поэтому программы чтения с экрана сообщают, какая кнопка выбрана;
- повторное нажатие на выбранную кнопку ничего не меняет. Со свойством `deselectable` оно снимает выбор, и `onChange` получает `null`;
- без `value` группа неконтролируемая: она сама хранит выбор, а начальное значение задаёт `defaultValue`;
- если в `onClick` кнопки вызвать `event.preventDefault()`, выбор не изменится.

_Пример использования:_

```tsx
import React from 'react';
import ButtonGroup from '@via-profit/ui-kit/ButtonGroup';
import Button from '@via-profit/ui-kit/Button';

const Example: React.FC = () => {
  const [period, setPeriod] = React.useState<string | null>('week');

  return (
    <ButtonGroup aria-label="Период" value={period} onChange={setPeriod}>
      <Button value="day">День</Button>
      <Button value="week">Неделя</Button>
      <Button value="month">Месяц</Button>
    </ButtonGroup>
  );
};

export default Example;
```

<ExampleButtonGroupSelect />

## Множественный выбор

Со свойством `multiple` можно выбрать несколько кнопок. Тогда `value` и `defaultValue` — массивы, а `onChange` получает массив выбранных значений. Повторное нажатие снимает выбор с кнопки.

У кнопок-иконок нет текста, поэтому не забудьте `aria-label`.

```tsx
const [styles, setStyles] = React.useState<string[]>(['bold']);

<ButtonGroup multiple aria-label="Начертание" value={styles} onChange={setStyles}>
  <Button iconOnly value="bold" aria-label="Жирный">
    <b>Ж</b>
  </Button>
  <Button iconOnly value="italic" aria-label="Курсив">
    <i>К</i>
  </Button>
  <Button iconOnly value="underline" aria-label="Подчёркнутый">
    <u>Ч</u>
  </Button>
</ButtonGroup>;
```

<ExampleButtonGroupMultiple />

## Расположение и ширина

- `orientation="vertical"` — кнопки идут друг под другом;
- `fullWidth` — группа занимает всю ширину родителя: в горизонтальной группе кнопки делят её поровну, в вертикальной растягиваются на всю ширину.

```tsx
<ButtonGroup orientation="vertical" fullWidth variant="plain" defaultValue="profile">
  <Button value="profile">Профиль</Button>
  <Button value="security">Безопасность</Button>
  <Button value="notifications">Уведомления</Button>
</ButtonGroup>

<ButtonGroup fullWidth defaultValue="card" selectedColor="secondary">
  <Button value="card">Картой</Button>
  <Button value="cash">Наличными</Button>
  <Button value="invoice">По счёту</Button>
</ButtonGroup>
```

<ExampleButtonGroupOrientation />

## Свойства

Помимо перечисленных ниже, `<ButtonGroup>` принимает [стандартные атрибуты](https://developer.mozilla.org/ru/docs/Web/HTML/Element/div#атрибуты) элемента `<div>`. `ref` указывает на этот же элемент.

Кнопки внутри группы должны быть её прямыми потомками: скругление и совмещение границ рассчитаны на это.

### `children`
Кнопки `<Button>`.
- Тип: `React.ReactNode`
- Обязательное: **да**

### `variant`
Вид кнопок. В режиме выбора — вид невыбранных кнопок.
- Тип: `'standard' | 'outlined' | 'plain'`
- По умолчанию: `'outlined'`
- Обязательное: нет

### `color`
Цвет кнопок. В режиме выбора — цвет невыбранных кнопок.
- Тип: `'default' | 'primary' | 'secondary' | string`
- По умолчанию: `'default'`
- Обязательное: нет

### `selectedColor`
Цвет выбранных кнопок.
- Тип: `'default' | 'primary' | 'secondary' | string`
- По умолчанию: `'primary'`
- Обязательное: нет

### `disabled`
Если `true`, все кнопки недоступны.
- Тип: `boolean`
- По умолчанию: `false`
- Обязательное: нет

### `value`
Выбранное значение контролируемой группы. При `multiple` — массив значений.
- Тип: `string | null`, при `multiple` — `readonly string[]`
- По умолчанию: `undefined`
- Обязательное: нет

### `defaultValue`
Начальное выбранное значение неконтролируемой группы. При `multiple` — массив значений.
- Тип: `string | null`, при `multiple` — `readonly string[]`
- По умолчанию: `undefined`
- Обязательное: нет

### `onChange`
Вызывается при изменении выбора.
- Тип: `(value: string | null) => void`, при `multiple` — `(value: string[]) => void`
- По умолчанию: `undefined`
- Обязательное: нет

### `multiple`
Если `true`, можно выбрать несколько кнопок.
- Тип: `boolean`
- По умолчанию: `false`
- Обязательное: нет

### `deselectable`
Только для выбора одного варианта: если `true`, повторное нажатие на выбранную кнопку снимает выбор.
- Тип: `boolean`
- По умолчанию: `false`
- Обязательное: нет

### `orientation`
Расположение кнопок.
- Тип: `'horizontal' | 'vertical'`
- По умолчанию: `'horizontal'`
- Обязательное: нет

### `fullWidth`
Если `true`, группа занимает всю ширину родителя.
- Тип: `boolean`
- По умолчанию: `false`
- Обязательное: нет
