import React from 'react';
import Pagination, { PaginationProps } from '@via-profit/ui-kit/src/Pagination';
import { FormattedMessage, useIntl } from 'react-intl';

const ExamplePaginationBasic: React.FC = () => {
  const intl = useIntl();
  const [page, setPage] = React.useState(1);

  // The labels for the screen readers in the language of the interface
  const getItemLabel: PaginationProps['getItemLabel'] = (kind, target, selected) => {
    switch (kind) {
      case 'previous':
        return intl.formatMessage({ defaultMessage: 'Предыдущая страница' });
      case 'next':
        return intl.formatMessage({ defaultMessage: 'Следующая страница' });
      case 'first':
        return intl.formatMessage({ defaultMessage: 'Первая страница' });
      case 'last':
        return intl.formatMessage({ defaultMessage: 'Последняя страница' });
      default:
        return selected
          ? intl.formatMessage({ defaultMessage: 'Страница {page}' }, { page: target })
          : intl.formatMessage({ defaultMessage: 'Перейти на страницу {page}' }, { page: target });
    }
  };

  return (
    <>
      <Pagination
        count={10}
        page={page}
        onChange={setPage}
        getItemLabel={getItemLabel}
        aria-label={intl.formatMessage({ defaultMessage: 'Страницы заказов' })}
      />
      <p>
        <FormattedMessage defaultMessage="Текущая страница: {page}" values={{ page }} />
      </p>
    </>
  );
};

export default ExamplePaginationBasic;
