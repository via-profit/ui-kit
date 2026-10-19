import React from 'react';
import Badge from '@via-profit/ui-kit/src/Badge';
import Stack from '@via-profit/ui-kit/src/Stack';
import { FormattedMessage } from 'react-intl';

const ExampleBadgeStatus: React.FC = () => (
  <Stack direction="row" gap="sm" wrap>
    <Badge variant="soft" dot color="#2e9d4f">
      <FormattedMessage defaultMessage="Оплачен" />
    </Badge>
    <Badge variant="soft" dot color="#e0a100">
      <FormattedMessage defaultMessage="Частично оплачен" />
    </Badge>
    <Badge variant="soft" dot color="#d64545">
      <FormattedMessage defaultMessage="Не оплачен" />
    </Badge>
    <Badge variant="outlined" dot color="primary">
      <FormattedMessage defaultMessage="В работе" />
    </Badge>
  </Stack>
);

export default ExampleBadgeStatus;
