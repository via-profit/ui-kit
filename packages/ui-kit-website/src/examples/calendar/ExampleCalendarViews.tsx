import React from 'react';
import styled from '@emotion/styled';
import Calendar, { CalendarValue } from '@via-profit/ui-kit/src/Calendar';
import { useIntl } from 'react-intl';

const Row = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: flex-start;
  gap: 1.5em;
`;

const ExampleCalendarViews: React.FC = () => {
  const intl = useIntl();
  const [month, setMonth] = React.useState<Date | null>(new Date());
  const [year, setYear] = React.useState<Date | null>(new Date());
  const [week, setWeek] = React.useState<CalendarValue<true>>(null);

  return (
    <Row>
      <Calendar
        value={month}
        onChange={setMonth}
        views={['months', 'years']}
        locale={intl.locale}
        heading={intl.formatMessage({ defaultMessage: 'Месяц' })}
        subheading={month ? intl.formatDate(month, { month: 'long', year: 'numeric' }) : '—'}
      />
      <Calendar
        value={year}
        onChange={setYear}
        views={['years']}
        locale={intl.locale}
        heading={intl.formatMessage({ defaultMessage: 'Год' })}
        subheading={year ? String(year.getFullYear()) : '—'}
      />
      <Calendar
        range
        value={week}
        onChange={setWeek}
        views={['weeks']}
        locale={intl.locale}
        heading={intl.formatMessage({ defaultMessage: 'Неделя' })}
        subheading={
          week?.[0] && week[1] ? `${intl.formatDate(week[0])} — ${intl.formatDate(week[1])}` : '—'
        }
      />
    </Row>
  );
};

export default ExampleCalendarViews;
