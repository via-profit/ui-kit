import React from 'react';
import styled from '@emotion/styled';
import Calendar from '@via-profit/ui-kit/src/Calendar';
import CalendarEmptyCell from '@via-profit/ui-kit/src/Calendar/CalendarEmptyCell';
import { useIntl } from 'react-intl';

// Defined once at module level, not during the render.
// The days of the neighbour months are hidden, the grid keeps its shape
const EmptyCell = styled(CalendarEmptyCell)`
  visibility: hidden;
`;

const overrides = { EmptyCell };

const ExampleCalendarOverrides: React.FC = () => {
  const intl = useIntl();
  const [date, setDate] = React.useState<Date | null>(new Date());

  return <Calendar value={date} onChange={setDate} locale={intl.locale} overrides={overrides} />;
};

export default ExampleCalendarOverrides;
