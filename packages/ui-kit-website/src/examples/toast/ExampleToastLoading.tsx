import React from 'react';
import Button from '@via-profit/ui-kit/src/Button';
import { toast } from '@via-profit/ui-kit/src/Toast';
import { FormattedMessage, useIntl } from 'react-intl';

const ExampleToastLoading: React.FC = () => {
  const intl = useIntl();

  const save = () => {
    const toastId = toast.loading(intl.formatMessage({ defaultMessage: 'Сохранение...' }));

    // The request to the server
    setTimeout(() => {
      toast.update(toastId, {
        render: intl.formatMessage({ defaultMessage: 'Сохранено' }),
        type: 'success',
        isLoading: false,
        autoClose: 3000,
      });
    }, 1500);
  };

  return (
    <Button color="primary" onClick={save}>
      <FormattedMessage defaultMessage="Сохранить" />
    </Button>
  );
};

export default ExampleToastLoading;
