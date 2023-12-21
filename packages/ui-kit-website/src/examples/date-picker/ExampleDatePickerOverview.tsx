import React from 'react';
import DatePicker from '@via-profit/ui-kit/src/DatePicker';

const ExampleDatePickerOverview: React.FC = () => {
  const [value, setValue] = React.useState<null | Date>(null);

  return (
    <DatePicker
      template="dd.mm.yyyy"
      calendarButtonTooltip="Open calendar"
      value={value}
      readOnly
      onChange={setValue}
      calendarProps={{
        locale: 'ru-RU',
        heading: 'Calendar',
        toodayButtonLabel: 'Today',
      }}
    />
  );
};

export default ExampleDatePickerOverview;
