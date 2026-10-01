# Радиокнопка

## Содержание

- [Описание](#описание)
- [Контролируемая группа](#контролируемая-группа)
- [Расположение и цвет](#расположение-и-цвет)
- [Обязательный выбор и ошибка](#обязательный-выбор-и-ошибка)
- [Радиокнопка без группы](#радиокнопка-без-группы)
- [Клавиатура и доступность](#клавиатура-и-доступность)
- [Переопределение](#переопределение)
- [Свойства](#свойства)

## Описание

Радиокнопки служат для выбора одного варианта из нескольких. Обычно их собирают в группу:

- `<RadioGroup>` — группа с подписью `label`. Она задаёт радиокнопкам общий `name` и хранит выбранное значение;
- `<Radio>` — вариант со значением `value`. Текст варианта передаётся в `children`, клик по тексту тоже выбирает вариант.

Без свойства `value` группа неконтролируемая: она сама хранит выбор, а начальный вариант задаёт `defaultValue`. Если вариантов больше пяти-семи, лучше подойдёт [селектбокс](../selectbox/README.md). Для выбора нескольких вариантов используйте [чекбоксы](../checkbox/README.md).

_Пример использования:_

```tsx
import React from 'react';
import Radio from '@via-profit/ui-kit/Radio';
import RadioGroup from '@via-profit/ui-kit/RadioGroup';

const Example: React.FC = () => (
  <RadioGroup name="delivery" defaultValue="courier" label="Способ доставки">
    <Radio value="courier">Курьером</Radio>
    <Radio value="pickup">Самовывоз из пункта выдачи</Radio>
    <Radio value="post" disabled>
      Почтой (временно недоступно)
    </Radio>
  </RadioGroup>
);

export default Example;
```

<ExampleRadioBasic />

## Контролируемая группа

Чтобы управлять выбором самостоятельно, передайте `value` и `onChange`. `onChange` получает значение выбранной радиокнопки и событие. `value={null}` означает, что ничего не выбрано.

В `children` радиокнопки можно передать не только строку: например, название варианта и пояснение под ним.

```tsx
const [plan, setPlan] = React.useState<string | null>('team');

<RadioGroup value={plan} onChange={setPlan} label="Тариф">
  <Radio value="start">Старт</Radio>
  <Radio value="team">Команда</Radio>
  <Radio value="company">Компания</Radio>
</RadioGroup>;
```

<ExampleRadioControlled />

## Расположение и цвет

- `orientation="horizontal"` — радиокнопки идут в строку и переносятся, если не помещаются. По умолчанию они расположены друг под другом;
- `color` — цвет отмеченной радиокнопки: `default`, `primary`, `secondary` или любой цвет CSS. Его можно задать всей группе или отдельной радиокнопке.

```tsx
<RadioGroup orientation="horizontal" defaultValue="M" color="#e0435f" label="Размер">
  <Radio value="S">S</Radio>
  <Radio value="M">M</Radio>
  <Radio value="L">L</Radio>
</RadioGroup>
```

<ExampleRadioHorizontal />

## Обязательный выбор и ошибка

- `required` — браузер не отправит форму без выбора;
- `requiredAsterisk` — звёздочка после подписи группы. Можно передать свой элемент вместо `*`;
- `error` и `errorText` — окружности окрашиваются в цвет ошибки, а под группой показывается текст ошибки. Группа получает `aria-invalid`, а текст ошибки связан с ней через `aria-describedby`.

```tsx
<RadioGroup
  value={answer}
  onChange={setAnswer}
  required
  requiredAsterisk
  error={submitted && answer === null}
  errorText="Выберите вариант ответа"
  label="Как вы о нас узнали?"
>
  <Radio value="search">Из поиска</Radio>
  <Radio value="friends">От друзей</Radio>
</RadioGroup>
```

<ExampleRadioValidation />

## Радиокнопка без группы

`<Radio>` работает и без `<RadioGroup>`, как обычный `<input type="radio">`. Задайте радиокнопкам одинаковый `name`, а состояние — через `checked` и `onChange` или `defaultChecked`. Отметка рисуется по состоянию самого поля, поэтому, когда браузер снимает её с соседней радиокнопки, вид обновляется сам.

```tsx
<Radio name="theme" value="light" defaultChecked>
  Светлая
</Radio>
<Radio name="theme" value="dark">
  Тёмная
</Radio>
```

## Клавиатура и доступность

- Tab попадает в группу один раз — на выбранную радиокнопку или на первую, если ничего не выбрано;
- стрелки переключают вариант внутри группы, пробел выбирает радиокнопку в фокусе;
- группа — элемент `<fieldset>` с ролью `radiogroup`. Подпись `label` выводится в `<legend>` и называет группу для программ чтения с экрана;
- `disabled` у группы отключает все радиокнопки, у радиокнопки — только её.

## Переопределение

`<RadioGroup>` состоит из компонентов:

- `<Container>` — элемент `<fieldset>`; получает атрибуты, переданные в `<RadioGroup>`
- `<Legend>` — подпись группы
- `<Asterisk>` — звёздочка обязательной группы
- `<Items>` — обёртка радиокнопок
- `<ErrorText>` — текст ошибки

`<Radio>` состоит из компонентов:

- `<Container>` — элемент `<label>` с радиокнопкой и текстом. Получает `className` и `style`, переданные в `<Radio>`
- `<Box>` — окружность с нативным `<input>`. Атрибуты `<input>` и `ref` попадают в `<input>`, а `className` и `style` компонента `<Box>` — в саму окружность. Окружность отмечена атрибутом `data-radio-circle`, точка внутри — `data-radio-dot`
- `<TextWrapper>` — обёртка текста

Используйте свойство `overrides`, чтобы переопределить один или несколько компонентов. Проще всего расширить стандартный компонент с помощью `styled`. Создавайте переопределения один раз — вне компонента, а не при рендере.

_Пример использования:_ варианты в виде карточек, выбранная карточка подсвечена.

```tsx
import styled from '@emotion/styled';
import Radio from '@via-profit/ui-kit/Radio';
import RadioGroup from '@via-profit/ui-kit/RadioGroup';
import RadioContainer from '@via-profit/ui-kit/Radio/RadioContainer';

const Container = styled(RadioContainer)`
  padding: 0.75em 1em;
  border-radius: 0.6em;
  border: 1px solid rgba(0, 0, 0, 0.15);

  &:has(input:checked) {
    border-color: ${({ theme }) => theme.color.accentPrimary.toString()};
  }
`;

// Created once, outside of the component
const overrides = { Container };

<RadioGroup orientation="horizontal" defaultValue="card" label="Оплата">
  <Radio value="card" overrides={overrides}>
    Картой онлайн
  </Radio>
  <Radio value="cash" overrides={overrides}>
    При получении
  </Radio>
</RadioGroup>;
```

<ExampleRadioOverrides />

## Свойства

### RadioGroup

Помимо перечисленных ниже, `<RadioGroup>` принимает атрибуты элемента `<fieldset>`. `ref` указывает на этот же элемент.

#### `children`
Радиокнопки `<Radio>`.
- Тип: `React.ReactNode`
- Обязательное: **да**

#### `value`
Выбранное значение контролируемой группы. `null` — ничего не выбрано.
- Тип: `string | null`
- По умолчанию: `undefined`
- Обязательное: нет

#### `defaultValue`
Начальное значение неконтролируемой группы.
- Тип: `string | null`
- По умолчанию: `undefined`
- Обязательное: нет

#### `onChange`
Вызывается при выборе радиокнопки.
- Тип: `(value: string, event: React.ChangeEvent<HTMLInputElement>) => void`
- По умолчанию: `undefined`
- Обязательное: нет

#### `name`
Общий `name` радиокнопок, под ним значение отправляется в форме. Если не передан, создаётся автоматически.
- Тип: `string`
- По умолчанию: создаётся автоматически
- Обязательное: нет

#### `label`
Подпись группы.
- Тип: `React.ReactNode`
- По умолчанию: `undefined`
- Обязательное: нет

#### `orientation`
Расположение радиокнопок.
- Тип: `'vertical' | 'horizontal'`
- По умолчанию: `'vertical'`
- Обязательное: нет

#### `color`
Цвет отмеченных радиокнопок.
- Тип: `'default' | 'primary' | 'secondary' | string`
- По умолчанию: `'default'`
- Обязательное: нет

#### `disabled`
Если `true`, все радиокнопки недоступны.
- Тип: `boolean`
- По умолчанию: `false`
- Обязательное: нет

#### `required`
Если `true`, браузер не отправит форму без выбора.
- Тип: `boolean`
- По умолчанию: `false`
- Обязательное: нет

#### `requiredAsterisk`
Если `true`, после подписи показывается `*`; если элемент — показывается он.
- Тип: `boolean | React.ReactNode`
- По умолчанию: `undefined`
- Обязательное: нет

#### `error`
Если `true`, радиокнопки окрашиваются в цвет ошибки, а под группой показывается `errorText`.
- Тип: `boolean`
- По умолчанию: `false`
- Обязательное: нет

#### `errorText`
Текст ошибки.
- Тип: `React.ReactNode`
- По умолчанию: `undefined`
- Обязательное: нет

#### `overrides`
Объект для переопределения составных компонентов группы. Подробнее в разделе [Переопределение](#переопределение).
- Тип: `RadioGroupOverrides`
- По умолчанию: `undefined`
- Обязательное: нет

### Radio

Помимо перечисленных ниже, `<Radio>` принимает атрибуты элемента `<input type="radio">` (`checked`, `defaultChecked`, `onChange`, `name`, `onFocus` и другие) и передаёт их в этот элемент. `ref` указывает на этот же элемент. Исключение — `className` и `style`: они попадают в `<label>`.

#### `value`
Значение радиокнопки. Внутри `<RadioGroup>` обязательно.
- Тип: `string`
- По умолчанию: `undefined`
- Обязательное: внутри группы — **да**

#### `children`
Текст радиокнопки.
- Тип: `React.ReactNode`
- По умолчанию: `undefined`
- Обязательное: нет

#### `disabled`
Если `true`, радиокнопка недоступна.
- Тип: `boolean`
- По умолчанию: значение группы
- Обязательное: нет

#### `color`
Цвет отмеченной радиокнопки.
- Тип: `'default' | 'primary' | 'secondary' | string`
- По умолчанию: цвет группы
- Обязательное: нет

#### `labelPosition`
Положение текста относительно радиокнопки.
- Тип: `'start' | 'end' | 'top' | 'bottom'`
- По умолчанию: `'end'`
- Обязательное: нет

#### `overrides`
Объект для переопределения составных компонентов радиокнопки. Подробнее в разделе [Переопределение](#переопределение).
- Тип: `RadioOverrides`
- По умолчанию: `undefined`
- Обязательное: нет
