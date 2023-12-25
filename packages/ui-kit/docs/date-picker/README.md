# Date Picker

## Содержание

- [Описание](#описание)
- [Хуки](#хуки)
- [Переопределение-компонентов](#переопределение-компонентов)
- [Свойства](#свойства)

## Описание

Компонент `<DatePicker>` создаёт текстовое поле для ввода даны с кнопкой, по нажатии на которую будет показанинтерактивный календарь с возможностью выбора даты, переключения месяцев и прочее.

_Пример использования:_

```tsx
import React from 'react';
import DatePicker from '@via-profit/ui-kit/DatePicker';

const ExampleDatePickerOverview: React.FC = () => {
  const [value, setValue] = React.useState<null | Date>(null);

  return (
    <DatePicker
      template="dd.mm.yyyy"
      calendarButtonTooltip="Открыть календарь"
      value={value}
      onChange={setValue}
    />
  );
};

export default ExampleDatePickerOverview;
```

<ExampleDatePickerOverview />

## Хуки

Компонент реализован по средствам набора свойств и методов, доступных в хуке `useDatePickerFormat`.

_Использование хука:_

```tsx
const paylaod = useDatePickerFormat();
```

Хук `useCalendar` возвращает следующий набор данных:

- `isValidTemplate` — Функция, принимающая шаблон форматирования даты и возвращающая `true`,если шаблон валиден и `false` ,если содержит недопустимые символы.
- `validateTemplate` — Функция, принимающая шаблон форматирования даты и вызывающая исключение, если шаблон содержит недопустимые символы.
- `getMaskByTemplate` — Функция, принимающая шаблон форматирования даты и возвращающая маску для [MaskedField](../masked-field/README.md).
- `parseInputByTemplate` — Функция, принимающая шаблон форматирования даты, шаблон форматирования даты и возвращающая дату в случае успешного парсинга или `null` в востальных случаях.
- `formatInputByTemplate` — Функция, принимающая дату, шаблон форматирования даты и возвращающая отформатированную строку.
- `templateValidChars` — Массив допустимых символов для шаблона форматирования даты.

_Пример использования:_

```tsx
import React from 'react';
import { useDatePickerFormat } from '@via-profit/ui-kit/DatePicker';

const Example: React.FC = () => {
  const { formatInputByTemplate, parseInputByTemplate } = useDatePickerFormat();

  return (
    <>
      <Paragraph>{formatInputByTemplate(new Date(), 'd.m.Y')}</Paragraph>
      <Paragraph>{formatInputByTemplate(new Date(), 'yyyy/mm/dd')}</Paragraph>
      <Paragraph>
        {parseInputByTemplate('22.02.2003', 'dd.mm.yyyy')?.toLocaleString('ru-RU')}
      </Paragraph>
    </>
  );
};

export default Example;
```

<ExampleDatePickerHooks />

## переопределение компонентов

Компонент `<DatePicker>` является составным и реализован при помощи следующих компонентов [Calendar](../calendar/README.md) и [TextField](../text-field/README.md).

- Для переопределения текстового поля используются все свойства `overrides`, доступные из компонента [TextField](../text-field/README.md#переопределение-компонентов).
- Для переопределения компонентов календаря используются все свойства `overrides`, доступные из компонента [Calendar](../calendar/README.md#переопределение-компонентов)

## Свойства

| Свойство                     | Обязателен | Тип                                                                    | По умолчанию               | Описание                                                                                                                                                     |
| ---------------------------- | :--------: | :--------------------------------------------------------------------- | :------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| **onChange**                 |     \*     | `(date: Date) => void`                                                 |                            | Коллбэк функция, вызываемая при выборе даты.                                                                                                                 |
| **value**                    |            | `Date`                                                                 | `undefined`                | Текущее значение даты                                                                                                                                        |
| **defaultValue**             |            | `Date`                                                                 | `undefined`                | Текущее значение даты для случая, когда календарь является неконтроллируемым компонентом                                                                     |
| **locale**                   |            | `string`                                                               | `ru-RU`                    | Текущая локаль                                                                                                                                               |
| **badges**                   |            | `readonly CalendarBadge[]`                                             | `undefined`                | Массив бэйджей календаря                                                                                                                                     |
| **minDate**                  |            | `Date`                                                                 | `-100 лет от текущей даты` | Минимально возможная дата, доступная для выбора в календаре                                                                                                  |
| **maxDate**                  |            | `Date`                                                                 | `+100 лет от текущей даты` | Максимально возможная дата, доступная для выбора в календаре                                                                                                 |
| **weekStartDay**             |            | `sunday` `monday` `tuesday` `wednesday` `thursday` `friday` `saturday` | `monday`                   | День с которого начинается неделя                                                                                                                            |
| **weekDayLabelFormat**       |            | `short` `long` `narrow`                                                | `short`                    | Формат отображения названия недели                                                                                                                           |
| **displayLeadingZero**       |            | `boolean`                                                              | `false`                    | Флаг определяющий необходимость отображения дня недели с ведущим нулём                                                                                       |
| **markToday**                |            | `boolean`                                                              | `true`                     | Флаг определяющий необходимость подсвечивания текущего (сегодняшнего) дня в календаре                                                                        |
| **accentColor**              |            | `primary` `secondary` `string`                                         | `primary`                  | Цвет подсветки активной ячейки дня                                                                                                                           |
| **prevMonthButtonTooltip**   |            | `string`                                                               | `undefined`                | Текст всплывающей подсказки кнопки переключения на предыдущий месяц                                                                                          |
| **nextMonthButtonTooltip**   |            | `string`                                                               | `undefined`                | Текст всплывающей подсказки кнопки переключения на следующий месяц                                                                                           |
| **changeMonthButtonTooltip** |            | `string`                                                               | `undefined`                | Текст всплывающей подсказки кнопки выбора месяца                                                                                                             |
| **changeYearButtonTooltip**  |            | `string`                                                               | `undefined`                | Текст всплывающей подсказки кнопки выбора года                                                                                                               |
| **resetButtonLabel**         |            | `string`                                                               | `undefined`                | Текст кнопки сброса. Если текст не предоставлен, то кнопка отображаться не будет                                                                             |
| **toodayButtonLabel**        |            | `string`                                                               | `undefined`                | Текст кнопки перехода к текущему дню. Если текст не предоставлен, то кнопка отображаться не будет                                                            |
| **heading**                  |            | `React.ReactNode`                                                      | `undefined`                | Заголовок календаря                                                                                                                                          |
| **subheading**               |            | `React.ReactNode`                                                      | `undefined`                | Подзаголовок календаря                                                                                                                                       |
| **initialView**              |            | `days` `monthes` `years`                                               | `days`                     | Начальное представление календаря (дни, выбор месяца, выбор года)                                                                                            |
| **footer**                   |            | `JSX.Element`                                                          | `undefined`                | Кастомные элементы, которые будут добавлены в футер календаря                                                                                                |
| **error**                    |            | `Boolean`                                                              | `false`                    | Является ли введённое значение ошибочным или нет. В случае, если установлено значение `true`, будет отображён текст ошибки переданный в свойстве `errorText` |
| **requiredAsterisk**         |            | `Boolean`                                                              | `false`                    | Отображение звездочки над Label, которая указывает на то что поле является обязательным для ввода                                                            |
| **label**                    |            | `<JSX.Element>` `String`                                               |                            | Label текстового поля                                                                                                                                        |
| **inputRef**                 |            | `Ref<HTMLInputElement>`                                                |                            | Ref ссылка для нативного текстового поля                                                                                                                     |
| **fullWidth**                |            | `boolean`                                                              | `false`                    | Следует ли компоненту занять всю предоставленную ширину                                                                                                      |
| **errorText**                |            | `<JSX.Element>` `String`                                               |                            | Сообщение об ошибке                                                                                                                                          |
| **startIcon**                |            | `<JSX.Element>`                                                        |                            | Элемент иконки, отображаемой слева от поля ввода                                                                                                             |
| **endIcon**                  |            | `<JSX.Element>`                                                        |                            | Элемент иконки, отображаемой справа от поля ввода                                                                                                            |
