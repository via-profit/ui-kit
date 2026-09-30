import React from 'react';
import Calendar, { CalendarValue } from '@via-profit/ui-kit/src/Calendar';
import { FormattedMessage, useIntl } from 'react-intl';

const ExampleCalendarRange: React.FC = () => {
  const intl = useIntl();
  const [range, setRange] = React.useState<CalendarValue<true>>(null);
  const [from, to] = range || [null, null];
  const format = (date: Date | null) =>
    date ? intl.formatDate(date, { day: 'numeric', month: 'short' }) : '…';

  return (
    <Calendar
      range
      value={range}
      onChange={setRange}
      locale={intl.locale}
      heading={
        from ? (
          `${format(from)} — ${format(to)}`
        ) : (
          <FormattedMessage defaultMessage="Выберите даты поездки" />
        )
      }
      resetButtonLabel={intl.formatMessage({ defaultMessage: 'Сбросить' })}
      prevButtonLabel={intl.formatMessage({ defaultMessage: 'Назад' })}
      nextButtonLabel={intl.formatMessage({ defaultMessage: 'Вперёд' })}
    />
  );
};

export default ExampleCalendarRange;
