import React from 'react';
import { FormattedDate } from 'react-intl';
import Calendar, { CalendarValue } from '@via-profit/ui-kit/src/Calendar';
import styled from '@emotion/styled';

const Grid = styled.div`
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 1em;
`;

const ExampleCalendarOverivew: React.FC = () => {
  const [value, onChange] = React.useState<CalendarValue<undefined>>(new Date());
  const [values, onChangeDates] = React.useState<CalendarValue<true>>([new Date(), null]);

  return (
    <Grid>
      <Calendar
        value={value}
        onChange={onChange}
        heading={'Years only'}
        views={['years']}
      />
      <Calendar
        value={value}
        onChange={onChange}
        heading={'Years and months'}
        views={['years', 'months']}
      />
      <Calendar
        value={value}
        onChange={onChange}
        heading={'Years, months and days'}
        views={['years', 'months', 'days']}
      />

      <Calendar
        value={value}
        heading={'Months only'}
        onChange={onChange}
        views={['months']}
      />
      <Calendar
        value={value}
        heading={'Months and years'}
        onChange={onChange}
        views={['months', 'years']}
      />
      <Calendar
        value={value}
        heading={'Months, years and days'}
        onChange={onChange}
        views={['months', 'years', 'days']}
      />
      <Calendar
        range
        value={values}
        onChange={onChangeDates}
        heading={'Weeks only'}
        views={['weeks']}
      />

      <Calendar
        range
        value={values}
        onChange={onChangeDates}
        heading={'Weeks and days'}
        views={['weeks', 'days']}
      />

      <Calendar
        range
        value={values}
        onChange={onChangeDates}
        heading={'Weeks, months and years'}
        views={['weeks', 'months', 'years']}
      />

    <Calendar
      range
      value={values}
      onChange={onChangeDates}
      heading={'Days only'}
      views={['days']}
    />

    </Grid>
  );
};

export default ExampleCalendarOverivew;
