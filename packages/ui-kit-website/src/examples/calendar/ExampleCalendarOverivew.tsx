import React from 'react';
import Calendar from '@via-profit/ui-kit/src/Calendar';
import { useIntl } from 'react-intl';

const ExampleCalendarOverivew: React.FC = () => {
  const intl = useIntl();
  const [value, onChange] = React.useState(new Date());

  return (
    <div>
      <Calendar
        value={value}
        onChange={onChange}
        badges={[
          { date: new Date(2023, 11, 31), badgeContent: '1' },
          { date: new Date(2023, 11, 7), badgeContent: '88+' },
          { date: new Date(2023, 11, 12), badgeContent: '396+', accentColor: 'primary' },
        ]}
        toodayButtonLabel={intl.formatMessage({ defaultMessage: 'Сегодня' })}
        heading={intl.formatMessage({ defaultMessage: 'Календарь' })}
        subheading={intl.formatMessage(
          { defaultMessage: 'Выбрана дата: {value}' },
          { value: intl.formatDate(value, { dateStyle: 'medium' }) },
        )}
      />
    </div>
  );
};

export default ExampleCalendarOverivew;
