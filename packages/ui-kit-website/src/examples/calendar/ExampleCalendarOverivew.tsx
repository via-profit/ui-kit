import React from 'react';
import Calendar, { CalendarOnChange, CalendarRef, CalendarValue } from '@via-profit/ui-kit/src/Calendar';
import styled from '@emotion/styled';
import Button from '@via-profit/ui-kit/src/Button';

const Grid = styled.div`
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 1em;
`;

const ExampleCalendarOverivew: React.FC = () => {
  const [value, onChange] = React.useState<CalendarValue<undefined>>(new Date());
  const [values, onChangeDates] = React.useState<CalendarValue<true>>([new Date(), new Date()]);
  const calendarRef = React.useRef<CalendarRef<true>>(null);

  const renderTitle = React.useMemo(() => {
    const dates = [...values || []];

    return dates.map(v => {
      if (!v) {
        return '-';
      }

      return [v.getDate(), v.getMonth() + 1, v.getFullYear()].join('.');
    }).join(' - ');

  }, [values]);





  return (
    <Grid>
      <Calendar
        range
        value={values}
        ref={calendarRef}
        onChange={onChangeDates}
        views={['days', 'months', 'years', 'weeks']}
        heading={renderTitle}
        footer={<>
          <Button onClick={() => {
            if (calendarRef.current) {
              const activeView = calendarRef.current.getActiveView();
              if(activeView !== 'days') {

                // calendarRef.current.setView('days');

              }

              const d1 = calendarRef.current.getCalendarDate();
              onChangeDates([d1, d1]);
              calendarRef.current.setValue([d1, d1]);
              // if (activeView === 'months') {
              //   calendarRef.current.setViews(['days', 'months', 'years', 'weeks']);
              //   setTimeout(() => {
              //     calendarRef.current?.setView('days');
              //   }, 300)
              // } else {
              //   calendarRef.current.setViews(['years', 'months']);
              //   setTimeout(() => {
              //     calendarRef.current.setView('months');
              //   }, 300)
              // }

            }
          }}>Month</Button>
          <Button onClick={() => {
            if (calendarRef.current) {
              const activeView = calendarRef.current.getActiveView();
              if (activeView === 'months') {
                calendarRef.current.setViews(['days', 'months', 'years', 'weeks']);
              }

              calendarRef.current.setView(activeView === 'weeks' ? 'days' : 'weeks');
            }
          }}>Weeks</Button>
        </>}
      />
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
