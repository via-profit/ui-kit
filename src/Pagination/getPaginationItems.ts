export type PaginationItemType = 'page' | 'gap-start' | 'gap-end';

export type PaginationItemData =
  | { readonly type: 'page'; readonly page: number }
  | { readonly type: 'gap-start' | 'gap-end' };

const range = (start: number, end: number) =>
  Array.from({ length: Math.max(end - start + 1, 0) }, (_, index) => start + index);

/**
 * Returns the items of the pagination: the boundary pages, the current page with the siblings
 * and the gaps instead of the skipped ranges. The pages start from 1.
 * The count of the items does not depend on the current page, so the buttons do not jump
 *
 * @example getPaginationItems({ count: 10, page: 5, siblings: 1, boundaries: 1 })
 * // 1 … 4 5 6 … 10
 */
const getPaginationItems = (params: {
  readonly count: number;
  readonly page: number;
  readonly siblings: number;
  readonly boundaries: number;
}): PaginationItemData[] => {
  const { count, siblings, boundaries } = params;
  const page = Math.min(Math.max(params.page, 1), Math.max(count, 1));

  // boundaries on both sides + current + siblings + two gaps
  if (count <= boundaries * 2 + siblings * 2 + 3) {
    return range(1, count).map(item => ({ type: 'page', page: item }));
  }

  const startPages = range(1, boundaries);
  const endPages = range(count - boundaries + 1, count);

  // the window of the siblings keeps its size near the start and the end
  const siblingsStart = Math.max(
    Math.min(page - siblings, count - boundaries - siblings * 2 - 1),
    boundaries + 2,
  );
  const siblingsEnd = Math.min(
    Math.max(page + siblings, boundaries + siblings * 2 + 2),
    count - boundaries - 1,
  );

  const items: PaginationItemData[] = startPages.map(item => ({ type: 'page', page: item }));

  // a gap of one page is shown as the page itself
  if (siblingsStart > boundaries + 2) {
    items.push({ type: 'gap-start' });
  } else if (boundaries + 1 < count - boundaries) {
    items.push({ type: 'page', page: boundaries + 1 });
  }

  range(siblingsStart, siblingsEnd).forEach(item => items.push({ type: 'page', page: item }));

  if (siblingsEnd < count - boundaries - 1) {
    items.push({ type: 'gap-end' });
  } else if (count - boundaries > boundaries) {
    items.push({ type: 'page', page: count - boundaries });
  }

  endPages.forEach(item => items.push({ type: 'page', page: item }));

  return items;
};

export default getPaginationItems;
