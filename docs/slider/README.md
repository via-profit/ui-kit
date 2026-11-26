# Слайдер

## Содержание

- [Описание](#описание)
- [Диапазон](#диапазон)
- [Шаг и метки](#шаг-и-метки)
- [Вертикальный слайдер, цвет и отключение](#вертикальный-слайдер-цвет-и-отключение)
- [Клавиатура и доступность](#клавиатура-и-доступность)
- [Переопределение](#переопределение)
- [Свойства](#свойства)

## Описание

Слайдер служит для выбора числа из диапазона: громкости, скидки, цены. Ползунок перетаскивают мышью или пальцем, двигают стрелками с клавиатуры, а клик по линии переносит ползунок в место клика.

Без свойства `value` слайдер неконтролируемый: он сам хранит значение, а начальное задаёт `defaultValue`. Если важно точное число, например сумма заказа, лучше подойдёт [текстовое поле](../text-field/README.md). Ползунком удобно выбирать примерное значение.

У слайдера нет видимой подписи. Назовите его для программ чтения с экрана через `aria-label` или `aria-labelledby`.

_Пример использования:_

```tsx
import React from 'react';
import Slider from '@via-profit/ui-kit/Slider';

const Example: React.FC = () => <Slider defaultValue={40} aria-label="Громкость" />;

export default Example;
```

<ExampleSliderBasic />

## Диапазон

Если передать в `value` или `defaultValue` пару чисел, у слайдера будет два ползунка: начало и конец диапазона. Ползунки не могут перейти друг через друга, но могут стоять в одной точке.

- `onChange(value, event, activeThumb)` вызывается при каждом движении ползунка. Тип `value` совпадает с типом `value` или `defaultValue`: число или пара чисел. `activeThumb` — индекс сдвинутого ползунка;
- `onChangeCommitted(value, event)` вызывается, когда пользователь отпустил ползунок, и после каждого нажатия клавиши. Используйте его для дорогой работы, например для запросов к серверу.

```tsx
const [price, setPrice] = React.useState<readonly [number, number]>([2000, 6000]);

<span id="price-label">
  Цена: от {price[0]} до {price[1]} ₽
</span>
<Slider
  value={price}
  onChange={setPrice}
  onChangeCommitted={loadProducts}
  min={0}
  max={10000}
  step={100}
  aria-labelledby="price-label"
  getAriaLabel={index => (index === 0 ? 'Минимальная цена' : 'Максимальная цена')}
  getAriaValueText={value => `${value} ₽`}
/>;
```

<ExampleSliderRange />

## Шаг и метки

- `min`, `max` — границы значения, по умолчанию от 0 до 100;
- `step` — шаг значения, по умолчанию 1. Дробный шаг тоже работает: при `step={0.1}` значения будут 0.1, 0.2, 0.3 без ошибок округления;
- `marks` — метки на линии. `true` ставит метку на каждый шаг, поэтому подходит только для небольшого числа шагов. Массив `{ value, label }` ставит метки в заданных точках, `label` выводится под меткой.

```tsx
<Slider
  defaultValue={10}
  max={25}
  step={5}
  marks={[0, 5, 10, 15, 20, 25].map(value => ({ value, label: `${value}%` }))}
  aria-label="Скидка"
/>

<Slider defaultValue={3} min={1} max={10} marks color="secondary" aria-label="Количество мест" />
```

<ExampleSliderMarks />

## Вертикальный слайдер, цвет и отключение

- `orientation="vertical"` — вертикальный слайдер, значение растёт снизу вверх. По умолчанию его высота `12em`, другую задайте через `style` или `className`. Подписи меток выводятся справа, для них оставлен отступ `2.5em`; если подписи длиннее, увеличьте `margin-right`;
- `color` — цвет линии и ползунка: `default`, `primary`, `secondary` или любой цвет CSS;
- `disabled` — слайдер становится серым, его нельзя сдвинуть, а ползунки не получают фокус.

```tsx
<Slider orientation="vertical" defaultValue={30} aria-label="Уровень" />
<Slider orientation="vertical" defaultValue={[20, 70]} color="#e0435f" getAriaLabel={() => 'Уровень'} />
<Slider orientation="vertical" defaultValue={60} disabled aria-label="Уровень" />
```

<ExampleSliderVertical />

## Клавиатура и доступность

- каждый ползунок — элемент с ролью `slider`, Tab переходит по ползункам;
- стрелки двигают ползунок на один шаг, Shift+стрелка, PageUp и PageDown — на десятую часть диапазона, Home и End — к минимуму и максимуму;
- программа чтения с экрана называет ползунок по `aria-label`, `aria-labelledby` или `getAriaLabel` и читает значение. `getAriaValueText` заменяет голое число текстом, например «500 ₽»;
- со свойством `name` значение отправляется в форме через скрытый `<input>`. У диапазона два таких поля с одним `name`: на сервере их можно получить как список, например `formData.getAll(name)`.

## Переопределение

`<Slider>` состоит из компонентов:

- `<Container>` — корневой элемент. Получает атрибуты, переданные в `<Slider>`, и `ref`, и обрабатывает перетаскивание
- `<Rail>` — вся линия слайдера
- `<Track>` — закрашенная часть линии: от начала до ползунка или между ползунками диапазона
- `<Thumb>` — ползунок. Он получает фокус, роль `slider` и атрибут `data-slider-thumb` с индексом ползунка
- `<Mark>` — точка метки на линии
- `<MarkLabel>` — подпись метки

Используйте свойство `overrides`, чтобы переопределить один или несколько компонентов. Проще всего расширить стандартный компонент с помощью `styled`. Создавайте переопределения один раз — вне компонента, а не при рендере.

_Пример использования:_ шкала оттенка для выбора цвета — линия с радугой вместо закрашенной части, ползунок с белой обводкой.

```tsx
import styled from '@emotion/styled';
import Slider from '@via-profit/ui-kit/Slider';
import SliderRail from '@via-profit/ui-kit/Slider/SliderRail';
import SliderThumb from '@via-profit/ui-kit/Slider/SliderThumb';

const Rail = styled(SliderRail)`
  height: 0.75em;
  margin-top: -0.375em;
  opacity: 1;
  background: linear-gradient(to right, #f00, #ff0, #0f0, #0ff, #00f, #f0f, #f00);
`;

// The hue scale needs no filled part
const Track = () => null;

const Thumb = styled(SliderThumb)`
  width: 1.3em;
  height: 1.3em;
  border: 0.2em solid #fff;
  box-shadow: 0 0 0 1px rgba(0, 0, 0, 0.3);
`;

// Created once, outside of the component
const overrides = { Rail, Track, Thumb };

const [hue, setHue] = React.useState(210);

<Slider
  value={hue}
  onChange={setHue}
  max={360}
  color={`hsl(${hue}, 100%, 50%)`}
  overrides={overrides}
  aria-label="Оттенок"
/>;
```

<ExampleSliderOverrides />

## Свойства

Помимо перечисленных ниже, `<Slider>` принимает атрибуты элемента `<span>` и передаёт их в корневой элемент. `ref` указывает на этот же элемент.

#### `value`
Значение контролируемого слайдера: число или пара чисел для диапазона. Передавайте вместе с `onChange`.
- Тип: `number | readonly [number, number]`
- По умолчанию: `undefined`
- Обязательное: нет

#### `defaultValue`
Начальное значение неконтролируемого слайдера: число или пара чисел для диапазона.
- Тип: `number | readonly [number, number]`
- По умолчанию: `min`
- Обязательное: нет

#### `onChange`
Вызывается при каждом изменении значения во время перетаскивания и при нажатии клавиш.
- Тип: `(value: number | readonly [number, number], event: React.SyntheticEvent, activeThumb: number) => void`
- По умолчанию: `undefined`
- Обязательное: нет

#### `onChangeCommitted`
Вызывается, когда пользователь отпустил ползунок, и после каждого нажатия клавиши.
- Тип: `(value: number | readonly [number, number], event: React.SyntheticEvent) => void`
- По умолчанию: `undefined`
- Обязательное: нет

#### `min`
Минимальное значение.
- Тип: `number`
- По умолчанию: `0`
- Обязательное: нет

#### `max`
Максимальное значение.
- Тип: `number`
- По умолчанию: `100`
- Обязательное: нет

#### `step`
Шаг значения, больше нуля.
- Тип: `number`
- По умолчанию: `1`
- Обязательное: нет

#### `marks`
Метки на линии: `true` — на каждом шаге, массив — в заданных точках.
- Тип: `boolean | readonly { value: number; label?: React.ReactNode }[]`
- По умолчанию: `false`
- Обязательное: нет

#### `orientation`
Расположение слайдера.
- Тип: `'horizontal' | 'vertical'`
- По умолчанию: `'horizontal'`
- Обязательное: нет

#### `color`
Цвет линии и ползунка.
- Тип: `'default' | 'primary' | 'secondary' | string`
- По умолчанию: `'default'`
- Обязательное: нет

#### `disabled`
Если `true`, слайдер недоступен.
- Тип: `boolean`
- По умолчанию: `false`
- Обязательное: нет

#### `name`
Имя скрытого поля со значением для отправки в форме. У диапазона два поля с этим именем.
- Тип: `string`
- По умолчанию: `undefined`
- Обязательное: нет

#### `aria-label`
Подпись ползунка для программ чтения с экрана. Для диапазона используйте `getAriaLabel`.
- Тип: `string`
- По умолчанию: `undefined`
- Обязательное: нет

#### `aria-labelledby`
`id` элемента с подписью ползунков.
- Тип: `string`
- По умолчанию: `undefined`
- Обязательное: нет

#### `getAriaLabel`
Возвращает подпись ползунка по его индексу. Заменяет `aria-label`.
- Тип: `(index: number) => string`
- По умолчанию: `undefined`
- Обязательное: нет

#### `getAriaValueText`
Возвращает текст значения для программ чтения с экрана.
- Тип: `(value: number, index: number) => string`
- По умолчанию: `undefined`
- Обязательное: нет

#### `overrides`
Объект для переопределения составных компонентов. Подробнее в разделе [Переопределение](#переопределение).
- Тип: `SliderOverrides`
- По умолчанию: `undefined`
- Обязательное: нет
