import React from 'react';
import EmptyState from '@via-profit/ui-kit/src/EmptyState';
import Button from '@via-profit/ui-kit/src/Button';
import { FormattedMessage } from 'react-intl';

const ExampleEmptyStateAction: React.FC = () => (
  <EmptyState
    title={<FormattedMessage defaultMessage="Ничего не найдено" />}
    action={
      <Button>
        <FormattedMessage defaultMessage="Сбросить фильтры" />
      </Button>
    }
  >
    <FormattedMessage defaultMessage="По выбранным фильтрам заявок нет. Измените период или сбросьте фильтры." />
  </EmptyState>
);

export default ExampleEmptyStateAction;
