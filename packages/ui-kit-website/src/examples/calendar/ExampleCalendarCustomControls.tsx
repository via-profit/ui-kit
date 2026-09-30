import React from 'react';
import Calendar from '@via-profit/ui-kit/src/Calendar';
import Button from '@via-profit/ui-kit/src/Button';
import { FormattedMessage, useIntl } from 'react-intl';

const addDays = (days: number) => {
  const now = new Date();

  return new Date(now.getFullYear(), now.getMonth(), now.getDate() + days);
};

const ExampleCalendarCustomControls: React.FC = () => {
  const intl = useIntl();
  const [date, setDate] = React.useState<Date | null>(new Date());

  return (
    <Calendar
      value={date}
      onChange={setDate}
      locale={intl.locale}
      footer={
        <>
          <Button onClick={() => setDate(addDays(1))}>
            <FormattedMessage defaultMessage="Завтра" />
          </Button>
          <Button onClick={() => setDate(addDays(7))}>
            <FormattedMessage defaultMessage="Через неделю" />
          </Button>
        </>
      }
    />
  );
};

export default ExampleCalendarCustomControls;
