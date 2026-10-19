import React from 'react';
import EmptyState from '@via-profit/ui-kit/src/EmptyState';
import { FormattedMessage } from 'react-intl';

const ExampleEmptyStateBasic: React.FC = () => (
  <EmptyState>
    <FormattedMessage defaultMessage="Пусто" />
  </EmptyState>
);

export default ExampleEmptyStateBasic;
