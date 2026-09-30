import React from 'react';
import DatePicker from '@via-profit/ui-kit/src/DatePicker';
import { useIntl } from 'react-intl';

const today = new Date();
// Delivery is possible from tomorrow for the next two weeks
const minDate = new Date(today.getFullYear(), today.getMonth(), today.getDate() + 1);
const maxDate = new Date(today.getFullYear(), today.getMonth(), today.getDate() + 14);

const ExampleDatePickerReadOnly: React.FC = () => {
  const intl = useIntl();
  const [value, setValue] = React.useState<Date | null>(minDate);

  return (
    <DatePicker
      readOnly
      label={intl.formatMessage({ defaultMessage: 'Дата доставки' })}
      template="dd.mm.yyyy"
      value={value}
      onChange={setValue}
      minDate={minDate}
      maxDate={maxDate}
      locale={intl.locale}
      heading={intl.formatMessage({ defaultMessage: 'Когда привезти заказ?' })}
      calendarButtonTooltip={intl.formatMessage({ defaultMessage: 'Выбрать дату доставки' })}
    />
  );
};

export default ExampleDatePickerReadOnly;
