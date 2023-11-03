import React from 'react';
import Calendar from '@via-profit/ui-kit/src/Calendar';

const ExampleCalendarOverivew: React.FC = () => {
  const [date, setDate] = React.useState(new Date());

  return (
    <>
    <p>{date.toISOString()}</p>
    <Calendar date={date} onSelectDate={d => setDate(d)} />
    </>
  );
};

export default ExampleCalendarOverivew;
