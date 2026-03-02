import React from 'react';
import Calendar, { CalendarRef, CalendarValue } from '@via-profit/ui-kit/src/Calendar';
import { FormattedDate } from 'react-intl';

const ExampleCalendarViews: React.FC = () => {
  const calendarRef = React.useRef<CalendarRef<true> | null>(null);
  const [value, setValue] = React.useState<CalendarValue<true>>([new Date(), new Date()]);

  return (
    <div>
      <Calendar
        ref={calendarRef}
        range
        view="weeks"
        value={value}
        views={['weeks']}
        onChange={setValue}
        markToday
        subheading={
          <span>
            {value[0] ? (
              <FormattedDate value={value[0]} year="numeric" month="2-digit" day="2-digit" />
            ) : (
              '-'
            )}
            <span> between </span>
            {value[1] ? (
              <FormattedDate value={value[1]} year="numeric" month="2-digit" day="2-digit" />
            ) : (
              '-'
            )}
          </span>
        }
      />
    </div>
  );
};

export default ExampleCalendarViews;
