# Date Picker

## Содержание

- [Описание](#описание)
- [Хуки](#хуки)
- [Переопределение-компонентов](#переопределение-компонентов)
- [Свойства](#свойства)

## Описание

Компонент `<DatePicker>` создаёт текстовое поле для ввода даты с кнопкой, по нажатии на которую будет показан интерактивный календарь с возможностью выбора даты, переключения месяцев и прочее.

_Пример использования:_

```tsx
import React from 'react';
import DatePicker from '@via-profit/ui-kit/DatePicker';

const ExampleDatePickerOverview: React.FC = () => {
  const [value, setValue] = React.useState<null | Date>(new Date());

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
<br/>


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

### `onChange`
Коллбэк функция, вызываемая при выборе даты.

### `value`
Текущее значение даты

### `defaultValue`
Текущее значение даты для случая, когда календарь является неконтроллируемым компонентом

### `locale`
Текущая локаль

### `badges`
Массив бэйджей календаря

### `minDate`
Минимально возможная дата, доступная для выбора в календаре

### `maxDate`
Максимально возможная дата, доступная для выбора в календаре

### `weekStartDay`
День с которого начинается неделя

### `weekDayLabelFormat`
Формат отображения названия недели

### `displayLeadingZero`
Флаг определяющий необходимость отображения дня недели с ведущим нулём

### `markToday`
Флаг определяющий необходимость подсвечивания текущего (сегодняшнего) дня в календаре

### `accentColor`
Цвет подсветки активной ячейки дня

### `prevMonthButtonTooltip`
Текст всплывающей подсказки кнопки переключения на предыдущий месяц

### `nextMonthButtonTooltip`
Текст всплывающей подсказки кнопки переключения на следующий месяц

### `changeMonthButtonTooltip`
Текст всплывающей подсказки кнопки выбора месяца

### `changeYearButtonTooltip`
Текст всплывающей подсказки кнопки выбора года

### `resetButtonLabel`
Текст кнопки сброса. Если текст не предоставлен, то кнопка отображаться не будет

### `toodayButtonLabel`
Текст кнопки перехода к текущему дню. Если текст не предоставлен, то кнопка отображаться не будет

### `heading`
Заголовок календаря

### `subheading`
Подзаголовок календаря

### `initialView`
Начальное представление календаря (дни, выбор месяца, выбор года)

### `footer`
Кастомные элементы, которые будут добавлены в футер календаря

### `error`
Является ли введённое значение ошибочным или нет. В случае, если установлено значение `true`, будет отображён текст ошибки переданный в свойстве `errorText`

### `requiredAsterisk`
Отображение звездочки над Label, которая указывает на то что поле является обязательным для ввода

### `label`
Label текстового поля

### `inputRef`
Ref ссылка для нативного текстового поля

### `fullWidth`
Следует ли компоненту занять всю предоставленную ширину

### `errorText`
Сообщение об ошибке

### `startIcon`
Элемент иконки, отображаемой слева от поля ввода

### `endIcon`
Элемент иконки, отображаемой справа от поля ввода
