import React from 'react';
import Calendar from '@via-profit/ui-kit/src/Calendar';
import { useIntl } from 'react-intl';

const ExampleCalendarOverivew: React.FC = () => {
  const intl = useIntl();
  const [value, onChange] = React.useState<[Date, Date]>(() => {
    const currentDate = new Date();
    const nextDate = new Date(currentDate);
    nextDate.setDate(nextDate.getDate() + 6);

    return [currentDate, nextDate];
  });

  return (
    <div>
      <pre>{JSON.stringify(value, null, 2)}</pre>
      <Calendar
        range={true}
        value={value}
        onChange={([a, b]) => {


          onChange([a, b])
        }}
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
