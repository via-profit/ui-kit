# Календарь

## Содержание

- [Описание](#описание)
- [Выбор периода](#выбор-периода)
- [Виды: месяц, год, неделя](#виды-месяц-год-неделя)
- [Ограничения и бейджи](#ограничения-и-бейджи)
- [Кнопки в подвале](#кнопки-в-подвале)
- [Клавиатура и доступность](#клавиатура-и-доступность)
- [Управление через ref](#управление-через-ref)
- [Переопределение](#переопределение)
- [Хук useCalendar](#хук-usecalendar)
- [Свойства](#свойства)

## Описание

Компонент `<Calendar>` — календарь для выбора даты, периода, месяца, года или недели. Заголовок `heading` и подзаголовок `subheading` выводятся над панелью переключения месяцев. Удобно показывать там выбранное значение.

Кнопки с названием месяца и года открывают выбор месяца и года. Стрелки листают месяцы, а в режиме выбора месяца — годы.

Календарь бывает контролируемым (`value` + `onChange`) и неконтролируемым (`defaultValue`).

_Пример использования:_

```tsx
import React from 'react';
import { FormattedDate } from 'react-intl';
import Calendar from '@via-profit/ui-kit/Calendar';

const Example: React.FC = () => {
  const [date, setDate] = React.useState<Date | null>(new Date());

  return (
    <Calendar
      value={date}
      onChange={setDate}
      heading={date ? <FormattedDate value={date} day="numeric" month="long" /> : '—'}
      todayButtonLabel="Сегодня"
      prevButtonLabel="Назад"
      nextButtonLabel="Вперёд"
    />
  );
};

export default Example;
```

<ExampleCalendarBasic />

## Выбор периода

Со свойством `range` значение — массив `[начало, конец]`. Первый клик выбирает начало периода (`[date, null]`), второй — конец. Если второй день раньше первого, даты меняются местами. Следующий клик начинает новый период.

```tsx
import Calendar, { CalendarValue } from '@via-profit/ui-kit/Calendar';

const [range, setRange] = React.useState<CalendarValue<true>>(null);

<Calendar range value={range} onChange={setRange} resetButtonLabel="Сбросить" />;
```

<ExampleCalendarRange />

## Виды: месяц, год, неделя

Свойство `views` задаёт виды календаря и их порядок:

- `days` — дни месяца;
- `months` — месяцы года;
- `years` — годы;
- `weeks` — недели (только с `range`): клик выбирает неделю целиком.

После выбора в одном виде календарь переходит к следующему, более подробному. Если такого вида нет, выбор завершается и вызывается `onChange`:

- `views={['months', 'years']}` — выбор месяца, значение — первое число месяца. С `range` — `[первый день, конец последнего дня]`;
- `views={['years']}` — выбор года, значение — 1 января. С `range` — весь год;
- `views={['weeks']}` вместе с `range` — выбор недели.

Первым показывается вид `initialView`, а без него — первый из `views`. Свойство `view` делает вид контролируемым.

```tsx
<Calendar value={month} onChange={setMonth} views={['months', 'years']} />
<Calendar value={year} onChange={setYear} views={['years']} />
<Calendar range value={week} onChange={setWeek} views={['weeks']} />
```

<ExampleCalendarViews />

## Ограничения и бейджи

- `minDate` и `maxDate` ограничивают выбор: дни вне диапазона недоступны, месяцы и годы вне диапазона не показываются. Границы включают день целиком: при `minDate={new Date()}` сегодня доступно. По умолчанию — сто лет назад и вперёд;
- `badges` — отметки на днях, например количество событий. Цвет отметки задаёт `accentColor`.

```tsx
const today = new Date();

<Calendar
  value={date}
  onChange={setDate}
  minDate={today}
  maxDate={new Date(today.getFullYear(), today.getMonth(), today.getDate() + 30)}
  badges={[{ date: new Date(2026, 9, 2), badgeContent: 3 }]}
/>;
```

<ExampleCalendarLimits />

Создавайте `minDate`, `maxDate` и `badges` один раз, а не при каждом рендере: календарь пересчитывает сетку при их изменении.

## Кнопки в подвале

- `todayButtonLabel` — кнопка «Сегодня»: выбирает сегодняшний день;
- `resetButtonLabel` — кнопка сброса: возвращает значение, месяц и вид, которые были при первом рендере;
- `footer` — свои элементы в подвале.

Кнопка показывается, только если передан её текст.

```tsx
<Calendar
  value={date}
  onChange={setDate}
  footer={
    <>
      <Button onClick={() => setDate(tomorrow)}>Завтра</Button>
      <Button onClick={() => setDate(nextWeek)}>Через неделю</Button>
    </>
  }
/>
```

<ExampleCalendarCustomControls />

## Клавиатура и доступность

В сетку дней Tab попадает один раз — на выбранный день, сегодняшний или первый доступный. Дальше:

| Клавиша | Действие |
| --- | --- |
| ← / → | предыдущий / следующий день |
| ↑ / ↓ | тот же день недели на неделю раньше / позже |
| Home / End | начало / конец недели |
| PageUp / PageDown | тот же день в предыдущем / следующем месяце |
| Enter, пробел | выбрать день |

При переходе через границу месяца календарь переключает месяц. Фокус не выходит за `minDate` и `maxDate`.

Каждый день озвучивается программами чтения с экрана полной датой («среда, 30 сентября 2026 г.»). Выбранные дни отмечены `aria-pressed`, сегодняшний — `aria-current="date"`. Подписи стрелок задают `prevButtonLabel` и `nextButtonLabel`. Они же показываются во всплывающей подсказке.

## Управление через ref

`ref` календаря — объект с методами:

- `setView(view)` — показать вид;
- `setViews(views)` — изменить список видов;
- `getActiveView()` — текущий вид;
- `setValue(value)` — задать значение неконтролируемого календаря;
- `setCalendarDate(date)` — показать месяц этой даты;
- `getCalendarDate()` — дата показанного месяца;
- `reset()` — то же, что кнопка сброса.

## Переопределение

Компонент `<Calendar>` является составным и реализован при помощи следующих компонентов:

- `<Paper>` — подложка календаря
- `<Header>` — шапка: заголовок, подзаголовок и панель
- `<Heading>`, `<Subheading>` — заголовок и подзаголовок
- `<Toolbar>` — панель со стрелками и кнопками месяца и года
- `<ControlButton>` — кнопка панели и подвала
- `<IconPrev>`, `<IconNext>` — иконки стрелок
- `<WeekDaysBar>` — названия дней недели
- `<Body>` — область с текущим видом
- `<DateContainer>` — сетка дней
- `<WeekRow>` — неделя в сетке дней
- `<Cell>` — день месяца
- `<EmptyCell>` — день соседнего месяца
- `<DayBadge>` — отметка дня
- `<MonthsSelector>`, `<MonthCell>` — список месяцев и месяц
- `<YearsSelector>` — список лет
- `<WeekRowButton>`, `<WeekDayCell>`, `<WeekDayWeekNumber>` — неделя, её день и номер в виде `weeks`
- `<Footer>` — подвал

Используйте свойство `overrides`, чтобы переопределить один или несколько компонентов. Проще всего расширить стандартный компонент с помощью `styled`. Создавайте переопределения один раз — вне компонента, а не при рендере.

_Пример использования:_

```tsx
import React from 'react';
import styled from '@emotion/styled';
import Calendar from '@via-profit/ui-kit/Calendar';
import CalendarEmptyCell from '@via-profit/ui-kit/Calendar/CalendarEmptyCell';

// The days of the neighbour months are hidden, the grid keeps its shape
const EmptyCell = styled(CalendarEmptyCell)`
  visibility: hidden;
`;

// Created once, outside of the component
const overrides = { EmptyCell };

const Example: React.FC = () => {
  const [date, setDate] = React.useState<Date | null>(new Date());

  return <Calendar value={date} onChange={setDate} overrides={overrides} />;
};

export default Example;
```

<ExampleCalendarOverrides />

## Хук useCalendar

Календарь построен на хуке `useCalendar`. С ним можно сделать свой календарь с другой разметкой.

```tsx
const calendar = useCalendar({
  locale: 'ru-RU', // локаль
  weekStartDay: 'monday', // первый день недели
  displayLeadingZero: false, // дни без ведущего нуля
  minDate, // минимальная дата
  maxDate, // максимальная дата
});
```

Хук возвращает функции:

- `getWeeks(date)` — недели месяца даты `date`. Неделя — `{ weekNumber, days }`, день — `{ date, isToday, isDisabled }`. В неделях есть дни соседних месяцев, чтобы сетка была полной;
- `getDayLabel(date)` — число месяца (с ведущим нулём, если `displayLeadingZero`);
- `getMonthLabel(date)`, `getYearLabel(date)` — название месяца и год в локали;
- `getMonthsRange(minDate, maxDate, year)` — месяцы года, пересекающиеся с диапазоном;
- `getYearsRange(minDate, maxDate)` — годы диапазона;
- `isToday(date)`, `isSameDay(dateA, dateB)` — сравнение дат по году, месяцу и дню.

Создавайте `minDate` и `maxDate` один раз, а не при каждом рендере.

_Пример использования:_

```tsx
import React from 'react';
import { useCalendar } from '@via-profit/ui-kit/Calendar';

const minDate = new Date(new Date().getFullYear() - 100, 0, 1);
const maxDate = new Date(new Date().getFullYear() + 100, 0, 1);

const Example: React.FC = () => {
  const currentDate = new Date();
  const { getWeeks, getDayLabel } = useCalendar({
    locale: 'ru-RU',
    weekStartDay: 'monday',
    displayLeadingZero: false,
    minDate,
    maxDate,
  });

  return (
    <div>
      {getWeeks(currentDate).map(week => (
        <div key={week.weekNumber}>
          {week.days.map(day => (
            <span
              key={day.date.getTime()}
              style={{
                opacity: day.date.getMonth() === currentDate.getMonth() ? 1 : 0.4,
                fontWeight: day.isToday ? 700 : 400,
              }}
            >
              {getDayLabel(day.date)}
            </span>
          ))}
        </div>
      ))}
    </div>
  );
};

export default Example;
```

<ExampleCalendarHooks />

## Свойства

### `value`
Значение контролируемого календаря: дата, а с `range` — `[начало, конец]`. Передавайте вместе с `onChange`.
- Тип: `Date | null`, с `range` — `[Date, Date] | [Date, Date | null] | null`
- По умолчанию: `undefined`
- Обязательное: нет

### `defaultValue`
Начальное значение неконтролируемого календаря.
- Тип: как у `value`
- По умолчанию: `undefined`
- Обязательное: нет

### `onChange`
Вызывается при выборе и получает новое значение.
- Тип: `(value) => void`
- Обязательное: **да**

### `range`
Если `true`, выбирается период.
- Тип: `boolean`
- По умолчанию: `false`
- Обязательное: нет

### `views`
Виды календаря. Подробнее в разделе [Виды](#виды-месяц-год-неделя).
- Тип: `Array<'days' | 'months' | 'years' | 'weeks'>`
- По умолчанию: `['days', 'months', 'years']`, с `range` — ещё и `'weeks'`
- Обязательное: нет

### `initialView`
Вид, который показывается первым.
- Тип: `'days' | 'months' | 'years' | 'weeks'`
- По умолчанию: первый из `views`
- Обязательное: нет

### `view`
Текущий вид контролируемого календаря. Не используйте вместе с `initialView`.
- Тип: `'days' | 'months' | 'years' | 'weeks'`
- По умолчанию: `undefined`
- Обязательное: нет

### `locale`
Локаль названий месяцев, дней недели и подписей дней.
- Тип: `string`
- По умолчанию: `'ru-RU'`
- Обязательное: нет

### `weekStartDay`
Первый день недели.
- Тип: `'monday' | 'tuesday' | … | 'sunday'`
- По умолчанию: `'monday'`
- Обязательное: нет

### `weekDayLabelFormat`
Формат названий дней недели.
- Тип: `'short' | 'long' | 'narrow'`
- По умолчанию: `'short'`
- Обязательное: нет

### `displayLeadingZero`
Если `true`, числа выводятся с ведущим нулём: `01`, `02`.
- Тип: `boolean`
- По умолчанию: `false`
- Обязательное: нет

### `markToday`
Если `true`, сегодняшний день обведён.
- Тип: `boolean`
- По умолчанию: `true`
- Обязательное: нет

### `accentColor`
Цвет выбранного дня, месяца и года.
- Тип: `'primary' | 'secondary' | string`
- По умолчанию: `'primary'`
- Обязательное: нет

### `minDate`, `maxDate`
Границы выбора, включая день целиком.
- Тип: `Date`
- По умолчанию: сто лет назад и сто лет вперёд
- Обязательное: нет

### `badges`
Отметки на днях.
- Тип: `Array<{ date: Date; badgeContent: React.ReactNode; accentColor?: 'primary' | 'secondary' | string }>`
- По умолчанию: `[]`
- Обязательное: нет

### `heading`, `subheading`
Заголовок и подзаголовок.
- Тип: `React.ReactNode`
- По умолчанию: `undefined`
- Обязательное: нет

### `prevButtonLabel`, `nextButtonLabel`
Подписи стрелок для программ чтения с экрана и всплывающей подсказки.
- Тип: `string`
- По умолчанию: `'Previous'`, `'Next'`
- Обязательное: нет

### `todayButtonLabel`
Текст кнопки «Сегодня». Без него кнопки нет.
- Тип: `string`
- По умолчанию: `undefined`
- Обязательное: нет

### `resetButtonLabel`
Текст кнопки сброса. Без него кнопки нет.
- Тип: `string`
- По умолчанию: `undefined`
- Обязательное: нет

### `footer`
Свои элементы в подвале.
- Тип: `React.ReactNode`
- По умолчанию: `undefined`
- Обязательное: нет

### `overrides`
Объект для переопределения составных компонентов. Подробнее в разделе [Переопределение](#переопределение).
- Тип: `CalendarOverrides`
- По умолчанию: `undefined`
- Обязательное: нет
