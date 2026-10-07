import React from 'react';
import styled from '@emotion/styled';
import Button from '@via-profit/ui-kit/src/Button';
import { usePagination, IconPrevious, IconNext } from '@via-profit/ui-kit/src/Pagination';
import { FormattedMessage, useIntl } from 'react-intl';

const Nav = styled.nav`
  display: inline-flex;
  align-items: center;
  gap: 0.75em;
`;

const Dots = styled.span`
  display: inline-flex;
  gap: 0.4em;
`;

const Dot = styled.button<{ $selected: boolean }>`
  width: 0.6em;
  height: 0.6em;
  padding: 0;
  border: 0;
  border-radius: 50%;
  cursor: pointer;
  background-color: ${({ theme, $selected }) =>
    $selected
      ? theme.color.accentPrimary.toString()
      : theme.color.textPrimary.alpha(0.2).toString()};
`;

/**
 * The pagination of your own design: `usePagination` gives the current page and the buttons,
 * the markup is yours. Here: the arrows, «3 / 7» and a dot for every page
 */
const ExamplePaginationCustom: React.FC = () => {
  const intl = useIntl();
  const { page, count, items, setPage } = usePagination({
    count: 7,
    defaultPage: 3,
    // all the pages as dots: no gaps; the arrows are drawn below
    siblings: 7,
    showPrevNext: false,
  });

  return (
    <Nav aria-label={intl.formatMessage({ defaultMessage: 'Слайды' })}>
      <Button
        iconOnly
        variant="plain"
        disabled={page === 1}
        aria-label={intl.formatMessage({ defaultMessage: 'Предыдущий слайд' })}
        onClick={event => setPage(page - 1, event)}
      >
        <IconPrevious />
      </Button>
      <FormattedMessage defaultMessage="{page} / {count}" values={{ page, count }} />
      <Button
        iconOnly
        variant="plain"
        disabled={page === count}
        aria-label={intl.formatMessage({ defaultMessage: 'Следующий слайд' })}
        onClick={event => setPage(page + 1, event)}
      >
        <IconNext />
      </Button>
      <Dots>
        {items.map(item =>
          item.type === 'page' ? (
            <Dot
              key={item.page}
              type="button"
              $selected={item.selected}
              aria-current={item.selected ? 'page' : undefined}
              aria-label={intl.formatMessage(
                { defaultMessage: 'Слайд {page}' },
                { page: item.page },
              )}
              onClick={item.onClick}
            />
          ) : null,
        )}
      </Dots>
    </Nav>
  );
};

export default ExamplePaginationCustom;
