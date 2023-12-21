import React from 'react';
import { useIntl } from 'react-intl';

import Calendar from '@via-profit/ui-kit/src/Calendar';
import Button from '@via-profit/ui-kit/src/Button';

const locale = 'ru-RU';
const ExampleCalendarControlled: React.FC = () => {
  const intl = useIntl();
  const [date, setDate] = React.useState<Date>(new Date(2024, 5, 16));

  const subheading = React.useMemo(() => {
    if (date) {
      return intl.formatMessage(
        { defaultMessage: 'Выбрана дата: {date}' },
        {
          date: new Intl.DateTimeFormat(locale, {
            day: 'numeric',
            month: 'long',
            year: 'numeric',
          }).format(date),
        },
      );
    }

    return intl.formatMessage({ defaultMessage: 'Дата не выбрана' });
  }, [intl, date]);

  return (
    <>
      <div>
        <Calendar
          value={date}
          onChange={setDate}
          toodayButtonLabel={intl.formatMessage({ defaultMessage: 'Сегодня' })}
          resetButtonLabel={intl.formatMessage({ defaultMessage: 'Сбросить' })}
          locale={locale}
          heading={intl.formatMessage({ defaultMessage: 'Контроллируемый' })}
          subheading={subheading}
          markToday
        />
        <Button onClick={() => setDate(new Date(2024, 11, 31))}>
          Set Date as 2024 december 31
        </Button>
      </div>
    </>
  );
};

export default ExampleCalendarControlled;
