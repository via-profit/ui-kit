import React from 'react';
import TextArea from '@via-profit/ui-kit/src/TextArea';
import { FormattedMessage, useIntl } from 'react-intl';

const ExampleTextAreaOverview: React.FC = () => {
  const intl = useIntl();
  const [value, setValue] = React.useState('');

  return (
    <TextArea
      label={<FormattedMessage defaultMessage="Комментарий" />}
      placeholder={intl.formatMessage({ defaultMessage: 'Опишите ваш вопрос' })}
      rows={4}
      fullWidth
      value={value}
      onChange={event => setValue(event.currentTarget.value)}
    />
  );
};

export default ExampleTextAreaOverview;
