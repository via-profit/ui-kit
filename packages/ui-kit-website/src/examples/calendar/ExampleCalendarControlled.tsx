import React from 'react';
import { useIntl } from 'react-intl';

import Calendar from '@via-profit/ui-kit/src/Calendar';

const locale = 'ru-RU';
const ExampleCalendarControlled: React.FC = () => {
  const intl = useIntl();
  const [date, setDate] = React.useState(new Date());
  const [selected, setSelected] = React.useState<readonly Date[]>([]);

  const subheading = React.useMemo(() => {
    if (selected.length) {
      return intl.formatMessage(
        { defaultMessage: 'Выбрана дата: {date}' },
        {
          date: new Intl.DateTimeFormat(locale, {
            day: 'numeric',
            month: 'long',
            year: 'numeric',
          }).format(selected[0]),
        },
      );
    }

    return intl.formatMessage({ defaultMessage: 'Дата не выбрана' });
  }, [intl, selected]);

  return (
    <>
      <div>
        <Calendar
          // value={date}
          // onChange={setDate}
          toodayButtonLabel={intl.formatMessage({ defaultMessage: 'Сегодня' })}
          locale={locale}
          heading={intl.formatMessage({ defaultMessage: 'Контроллируемый' })}
          subheading={subheading}
          onDateSelect={setSelected}
          selected={selected}
          markToday
        />
      </div>
    </>
  );
};

export default ExampleCalendarControlled;
