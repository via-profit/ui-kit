import React from 'react';
import Calendar, { CalendarRef } from '@via-profit/ui-kit/src/Calendar';
import { useIntl } from 'react-intl';
import Button from '@via-profit/ui-kit/src/Button';

const ExampleCalendarOverivew: React.FC = () => {
  const intl = useIntl();
  const calendarRef = React.useRef<CalendarRef<true> | null>(null);

  return (
    <div>
      <Button
        onClick={() => {
          const d = new Date(new Date().getFullYear(), 4, 9);

          calendarRef.current?.setValue([d, d]);
          calendarRef.current?.setCalendarDate(d);
        }}
      >
        set may, 9th
      </Button>
      <Button onClick={() => calendarRef.current?.setView('weeks')}>set view as weeks</Button>
      <Button onClick={() => calendarRef.current?.setView('months')}>set view as months</Button>
      <Calendar
        range
        ref={calendarRef}
        view={'days'}
        resetButtonLabel='reset'
        views={['months', 'days', 'weeks', 'years']}
        onChange={value => {
          console.log(value);
        }}
        markToday
        badges={[
          {
            date: new Date(new Date().getFullYear(), new Date().getMonth(), 26),
            badgeContent: '1',
          },
          {
            date: new Date(new Date().getFullYear(), new Date().getMonth(), 7),
            badgeContent: '88+',
          },
          {
            date: new Date(new Date().getFullYear(), new Date().getMonth(), 12),
            badgeContent: '396+',
            accentColor: 'primary',
          },
        ]}
        todayButtonLabel={intl.formatMessage({ defaultMessage: 'Сегодня' })}
        heading={intl.formatMessage({ defaultMessage: 'Календарь' })}
        // subheading={intl.formatMessage(
        //   { defaultMessage: 'Выбрана дата: {value}' },
        //   { value: intl.formatDate(value, { dateStyle: 'medium' }) },
        // )}
      />
    </div>
  );
};

export default ExampleCalendarOverivew;
