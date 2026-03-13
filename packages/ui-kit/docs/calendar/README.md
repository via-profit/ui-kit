# Календарь

## Содержание

- [Описание](#описание)
- [Дополнительные кнопки](#дополнительные-кнопки)
- [Хуки](#хуки)
- [Переопределение компонентов](#переопределение-компонентов)
- [Свойства](#свойства)

## Описание

Компонент `<Calendar>` создаёт интерактивный календарь с возможностью выбора даты, переключения месяцев и прочее.

<ExampleCalendarOverivew/>

<br />
_Пример использования:_

```tsx
import React from 'react';
import { FormattedDate } from 'react-intl';
import Calendar from '@via-profit/ui-kit/Calendar';

const ExampleCalendarOverivew: React.FC = () => {
  const [value, onChange] = React.useState(new Date());

  return (
    <div>
      <Calendar
        value={value}
        heading={<FormattedDate value={value} year="numeric" month="long" day="2-digit" />}
        onChange={onChange}
        badges={[
          { date: new Date(2023, 11, 31), badgeContent: '1' },
          { date: new Date(2023, 11, 7), badgeContent: '88+' },
          { date: new Date(2023, 11, 12), badgeContent: '396+', accentColor: 'primary' },
        ]}
      />
    </div>
  );
};

export default ExampleCalendarOverivew;


```



<ExampleCalendarViews />


## Дополнительные кнопки

Календарь может содержать футер как с определёнными кнопками, такими как: кнопка сброса; кнопка перехода на текущий день, так и с кастомными элементами управления, которые возможно передать дополнительно. Для отображения заранее заготовленных кнопок используйте следующие параметры:

- **resetButtonLabel** — если передан, то в футере календаря будет отображена кнопка сброса, где в качестве текста будет использовано переданное значение.
- **toodayButtonLabel** — если передан, то в футере календаря будет отображена кнопка перехода к текущему дню, где в качестве текста будет использовано переданное значение.

Для отображения собственных элементов управления следует использовать свойство `footer`, где в качестве значения снеобходимо передать `JSX` элемент с необходимым вам набором кнопок и прочих элементов управления.

_Пример использования:_

```tsx
import React from 'react';
import Calendar from '@via-profit/ui-kit/Calendar';
import Button from '@via-profit/ui-kit/Button';

const ExampleCalendarCustomControls: React.FC = () => {
  const [value, onChange] = React.useState(new Date());
  const intl = useIntl();

  return (
    <div>
      <Calendar
        value={value}
        onChange={onChange}
        footer={
          <>
            <Button onClick={() => onChange(new Date(value.getFullYear(), 4, 9))}>к 9 Мая</Button>
          </>
        }
      />
    </div>
  );
};

export default ExampleCalendarCustomControls;
```

<ExampleCalendarCustomControls />

## Хуки

Компонент реализован по средствам набора свойств и методов, доступных в хуке `useCalendar`. Данный хук позволяет реализовывать собственные календари.

_Использование хука:_

```tsx
const paylaod = useCalendar({
  locale: 'ru-RU', // Локаль календаря
  weekStartDay: 'monday', // День недели начинается с понедельника
  displayLeadingZero: false, // Отображать дни без ведущего нуля
  minDate: new Date(), //Минимальная доступная дата
  maxDate: new Date(), // Максимальная доступная дата
});
```

Хук `useCalendar` возвращает следующий набор данных:

- `isToday` — Функция, принимающая один аргумент типа `Date` и возвращающая `true` в случае, если переданная дата совпадает с сегодняшним числом. **Важно: Сравнивается только год, месяц и день**
- `isSameDay` — Функция, принимающая два аргумента типа `Date` и возвращающая `true` в случае, если переданные даты совпадают по году, месяцу и дню.
- `getWeeks` — Функция, принимающая один аргумент типа `Date` и возвращающая массив недель. Каждый элемент массива представляет собой объект содержащий сведения о текущей неделе и список дней недели
- `getDayLabel` — Функция, принимающая один аргумент типа `Date` и возвращающая строку, сформированную при помощи [Intl](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl) согласно установленноу локали
- `getMonthLabel` — Функция, принимающая один аргумент типа `Date` и возвращающая строку, сформированную при помощи [Intl](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl) согласно установленноу локали
- `getYearLabel` — Функция, принимающая один аргумент типа `Date` и возвращающая строку, сформированную при помощи [Intl](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl) согласно установленноу локали
- `getYearsRange` — Функция, принимающая два аргумента типа `Date` и возвращающая массив лет, которые умещаются между переданными датами. **Важно: Возвращаемый массив будет ограничен параметрами minDate и maxDate**
- `getMonthsRange` — Функция, принимающая два аргумента типа `Date` и возвращающая массив месяцев, которые умещаются между переданными датами. **Важно: Возвращаемый массив будет ограничен параметрами minDate и maxDate**

_Пример использования (краткая версия):_

```tsx
import React from 'react';
import { useCalendar } from '@via-profit/ui-kit/Calendar';

const Example: React.FC = () => {
  const currentDate = new Date(); // текущая дата от котороу будет построен календарь

  const { isToday, getWeeks, getDayLabel } = useCalendar({
    locale: 'ru-RU', // Локаль календаря
    weekStartDay: 'monday', // День недели начинается с понедельника
    displayLeadingZero: false, // Отображать дни без ведущего нуля
    minDate: new Date(new Date().getFullYear() - 100, 0, 1), // 100 лет назад
    maxDate: new Date(new Date().getFullYear() + 100, 0, 1), // 100 лет вперёд
  });

  return (
    <div>
      {getWeeks(currentDate).map(week => {
        return (
          <div key={week.weekNumber}>
            {week.days.map(day => (
              <span key={date.getTime()}>{getDayLabel(day.date)}</span>
            ))}
          </div>
        );
      })}
    </div>
  );
};

export default Example;
```

<ExampleCalendarHooks />

_Пример использования (полная версия):_

```tsx
import React from 'react';
import { useCalendar } from '@via-profit/ui-kit/Calendar';

const Example: React.FC = () => {
  const currentDate = new Date(); // текущая дата от котороу будет построен календарь

  const { isToday, getWeeks, getDayLabel } = useCalendar({
    locale: 'ru-RU', // Локаль календаря
    weekStartDay: 'monday', // День недели начинается с понедельника
    displayLeadingZero: false, // Отображать дни без ведущего нуля
    minDate: new Date(new Date().getFullYear() - 100, 0, 1), // 100 лет назад
    maxDate: new Date(new Date().getFullYear() + 100, 0, 1), // 100 лет вперёд
  });

  return (
    <div>
      {/* getWeeks вернет список недель */}
      {getWeeks(currentDate).map(week => {
        const {
          days, // Массив дней текущей недели
          weekNumber, // Номер недели
        } = week;

        // Рендерим каждую неделю в которой будем перебирать вложенные дни
        return (
          <div key={weekNumber}>
            {/* Перебираем массив дней */}
            {days.map(day => {
              const {
                date, // Дата текущего дня
                isToday, // Признак того, что этот день совпадает с сегодняшним
                isDisabled, // Признак того, что день попал под ограничение minDate и maxDate
              } = day;
              const dayLabel = getDayLabel(date);
              const key = date.getTime();
              const isDayOfCurrentMonth = date.getMonth() === currenrtDate.getMonth();

              // Если это сегодняшний день
              if (isToday) {
                return <CurrentDay key={key}>{dayLabel}</CurrentDay>;
              }

              // Если это день текущего месяца
              if (isDayOfCurrentMonth) {
                return <DayOfCurrentMonth key={key}>{dayLabel}</DayOfCurrentMonth>;
              }

              // Если это день предыдущего или следующего месяца
              return <DayOfAnotherMonth key={key}>{dayLabel}</DayOfAnotherMonth>;
            })}
          </div>
        );
      })}
    </div>
  );
};

export default Example;
```

<ExampleCalendarHooks />

## Переопределение компонентов

Компонент `<Calendar>` является составным и реализован при помощи следующих компонентов:

- `<Body>` — Контейнер содержащий основую часть календаря (дни, список месяцев и лет)
- `<Cell>` — Компонент, представляющий день месяца
- `<EmptyCell>` — Компонент, представляющий заполнитель (пустой день) месяца
- `<Paper>` — Подложка всего календаря
- `<Header>` — Обертка заголовка календаря
- `<WeekRow>` — Компонент одной недели в списке дней
- `<DateContainer>` — Контейнер содержащий список дней
- `<Toolbar>` — Компонет верхнего тулбара
- `<YearsSelector>` — Контейнер списка лет
- `<MonthsSelector>` — Контейнер списка месяцев
- `<MonthCell>` — Компонент, представляющий один месяц в списке месяцев
- `<YearCell>` — Компонент, представляющий один год в списке лет
- `<DayBadge>` — компонент бэйдж
- `<Footer>` — Футер календаря
- `<ControlButton>` — Кнопка в панеле тулбара календаря
- `<Heading>` — Текстовый заголовок календаря
- `<Subheading>` — Текстовый подзаголовок календаря
- `<IconPrev>` — Иконка, расположенная на кнопке переключения на предыдущий месяц
- `<IconNext>` — Иконка, расположенная на кнопке переключения на следующий месяц
- `<WeekDaysBar>` — Компонент, содержащий названия недель

Используйте свойство `overrides` чтобы переопределить один или несколько компонентов:

_Пример использования:_

```tsx
import React from 'react';
import Calendar from '@via-profit/ui-kit/Calendar';
import CalendarEmptyCell from '@via-profit/ui-kit/Calendar/CalendarEmptyCell';

import DizzyFace from './DizzyFace';

const Example: React.FC = () => {
  const [date, setDate] = React.useState<Date>(new Date());

  return (
    <Calendar
      value={date}
      onChange={setDate}
      locale="ru-RU"
      markToday
      overrides={{
        // Перезаписываем EmptyCell.
        // Обратите внимание, что здесь прокидывается ref, однако
        // прокинуть ref можно и при объявлении компонента, главное не забыть
        EmptyCell: React.forwardRef(function EmptyCell(props, ref) {
          return (
            <CalendarEmptyCell {...props} ref={ref}>
              <DizzyFace />
            </CalendarEmptyCell>
          );
        }),
      }}
    />
  );
};

export default Example;
```

<ExampleCalendarOverrides />

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

### `views`
Список возможных представлений календаря (дни, выбор месяца, выбор года)

### `footer`
Кастомные элементы, которые будут добавлены в футер календаря

### `overrides`
Объект элементов для переопределения составных компонентов календаря

### `overrides .Body`
Контейнер содержащий основую часть календаря (дни, список месяцев и лет)

### `overrides .Cell`
Компонент, представляющий день месяца

### `overrides .EmptyCell`
Компонент, представляющий заполнитель (пустой день) месяца

### `overrides .Paper`
Подложка всего календаря

### `overrides .Header`
Обертка заголовка календаря

### `overrides .WeekRow`
Компонент одной недели в списке дней

### `overrides .DateContainer`
Контейнер содержащий список дней

### `overrides .Toolbar`
Компонет верхнего тулбара

### `overrides .YearsSelector`
Контейнер списка лет

### `overrides .MonthsSelector`
Контейнер списка месяцев

### `overrides .MonthCell`
Компонент, представляющий один месяц в списке месяцев

### `overrides .YearCell`
Компонент, представляющий один год в списке лет

### `overrides .DayBadge`
компонент бэйдж

### `overrides .Footer`
Футер календаря

### `overrides .ControlButton`
Кнопка в панеле тулбара календаря

### `overrides .Heading`
Текстовый заголовок календаря

### `overrides .Subheading`
Текстовый подзаголовок календаря

### `overrides .IconPrev`
Иконка, расположенная на кнопке переключения на предыдущий месяц

### `overrides .IconNext`
Иконка, расположенная на кнопке переключения на следующий месяц

### `overrides .WeekDaysBar`
Компонент, содержащий названия недель
