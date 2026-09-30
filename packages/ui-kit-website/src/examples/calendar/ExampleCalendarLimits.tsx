import React from 'react';
import Calendar, { CalendarBadge } from '@via-profit/ui-kit/src/Calendar';
import { useIntl } from 'react-intl';

const today = new Date();
const minDate = today;
// Booking is open for the next 30 days
const maxDate = new Date(today.getFullYear(), today.getMonth(), today.getDate() + 30);
// Free slots per day
const badges: CalendarBadge[] = [2, 5, 9, 12].map((offset, index) => ({
  date: new Date(today.getFullYear(), today.getMonth(), today.getDate() + offset),
  badgeContent: [3, 1, 8, 2][index],
  accentColor: index === 1 ? 'secondary' : undefined,
}));

const ExampleCalendarLimits: React.FC = () => {
  const intl = useIntl();
  const [date, setDate] = React.useState<Date | null>(null);

  return (
    <Calendar
      value={date}
      onChange={setDate}
      minDate={minDate}
      maxDate={maxDate}
      badges={badges}
      locale={intl.locale}
      heading={intl.formatMessage({ defaultMessage: 'Запись на приём' })}
      subheading={
        date
          ? intl.formatDate(date, { day: 'numeric', month: 'long' })
          : intl.formatMessage({ defaultMessage: 'Выберите день' })
      }
    />
  );
};

export default ExampleCalendarLimits;
