import React from 'react';
import Calendar from '@via-profit/ui-kit/src/Calendar';

const ExampleCalendarOverivew: React.FC = () => {
  const [] = React.useState(false);

  return <Calendar date={new Date()} />;
};

export default ExampleCalendarOverivew;
