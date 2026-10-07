import React from 'react';

import getPaginationItems from './getPaginationItems';

export type PaginationItemKind = 'page' | 'first' | 'previous' | 'next' | 'last';

export type PaginationNavigationKind = Exclude<PaginationItemKind, 'page'>;

/**
 * The button of the pagination: a page or a navigation button
 */
export type PaginationButtonEntry = {
  readonly type: PaginationItemKind;

  /**
   * The page the button opens, starts from 1
   */
  readonly page: number;

  /**
   * The button of the current page. The navigation buttons are never selected
   */
  readonly selected: boolean;

  /**
   * The button does nothing: the whole pagination is disabled
   * or the navigation button leads out of the pages or to the current page
   */
  readonly disabled: boolean;

  /**
   * Opens the `page`
   */
  readonly onClick: (event: React.SyntheticEvent) => void;
};

/**
 * The skipped range of the pages
 */
export type PaginationGapEntry = {
  readonly type: 'gap';

  /**
   * The gap before the current page or after it
   */
  readonly position: 'start' | 'end';
};

export type PaginationEntry = PaginationButtonEntry | PaginationGapEntry;

export type UsePaginationParams = {
  /**
   * Total count of the pages
   */
  readonly count: number;

  /**
   * The current page of the controlled pagination, starts from 1
   */
  readonly page?: number;

  /**
   * The initial page of the uncontrolled pagination\
   * **Default:** `1`
   */
  readonly defaultPage?: number;

  /**
   * Called with the selected page
   */
  readonly onChange?: (page: number, event: React.SyntheticEvent) => void;

  /**
   * Count of the pages shown on each side of the current one\
   * **Default:** `1`
   */
  readonly siblings?: number;

  /**
   * Count of the pages always shown at the start and at the end\
   * **Default:** `1`
   */
  readonly boundaries?: number;

  /**
   * Show the previous and the next buttons\
   * **Default:** `true`
   */
  readonly showPrevNext?: boolean;

  /**
   * Show the first and the last buttons\
   * **Default:** `false`
   */
  readonly showFirstLast?: boolean;

  /**
   * Disables all the buttons
   */
  readonly disabled?: boolean;
};

export type UsePaginationResult = {
  /**
   * The current page, starts from 1. Always in the range of the pages
   */
  readonly page: number;

  /**
   * The count of the pages, at least 1
   */
  readonly count: number;

  /**
   * The buttons and the gaps in the order of the display
   */
  readonly items: readonly PaginationEntry[];

  /**
   * Opens the page: calls `onChange`, and changes the page of the uncontrolled pagination.
   * The pages out of the range, the current page and any page of the disabled pagination are ignored
   */
  readonly setPage: (page: number, event: React.SyntheticEvent) => void;
};

/**
 * The logic of the pagination without the markup: the current page, the buttons and the gaps.
 * `<Pagination>` is built on it, use it for the pagination of your own design
 */
const usePagination = (params: UsePaginationParams): UsePaginationResult => {
  const {
    count,
    page: controlledPage,
    defaultPage = 1,
    onChange,
    siblings = 1,
    boundaries = 1,
    showPrevNext = true,
    showFirstLast = false,
    disabled = false,
  } = params;

  const [uncontrolledPage, setUncontrolledPage] = React.useState(defaultPage);
  const isControlled = typeof controlledPage !== 'undefined';
  const pagesCount = Math.max(Math.floor(count) || 0, 1);
  const currentPage = Math.min(
    Math.max(isControlled ? controlledPage : uncontrolledPage, 1),
    pagesCount,
  );

  const setPage = React.useCallback(
    (target: number, event: React.SyntheticEvent) => {
      if (disabled || target === currentPage || target < 1 || target > pagesCount) {
        return;
      }
      if (!isControlled) {
        setUncontrolledPage(target);
      }
      onChange?.(target, event);
    },
    [disabled, currentPage, pagesCount, isControlled, onChange],
  );

  const items = React.useMemo(() => {
    const button = (type: PaginationItemKind, target: number): PaginationButtonEntry => {
      const selected = type === 'page' && target === currentPage;

      return {
        type,
        page: target,
        selected,
        disabled:
          disabled ||
          (type !== 'page' && (target < 1 || target > pagesCount || target === currentPage)),
        onClick: event => setPage(target, event),
      };
    };

    const pages = getPaginationItems({
      count: pagesCount,
      page: currentPage,
      siblings,
      boundaries,
    }).map<PaginationEntry>(item =>
      item.type === 'page'
        ? button('page', item.page)
        : { type: 'gap', position: item.type === 'gap-start' ? 'start' : 'end' },
    );

    return [
      ...(showFirstLast ? [button('first', 1)] : []),
      ...(showPrevNext ? [button('previous', currentPage - 1)] : []),
      ...pages,
      ...(showPrevNext ? [button('next', currentPage + 1)] : []),
      ...(showFirstLast ? [button('last', pagesCount)] : []),
    ];
  }, [
    pagesCount,
    currentPage,
    siblings,
    boundaries,
    showPrevNext,
    showFirstLast,
    disabled,
    setPage,
  ]);

  return { page: currentPage, count: pagesCount, items, setPage };
};

export default usePagination;
