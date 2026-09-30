# Дейтпикер

## Содержание

- [Описание](#описание)
- [Выбор только из календаря](#выбор-только-из-календаря)
- [Шаблон даты](#шаблон-даты)
- [Клавиатура и доступность](#клавиатура-и-доступность)
- [Хук useDatePickerFormat](#хук-usedatepickerformat)
- [Переопределение](#переопределение)
- [Свойства](#свойства)

## Описание

Компонент `<DatePicker>` — поле для ввода даты с кнопкой, которая открывает [календарь](../calendar/README.md). Дату можно напечатать по маске или выбрать в календаре.

- `onChange` вызывается, когда в поле введена полная корректная дата или выбран день в календаре. Несуществующие даты (например, 31.02) не принимаются;
- дата раньше `minDate` или позже `maxDate`, введённая вручную, заменяется на ближайшую границу;
- поле принимает свойства [текстового поля](../text-field/README.md): `label`, `placeholder`, `error`, `errorText`, `requiredAsterisk`, `fullWidth` и другие.

_Пример использования:_

```tsx
import React from 'react';
import DatePicker from '@via-profit/ui-kit/DatePicker';

const Example: React.FC = () => {
  const [value, setValue] = React.useState<Date | null>(null);

  return (
    <DatePicker
      label="Дата рождения"
      placeholder="дд.мм.гггг"
      template="dd.mm.yyyy"
      value={value}
      onChange={setValue}
      calendarButtonTooltip="Открыть календарь"
      prevButtonLabel="Назад"
      nextButtonLabel="Вперёд"
    />
  );
};

export default Example;
```

<ExampleDatePickerOverview />

## Выбор только из календаря

Со свойством `readOnly` дату нельзя напечатать: клик по полю открывает и закрывает календарь. Это удобно, когда доступны только некоторые даты. Например, доставка возможна со следующего дня на две недели вперёд.

Календарь принимает те же свойства, что и компонент [Calendar](../calendar/README.md): `minDate`, `maxDate`, `badges`, `heading`, `todayButtonLabel` и другие.

```tsx
const today = new Date();
const minDate = new Date(today.getFullYear(), today.getMonth(), today.getDate() + 1);
const maxDate = new Date(today.getFullYear(), today.getMonth(), today.getDate() + 14);

<DatePicker
  readOnly
  label="Дата доставки"
  template="dd.mm.yyyy"
  value={value}
  onChange={setValue}
  minDate={minDate}
  maxDate={maxDate}
  heading="Когда привезти заказ?"
/>;
```

<ExampleDatePickerReadOnly />

## Шаблон даты

Свойство `template` задаёт формат даты в поле и маску ввода. Каждый символ шаблона — один символ в поле, поэтому используйте части фиксированной длины:

- `dd` — день, `01`–`31`;
- `mm` — месяц, `01`–`12`;
- `yyyy` — год, `yy` — две последние цифры года (год считается текущим веком: `26` → 2026);
- любые другие символы — разделители, например `.`, `/`, `-`.

```tsx
<DatePicker template="yyyy-mm-dd" value={value} onChange={setValue} todayButtonLabel="Сегодня" />
```

<ExampleDatePickerTemplate />

## Клавиатура и доступность

- кнопка календаря подписана `calendarButtonTooltip` (по умолчанию `Choose date`) и сообщает, открыт ли календарь;
- при открытии фокус переходит на выбранный день календаря, а если его нет — на сегодняшний или первый доступный. По дням можно перемещаться стрелками, подробнее — в разделе [Клавиатура](../calendar/README.md#клавиатура-и-доступность) календаря;
- Enter или пробел выбирают день. Календарь закрывается, фокус возвращается в поле;
- Escape закрывает календарь и возвращает фокус на кнопку;
- календарь — диалог с подписью `calendarButtonTooltip`.

## Хук useDatePickerFormat

Хук `useDatePickerFormat` форматирует и разбирает даты по тем же шаблонам. В хуке шаблоны могут быть и короче: `d`, `m` — без ведущего нуля, `Y` — год полностью.

```tsx
import { useDatePickerFormat } from '@via-profit/ui-kit/DatePicker';

const { formatInputByTemplate, parseInputByTemplate } = useDatePickerFormat();

formatInputByTemplate(new Date(2026, 8, 5), 'd.m.Y'); // «5.9.2026»
formatInputByTemplate(new Date(2026, 8, 5), 'yyyy/mm/dd'); // «2026/09/05»
parseInputByTemplate('22.02.2003', 'dd.mm.yyyy'); // Date: 22 февраля 2003
parseInputByTemplate('31.02.2003', 'dd.mm.yyyy'); // null — такой даты нет
```

Хук возвращает:

- `formatInputByTemplate(date, template)` — дата в виде строки по шаблону;
- `parseInputByTemplate(input, template)` — дата из строки или `null`, если строка не подходит к шаблону или такой даты нет;
- `getMaskByTemplate(template)` — маска для [маскированного поля](../masked-field/README.md);
- `isValidTemplate(template)` — `true`, если шаблон состоит из допустимых символов;
- `validateTemplate(template)` — то же, но с исключением для недопустимого шаблона;
- `templateValidChars` — допустимые части шаблона.

<ExampleDatePickerHooks />

## Переопределение

`<DatePicker>` состоит из [текстового поля](../text-field/README.md#переопределение) и [календаря](../calendar/README.md#переопределение). Свойство `overrides` принимает переопределения обоих компонентов: `Input`, `Label`, `InputWrapper`, `IconWrapper`, `ErrorText`, `Asterisk`, `Container` — для поля, остальные — для календаря.

## Свойства

Помимо перечисленных ниже, `<DatePicker>` принимает свойства [текстового поля](../text-field/README.md#свойства) (кроме `value`, `onChange` и `overrides`) и свойства [календаря](../calendar/README.md#свойства): `minDate`, `maxDate`, `locale`, `weekStartDay`, `weekDayLabelFormat`, `displayLeadingZero`, `markToday`, `badges`, `heading`, `subheading`, `todayButtonLabel`, `resetButtonLabel`, `view`, `views`, `footer`.

### `value`
Выбранная дата.
- Тип: `Date | null`
- Обязательное: **да**

### `onChange`
Вызывается с новой датой.
- Тип: `(date: Date) => void`
- Обязательное: **да**

### `template`
Шаблон даты. Подробнее в разделе [Шаблон даты](#шаблон-даты).
- Тип: `string`
- Обязательное: **да**

### `readOnly`
Если `true`, дату можно выбрать только в календаре.
- Тип: `boolean`
- По умолчанию: `false`
- Обязательное: нет

### `calendarButtonTooltip`
Подпись кнопки календаря и диалога с календарём.
- Тип: `string`
- По умолчанию: `'Choose date'`
- Обязательное: нет

### `prevButtonLabel`, `nextButtonLabel`
Подписи стрелок календаря.
- Тип: `string`
- По умолчанию: `'Previous'`, `'Next'`
- Обязательное: нет

### `overrides`
Переопределения поля и календаря. Подробнее в разделе [Переопределение](#переопределение).
- Тип: `CalendarOverrides & TextFieldOverrides`
- По умолчанию: `undefined`
- Обязательное: нет
