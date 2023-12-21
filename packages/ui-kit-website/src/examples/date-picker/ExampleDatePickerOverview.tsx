import React from 'react';
import DatePicker from '@via-profit/ui-kit/src/DatePicker';

const ExampleDatePickerOverview: React.FC = () => {
  const [value, setValue] = React.useState<null | Date>(null);

  return (
    <DatePicker
      label={
        value
          ? new Intl.DateTimeFormat('ru-RU', {
              day: '2-digit',
              month: '2-digit',
              year: 'numeric',
            }).format(value)
          : 'not set'
      }
      template="yyyy/mm/dd"
      value={value}
      onChange={date => setValue(date)}
    />
  );
};

export default ExampleDatePickerOverview;
