import React from 'react';
import DatePicker from '@via-profit/ui-kit/src/DatePicker';
import { useIntl } from 'react-intl';

const ExampleDatePickerOverview: React.FC = () => {
  const [value, setValue] = React.useState<null | Date>(null);
  const intl = useIntl();

  return (
    <DatePicker
      template="dd.mm.yyyy"
      calendarButtonTooltip={intl.formatMessage({ defaultMessage: 'Открыть календарь' })}
      value={value}
      onChange={setValue}
    />
  );
};

export default ExampleDatePickerOverview;
