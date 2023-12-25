import React from 'react';
import Calendar from '@via-profit/ui-kit/src/Calendar';
import CalendarEmptyCell from '@via-profit/ui-kit/src/Calendar/CalendarEmptyCell';

import DizzyFace from '~/components/Icons/DizzyFace';

const ExampleCalendarOverrides: React.FC = () => {
  const [date, setDate] = React.useState<Date>(new Date());

  return (
    <>
      <div>
        <Calendar
          value={date}
          onChange={setDate}
          locale="ru-RU"
          markToday
          overrides={{
            EmptyCell: React.forwardRef(function EmptyCell(props, ref) {
              return (
                <CalendarEmptyCell {...props} ref={ref}>
                  <DizzyFace />
                </CalendarEmptyCell>
              );
            }),
          }}
        />
      </div>
    </>
  );
};

export default ExampleCalendarOverrides;
