import React from 'react';
import { useIntl } from 'react-intl';
import Calendar from '@via-profit/ui-kit/src/Calendar';
import Button from '@via-profit/ui-kit/src/Button';

const ExampleCalendarCustomControls: React.FC = () => {
  const [value, onChange] = React.useState(new Date());
  const intl = useIntl();

  return (
    <div>
      <Calendar
        value={value}
        onChange={onChange}
        footer={
          <>
            <Button
              style={{ marginRight: '0.5em' }}
              onClick={() => onChange(new Date(value.getFullYear(), 4, 9))}
            >
              {intl.formatMessage({ defaultMessage: 'к 9 Мая' })}
            </Button>
          </>
        }
      />
    </div>
  );
};

export default ExampleCalendarCustomControls;
