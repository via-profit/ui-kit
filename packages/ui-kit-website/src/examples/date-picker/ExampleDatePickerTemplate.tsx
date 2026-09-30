import React from 'react';
import DatePicker from '@via-profit/ui-kit/src/DatePicker';
import { useIntl } from 'react-intl';

const ExampleDatePickerTemplate: React.FC = () => {
  const intl = useIntl();
  const [value, setValue] = React.useState<Date | null>(new Date());

  return (
    <DatePicker
      label={intl.formatMessage({ defaultMessage: 'Дата в формате ISO' })}
      template="yyyy-mm-dd"
      value={value}
      onChange={setValue}
      locale={intl.locale}
      todayButtonLabel={intl.formatMessage({ defaultMessage: 'Сегодня' })}
      calendarButtonTooltip={intl.formatMessage({ defaultMessage: 'Открыть календарь' })}
    />
  );
};

export default ExampleDatePickerTemplate;
