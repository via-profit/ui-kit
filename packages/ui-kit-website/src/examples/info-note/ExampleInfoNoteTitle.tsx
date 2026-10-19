import React from 'react';
import InfoNote from '@via-profit/ui-kit/src/InfoNote';
import Stack from '@via-profit/ui-kit/src/Stack';
import { FormattedMessage } from 'react-intl';

const ExampleInfoNoteTitle: React.FC = () => (
  <Stack gap="sm" style={{ maxWidth: '32em' }}>
    <InfoNote variant="warning" title={<FormattedMessage defaultMessage="Пересечение" />}>
      <FormattedMessage defaultMessage="В это время техника уже занята в заявке №128. Сохранить заявку можно, проверьте расписание." />
    </InfoNote>
    <InfoNote icon={false}>
      <FormattedMessage defaultMessage="Без иконки." />
    </InfoNote>
  </Stack>
);

export default ExampleInfoNoteTitle;
