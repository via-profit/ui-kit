import React from 'react';
import styled from '@emotion/styled';
import EmptyState from '@via-profit/ui-kit/src/EmptyState';
import EmptyStateIcon from '@via-profit/ui-kit/src/EmptyState/EmptyStateIcon';
import { FormattedMessage } from 'react-intl';

// Defined once at module level, not during the render
const Icon = styled(EmptyStateIcon)`
  font-size: 3.5em;
  color: ${({ theme }) => theme.color.accentPrimary.toString()};
`;

const overrides = { Icon };

const ExampleEmptyStateOverrides: React.FC = () => (
  <EmptyState overrides={overrides} title={<FormattedMessage defaultMessage="Корзина пуста" />} />
);

export default ExampleEmptyStateOverrides;
