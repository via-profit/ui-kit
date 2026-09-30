import React from 'react';
import Calendar from '@via-profit/ui-kit/src/Calendar';
import { FormattedDate, useIntl } from 'react-intl';

const ExampleCalendarBasic: React.FC = () => {
  const intl = useIntl();
  const [date, setDate] = React.useState<Date | null>(new Date());

  return (
    <Calendar
      value={date}
      onChange={setDate}
      locale={intl.locale}
      heading={date ? <FormattedDate value={date} day="numeric" month="long" /> : '—'}
      subheading={date ? <FormattedDate value={date} weekday="long" /> : undefined}
      todayButtonLabel={intl.formatMessage({ defaultMessage: 'Сегодня' })}
      prevButtonLabel={intl.formatMessage({ defaultMessage: 'Назад' })}
      nextButtonLabel={intl.formatMessage({ defaultMessage: 'Вперёд' })}
    />
  );
};

export default ExampleCalendarBasic;
