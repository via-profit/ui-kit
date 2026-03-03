import React from 'react';
import { FormattedDate } from 'react-intl';
import Calendar from '@via-profit/ui-kit/src/Calendar';

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
