# Date Picker

## Содержание

- [Описание](#описание)
- useCalendar

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