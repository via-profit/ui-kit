import React from 'react';
import Button from '@via-profit/ui-kit/src/Button';
import HintPopover from '@via-profit/ui-kit/src/HintPopover';
import { FormattedMessage, useIntl } from 'react-intl';

const ExampleHintPopoverBasic: React.FC = () => {
  const intl = useIntl();

  return (
    <span>
      <Button>
        <FormattedMessage defaultMessage="Обновить список" />
      </Button>
      <HintPopover label={intl.formatMessage({ defaultMessage: 'Что делает «Обновить список»' })}>
        <p>
          <FormattedMessage defaultMessage="Собирает список заново: все выполненные заявки клиента за выбранный период." />
        </p>
        <p>
          <FormattedMessage defaultMessage="Несохранённые правки сумм в списке при этом сбросятся." />
        </p>
      </HintPopover>
    </span>
  );
};

export default ExampleHintPopoverBasic;
