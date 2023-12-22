import React from 'react';
import DatePicker from '@via-profit/ui-kit/src/DatePicker';

const ExampleDatePickerOverview: React.FC = () => {
  const [value, setValue] = React.useState<null | Date>(null);

  return (
    <DatePicker
      template="dd.mm.yyyy"
      calendarButtonTooltip="Open calendar"
      value={value}
      onChange={setValue}
      minDate={new Date(2003, 1, 22)}
      maxDate={new Date(2023, 11, 31)}
    />
  );
};

export default ExampleDatePickerOverview;
