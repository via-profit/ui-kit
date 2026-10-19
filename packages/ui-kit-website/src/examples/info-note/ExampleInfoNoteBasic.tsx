import React from 'react';
import InfoNote from '@via-profit/ui-kit/src/InfoNote';
import { FormattedMessage } from 'react-intl';

const ExampleInfoNoteBasic: React.FC = () => (
  <InfoNote style={{ maxWidth: '32em' }}>
    <FormattedMessage
      defaultMessage="В сверку попадают только {completed} заявки клиента за выбранный период."
      values={{
        completed: (
          <strong key="completed">
            <FormattedMessage defaultMessage="выполненные" />
          </strong>
        ),
      }}
    />
  </InfoNote>
);

export default ExampleInfoNoteBasic;
