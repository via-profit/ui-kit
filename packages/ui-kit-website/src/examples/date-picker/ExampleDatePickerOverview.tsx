import React from 'react';
import DatePicker from '@via-profit/ui-kit/src/DatePicker';
import { useIntl } from 'react-intl';

const ExampleDatePickerOverview: React.FC = () => {
  const intl = useIntl();
  const [value, setValue] = React.useState<Date | null>(null);

  return (
    <DatePicker
      label={intl.formatMessage({ defaultMessage: 'Дата рождения' })}
      placeholder={intl.formatMessage({ defaultMessage: 'дд.мм.гггг' })}
      template="dd.mm.yyyy"
      value={value}
      onChange={setValue}
      locale={intl.locale}
      calendarButtonTooltip={intl.formatMessage({ defaultMessage: 'Открыть календарь' })}
      prevButtonLabel={intl.formatMessage({ defaultMessage: 'Назад' })}
      nextButtonLabel={intl.formatMessage({ defaultMessage: 'Вперёд' })}
    />
  );
};

export default ExampleDatePickerOverview;
