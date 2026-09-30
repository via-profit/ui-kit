import React from 'react';
import styled from '@emotion/styled';
import Badge from '@via-profit/ui-kit/src/Badge';
import { FormattedMessage } from 'react-intl';

const Group = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5em;
`;

const ExampleBadgeOverview: React.FC = () => (
  <Group>
    <Badge>
      <FormattedMessage defaultMessage="Черновик" />
    </Badge>
    <Badge color="primary">
      <FormattedMessage defaultMessage="Новый" />
    </Badge>
    <Badge variant="outlined" color="secondary">
      <FormattedMessage defaultMessage="На проверке" />
    </Badge>
  </Group>
);

export default ExampleBadgeOverview;
