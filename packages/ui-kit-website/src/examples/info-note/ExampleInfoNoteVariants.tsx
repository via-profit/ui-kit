import React from 'react';
import InfoNote from '@via-profit/ui-kit/src/InfoNote';
import Stack from '@via-profit/ui-kit/src/Stack';
import { FormattedMessage } from 'react-intl';

const ExampleInfoNoteVariants: React.FC = () => (
  <Stack gap="sm" style={{ maxWidth: '32em' }}>
    <InfoNote>
      <FormattedMessage defaultMessage="Изменения вступят в силу со следующего месяца." />
    </InfoNote>
    <InfoNote variant="success">
      <FormattedMessage defaultMessage="Реквизиты проверены: организация действует." />
    </InfoNote>
    <InfoNote variant="warning">
      <FormattedMessage defaultMessage="Лист закрыт: новые начисления невозможны." />
    </InfoNote>
    <InfoNote variant="error">
      <FormattedMessage defaultMessage="Договор истёк: заявку по нему выполнить нельзя." />
    </InfoNote>
  </Stack>
);

export default ExampleInfoNoteVariants;
